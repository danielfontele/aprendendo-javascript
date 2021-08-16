
// forEach
// for along array

[1, 2, 3].forEach(function (item, index) {
    console.log(item, index)    // Ouputs 1 0, 2 1, 3 2
});


// map
// Change each index

const three = [1, 2, 3];
const doubled = three.map(function (item) {
    return item * 2;    // Outputs [ 2, 4, 6 ]
});
console.log(doubled);

// filter
// if true keep, if false no keep

const ints = [1, 2, 3];
const evens = ints.filter(function (item) {
    return item % 2 === 0;  // output [ 2 ]
});
console.log(evens);


// reduce
// do something and pass the return value to the next iteration (result).

const sum = [1, 2, 3].reduce(function (result, item) {
    return result + item;   // Output 6
}, 0); // the 0 is the first result, if empty, the first result is the first item
console.log(sum);

// some
// One of the indexes has to be true to return true ( || )

const hasNegativeNumbers = [1, 2, 3, -1, 4].some(function (item) {
    return item < 0; // Output true
});
console.log(hasNegativeNumbers);


// every
// Every index has to be true to return true ( && )

const allPostiveNumbers = [1, 2, 3, -1, 4].every(function (item) {
    return item > 0; // Output false
});
console.log(allPostiveNumbers);

// find
// find a especific item in a array

const objects = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
const found = objects.find(function (item) {
    return item.id === 'b'; // Output { id: 'b' }
})
console.log(found);


// findIndex
// fin the index of a especific item in a array, if not found return -1

const objects2 = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
const found2 = objects.findIndex(function (item) {
    return item.id === 'b'; // Output 1
})
console.log(found2);


