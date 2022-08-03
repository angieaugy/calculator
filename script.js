// ---------- CONSTANTS & VARIABLES ---------- //

let num1 = ''
let num2 = ''
let inputString = ''
let storedOperator = ''
let resetToggle = false

const display = document.querySelector('.display')

const clearButton = document.querySelector('.clear')
const numberButtons = document.getElementsByClassName('number')
const decimalButton = document.querySelector('.decimal')
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
decimalButton.addEventListener('click', updateInputString)
numberButton.forEach(button => button.addEventListener('click', updateInputString))
operatorButton.forEach(button => button.addEventListener('click', updateOperator))
equalButton.addEventListener('click', solve)



// ------------------ LOGIC ----------------- //

function updateValue() {

    // in the event of = then operator
    if(resetToggle == true && inputString == '') {

        num2 = ''

    // in the event of = then operand
    } else if(resetToggle == true && inputString !=='') {

        num1 = ''
        num2 = ''
        storedOperator = ''
        
    } else if(inputString == '') return

    !storedOperator ? num1 = +inputString : num2 = +inputString

    inputString = ''

}

function updateOperator() {

    if(inputString !== '') {

        updateValue()

        if(storedOperator && (num1 !== '' && num2 !== '')) solve()

    }

    resetToggle = false

    storedOperator = this.value

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}`)

}

function solve() {

    // update value only when there is user input
    if(inputString !== '') updateValue()

    // no dividing by zero!
    if(storedOperator === '/' && num2 == 0) {

        num1 = NaN
        num2 = ''

        updateDisplay('Error')

        return

    }

    if(storedOperator && (num1 !== '' && num2 !== '')) {

        num1 = operate(storedOperator, num1, num2)

        if(isNaN(num1)) {

            updateDisplay('Error')

        } else {

            updateDisplay(num1)

        }
    
    }

    // toggle reset if entering numbers after =
    if(this.value == '=') resetToggle = true

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}`)

}

function operate(operator, num1, num2) {

    return operators[operator](num1,num2)

}



// ------------------- UI ------------------- //


function updateInputString() {

    // 0 display
    if(inputString == '0') {

        // prevent repeated 0s
        if(this.textContent == '0') {

            return 

        // remove 0 before appending numbers
        } else {

            inputString = ''

        }

        updateDisplay(inputString)

    }

    // decimal display
    if(this.textContent == '.') {

        // add 0 before appending decimal point
        if(inputString == '') {

            inputString = '0'

        // prevent repeated decimal points
        } else {

            const array1 = inputString.split('')
            const found = array1.some(element => element == '.')
            
            if(found) return
        }

    }

    inputString += this.textContent

    updateDisplay(inputString)

}


function updateDisplay(str) {

    display.textContent = str

}

function clear() {

    if (display.textContent === '') {

        num1 = ''
        num2 = ''
        storedOperator = ''
        inputString = ''
        resetToggle = false

    } else {

        inputString = ''

    }

    updateDisplay(inputString)

}

