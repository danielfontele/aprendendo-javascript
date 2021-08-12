function printManyTimes(str) {
    "use strict";

    const SETENCE = str + " is cool!";

    // SETENCE = str + " is amazing!"; // Outputs Error if setence is const

    for (let i = 0; i < str.length; i += 2) {
        console.log(SETENCE);
    }
}

printManyTimes("freeCodeCamp");