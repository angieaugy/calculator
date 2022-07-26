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

document.addEventListener('keydown', (event) => {

    let name = event.key;

    switch(true) {

        case(name >= 0 && name <= 9):

            updateInputString(+name);
            break;

        case(name == '.'):

            updateInputString(name);
            break;

        case(name =='+'):
        case(name =='-'):
        case(name =='/'):
        case(name =='*'):

            updateOperator(name);
            break;

        case(name == 'Enter'):
        case(name == '='):

            name = '='

            solve(name);
            break;

        case(name == 'Delete'):
        case(name == 'Backspace'):

            clear(name);
            break;
    }

    

})




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

function updateOperator(val) {

    let input

    if(val.type == 'click') {

        input = this.value

    } else {

        input = val

    }

    toggleOperatorButtonState(input)

    // prevent calculations when pressing operator repeatedly
    if(inputString !== '') {

        // updating values always resets inputString to '' so we need to put it in here for solve() to initiate
        updateValue()

        if(storedOperator && (num1 !== '' && num2 !== '')) solve()

    }

    resetToggle = false

    storedOperator = input

    console.log(`Op >> ${storedOperator} // ${num1}, ${num2}`)

}

function solve(val) {

    let input

    if(val) {

        if(val.type == 'click') {

            input = this.value
    
        } else {
    
            input = val
    
        }

    }

    if(input == '=') toggleOperatorButtonState(input) ;
    
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
    if(input == '=') resetToggle = true

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


function updateInputString(val) {

    let input

    if(typeof val == 'number' || val == '.') {

        input = val;

    } else {

        input = this.textContent

    }

    // 0 display
    if(inputString == '0') {

        // prevent repeated 0s
        if(input == '0') {

            return 

        // remove 0 before appending numbers
        } else {

            inputString = ''

        }

    }

    // decimal display
    if(val == '.' || this.value == 'decimal') {

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

    inputString += input

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

    operatorButton.forEach(button => {
        
        if(button.value == val) button.classList.add('active')

    })

}



function clear(val) {

    let input

    if(val.type == 'click') {

        input = this.value

    } else {

        input = val

    }


    if(input == 'all-clear' || input == 'Delete') {

        toggleOperatorButtonState()
        num1 = ''
        num2 = ''
        storedOperator = ''
        inputString = ''
        resetToggle = false

    } else if (input == 'clear' || input == 'Backspace') {

        inputString = ''

    }

    updateDisplay(inputString)

}
