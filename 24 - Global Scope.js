let myGlobalLet = 10;
var myGlobalVar = 20;

function fun1() {
    myFunctionVar = 30;
    var myFunctionVar2 = 40;
}

function fun2() {
    let output = "";
    if (typeof myGlobalLet != "undefined") {
        output += "myGlobalLet: " + myGlobalLet;
    }
    if (typeof myGlobalVar != "undefined") {
        output += " myGlobalVar: " + myGlobalVar
    }
    if (typeof myFunctionVar != "undefined") {
        output += " myFunctionVar: " + myFunctionVar
    }
    if (typeof myFunctionVar2 != "undefined") {
        output += " myFunctionVar2: " + myFunctionVar2
    }
    console.log(output);
}

fun1();
fun2();