function checkScope() {
    "use strict";
    let i = "function scope";
    // var i = "function scope";
    if (true) {
        let i = "block scope";
        // var i = "block scope";
        // i = "block scope";
        console.log("Block Scope i is: " + i)
    }
    console.log("Function Scope i is: " + i)
    return i;
}

console.log("i is: " + checkScope());