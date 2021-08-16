function switchOf(val) {
    let answer = "";
    switch (val) {
        case "a":
            answer = "Apple";
            break;

        case "b":
            answer = "Bird";
            break;

        case "c":
            answer = "Cat";
            break;
        default:
            answer = "Stuff";
            break;
    }
    return answer;
}

console.log(switchOf("c"))