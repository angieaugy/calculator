// ---------- CONSTANTS & VARIABLES ---------- //

let num1 = 0
let num2 = 0
let total = 0
let inputString = '0'
let storedOperator = ''
let opToggle = false

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

clearButton.addEventListener('click', clear)
numberButton.forEach(button => button.addEventListener('click', updateInputString))
operatorButton.forEach(button => button.addEventListener('click', updateOperator))
equalButton.addEventListener('click', solve)



// ------------------ LOGIC ----------------- //

function updateInputString() {

    opToggle = false

    // do not repeat zeroes
    if(inputString === '0' && this.textContent === '0') return

    // remove 0 prefix before appending digits
    if(inputString === '0' && this.textContent !== '0') {

        inputString = ''

    }

    inputString += this.textContent

    updateDisplay(inputString)

}

function updateValue() {

    !storedOperator ? num1 = inputString : num2 = inputString

    inputString = '0'

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}, ${total}`)

}

function updateOperator() {

    updateValue()

    if(storedOperator) solve()

    storedOperator = this.value

    opToggle = true

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}, ${total}`)

}

function solve() {

    // update value only when there is user input
    if(inputString !== '0') updateValue()

    total = operate(storedOperator, +num1, +num2)
    
    num1 = total
     
    updateDisplay(total)

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}, ${total}`)

}

function operate(operator, num1, num2) {

    return operators[operator](num1,num2)

}



// ------------------- UI ------------------- //

function updateDisplay(str) {

    display.textContent = str

}

function clear() {

    if (display.textContent === '0') {

        num1 = 0
        num2 = 0
        total = 0
        storedOperator = ''

    } else {

        inputString = '0'
        updateDisplay(inputString)

    }

}

updateDisplay(inputString)

