const form = document.forms['calculator'];
const firstArgInput = form.elements['first-arg'];
const secondArgInput = form.elements['second-arg'];

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();

    setResult('');

    try {
        setResult(calculate());
    } catch (error) {
        alert(`Error!\n${error}`);
    }
}

function calculate() {
    const operationInput = document.querySelector('input[name="operation"]:checked');
    const [ a, b ] = [ firstArgInput, secondArgInput ]
        .map(input => input.value)
        .map(arg => beautify(arg))
        .map(arg => new Big(arg))

    switch (operationInput.value) {
        case '+': return sum(a, b);
        case '-': return diff(a, b);
        case '*': return mul(a, b);
        case '/': return div(a, b);
    }
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
    if (val.includes('e') || !/^(((\d{1,3})( \d{3})*)|(\d*))(\.\d*)?$/.test(val)) {
        throw new Error('Invalid Data');
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
