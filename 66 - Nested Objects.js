let myStorage = {
    "car": {
        "inside": {
            "glove box": "maps",
            "passenger seat": "crumbs"
        },
        "outside": {
            "trunk": "jack"
        }
    }
};

let gloverBoxContents = myStorage.car.inside["glove box"];
console.log(gloverBoxContents);