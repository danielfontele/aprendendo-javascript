function checkSign(num) {

    return num > 0 ? "Postive" : num < 0 ? "Negative" : "ZER0"
}

console.log(checkSign(7));
console.log(checkSign(-32));
console.log(checkSign(0));