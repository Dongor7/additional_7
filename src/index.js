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

    console.log(matrix);
    console.log();

    findZeros(data, true);

    console.log(data.unknownPositions);
    console.log();

    data.deep = 0;

    addArrayLevel(data);

    return matrix;
}

function addArrayLevel(data) {

    let element = data.unknownPositions[data.deep];

    data.deep++;

    for (let i = 0; i < element.values.length; i++) {

        if (checkSudoku(data)) {
            return
        }

        data.matrix[element.i][element.j] = element.values[i];

        if (data.deep < data.unknownPositions.length) {
            addArrayLevel(data);
            data.deep--;
        } else {
            return;
        }
    }



}

function findZeros(data, isFinal) {

    data.unknownValuesCount = 0;

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

function hackValue(matrix, y, x) {

    let existsNumbers = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {

            if (!(matrix[y][j] instanceof Array))
                existsNumbers.push(matrix[y][j]);
            if (!(matrix[j][x] instanceof Array))
                existsNumbers.push(matrix[j][x]);
        }
        break;
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

function setIsLoop(data) {
    if (data.previousUnknownValuesCount === data.unknownValuesCount) {
        data.isLoop = true;
    }
    else {
        data.previousUnknownValuesCount = data.unknownValuesCount;
        data.isLoop = false;
    }
}

const initial = [
    [6, 5, 0, 7, 3, 0, 0, 8, 0],
    [0, 0, 0, 4, 8, 0, 5, 3, 0],
    [8, 4, 0, 9, 2, 5, 0, 0, 0],
    [0, 9, 0, 8, 0, 0, 0, 0, 0],
    [5, 3, 0, 2, 0, 9, 6, 0, 0],
    [0, 0, 6, 0, 0, 0, 8, 0, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 6],
    [0, 0, 7, 0, 0, 0, 0, 5, 0],
    [1, 6, 5, 3, 9, 0, 4, 7, 0]
];

console.log(solveSudoku(initial));

module.exports = solveSudoku;
