function phoneticLookup(val) {
    let result = ""

    var lookup = {
        "alpha": "Adams",
        "bravo": "Boston",
        "charlie": "Chicago",
        "delta": "Denver",
        "echo": "Easy",
        "foxtrot": "Frank"
    };

    result = lookup[val];

    // switch (val) {
    //     case "alpha":
    //         result: "Adams";
    //         break;
    //     case "bravo":
    //         result: "Boston";
    //         break;
    //     case "charlie":
    //         result: "Chicago";
    //         break;
    //     case "delta":
    //         result: "Denver";
    //         break;
    //     case "echo":
    //         result: "Easy";
    //         break;
    //     case "foxtrot":
    //         result: "Frank";
    //         break;
    // }

    return result;
}

console.log(phoneticLookup("foxtrot"))