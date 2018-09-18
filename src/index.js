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
        console.log(data.unknownPositions);
        console.log();
    }

    console.log(data.unknownPositions.length);

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

function startLoopToCompareTwo(data) {

    for (let i = 0; i < data.unknownPositions.length - 2; i++){
        for (let j = 1 + i; j < data.unknownPositions.length - 1; j++){
            for (let k = 1 + j; k < data.unknownPositions.length; k++){
                if (data.unknownPositions[i].i === data.unknownPositions[j].i && data.unknownPositions[j].i === data.unknownPositions[k].i) {
                    if (data.unknownPositions[i].values.sort().toString() === data.unknownPositions[j].values.sort().toString()
                        && data.unknownPositions[j].values.length === 2) {
                        data.unknownPositions[k].values = data.unknownPositions[k].values.filter(item => {
                            return data.unknownPositions[j].values.indexOf(item) === -1;
                        });
                        if (data.unknownPositions[k].values.length === 1) {
                            let elem = data.unknownPositions[k];
                            data.matrix[elem.i][elem.j] = elem.values[0];
                        }
                    }
                    if (data.unknownPositions[i].values.sort().toString() === data.unknownPositions[k].values.sort().toString()
                        && data.unknownPositions[k].values.length === 2) {
                        data.unknownPositions[j].values = data.unknownPositions[j].values.filter(item => {
                            return data.unknownPositions[k].values.indexOf(item) === -1;
                        });
                        if (data.unknownPositions[j].values.length === 1) {
                            let elem = data.unknownPositions[j];
                            data.matrix[elem.i][elem.j] = elem.values[0];
                        }
                    }
                    if (data.unknownPositions[k].values.sort().toString() === data.unknownPositions[j].values.sort().toString()
                        && data.unknownPositions[j].values.length === 2) {
                        data.unknownPositions[i].values = data.unknownPositions[i].values.filter(item => {
                            return data.unknownPositions[j].values.indexOf(item) === -1;
                        });
                        if (data.unknownPositions[i].values.length === 1) {
                            let elem = data.unknownPositions[i];
                            data.matrix[elem.i][elem.j] = elem.values[0];
                        }
                    }
                }
            }
        }
    }

    data.unknownPositions.sort((left, right) => left.j - right.j);

    for (let i = 0; i < data.unknownPositions.length - 2; i++){
        for (let j = 1 + i; j < data.unknownPositions.length - 1; j++){
            for (let k = 1 + j; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[i].j === data.unknownPositions[j].j && data.unknownPositions[j].j === data.unknownPositions[k].j) {

                    if (data.unknownPositions[i].values.sort().toString() === data.unknownPositions[j].values.sort().toString()
                        && data.unknownPositions[j].values.length === 2) {
                        data.unknownPositions[k].values = data.unknownPositions[k].values.filter(item => {
                            return data.unknownPositions[j].values.indexOf(item) === -1;
                        });
                        if (data.unknownPositions[k].values.length === 1) {
                            let elem = data.unknownPositions[k];
                            data.matrix[elem.i][elem.j] = elem.values[0];
                        }
                    }
                    if (data.unknownPositions[i].values.sort().toString() === data.unknownPositions[k].values.sort().toString()
                        && data.unknownPositions[k].values.length === 2) {
                        data.unknownPositions[j].values = data.unknownPositions[j].values.filter(item => {
                            return data.unknownPositions[k].values.indexOf(item) === -1;
                        });
                        if (data.unknownPositions[j].values.length === 1) {
                            let elem = data.unknownPositions[j];
                            data.matrix[elem.i][elem.j] = elem.values[0];
                        }
                    }
                    if (data.unknownPositions[k].values.sort().toString() === data.unknownPositions[j].values.sort().toString()
                        && data.unknownPositions[j].values.length === 2) {
                        data.unknownPositions[i].values = data.unknownPositions[i].values.filter(item => {
                            return data.unknownPositions[j].values.indexOf(item) === -1;
                        });
                        if (data.unknownPositions[i].values.length === 1) {
                            let elem = data.unknownPositions[i];
                            data.matrix[elem.i][elem.j] = elem.values[0];
                        }
                    }
                }
            }
        }

    }

    data.unknownPositions.sort((left, right) => left.i - right.i);

}

function startLoopToCompareThree(data) {

    /* First line */

    let positions = [];

    for (let i = 0 * 3; i < (0 + 1) * 3; i++) {
        for (let j = 0 * 3 ; j < (0 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j && data.unknownPositions[k].values.length < 4) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 1 = ', positions);
    console.log();

    if (positions.length >= 3) {
        
        for(let i = 0; i < positions.length - 2; i++) {
            for(let j = 1 + i; j < positions.length - 1; j++) {
                for(let k = 1 + j; k < positions.length; k++) {
                    
                    let numbers = positions[i].values.concat(positions[j].values);
                    numbers = numbers.concat(positions[k].values);
                    let uniqueNumbers= [...new Set(numbers)];

                    if (uniqueNumbers.length === 3) {

                        for (let n = 0 * 3; n < (0 + 1) * 3; n++) {
                            for (let m = 0 * 3; m < (0 + 1) * 3; m++) {
                                for (let b = 0; b < data.unknownPositions.length; b++) {
                                    if (data.unknownPositions[b].i === n && data.unknownPositions[b].j === m) {

                                        if (!(data.unknownPositions[b].i === positions[i].i && data.unknownPositions[b].j === positions[i].j)){
                                            if (!(data.unknownPositions[b].i === positions[j].i && data.unknownPositions[b].j === positions[j].j)) {
                                                if (!(data.unknownPositions[b].i === positions[k].i && data.unknownPositions[b].j === positions[k].j)) {

                                                    data.unknownPositions[b].values = data.unknownPositions[b].values.filter(item => {
                                                        return uniqueNumbers.indexOf(item) === -1;
                                                    });

                                                    if (data.unknownPositions[b].values.length === 1) {
                                                        let elem = data.unknownPositions[b];
                                                        data.matrix[elem.i][elem.j] = elem.values[0];
                                                    }

                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }

                    }
                    
                }
            }
        }
        
    }

    positions = [];

    for (let i = 0 * 3; i < (0 + 1) * 3; i++) {
        for (let j = 1 * 3 ; j < (1 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 2 = ', positions);
    console.log();

    positions = [];

    for (let i = 0 * 3; i < (0 + 1) * 3; i++) {
        for (let j = 2 * 3 ; j < (2 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 3 = ', positions);
    console.log();

    /* Second line */

    positions = [];

    for (let i = 1 * 3; i < (1 + 1) * 3; i++) {
        for (let j = 0 * 3 ; j < (0 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 4 = ', positions);
    console.log();

    positions = [];

    for (let i = 1 * 3; i < (1 + 1) * 3; i++) {
        for (let j = 1 * 3 ; j < (1 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 5 = ', positions);
    console.log();

    positions = [];

    for (let i = 1 * 3; i < (1 + 1) * 3; i++) {
        for (let j = 2 * 3 ; j < (2 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 6 = ', positions);
    console.log();

    if (positions.length >= 3) {

        for(let i = 0; i < positions.length - 2; i++) {
            for(let j = 1 + i; j < positions.length - 1; j++) {
                for(let k = 1 + j; k < positions.length; k++) {

                    let numbers = positions[i].values.concat(positions[j].values);
                    numbers = numbers.concat(positions[k].values);
                    let uniqueNumbers= [...new Set(numbers)];

                    if (uniqueNumbers.length === 3) {

                        for (let n = 1 * 3; n < (1 + 1) * 3; n++) {
                            for (let m = 2 * 3; m < (2 + 1) * 3; m++) {
                                for (let b = 0; b < data.unknownPositions.length; b++) {
                                    if (data.unknownPositions[b].i === n && data.unknownPositions[b].j === m) {

                                        if (!(data.unknownPositions[b].i === positions[i].i && data.unknownPositions[b].j === positions[i].j)){
                                            if (!(data.unknownPositions[b].i === positions[j].i && data.unknownPositions[b].j === positions[j].j)) {
                                                if (!(data.unknownPositions[b].i === positions[k].i && data.unknownPositions[b].j === positions[k].j)) {

                                                    data.unknownPositions[b].values = data.unknownPositions[b].values.filter(item => {
                                                        return uniqueNumbers.indexOf(item) === -1;
                                                    });

                                                    if (data.unknownPositions[b].values.length === 1) {
                                                        let elem = data.unknownPositions[b];
                                                        data.matrix[elem.i][elem.j] = elem.values[0];
                                                    }

                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }

                    }

                }
            }
        }

    }

    /* Third line */

    positions = [];

    for (let i = 2 * 3; i < (2 + 1) * 3; i++) {
        for (let j = 0 * 3 ; j < (0 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 7 = ', positions);
    console.log();

    positions = [];

    for (let i = 2 * 3; i < (2 + 1) * 3; i++) {
        for (let j = 1 * 3 ; j < (1 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 8 = ', positions);
    console.log();

    positions = [];

    for (let i = 2 * 3; i < (2 + 1) * 3; i++) {
        for (let j = 2 * 3 ; j < (2 + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log('Positions: 9 = ', positions);
    console.log();
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

console.log(solveSudoku(initial));

module.exports = solveSudoku;
