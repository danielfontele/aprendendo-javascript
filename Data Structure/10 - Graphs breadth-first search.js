function bfs(graph, root) {
    let nodesLen = {};

    for (let i = 0; i < graph.length; i++) {
        nodesLen[i] = Infinity;
    }
    nodesLen[root] = 0;

    let queue = [root];
    let current;

    while (queue.length != 0) {
        current = queue.shift();

        let curConnected = graph[current];
        let neighbotIdx = [];
        let idx = curConnected.indexOf(1);
        while (idx != -1) {
            neighbotIdx.push(idx);
            idx = curConnected.indexOf(1, idx + 1);
        }

        for (let j = 0; j < neighbotIdx.length; j++) {
            if (nodesLen[neighbotIdx[j]] == Infinity) {
                nodesLen[neighbotIdx[j]] = nodesLen[current] + 1;
                queue.push(neighbotIdx[j]);
            }
        }
    }
    return nodesLen;
};

let exBFSGraph = [
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
];
console.log(bfs(exBFSGraph, 1));