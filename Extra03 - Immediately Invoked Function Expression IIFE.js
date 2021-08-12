// It will be invokes one time when run command,
//and can be called later too.
(function () {
    console.log("My favorite number is 3");
})();


(favNumber = function (num = 3) {
    console.log("My favorite number is " + num);
})();

favNumber(7);


var a = 2;
(function () {
    var a = 3; // Local variable
    console.log(a);
})();

console.log(a);
