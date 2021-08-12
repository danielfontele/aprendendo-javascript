function testLessThan(val) {
    if (val < 1) {
        return 'Under 1';
    }

    if (val < 10) {
        return 'Under 10';
    }

    return '10 or Over';
}

console.log(testLessThan(10))