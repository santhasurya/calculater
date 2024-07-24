// script.js

// Variables to store current and previous values
let currentValue = '0';
let previousValue = '';
let operator = null;

// Grab the display element
const display = document.getElementById('display');

// Event listeners for all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const number = button.dataset.number;

        if (number !== undefined) {
            handleNumber(number);
        } else if (action !== undefined) {
            handleAction(action);
        }

        updateDisplay();
    });
});

// Handle number input
function handleNumber(number) {
    if (currentValue === '0') {
        currentValue = number;
    } else {
        currentValue += number;
    }
}

// Handle action buttons
function handleAction(action) {
    switch (action) {
        case 'clear':
            clearCalculator();
            break;
        case 'decimal':
            addDecimal();
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            setOperator(action);
            break;
        case 'equals':
            calculate();
            break;
    }
}

// Clear the calculator
function clearCalculator() {
    currentValue = '0';
    previousValue = '';
    operator = null;
}

// Add decimal point
function addDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
    }
}

// Set operator
function setOperator(action) {
    if (previousValue && currentValue && operator) {
        calculate();
    }
    previousValue = currentValue;
    operator = action;
    currentValue = '0';
}

// Calculate the result
function calculate() {
    if (!operator || !previousValue) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                result = 'Error'; // Prevent division by zero
            } else {
                result = prev / current;
            }
            break;
    }

    currentValue = result.toString();
    operator = null;
    previousValue = '';
}

// Update the display
function updateDisplay() {
    display.textContent = currentValue;
}
