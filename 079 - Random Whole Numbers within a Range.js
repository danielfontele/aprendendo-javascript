function ourRandomRange(ourMin, ourMax) {

    return Math.floor(Math.random() * (ourMax - ourMin) + 1) + ourMin;
}

console.log(ourRandomRange(1, 9));

function randomRange(min, max) {

    return Math.floor(Math.random() * (max - min) + 1) + min;
}

let myRandom = randomRange(5, 10);

console.log(myRandom);