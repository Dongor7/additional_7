function solveSudoku(matrix) {

    let data = {
        unknownValuesCount: 0,
        previousUnknownValuesCount: 0,
        matrix,
        pseudoMatrixes: [],
        maxCount: 10,
        currentCount: 0,
        isLoop: false,
        isSolve: false,
    };

    /* Solving sudoku without magic */
    do {
        findZeros(data, data.matrix);
    } while (data.unknownValuesCount > 0 && !data.isLoop);

    if(!data.isLoop)
        return matrix;

    initializeWithMagicValues(data);

    console.log('Start solve pseudo matrixes');

    /* Solving sudoku with magic */
   /* do {
        data.previousUnknownValuesCount = 0;
        data.isLoop = false;
        hackPseudoMatrix(data);

        data.currentCount++
    } while (false  /!*data.currentCount < 10*!/);*/


    //console.log(data.pseudoMatrixes[0]);

    return matrix;
}

function findZeros(data, matrix) {

    data.unknownValuesCount = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {

            if (matrix[i][j] === 0) {
                let hackedValue = hackValue(matrix, i, j);
                if (hackedValue instanceof Array) {
                    data.unknownValuesCount++;
                    matrix[i][j] = 0;
                } else {
                    matrix[i][j] = hackedValue;
                }
            }

        }
    }

    console.log(data.unknownValuesCount);

    if (data.unknownValuesCount === 0)
        return;

    setIsLoop(data);

}

/*function findMagicZeros(data, matrix) {

    data.unknownValuesCount = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {

            if (matrix[i][j] instanceof Array) {

                let value = hackValue(matrix, i, j);

                matrix[i][j] = value;

                if (value instanceof Array)
                    data.unknownValuesCount++;

            }

        }
    }

    console.log(data.unknownValuesCount);

    initializeWithMagicValues(data);

    setIsLoop(data);

}

function hackPseudoMatrix(data){

    let lastPseudoMatrix = data.pseudoMatrixes[data.pseudoMatrixes.length - 1];

    let i = 0,
        j = 0,
        k = 0;

    hackMagicValue(data, lastPseudoMatrix, i, j, k);

    data.pseudoMatrixes.pop(); // удаляем последнюю версию матрицы

    if (j === lastPseudoMatrix.length && i === lastPseudoMatrix.length
        && data.unknownValuesCount > 0) {

        let countOfUnknownPositions = data.unknownPositions.length;

        while(countOfUnknownPositions > 0){



            lastPseudoMatrix = data.pseudoMatrixes[data.pseudoMatrixes.length - 1]; // получаем предпоследнюю версию матрицы

            hackMagicValue(data, lastPseudoMatrix, i, j, k);

            if (countOfUnknownPositions > 0) {
                data.pseudoMatrixes.pop();
            }

        }

    }

    console.log(data.pseudoMatrixes[0]);


    data.matrix = data.pseudoMatrixes[0];


}

function hackMagicValue(data, lastPseudoMatrix, i, j, k) {

    data.unknownPositions = [];

    for (i = 0; i < lastPseudoMatrix.length; i++) {
        for (j = 0; j < lastPseudoMatrix.length; j++) {
            for (k = 0; k < lastPseudoMatrix[i][j].length; k++) {

                data.unknownPositions.push({i, j});

                lastPseudoMatrix[i][j] = lastPseudoMatrix[i][j][k];

                findMagicZeros(data, lastPseudoMatrix);

            }

        }
    }

}*/

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

function initializeWithMagicValues(data) {

    let pseudoMatrix = data.matrix.slice();

    for (let i = 0; i < data.matrix.length; i++) {
        pseudoMatrix[i] = data.matrix[i].slice();
        for (let j = 0; j < data.matrix.length; j++) {
            pseudoMatrix[i][j] = data.matrix[i][j];
        }
    }

    for (let i = 0; i < pseudoMatrix.length; i++) {
        for (let j = 0; j < pseudoMatrix.length; j++) {

            if (pseudoMatrix[i][j] === 0) {
                pseudoMatrix[i][j] = hackValue(pseudoMatrix, i, j);
            }

        }
    }

    data.pseudoMatrixes.push(pseudoMatrix);
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
