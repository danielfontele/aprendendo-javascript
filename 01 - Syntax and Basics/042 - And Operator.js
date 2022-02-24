function testLogicalAnd(val) {
    if (val <= 50 && val >= 20) {
        return 'Yes';
    }

    return 'No';
}

console.log(testLogicalAnd(32))