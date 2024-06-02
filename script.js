document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const keys = document.querySelector('.calculator-keys');
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    keys.addEventListener('click', function (e) {
        if (!e.target.matches('button')) return;

        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if (!action) {
            if (displayedNum === '0' || waitingForSecondValue) {
                display.textContent = keyContent;
                waitingForSecondValue = false;
            } else {
                display.textContent = displayedNum + keyContent;
            }
        } else if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (waitingForSecondValue) {
                display.textContent = '0.';
                waitingForSecondValue = false;
            }
        } else if (action === 'clear') {
            display.textContent = '0';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
        } else if (action === 'negate') {
            display.textContent = displayedNum.charAt(0) === '-' ? displayedNum.slice(1) : '-' + displayedNum;
        } else if (action === 'percent') {
            display.textContent = String(parseFloat(displayedNum) / 100);
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            if (firstValue && operator && !waitingForSecondValue) {
                display.textContent = calculate(firstValue, operator, displayedNum);
            }
            firstValue = display.textContent;
            operator = action;
            waitingForSecondValue = true;
        } else if (action === 'calculate') {
            if (firstValue) {
                display.textContent = calculate(firstValue, operator, displayedNum);
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            }
        } else if (!isNaN(action)) {
            setNumbers(keyContent);
        }
    });

    function calculate(first, operator, second) {
        first = parseFloat(first);
        second = parseFloat(second);
        if (operator === 'add') return first + second;
        if (operator === 'subtract') return first - second;
        if (operator === 'multiply') return first * second;
        if (operator === 'divide') return first / second;
    }

    function setNumbers(numberPressed) {
        const displayedNum = display.textContent;
        if (waitingForSecondValue) {
            display.textContent = numberPressed;
            waitingForSecondValue = false;
        } else {
            display.textContent = displayedNum === '0' ? numberPressed : displayedNum + numberPressed;
        }
    }
});
