let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

// Set up event listeners for buttons
buttons.addEventListener("click", (event) => {
  const target = event.target;
  const action = target.dataset.action;
  const value = target.dataset.value;

  if (!action) return;

  if (action === "digit") {
    handleDigit(value);
  } else if (action === "operator") {
    handleOperator(value);
  } else if (action === "equals") {
    handleEquals();
  } else if (action === "clear") {
    resetCalculator();
  } else if (action === "delete") {
    deleteDigit();
  }
  updateDisplay();
});

function handleDigit(digit) {
  if (shouldResetDisplay) {
    displayValue = digit;
    shouldResetDisplay = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

function handleOperator(operator) {
  if (currentOperator && !shouldResetDisplay) {
    handleEquals();
  }
  firstOperand = parseFloat(displayValue);
  currentOperator = operator;
  shouldResetDisplay = true;
}

function handleEquals() {
  if (!currentOperator || shouldResetDisplay) return;

  secondOperand = parseFloat(displayValue);

  if (currentOperator === "+") {
    displayValue = (firstOperand + secondOperand).toString();
  } else if (currentOperator === "-") {
    displayValue = (firstOperand - secondOperand).toString();
  } else if (currentOperator === "*") {
    displayValue = (firstOperand * secondOperand).toString();
  } else if (currentOperator === "/") {
    displayValue =
      secondOperand === 0 ? "Error" : (firstOperand / secondOperand).toString();
  }

  firstOperand = parseFloat(displayValue);
  currentOperator = null;
  shouldResetDisplay = true;
}

function resetCalculator() {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
}

function deleteDigit() {
  if (displayValue.length === 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.slice(0, -1);
  }
}

function updateDisplay() {
  display.textContent = displayValue;
}
