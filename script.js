// ---------- CONSTANTS & VARIABLES ---------- //

let num1 = ''
let num2 = ''
let inputString = ''
let storedOperator = ''
let resetToggle = false

const display = document.querySelector('.display')

const clearButtons = document.getElementsByClassName('clear')
const numberButtons = document.getElementsByClassName('number')
const decimalButton = document.querySelector('.decimal')
const plusminusButton = document.querySelector('.plusminus')
const operatorButtons = document.getElementsByClassName('operator')
const equalButton = document.querySelector('.equal')
const clearButton = Array.from(clearButtons)
const numberButton = Array.from(numberButtons)
const operatorButton = Array.from(operatorButtons)

const operators = {

    '+': (a, b) => (a + b),
    '-': (a, b) => (a - b),
    '*': (a, b) => (a * b),
    '/': (a, b) => (a / b)

}




// ----------------- EVENT LISTENERS ----------------- //

equalButton.addEventListener('click', solve)
decimalButton.addEventListener('click', updateInputString)
plusminusButton.addEventListener('click',togglePlusMinus)
clearButton.forEach(button => button.addEventListener('click', clear))
numberButton.forEach(button => button.addEventListener('click', updateInputString))
operatorButton.forEach(button => button.addEventListener('click', updateOperator))




// ------------------ LOGIC ----------------- //

function updateValue() {

    if(inputString !== '') {

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

}

function updateOperator() {

    toggleOperatorButtonState(this)

    // prevent calculations when pressing operator repeatedly
    if(inputString !== '') {

        // updating values always resets inputString to '' so we need to put it in here for solve() to initiate
        updateValue()

        if(storedOperator && (num1 !== '' && num2 !== '')) solve()

    }

    resetToggle = false

    storedOperator = this.value

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}`)

}

function solve() {

    if(this.value == '=') toggleOperatorButtonState(this) ;
    
    updateValue()

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

function togglePlusMinus() {

    if(num1 != '' && num2 != '') {

        if(inputString == '') {

            if(num1 < 0) {

                num1 = num1.toString()

                num1 = +(num1.slice(1))

                return updateDisplay(num1)

            }

            num1 = +('-' + num1)
    
            updateDisplay(num1)

        }

    } else {

        if(inputString != '') {

            const array = inputString.split('')
            const found = array.some(element => element == '-')
            
            if(found) {

                if(inputString == '-') {

                    inputString = ''
        
                } else {

                    inputString = inputString.slice(1)

                }

                return updateDisplay(inputString)

            }

        }

        inputString = '-' + inputString

        updateDisplay(inputString)

    }
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

    }

    // decimal display
    if(this.value == 'decimal') {

        // add 0 before appending decimal point
        if(inputString == '') {

            inputString = '0'

        // prevent repeated decimal points
        } else {

            const array = inputString.split('')
            const found = array.some(element => element == '.')
            
            if(found) return
        }

    }

    inputString += this.textContent

    updateDisplay(inputString)

}


function updateDisplay(str) {

    if(typeof str == 'number' && str > 99999999999999) {

        display.textContent = 'Error'

    } else {

        let string = str.toString();
    
        display.textContent = string.substring(0,11)
    
    }

}

function toggleOperatorButtonState(val) {

    operatorButton.forEach(button => button.classList.remove('active'))

    if(val.classList.contains('operator')) {

        val.classList.add('active')

    } 
}



function clear() {

    if(this.value == 'all-clear') {

        toggleOperatorButtonState(this)
        num1 = ''
        num2 = ''
        storedOperator = ''
        inputString = ''
        resetToggle = false

    } else if (this.value == 'clear') {

        inputString = ''

    }

    updateDisplay(inputString)

}
