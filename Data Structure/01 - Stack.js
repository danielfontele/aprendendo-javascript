// functions: push, pop, peek, length

let letters = [];
let word = "racecar";
let rword = "";

// put letters of word into stack
for (let i = 0; i < word.length; i++) {
    letters.push(word[i]);
}
console.log(letters);

// pop off the stack in reverse order
for (let i = 0; i < word.length; i++) {
    rword += letters.pop();
}
console.log(rword);

if (rword === word) {
    console.log(word + " is a polindrome.");
} else {
    console.log(word + " is not a polindrome.");
}

console.log("\n\n=======================\n")

//***************************************//
// Stack  without the pre-made functions //
//***************************************//
let Stack = function () {
    this.count = 0;
    this.storage = {};;

    this.push = function (value) {
        this.storage[this.count] = value;
        this.count++;
    }

    this.pop = function () {
        if (this.count === 0) {
            return undefined;
        }

        this.count--;
        let result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }

    this.size = function () {
        return this.count;
    }

    this.peek = function () {
        return this.storage[this.count - 1]
    }
}

let myStack = new Stack();

myStack.push(1);    // [1]
myStack.push(2);    // [1, 2]
console.log(myStack.peek());    // Output 2
console.log(myStack.pop());     // Output 2 and remove it // Array is now [1]
console.log(myStack.peek());    // Output 1
myStack.push("freeCodeComp");   // [1, 'freeCodeCamp']
console.log(myStack.size());    // Output 2
console.log(myStack.peek());    // Output freeCodeCamp
console.log(myStack.pop());     // Output freeCodeCamp and remove it // Array is now [1]
console.log(myStack.peek());    // Output 1