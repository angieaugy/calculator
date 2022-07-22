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

    num1 += this.textContent

    updateDisplay(num1)

    console.log(num1)

}

function updateOperator() {

    storedOperator = this.value

    num2 = num1

    num1 = ''

    console.log(storedOperator)

}

function solve() {

    num1 = operate(storedOperator, +num1, +num2)

    num2 = ''

    updateDisplay(num2)

    console.log(`Num1 = ${num1}`)
    console.log(`Num2 = ${num2}`)

}

function operate(operator, num1, num2) {

    return operators[operator](num1,num2)

}



// ------------------- UI ------------------- //

function updateDisplay(str) {

    display.textContent = str

}

function clearDisplay() {

    if (display.textContent === '') {

        num1 = ''

    } else {

        display.textContent = ''

    }

}




console.log(operate('/',10,2))

