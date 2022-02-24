function Queue() {
    collection = [];
    this.print = function () {
        console.log(collection);
    };
    this.enqueue = function (element) {
        collection.push(element);
    };
    this.dequeue = function () {
        return collection.shift();
    };
    this.front = function () {
        return collection[0];
    };
    this.size = function () {
        return collection.length;
    };
    this.isEmpty = function () {
        return (collection.length === 0);
    };
}

let q = new Queue();
q.enqueue('a'); // ['a']
q.enqueue('b'); // ['a', 'b']
q.enqueue('c'); // ['a', 'b', 'c']
q.print();      // Output ['a', 'b', 'c']
q.dequeue();    // ['b', 'c']
console.log(q.front());      // Output b
q.print();      // Output ['b', 'c']


console.log('\n\n======================================\n')


//*************************//
//***** Priority Queue*****//
//*************************//

function PriorityQueue() {
    let collection = [];
    this.printCollection = function () {
        (console.log(collection));
    };
    this.enqueue = function (element) {
        if (this.isEmpty()) {
            collection.push(element);
        } else {
            let added = false;
            for (let i = 0; i < collection.length; i++) {
                if (element[1] < collection[i][1]) {
                    collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                collection.push(element);
            }
        }
    };
    this.dequeue = function () {
        let value = collection.shift();
        return value[0];
    };
    this.front = function () {
        return collection[0];
    };
    this.size = function () {
        return collection.length;
    };
    this.isEmpty = function () {
        return (collection.length === 0);
    };
}

let pq = new PriorityQueue();
pq.enqueue(['Beau Carnes', 2]);         // [ ['Beau Carnes', 2] ]
pq.enqueue(['Quincy Larson', 3]);       // [ ['Beau Carnes', 2], ['Quincy Larson', 3] ]
pq.enqueue(['Ewa Mitulska-Wójcik', 1]); // [ ['Ewa Mitulska-Wójcik', 1], ['Beau Carnes', 2], ['Quincy Larson', 3] ]
pq.enqueue(['Anderson Hamill', 2]);     // [ ['Ewa Mitulska-Wójcik', 1], ['Beau Carnes', 2], ['Anderson Hamill', 2], ['Quincy Larson', 3] ]
pq.printCollection();                   // Output [ ['Ewa Mitulska-Wójcik', 1], ['Beau Carnes', 2], ['Anderson Hamill', 2], ['Quincy Larson', 3] ]
console.log(pq.dequeue());              // Output Ewa Mitulska-Wójcik
console.log(pq.front());                // Output ['Beau Carnes', 2]
pq.printCollection();                   // Output [ ['Beau Carnes', 2], ['Anderson Hamill', 2], ['Quincy Larson', 3] ]