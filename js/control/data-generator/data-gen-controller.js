
// data-gen-controller
console.log('data-genocontroller.js entered');
var fs = require('fs');
let DataGenerator = require("./data-generator");

function DataGenController(){}



let dataGenerator = new DataGenerator();
DataGenController.prototype.genMonthData = function(dataConfigPath){
    console.log(dataConfigPath);
    let aMonthDataConfig = require(dataConfigPath);
    // setting data config options
    // setConfigOpt(dataConfigPath, aMonthDataConfig);
    let monthData = aMonthDataConfig.monthData;
    
    let configs = Object.values(aMonthDataConfig);
    for(let type of configs){
        dataGenerator.genTypeData(type.gross, monthData, type.dataType, type.diviation, type.breakPoints);
    }
    
    monthData = JSON.stringify(monthData, null, 4);
    monthData = formatFileData(aMonthDataConfig.monthName, monthData);
    console.log(aMonthDataConfig.filePath);
    writeFileContent(aMonthDataConfig.filePath, monthData);
};


DataGenController.prototype.genStallData = function(){
    let dgPaths = require('./data-config-path');
    for(let dataConfigPath of dgPaths){
        this.genMonthData(dataConfigPath);
    }
};



function writeFileContent(filePath, data){
    fs.writeFile(filePath, data, function(err){
        if(err) return console.error(err);
    });
}


function formatFileData(monthName, dataObj){
    let monthData = `export let ${monthName} = ${dataObj};`;
    return monthData;
}




module.exports = DataGenController;




