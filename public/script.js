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

    return operationInput.value === '+'
        ? sum(a, b)
        : diff(a, b);
}

function setResult(result) {
    document.getElementById('result').innerText = result;
}

function beautify(val) {
    validate(val);
    return val.replace(',', '.');
}

function validate(val) {
    if (val.includes('e')) {
        throw new Error('Invalid Data');
    }
}

function sum(x, y) {
    return x.plus(y).toPrecision();
}

function diff(x, y) {
    return x.minus(y).toPrecision();
}
