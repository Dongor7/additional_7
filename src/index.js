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

    while(data.unknownPositions.length > 0) {
        //console.log(data.unknownPositions);
        //console.log();
        compareSets(data);
        //console.log(data.unknownPositions);
        //console.log();
        findZeros(data, true);
        //console.log(data.unknownPositions);
        //console.log();
    }

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

    startLoopToCompareTwo(data);
    startLoopToCompareThree(data);

}

function startLoopToCompareThree(data) {



}

function startLoopToCompareTwo(data) {
    for (let i = 0; i < data.unknownPositions.length - 2; i++){

        if (data.unknownPositions[i].i === data.unknownPositions[i + 1].i && data.unknownPositions[i + 1].i === data.unknownPositions[i + 2].i) {
            if (data.unknownPositions[i].values.sort().toString() === data.unknownPositions[i + 1].values.sort().toString()
                && data.unknownPositions[i + 1].values.length === 2) {
                data.unknownPositions[i + 2].values = data.unknownPositions[i + 2].values.filter(item => {
                    return data.unknownPositions[i + 1].values.indexOf(item) === -1;
                });
                if (data.unknownPositions[i + 2].values.length === 1) {
                    let elem = data.unknownPositions[i + 2];
                    data.matrix[elem.i][elem.j] = elem.values[0];
                }
            }
            if (data.unknownPositions[i].values.sort().toString() === data.unknownPositions[i + 2].values.sort().toString()
                && data.unknownPositions[i + 2].values.length === 2) {
                data.unknownPositions[i + 1].values = data.unknownPositions[i + 1].values.filter(item => {
                    return data.unknownPositions[i + 2].values.indexOf(item) === -1;
                });
                if (data.unknownPositions[i + 1].values.length === 1) {
                    let elem = data.unknownPositions[i + 1];
                    data.matrix[elem.i][elem.j] = elem.values[0];
                }
            }
            if (data.unknownPositions[i + 2].values.sort().toString() === data.unknownPositions[i + 1].values.sort().toString()
                && data.unknownPositions[i + 1].values.length === 2) {
                data.unknownPositions[i].values = data.unknownPositions[i].values.filter(item => {
                    return data.unknownPositions[i + 1].values.indexOf(item) === -1;
                });
                if (data.unknownPositions[i].values.length === 1) {
                    let elem = data.unknownPositions[i];
                    data.matrix[elem.i][elem.j] = elem.values[0];
                }
            }
        }

    }

    data.unknownPositions.sort((left, right) => left.j - right.j);

    for (let i = 0; i < data.unknownPositions.length - 2; i++){

        if (data.unknownPositions[i].j === data.unknownPositions[i + 1].j && data.unknownPositions[i + 1].j === data.unknownPositions[i + 2].j) {
            if(data.unknownPositions[i].values.sort().toString() === data.unknownPositions[i + 1].values.sort().toString()
                && data.unknownPositions[i + 1].values.length === 2) {
                data.unknownPositions[i + 2].values = data.unknownPositions[i + 2].values.filter(item => {
                    return data.unknownPositions[i + 1].values.indexOf(item) === -1;
                });
                if (data.unknownPositions[i + 2].values.length === 1) {
                    let elem = data.unknownPositions[i + 2];
                    data.matrix[elem.i][elem.j] = elem.values[0];
                }
            }
            if(data.unknownPositions[i].values.sort().toString() === data.unknownPositions[i + 2].values.sort().toString()
                && data.unknownPositions[i + 2].values.length === 2) {
                data.unknownPositions[i + 1].values = data.unknownPositions[i + 1].values.filter(item => {
                    return data.unknownPositions[i + 2].values.indexOf(item) === -1;
                });
                if (data.unknownPositions[i + 1].values.length === 1) {
                    let elem = data.unknownPositions[i + 1];
                    data.matrix[elem.i][elem.j] = elem.values[0];
                }
            }
            if(data.unknownPositions[i + 2].values.sort().toString() === data.unknownPositions[i + 1].values.sort().toString()
                && data.unknownPositions[i + 1].values.length === 2) {
                data.unknownPositions[i].values = data.unknownPositions[i].values.filter(item => {
                    return data.unknownPositions[i + 1].values.indexOf(item) === -1;
                });
                if (data.unknownPositions[i].values.length === 1) {
                    let elem = data.unknownPositions[i];
                    data.matrix[elem.i][elem.j] = elem.values[0];
                }
            }
        }

    }

    data.unknownPositions.sort((left, right) => left.i - right.i);
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
    [0, 5, 0, 0, 7, 0, 0, 0, 1],
    [8, 7, 6, 0, 2, 1, 9, 0, 3],
    [0, 0, 0, 0, 3, 5, 0, 0, 0],
    [0, 0, 0, 0, 4, 3, 6, 1, 0],
    [0, 4, 0, 0, 0, 9, 0, 0, 2],
    [0, 1, 2, 0, 5, 0, 0, 0, 4],
    [0, 8, 9, 0, 6, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 0, 0, 0],
    [1, 6, 7, 0, 0, 2, 5, 4, 0]
];

//console.log(solveSudoku(initial));

module.exports = solveSudoku;
