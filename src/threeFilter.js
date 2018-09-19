function startLoopToCompareThree(data) {

    filterByRows(data);
    filterByColumns(data);
    filterThreeBySections(data);

}

function filterByRows(data) {

    for (let i = 0; i < data.unknownPositions.length - 2; i++) {
        for (let j = 1 + i; j < data.unknownPositions.length - 1; j++) {
            for (let k = 1 + j; k < data.unknownPositions.length; k++) {

                if(data.unknownPositions[i].j === data.unknownPositions[j].j && data.unknownPositions[j].j === data.unknownPositions[k].j) {

                    if(data.unknownPositions[i].values.length < 4
                        && data.unknownPositions[j].values.length < 4
                        && data.unknownPositions[k].values.length < 4)
                    {
                        let numbers = data.unknownPositions[i].values.concat(data.unknownPositions[j].values);
                        numbers = numbers.concat(data.unknownPositions[k].values);
                        let uniqueNumbers= [...new Set(numbers)];

                        if (uniqueNumbers.length === 3) {

                            for (let n = 0; n < data.unknownPositions.length; n++) {

                                if (data.unknownPositions[n].j === data.unknownPositions[i].j){

                                    if (n !== i){
                                        if(n !== j) {
                                            if (n !== k) {

                                                console.log(data.unknownPositions[n]);

                                                data.unknownPositions[n].values = data.unknownPositions[n].values.filter(item => {
                                                    return uniqueNumbers.indexOf(item) === -1;
                                                });

                                                if (data.unknownPositions[n].values.length === 1) {
                                                    let elem = data.unknownPositions[n];
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

function filterByColumns(data) {

    for (let i = 0; i < data.unknownPositions.length - 2; i++) {
        for (let j = 1 + i; j < data.unknownPositions.length - 1; j++) {
            for (let k = 1 + j; k < data.unknownPositions.length; k++) {

                if(data.unknownPositions[i].i === data.unknownPositions[j].i && data.unknownPositions[j].i === data.unknownPositions[k].i) {

                    if(data.unknownPositions[i].values.length < 4
                        && data.unknownPositions[j].values.length < 4
                        && data.unknownPositions[k].values.length < 4)
                    {
                        let numbers = data.unknownPositions[i].values.concat(data.unknownPositions[j].values);
                        numbers = numbers.concat(data.unknownPositions[k].values);
                        let uniqueNumbers= [...new Set(numbers)];

                        if (uniqueNumbers.length === 3) {

                            for (let n = 0; n < data.unknownPositions.length; n++) {

                                if (data.unknownPositions[n].i === data.unknownPositions[i].i){

                                    if (n !== i){
                                        if(n !== j) {
                                            if (n !== k) {

                                                console.log(data.unknownPositions[n]);

                                                data.unknownPositions[n].values = data.unknownPositions[n].values.filter(item => {
                                                    return uniqueNumbers.indexOf(item) === -1;
                                                });

                                                if (data.unknownPositions[n].values.length === 1) {
                                                    let elem = data.unknownPositions[n];
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

function filterThreeBySections(data) {

    filterSection(data, 0, 0);
    filterSection(data, 0, 1);
    filterSection(data, 0, 2);
    filterSection(data, 1, 0);
    filterSection(data, 1, 1);
    filterSection(data, 1, 2);
    filterSection(data, 2, 0);
    filterSection(data, 2, 1);
    filterSection(data, 2, 2);

}

function filterSection(data, offsetI, offsetJ) {

    let positions = [];

    for (let i = offsetI * 3; i < (offsetI + 1) * 3; i++) {
        for (let j = offsetJ * 3 ; j < (offsetJ + 1) * 3; j++) {
            for (let k = 0; k < data.unknownPositions.length; k++) {
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j && data.unknownPositions[k].values.length < 4) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log(`Positions = `, positions);
    console.log();

    if (positions.length >= 3) {

        getUniqueValuesInThree(data, positions, offsetI, offsetJ);

    }

}

function getUniqueValuesInThree(data, positions, offsetI, offsetJ) {

    for(let i = 0; i < positions.length - 2; i++) {
        for(let j = 1 + i; j < positions.length - 1; j++) {
            for(let k = 1 + j; k < positions.length; k++) {

                let numbers = positions[i].values.concat(positions[j].values);
                numbers = numbers.concat(positions[k].values);
                let uniqueNumbers= [...new Set(numbers)];

                if (uniqueNumbers.length === 3) {

                    removeRepeatedValuesInThreeBySections(data, positions, uniqueNumbers, offsetI, offsetJ, i, j ,k);

                }

            }
        }
    }

}

function removeRepeatedValuesInThreeBySections(data, positions, uniqueNumbers, offsetI, offsetJ, i, j ,k) {

    for (let n = offsetI * 3; n < (offsetI + 1) * 3; n++) {
        for (let m = offsetJ * 3; m < (offsetJ + 1) * 3; m++) {
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


module.exports = startLoopToCompareThree;
