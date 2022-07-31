// ---------- CONSTANTS & VARIABLES ---------- //

let num1 = 0
let num2 = 0
let inputString = '0'
let storedOperator = ''
let resetToggle = false

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

function updateValue() {

    if(resetToggle == true) {

        storedOperator = ''
        num2 = 0
        resetToggle = false

    }

    !storedOperator ? num1 = +inputString : num2 = +inputString

    inputString = '0'

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}`)

}

function updateOperator() {

    // in the event of = then operand
    if(resetToggle == true) {

        num2 = 0
        resetToggle = false

    }


    if(storedOperator === this.value && (num1 === 0 && num2 === 0)) {

        resetToggle = true

        clear()

        return
        
    }

    updateValue()


    if(storedOperator) solve()

    storedOperator = this.value

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}`)

}

function solve() {

    // no dividing by zero!
    if(storedOperator === '/' && num2 === 0) {

        resetToggle = true
        num1 = 'NaN'

        updateDisplay('NaN')

        return

    }
    

    // update value only when there is user input
    if(inputString !== '0') updateValue()

    if(storedOperator) {

        num1 = operate(storedOperator, num1, num2)
    
        updateDisplay(num1)

    }

    // clear operands if entering numbers after =
    if(this.value == '=') resetToggle = true

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}`)

}

function operate(operator, num1, num2) {

    return operators[operator](num1,num2)

}



// ------------------- UI ------------------- //


function updateInputString() {

    // do not repeat zeroes
    if(inputString === '0' && this.textContent === '0') return

    // remove 0 prefix before appending digits
    if(inputString === '0' && this.textContent !== '0') {

        inputString = ''

    }

    inputString += this.textContent

    updateDisplay(inputString)

}


function updateDisplay(str) {

    display.textContent = str

}

function clear() {

    if (display.textContent === '0' || resetToggle) {

        num1 = 0
        num2 = 0
        storedOperator = ''
        inputString = '0'
        resetToggle = false

    } else {

        inputString = '0'

    }

    updateDisplay(inputString)

}

updateDisplay(inputString)

