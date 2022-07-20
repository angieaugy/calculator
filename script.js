const operators = {

    '+': (a, b) => (a + b),
    '-': (a, b) => (a - b),
    '*': (a, b) => (a * b),
    '/': (a, b) => (a / b)

}

function operate(operator, num1, num2) {

    return operators[operator](num1,num2)

}

console.log(operate('/',10,2))

