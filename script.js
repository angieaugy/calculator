// ---------- CONSTANTS & VARIABLES ---------- //

let num1 = ''
let num2 = ''
let storedOperator = ''

const display = document.querySelector('.display')

const clearButton = document.querySelector('.clear')
const numberButtons = document.getElementsByClassName('number')
const operatorButtons = document.getElementsByClassName('operator')
const equalButton = document.querySelector('.equal')
const numberButton = Array.from(numberButtons)
const operatorButton = Array.from(operatorButtons)

const operators = {

    '+': (a, b) => (a + b),
    '-': (a, b) => (a - b),
    '*': (a, b) => (a * b),
    '/': (a, b) => (a / b)

}




// ----------------- EVENT LISTENERS ----------------- //

clearButton.addEventListener('click', clearDisplay)
numberButton.forEach(button => button.addEventListener('click', updateValue))
operatorButton.forEach(button => button.addEventListener('click', updateOperator))
equalButton.addEventListener('click', solve)



// ------------------ LOGIC ----------------- //

function updateValue() {

    if(num1 === '' && this.textContent === '0') return

    num1 += this.textContent

    updateDisplay(num1)

    console.log(`Op >> ${storedOperator} // Num1 = ${num1} // Num2 = ${num2}`)

}

function updateOperator() {

    if (storedOperator && (num1 && num2)) solve();

    storedOperator = this.value

    if(num1 != '') {

        num2 = num1

        num1 = ''

    }

    console.log(`Op >> ${storedOperator} // Num1 = ${num1} // Num2 = ${num2}`)

}

function solve() {

    num2 = operate(storedOperator, +num2, +num1)
    
    num1 = ''
     
    updateDisplay(num2)

    console.log(`Op >> ${storedOperator} // Num1 = ${num1} // Num2 = ${num2}`)

}

function operate(operator, num2, num1) {

    return operators[operator](num2,num1)

}



// ------------------- UI ------------------- //

function updateDisplay(str) {

    display.textContent = str

}

function clearDisplay() {

    if (display.textContent === '') {

        num1 = ''
        num2 = ''
        storedOperator = ''

    } else {

        num1 = ''
        display.textContent = ''

    }

}

