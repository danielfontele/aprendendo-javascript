let changed = 0;

function change(num) {
    return (num + 5) / 3;
}

changed = change(10);

let processed = 0;

function processArg(num) {
    return (num + 3) / 5;
}

processed = processArg(10)

console.log(changed);
console.log(processed);