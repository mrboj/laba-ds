const form = document.forms['calculator'];

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    setResult('');

    try {
        setResult(calculateAll());
    } catch (error) {
        alert(`Error!\n${error}`);
    }
}

function calculateAll() {
    const [ operation1, operation2, operation3 ] = getOperations();
    const [ a, b, c, d ] = getArguments();

    const bc = calculate(operation2, b, c);

    return (operation1 === '+' || operation1 === '-') && (operation3 === '*' || operation3 === '/')
        ? calculate(operation1, a, calculate(operation3, bc, d))
        : calculate(operation3, calculate(operation1, a, bc), d)
}

function getOperations() {
    return [ ...new Array(3) ]
        .map((item, index) => `input[name="operation${ index + 1 }"]:checked`)
        .map(selector => document.querySelector(selector).value);
}

function getArguments() {
    return [ ...new Array(4) ]
        .map((item, index) => `arg${ index + 1 }`)
        .map(name => form.elements[ name ].value)
        .map(arg => beautify(arg));
}

function setResult(result) {
    document.getElementById('result').innerText = out(result);
}

function beautify(val) {
    validate(val);
    return val
        .replace(',', '.')
        .replace(/\s/g, '');
}

function validate(val) {
    if (val.includes('e') || !/^-?(((\d{1,3})( \d{3})*)|(\d*))((\.|(,))\d*)?$/.test(val)) {
        throw new Error('Invalid Data');
    }
}

function calculate(operation, arg1, arg2) {
    const a = new Big(arg1);
    const b = new Big(arg2);

    switch (operation) {
        case '+': return sum(a, b);
        case '-': return diff(a, b);
        case '*': return mul(a, b);
        case '/': return div(a, b);
    }
}

function sum(x, y) {
    return x.plus(y).round(6).toPrecision();
}

function diff(x, y) {
    return x.minus(y).round(6).toPrecision();
}

function mul(x, y) {
    return x.mul(y).round(6).toPrecision();
}

function div(x, y) {
    return x.div(y).round(6).toPrecision();
}

function out(val) {
    const parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}
