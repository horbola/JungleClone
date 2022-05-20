
//let jan = require("./jan");

function DataGenerator(){}



// generates data for a single file. the process of this file
// should be applied to the rest of all the file.
// param: phaseLength
// determinig the mean value so that each
// partial gets the same value initially
// phaseLength must be a number so that quotient of cycleTarget
// divided phaseLength will be even.
DataGenerator.prototype.genTypeData = function(gross, partial, type, percentageOfDiviation, breakPoints){
    // with this portion we control the data generation of types
    // which gross amount is less than their partial's length.
    // this is the number to which we want to allow the span of gross.
    let allowance = 1;
    if(gross < partial.length + allowance){
        genTypeDataLocal(gross, partial, type);
        return partial;
    }

    // this is main portion of this data generation algorithm
    let phaseLength = 1;
    // this is the number by which phaseTarget will be divided
    let mean = Math.round(gross/partial.length);
    // taking diviation of 50 percent in which
    // the value of each item will be fixed
    let diviation = percentage(mean, percentageOfDiviation);
    let randArr = [];
    // used for debugging purpose.
    let acc = 0;
    for(let i = 0; i<partial.length; i++){
        let found = findPhaseLength(i, breakPoints);
        if(found) phaseLength = found;
        if(startPhase(i, phaseLength)){
            let rand = 0;
            if (i === partial.length - 1)
                partial[i][type] = mean;
            else {
                rand = between(0, diviation);
                partial[i][type] = mean - rand;
                randArr.push(rand);
            }
//            acc = debugInfo(partial[i], type, mean, diviation, rand, true, acc);
        } else {
            let rand = randArr.pop();
            partial[i][type] = mean + rand;
//            acc = debugInfo(partial[i], type, mean, diviation, rand, false, acc);
        } // main portion ends
        
        // this portion is used to solve a mistake in fuguring out
        // the total data types used in the affiliate report
        // commissions and sell_earnings are same
        if(type === 'commissions')
            partial[i][type] = partial[i]['sell_earnings'];
    }
    return partial;
};

function genTypeDataLocal(gross, partial, type){
    let indexStore = [];
    let acc = 0;

    for (let i = 0; i < gross; ) {
        let randIndex = between(0, partial.length);
        while (indexStore.includes(randIndex)) {
            randIndex = between(0, partial.length);
        }
        indexStore.push(randIndex);
        // with random the amount of bounties is determined.
        let rand = between(1, 3);
        partial[randIndex][type] = rand;
        i += rand;
    }
    
    for(let i = 0; i<partial.length; i++){
        // bounties and referral_earnings are same
        if (type === 'referral_earnings')
            partial[i][type] = partial[i]['bounties'];
    }
}

DataGenerator.prototype.genTypeDataAsString = function(gross, partial, type, percentageOfDiviation, breakPoints){
    let partialRaw = this.genTypeData(gross, partial, type, percentageOfDiviation, breakPoints);
    let partialJson = JSON.stringify(partialRaw, null, 4);
    return partialJson;
};







function debugInfo(aPartial, type, mean, diviation, random, startPhase, acc){
    aPartial.mean = mean;
    aPartial.diviation = diviation;
    aPartial.random = random;
    aPartial.startPhase = startPhase;
    
    acc += aPartial[type];
    aPartial['accum@'+type] = acc;
    return acc;
}

function filterInt(value){
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value);
    } else {
        return NaN;
    }
}

// determines the if the step in the start phase or not.
// cycle base is the double of the phaseLength as each
// cycle is formed of two phase: start phase and end phase.
function startPhase(step, phaseLength){
    let cycleBase = phaseLength * 2;
    // phaseLength: 5, step: 13, cycleBase: 10
    let modulo = step % cycleBase;
    // modulo: 8;
    if(modulo < phaseLength)
        return true;
    else if ((modulo === phaseLength || modulo > phaseLength) && (modulo < cycleBase))
        return false;
}

// determines the cycle number in which the step resides.
// i found this function analyzing the dicimel number system.
function cycleNumber(step, phaseLength){
    let cycleBase = phaseLength * 2;
    // phaseLength: 5, step: 38, cycleBase: 10
    let modulo = step % cycleBase;
    // modulo: 8;
    let baseMultiple = step - modulo;
    // baseMultiple: 38 - 8 = 30
    let cycleNumber = baseMultiple / cycleBase;
    // cycleNumber: 30 / 10 = 3
    return cycleNumber;
}

// generates the percentage of the number specified
function percentage(whole, percent){
    return Math.round(
            (whole/100) * percent
            );
}

// generates a random number between the specified range.
function between(min, max) {
    return Math.floor(
            Math.random() * (max - min) + min
            );
};

// returns the phase length accociated with it from the breakPoints array.
function findPhaseLength(step, breakPoints){
    let bpKeys = Object.keys(breakPoints);
    const breakPoint = bpKeys.find(element => Number(element) === step);
    if(breakPoint){
        return breakPoints[breakPoint];
    }
    else return false;
}



module.exports = DataGenerator;

