function testLessEqualsThan(val) {
    if (val <= 1) {
        return 'Small than or Equals to 100';
    }

    if (val <= 10) {
        return 'Small than or Equals to 10';
    }

    return 'More than 10';
}

console.log(testLessEqualsThan(10))