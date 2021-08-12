var collection = {
    "2548": {
        "album": "Slippery When Wet",
        "artist": "Bon Jovi",
        "tracks": [
            "Let It Rock",
            "You Give Love a Bad Name"
        ]
    },
    "2468": {
        "album": "1999",
        "artist": "Prince",
        "tracks": [
            "1999",
            "Little Red Corvette"
        ]
    },
    "1245": {
        "artist": "Robert Palmer",
        "tracks": []
    },
    "5439": {
        "album": "ABBA Gold"
    },
};

let collectionCopy = JSON.parse(JSON.stringify(collection));

function updateRecords(id, props, value) {

    if (value == "") {
        delete collection[id][props];
    } else if (props === "tracks") {
        collection[id][props] = collection[id][props] || [];
        collection[id][props].push(value);
    } else {
        collection[id][props] = value;
    }

    return collection;
}

console.log(updateRecords("1245", "tracks", "Mr. Been"))