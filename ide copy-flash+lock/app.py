from flask import Flask, render_template, request, jsonify
import subprocess
import os
import uuid
from flask_socketio import SocketIO, join_room, leave_room, emit
from flask_cors import CORS
import random
import string
app = Flask(__name__)
socketio = SocketIO(app)
CORS(app)

# 클라이언트의 상태를 저장할 딕셔너리
clients = {}  # 클라이언트 ID와 세션 ID를 저장
states = {}  # 클라이언트 ID와 상태를 저장 (won, lose, etc.)    
    
skills = {}  # 클라이언트 ID와 스킬 상태를 저장 (타이핑 차단 여부 등)
@socketio.on('register')
def handle_register(data):
    client_id = data['client_id']
    
    # 클라이언트 등록 (clients에 세션 ID와 연결)
    clients[client_id] = request.sid
    
    # 스킬 상태 초기화 (타이핑 차단 없음)
    if client_id not in skills:
        skills[client_id] = {'disable_typing': False}
    
    print(f'Client registered: {client_id} with session ID {request.sid}')

@socketio.on('disconnect')
def handle_disconnect():
    for client_id, sid in list(clients.items()):
        if sid == request.sid:
            clients.pop(client_id)
            skills.pop(client_id)
            print(f'Client {client_id} disconnected')

@socketio.on('use_skill')
def handle_use_skill(data):
    sender_id = data.get('sender_id')
    skill_type = data.get('skill_type')

    # 상대방을 찾는 함수 (필요에 따라 구현)
    opponent_id = find_opponent(sender_id)

    if opponent_id:
        if skill_type == 'disable_typing':
            # 상대방에게 disable_typing 스킬을 발동
            socketio.emit('skill_effect', {'skill': 'disable_typing', 'status': 'active'}, room=clients[opponent_id])
        elif skill_type == 'disable_submit':
            # 상대방에게 disable_submit 스킬을 발동
            duration = 20  # 5초간 제출 버튼 비활성화
            socketio.emit('skill_effect', {'skill': 'disable_submit', 'status': 'active'}, room=clients[opponent_id])

        print(f"{sender_id} used skill: {skill_type} on {opponent_id}")

def find_opponent(sender_id):
    # 임시 구현: 매칭된 상대방을 반환
    for client_id in clients:
        if client_id != sender_id:  # 나를 제외한 상대방
            return client_id
    return None


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/all-tests-passed', methods=['POST'])
def all_tests_passed():
    """
    클라이언트로부터 'All test cases passed' 메시지를 받으면 상태를 업데이트하고 알림을 전송하는 함수
    """
    data = request.get_json()
    message = data.get('message', '')
    sender_id = data.get('sender_id')

    if not message or not sender_id:
        return jsonify({"status": "error", "message": "Message or Sender ID is missing."}), 400

    if message == 'All test cases passed':
        print(f"All tests passed successfully! Sender: {sender_id}")

        # 클라이언트 상태 업데이트
        for client_id in clients.keys():
            if client_id == sender_id:
                states[client_id] = 'won'
            else:
                states[client_id] = 'lose'

        # 상태에 따라 각 클라이언트에게 알림 전송
        send_test_result_notifications()

        return jsonify({"status": "success", "message": "Server received all tests passed notification."})
    else:
        return jsonify({"status": "error", "message": "Invalid message."}), 400

@socketio.on('register')
def handle_register(data):
    client_id = data['client_id']
    clients[client_id] = request.sid  # 클라이언트 ID와 세션 ID를 연결
    print(f'Client registered: {client_id} with session ID {request.sid}')

@socketio.on('disconnect')
def handle_disconnect():
    for client_id, sid in list(clients.items()):
        if sid == request.sid:
            clients.pop(client_id)
            print(f'Client {client_id} disconnected')

def send_test_result_notifications():
    """
    각 클라이언트의 상태에 따라 'You Won!' 또는 'You Lose!' 메시지를 전송하는 함수
    """
    for client_id, sid in clients.items():
        if states[client_id] == 'won':
            print(f'Sending "You Won!" to client: {client_id} with session ID: {sid}')
            socketio.emit('test_result_notification', 
                          {'message': 'You Won!'}, 
                          room=sid)
        else:
            print(f'Sending "You Lose!" to client: {client_id} with session ID: {sid}')
            socketio.emit('test_result_notification', 
                          {'message': 'You Lose!'}, 
                          room=sid)

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

    # Check if all test cases passed
    all_passed = all(result['passed'] for result in results)

    if all_passed:
        # Broadcast the success to both players
        socketio.emit('victory', {'message': 'All test cases passed! You win!'})

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
    socketio.run(app, debug=True)
