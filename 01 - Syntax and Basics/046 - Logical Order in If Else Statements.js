function orderMyLogic(val) {
    if (val < 5) {
        return "Smaller than 5";
    } else if (val < 10) {
        return "Greater than 10";
    } else {
        return "Between 5 and 10";
    }
}

console.log(orderMyLogic(3));