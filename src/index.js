function solveSudoku(matrix) {

    let data = {
        unknownValuesCount: 1,
        matrix: matrix,
        maxCount: 10,
        currentCount: 0
    };

    do {
        Object.assign(data,findZeros(data.matrix));
        data.currentCount++;
    } while (data.unknownValuesCount > 0 && data.currentCount < data.maxCount);

    return matrix;
}

function findZeros(matrix) {

    let data = {
        unknownValuesCount: 0
    };

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {

            if (matrix[i][j] === 0) {
                let hackedValue = hackValue(matrix, i, j);
                if (hackedValue === 0)
                    data.unknownValuesCount++;
                matrix[i][j] = hackedValue;
            }

        }
    }

    console.log(data.unknownValuesCount);

    data.matrix = matrix;

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

    let filteredConsequence = baseNumberConsequence.filter(function(obj) {
        return uniqueExistsNumbers.indexOf(obj) === -1;
    });

    return filteredConsequence.length === 1 ? filteredConsequence[0] : 0;
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

console.log(solveSudoku(initial));;

module.exports = solveSudoku;
