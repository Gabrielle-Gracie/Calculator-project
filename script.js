const firstDisplayEvent = document.querySelector(".firstDisplay");
const secondDisplayEvent = document.querySelector(".secondDisplay");
const tempResultEvent = document.querySelector(".tempResult");
const numbersEvent = document.querySelectorAll(".number");
const calculationEvent = document.querySelectorAll(".operator");
const equalOperatorEvent = document.querySelector(".equal");
const clearAllResultEvent = document.querySelector(".clearAllResult");
const clearLastRsultEvent = document.querySelector(".clearLastResult");
let firstNum = "";
let secondNum = "";
let result = null;
let lastOperation = "";
let decimalPoint = false;


numbersEvent.forEach((number) => {
  number.addEventListener("click", (e) => {
      //prevent '.' from displaying twice and should only appear after a number
    if (e.target.innerText === "." && !decimalPoint) {
      decimalPoint = true;
    } else if (e.target.innerText === "." && decimalPoint) {
      return;
    }
 //check number can appear on the display screen
    secondNum += e.target.innerText;
    secondDisplayEvent.innerText = secondNum;
  });
});

calculationEvent.forEach((operator) => {
  operator.addEventListener("click", (e) => {
      //check number exist to add an operator
    if (!secondNum) return;
    decimalPoint = false;
    const operatorName = e.target.innerText;
    if (firstNum && secondNum && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(secondNum);
    }
// clear current memory
    clearVar(operatorName);
    lastOperation = operatorName;
  });
});

// Clear memory
function clearVar(name = "") {
  firstNum += secondNum + " " + name + " ";
  firstDisplayEvent.innerText = firstNum;
  secondDisplayEvent.innerText = "";
  secondNum = "";
  tempResultEvent.innerText = result;
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(secondNum);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(secondNum);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(secondNum);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(secondNum);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(secondNum );
  }
}

equalOperatorEvent.addEventListener("click", (e) => {
  if (!secondNum || !firstNum) return;
  haveDot = false;
  mathOperation();
  clearVar();
  secondDisplayEvent.innerText = result;
  tempResultEvent.innerText = "";
  secondNum = result;
  firstNum = "";
});

clearAllResultEvent.addEventListener("click", (e) => {
  firstNum = "";
  secondNum = "";
  firstDisplayEvent.innerText = "0";
  secondDisplayEvent.innerText = "0";
  result = "";
  tempResultEvent.innerText = "0";
});

clearLastRsultEvent.addEventListener("click", (e) => {
  secondDisplayEvent.innerText = "";
  secondNum = "";
});

//clicking via keyboard
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperator(e.key);
  }
  //Click the * key on the keyboard as multiplication 
  else if (e.key === "*") {
    clickOperator("x");
   
  }
  //Click enter key on the keyboard
   else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
  
});
function clickButton(key) {
  numbersEvent.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperator(key) {
  calculationEvent.forEach((operator) => {
    if (operator.innerText === key) {
      operator.click();
    }
  });
}
function clickEqualButton() {
  equalOperatorEvent.click();
}
