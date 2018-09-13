function solveSudoku(matrix) {

    let data = {
        unknownValuesCount: 0,
        previousUnknownValuesCount: 0,
        matrix,
        pseudoMatrix: [],
        maxCount: 10,
        currentCount: 0,
        isLoop: false,
    };

    /*for (let i = 0; i < matrix.length; i++) {
        data.pseudoMatrix[i] = new Array(9);
        for (let j = 0; j < matrix.length; j++) {
            data.pseudoMatrix[i][j] = 0;
        }
    }*/

    do {
        Object.assign(data,findZeros(data));
        data.currentCount++;

    } while (data.unknownValuesCount > 0 && data.currentCount < 10);


    console.log(data.pseudoMatrix);

    return matrix;
}

function findZeros(data) {

    data.unknownValuesCount = 0;

    for (let i = 0; i < data.matrix.length; i++) {
        for (let j = 0; j < data.matrix.length; j++) {

            if (data.isLoop) {
                data.pseudoMatrix[i][j] = hackMagicValue(data, i, j);
                data.unknownValuesCount++;
            }

            if (data.matrix[i][j] === 0) {
                let hackedValue = hackValue(data.matrix, i, j);
                if (hackedValue instanceof Array) {
                    data.unknownValuesCount++;
                    data.matrix[i][j] = 0;
                    //data.pseudoMatrix[i][j] = hackedValue;
                } else {
                    data.matrix[i][j] = hackedValue;
                }

            }

        }
    }

    console.log(data.unknownValuesCount);

    setIsLoop(data);

    return data;
}

function hackValue(matrix, y, x) {

    let existsNumbers = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            existsNumbers.push(matrix[y][j]);
            existsNumbers.push(matrix[j][x]);
        }
        break;
    }

    let YCell = ~~(y / 3);
    let XCell = ~~(x / 3);

    for (let i = YCell * 3; i < (YCell + 1) * 3; i++) {
        for (let j = XCell * 3 ; j < (XCell + 1) * 3; j++) {
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

function hackMagicValue(data, y, x) {

    for (let i = 0; i < data.pseudoMatrix.length; i++) {
        for (let j = 0; j < data.pseudoMatrix.length; j++) {
            /*if (data.pseudoMatrix[i][j] !== 0) {
                data.pseudoMatrix[i][j] = data.pseudoMatrix[i][j];
            }*/

            //data.pseudoMatrix[y][x] = data.pseudoMatrix[y][x]
        }
    }

    return data.pseudoMatrix[y][x];

}

function setIsLoop(data) {
    if (data.previousUnknownValuesCount === data.unknownValuesCount) {
        data.isLoop = true;
        initializeWithMagicValues(data);
    }
    else {
        data.previousUnknownValuesCount = data.unknownValuesCount;
        data.isLoop = false;
    }
}

function initializeWithMagicValues(data) {

    data.pseudoMatrix = data.matrix.slice();

    for (let i = 0; i < data.matrix.length; i++) {
        data.pseudoMatrix[i] = data.matrix[i].slice();
        for (let j = 0; j < data.matrix.length; j++) {
            data.pseudoMatrix[i][j] = data.matrix[i][j];
        }
    }

    for (let i = 0; i < data.pseudoMatrix.length; i++) {
        for (let j = 0; j < data.pseudoMatrix.length; j++) {

            if (data.pseudoMatrix[i][j] === 0) {
                data.pseudoMatrix[i][j] = hackValue(data.pseudoMatrix, i, j);
            }

        }
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
