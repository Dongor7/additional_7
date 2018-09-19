function startLoopToCompareTwo(data) {

    filterRows(data);
    filterLines(data);
    //filterBySections(data);

}

function filterLines(data) {
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
}

function filterRows(data) {
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

}

function filterBySections(data) {

    //filterSection(data, 0, 0);
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
                if (data.unknownPositions[k].i === i && data.unknownPositions[k].j === j /*&& data.unknownPositions[k].values.length < 3*/) {
                    positions.push(data.unknownPositions[k]);
                }
            }
        }
    }

    console.log(`Positions TWO = `, positions);
    console.log();

    if (positions.length >= 2) {

        getUniqueValues(data, positions, offsetI, offsetJ);

    }

}

function getUniqueValues(data, positions, offsetI, offsetJ) {

    for(let i = 0; i < positions.length - 2; i++) {
        for(let j = 1 + i; j < positions.length - 1; j++) {
            for(let k = 1 + j; k < positions.length; k++) {

                if (positions[i].values.sort().toString() === positions[j].values.sort().toString()
                    && positions[j].values.length === 2)
                {

                    positions[k].values = positions[k].values.filter(item => {
                        return positions[j].values.indexOf(item) === -1;
                    });
                    if (positions[k].values.length === 1) {
                        let elem = positions[k];
                        data.matrix[elem.i][elem.j] = elem.values[0];
                    }

                }
                if (positions[i].values.sort().toString() === positions[k].values.sort().toString()
                    && positions[k].values.length === 2)
                {

                    positions[j].values = positions[j].values.filter(item => {
                        return positions[k].values.indexOf(item) === -1;
                    });
                    if (positions[j].values.length === 1) {
                        let elem = positions[j];
                        data.matrix[elem.i][elem.j] = elem.values[0];
                    }

                }
                if (positions[k].values.sort().toString() ===positions[j].values.sort().toString()
                    && positions[j].values.length === 2)
                {

                    positions[i].values = positions[i].values.filter(item => {
                        return positions[j].values.indexOf(item) === -1;
                    });
                    if (positions[i].values.length === 1) {
                        let elem = positions[i];
                        data.matrix[elem.i][elem.j] = elem.values[0];
                    }

                }

            }
        }
    }

}


module.exports = startLoopToCompareTwo;
