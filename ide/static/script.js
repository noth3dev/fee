window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });


document.getElementById('opponent-player').textContent = "Yeonfish6040";

let testCases = [
    { 'input': '1 2', 'expected_output': '3' },
    { 'input': '10 20', 'expected_output': '30' }
];

let additionalTestCases = [
    { 'input': '100 200', 'expected_output': '300' },
    { 'input': '0 0', 'expected_output': '0' },
    { 'input': '-5 5', 'expected_output': '0' },
    { 'input': '123 456', 'expected_output': '579' },
];

const problemData = {
    "title": "A+B",
    "source": "Basics",
    "description": "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
    "input_format": "첫째 줄에 A와 B가 주어진다. (-100 < A, B < 100)",
    "output_format": "첫째 줄에 A+B를 출력한다.",
    "sample_testcases": [
        {
            "input": "1 2",
            "output": "3"
        },
        {
            "input": "-100 50",
            "output": "-50"
        }
    ],
    "time_limit": "1 second",
    "memory_limit": "256 MB",
    "difficulty": "쉬움"
};

document.getElementById('problem-title').textContent = problemData.title;
document.getElementById('problem-source').textContent = problemData.source;
document.getElementById('problem-description').textContent = problemData.description;
document.getElementById('problem-input-format').textContent = problemData.input_format;
document.getElementById('problem-output-format').textContent = problemData.output_format;
document.title = problemData.title;

const testCasesContainer = document.getElementById('test-cases');
testCasesContainer.innerHTML = '';

problemData.sample_testcases.forEach((testCase, index) => {
    const testCaseDiv = document.createElement('div');
    testCaseDiv.innerHTML = `
        <div class="problemintitle" style="font-size: 14px;">테스트케이스 ${index + 1}:<br></div>
        <div class="testcase-container">
            <div class="testcase-display">
                <div class="testcase-title">예제 입력</div>
                <div class="testcase-content input-content" onclick="copyToClipboard('.input-content-${index}')">${testCase.input}</div>
            </div>
            <div class="testcase-display">
                <div class="testcase-title">예제 출력</div>
                <div class="testcase-content output-content">${testCase.output}</div>
            </div>
        </div>
    `;
    testCaseDiv.querySelector('.input-content').classList.add(`input-content-${index}`);
    testCasesContainer.appendChild(testCaseDiv);
});

document.getElementById('problem-additional-info').textContent = `메모리 제한: ${problemData.memory_limit}, 시간 제한: ${problemData.time_limit}`;

document.getElementById('problem-difficulty').textContent = `난이도 : ${problemData.difficulty}`;
document.getElementById('problem-source-detail').textContent = `출처: ${problemData.source}`;

var languageModes = {
    "C": "text/x-csrc",
    "C++": "text/x-c++src",
    "Java": "text/x-java",
    "Python": "text/x-python",
};

let allTestCases = testCases.concat(additionalTestCases);

var editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
    lineNumbers: true,
    mode: "text/x-csrc",
    theme: "material-darker",
    lineWrapping: false,
    autoCloseBrackets: true,
    extraKeys: {}
});

function notifyServerAllTestsPassed() {
    fetch("/all-tests-passed", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "All test cases passed" })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);
        })
        .catch(error => {
            console.error("Error notifying server:", error);
        });
}

function runSingleTestCase(input, expectedOutput) {
    return new Promise(function (resolve) {
        const code = editor.getValue();
        const language = document.getElementById("language-selector").value;

        const payload = {
            code: code,
            language: language,
            input: input
        };

        fetch("/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                const actualOutput = data.output ? data.output.trim() : '';
                const expected = expectedOutput.trim();

                let passed = false;
                if (data.error || actualOutput === '') {
                    passed = false;
                } else {
                    passed = actualOutput === expected;
                }

                resolve(passed);
            })
            .catch(() => {
                resolve(false);
            });
    });
}

function runAllTestCases() {
    document.querySelectorAll('.consolemenu-item').forEach((item, index) => {
        if (item.textContent.trim() === 'SUBMITTED LOG') {
            document.querySelectorAll('.consolemenu-item').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.consolemenu-content > div').forEach(el => el.classList.remove('active'));

            item.classList.add('active');
            document.querySelectorAll('.consolemenu-content > div')[index].classList.add('active');
        }
    });

    const resultsContainer = document.getElementById('results-container');

    const testPromises = allTestCases.map(tc => runSingleTestCase(tc.input, tc.expected_output));

    Promise.all(testPromises).then(results => {
        const passedCount = results.filter(passed => passed).length;
        const totalCount = allTestCases.length;

        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'testcase-box';
        summaryDiv.innerHTML = `Passed ${passedCount}/${totalCount}`;
        summaryDiv.style.backgroundColor = passedCount === totalCount ? "var(--positive)" : "var(--negative)";
        summaryDiv.style.marginTop = '10px';
        resultsContainer.appendChild(summaryDiv);

        console.log(`Passed ${passedCount} out of ${totalCount} test cases.`);
    });

    if (passedCount === totalCount) {
        notifyServerAllTestsPassed();
    }
}

document.getElementById("submit-all").addEventListener("click", runAllTestCases);

editor.on("inputRead", function (editor, change) {
    if (change.origin !== "setValue" && change.text[0].match(/[a-zA-Z0-9_]/)) {
        CodeMirror.commands.autocomplete(editor);
    }
});

document.getElementById("language-selector").addEventListener("change", function () {
    var selectedLanguage = this.value;
    editor.setOption("mode", selectedLanguage);
});

function loadTestCases() {
    var testcaseContainer = document.getElementById('testcases');
    testcaseContainer.innerHTML = '';

    console.log("Loading test cases...");

    testCases.forEach(function (tc, index) {
        var testcaseDiv = document.createElement('div');
        testcaseDiv.className = 'testcase-box';
        testcaseDiv.textContent = `Test Case ${index + 1}: Input: ${tc.input}`;
        testcaseDiv.dataset.input = tc.input;
        testcaseDiv.addEventListener('click', function () {
            console.log(`Test case ${index + 1} clicked:`, tc.input);
            setEditorInputAndRun(tc.input);
        });
        testcaseContainer.appendChild(testcaseDiv);
    });

    console.log("Test cases loaded successfully.");
}

function setEditorInputAndRun(input) {
    document.getElementById('input-field').value = input;
    console.log("Input set in editor:", input);
    runCode();
}

function runCode() {
    const code = editor.getValue();
    const language = document.getElementById("language-selector").value;
    const input = document.getElementById("input-field").value;

    console.log("Running code with input:", input);
    document.querySelectorAll('.consolemenu-item').forEach((item, index) => {
        if (item.textContent.trim() === 'MY OUTPUT') {
            document.querySelectorAll('.consolemenu-item').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.consolemenu-content > div').forEach(el => el.classList.remove('active'));

            item.classList.add('active');
            document.querySelectorAll('.consolemenu-content > div')[index].classList.add('active');
        }
    });

    const payload = {
        code: code,
        language: language,
        input: input
    };

    fetch("/compile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("my-output").textContent = `Error: ${data.error}`;
                console.error("Error during code execution:", data.error);
            } else {
                document.getElementById("my-output").textContent = data.output;
                console.log("Code executed successfully. Output:", data.output);
            }
        })
        .catch(error => {
            document.getElementById("my-output").textContent = `Request failed: ${error.message}`;
            console.error("Request failed:", error.message);
        });
}

window.onload = function () {
    loadTestCases();
    console.log("Page loaded, test cases initialized.");
};

document.querySelectorAll('.consolemenu-item').forEach((item, index) => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.consolemenu-item').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.consolemenu-content > div').forEach(el => el.classList.remove('active'));

        this.classList.add('active');
        document.querySelectorAll('.consolemenu-content > div')[index].classList.add('active');
    });
});

function updateStatuses(statusString) {
    const statusElements = document.querySelectorAll('.round-container .status');

    statusString.split('').forEach((status, index) => {
        if (index < statusElements.length) {
            statusElements[index].textContent = status;

            if (status === 'W') {
                statusElements[index].className = 'status win';
            } else if (status === 'L') {
                statusElements[index].className = 'status lose';
            } else if (status === 'M') {
                statusElements[index].className = 'status miss';
            } else {
                console.error("Invalid status at index " + index);
            }
        }
    });
}

updateStatuses('WLLLM');

function copyToClipboard(selector) {
    var content = document.querySelector(selector).textContent;
    var textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('클립보드에 복사되었습니다.');
}

function loadTestCases() {
    var testcaseContainer = document.getElementById('testcases');
    testcaseContainer.innerHTML = '';

    console.log("Loading test cases...");

    testCases.forEach(function (tc, index) {
        var testcaseDiv = document.createElement('div');
        testcaseDiv.className = 'testcase-box';
        testcaseDiv.textContent = `Test Case ${index + 1}: Input: ${tc.input}`;
        testcaseDiv.dataset.input = tc.input;
        testcaseDiv.dataset.expectedOutput = tc.output;
        testcaseDiv.dataset.index = index + 1;
        testcaseDiv.addEventListener('click', function () {
            console.log(`Test case ${index + 1} clicked:`, tc.input);
            setEditorInputAndRun(tc.input, testcaseDiv);
        });
        testcaseContainer.appendChild(testcaseDiv);
    });

    console.log("Test cases loaded successfully.");
}

function setEditorInputAndRun(input, testcaseDiv) {
    document.getElementById('input-field').value = input;
    console.log("Input set in editor:", input);
    runSingleTestCase(input, testcaseDiv.dataset.expectedOutput, testcaseDiv);
}

window.onload = function () {
    loadTestCases();
    console.log("Page loaded, test cases initialized.");
};
