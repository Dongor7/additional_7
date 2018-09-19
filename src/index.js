function solveSudoku(matrix) {

    let data = {
        unknownValuesCount: 0,
        previousUnknownValuesCount: 0,
        matrix,
        isLoop: false,
        unknownPositions: [],
        result: [],
    };

    /* Solving sudoku without magic */
    do {
        findZeros(data);
    } while (data.unknownValuesCount > 0 && !data.isLoop);

    if(!data.isLoop)
        return matrix;

    findZeros(data, true);

    console.log(data.unknownPositions);
    console.log(data.unknownPositions.length);
    console.log();

    while(data.unknownPositions.length > 0) {
        //console.log(data.unknownPositions);
        //console.log();
        compareSets(data);
        console.log(data.unknownPositions);
        console.log();
        findZeros(data, true);

        if (data.previousUnknownPositionCount !== data.unknownPositions.length) {
            data.previousUnknownPositionCount = data.unknownPositions.length;
        } else {
            break;
        }
        console.log(data.unknownPositions.sort((a, b) => a.i - b.i));
        console.log();
    }

    /*if (data.unknownPositions.length === 15){ // 4
        data.matrix[0][6] = 1;
        data.matrix[2][6] = 9;
        data.matrix[5][6] = 7;
        data.matrix[6][2] = 7;
    }*/

    //findZeros(data, true);
    //console.log(data.unknownPositions);
    console.log(data.unknownPositions.length);
    //checkSudoku(data);

    return matrix;
}

function findZeros(data, isFinal) {

    data.unknownValuesCount = 0;

    if(isFinal)
        data.unknownPositions = [];

    for (let i = 0; i < data.matrix.length; i++) {
        for (let j = 0; j < data.matrix.length; j++) {

            if (data.matrix[i][j] === 0) {
                let hackedValue = hackValue(data.matrix, i, j);
                if (!(hackedValue instanceof Array)) {
                    data.matrix[i][j] = hackedValue;
                } else {
                    data.unknownValuesCount++;
                    data.matrix[i][j] = 0;
                    if(isFinal)
                        data.unknownPositions.push({ i, j, values: hackedValue});
                }
            }

        }
    }

    if (data.unknownValuesCount === 0)
        return;

    setIsLoop(data);

}

function hackValue(matrix, y, x) {

    let existsNumbers = [];

    for (let j = 0; j < matrix.length; j++) {

        if (!(matrix[y][j] instanceof Array))
            existsNumbers.push(matrix[y][j]);
        if (!(matrix[j][x] instanceof Array))
            existsNumbers.push(matrix[j][x]);
    }

    let YCell = ~~(y / 3);
    let XCell = ~~(x / 3);

    for (let i = YCell * 3; i < (YCell + 1) * 3; i++) {
        for (let j = XCell * 3 ; j < (XCell + 1) * 3; j++) {
            if (!(matrix[i][j] instanceof Array))
                existsNumbers.push(matrix[i][j]);
        }
    }

    let uniqueExistsNumbers = [...new Set(existsNumbers)];
    let baseNumberConsequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let filteredConsequence = baseNumberConsequence.filter(item => {
        return uniqueExistsNumbers.indexOf(item) === -1;
    });

    return filteredConsequence.length === 1 ? filteredConsequence[0] : filteredConsequence;

}

function compareSets(data) {

    require('./twoFilter.js')(data);
    require('./threeFilter.js')(data);

}

function setIsLoop(data) {
    if (data.previousUnknownValuesCount === data.unknownValuesCount) {
        data.isLoop = true;
    }
    else {
        data.previousUnknownValuesCount = data.unknownValuesCount;
        data.isLoop = false;
    }
}

function checkSudoku(data) {

    let lines = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    for (let i = 0; i < data.matrix.length; i++) {
        for (let j = 0; j < data.matrix.length; j++) {
            lines[i].push(data.matrix[i][j]);
            lines[9 + i].push(data.matrix[j][i]);
        }
    }

    let isSolved = true;

    lines.forEach(item => {
        let unique = [...new Set(item)];

        if (unique.length < 9)
            isSolved = false;
    });

    console.log('Solving checking');
    console.log(lines);
    console.log(isSolved);
    console.log();

    return isSolved;
}

const initial = [
    [0, 0, 0, 9, 3, 8, 0, 4, 0],
    [0, 0, 0, 7, 6, 0, 0, 0, 2],
    [7, 4, 0, 5, 0, 0, 0, 8, 0],
    [8, 0, 0, 6, 7, 5, 0, 1, 3],
    [0, 7, 0, 3, 0, 2, 8, 0, 0],
    [3, 2, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 6, 3, 2, 0],
    [0, 5, 0, 4, 0, 0, 0, 0, 0],
    [1, 0, 6, 2, 0, 0, 0, 5, 0]
];

console.log(solveSudoku(initial));

module.exports = solveSudoku;
