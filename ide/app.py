from flask import Flask, render_template, request, jsonify
import subprocess
import os
import uuid

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/compile', methods=['POST'])
def compile_code():
    data = request.json
    code = data.get('code')
    language = data.get('language')
    input_data = data.get('input', '')

    unique_id = uuid.uuid4().hex
    filename, compile_command, run_command = prepare_compilation(language, unique_id)

    if not filename:
        return jsonify({'error': 'Unsupported language'}), 400

    try:
        # 코드 파일 생성
        with open(filename, 'w') as f:
            f.write(code)

        # 컴파일 (해당되는 경우)
        if compile_command:
            compile_process = subprocess.run(compile_command, capture_output=True, text=True)
            if compile_process.returncode != 0:
                return jsonify({'error': f'Compilation error: {compile_process.stderr}'}), 400

        # 코드 실행
        output, error = execute_code_with_timeout(run_command, input_data)
        if error:
            return jsonify({'error': f'Runtime error: {error}'}), 400

        return jsonify({'output': output})

    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

    finally:
        clean_up_files(filename, run_command[0])

@app.route('/compile-and-test', methods=['POST'])
def compile_and_test():
    data = request.json
    code = data.get('code')
    language = data.get('language')

    test_cases = [
        {'input': '3 3 abc def ghi 1 abc 2', 'expected_output': '1'},
        {'input': '2 2 ab cd 1 ab 1', 'expected_output': '1'}
    ]

    results = []

    for test_case in test_cases:
        input_data = test_case['input']
        expected_output = test_case['expected_output']

        actual_output, error = execute_code(code, language, input_data)

        passed = actual_output.strip() == expected_output.strip()
        results.append({
            'input': input_data,
            'expected_output': expected_output,
            'actual_output': actual_output.strip(),
            'passed': passed
        })

    return jsonify({'results': results})

def prepare_compilation(language, unique_id):
    if language == 'text/x-csrc':
        filename = f'./compilation/temp_{unique_id}.c'
        compile_command = ['gcc', filename, '-o', f'temp_{unique_id}']
        run_command = [f'./temp_{unique_id}']
    elif language == 'text/x-c++src':
        filename = f'./compilation/temp_{unique_id}.cpp'
        compile_command = ['g++', filename, '-o', f'temp_{unique_id}']
        run_command = [f'./temp_{unique_id}']
    elif language == 'text/x-python':
        filename = f'./compilation/temp_{unique_id}.py'
        compile_command = None
        run_command = ['python', filename]
    elif language == 'text/x-java':
        filename = f'./compilation/Temp_{unique_id}.java'
        compile_command = ['javac', filename]
        run_command = ['java', '-cp', 'compilation', f'Temp_{unique_id}']
    else:
        return None, None, None

    return filename, compile_command, run_command

def execute_code_with_timeout(run_command, input_data, timeout=10):
    try:
        run_process = subprocess.Popen(run_command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        output, error = run_process.communicate(input=input_data, timeout=timeout)
        return output, error
    except subprocess.TimeoutExpired:
        run_process.kill()
        return "", "Execution timeout."

def execute_code(code, language, input_data):
    unique_id = uuid.uuid4().hex
    filename, compile_command, run_command = prepare_compilation(language, unique_id)

    if not filename:
        return "Unsupported language", ""

    try:
        with open(filename, 'w') as f:
            f.write(code)

        if compile_command:
            compile_process = subprocess.run(compile_command, capture_output=True, text=True)
            if compile_process.returncode != 0:
                return compile_process.stderr, "Compilation error"

        output, error = execute_code_with_timeout(run_command, input_data)
        if error:
            return error, "Runtime error"

        return output, ""

    except Exception as e:
        return str(e), "Execution error"

    finally:
        clean_up_files(filename, run_command[0])

def clean_up_files(filename, output_filename):
    if os.path.exists(filename):
        os.remove(filename)
    if os.path.exists(output_filename):
        os.remove(output_filename)

if __name__ == '__main__':
    if not os.path.exists('compilation'):
        os.makedirs('compilation')
    app.run(debug=True)
