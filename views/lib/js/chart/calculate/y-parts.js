
import {Part} from "./part.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function YParts(chart, height){
    Part.call(this, chart);
    this.setWidth(this.chart.getWidth());
    this.setHeight(height);
}
YParts.prototype = Object.create(Part.prototype);
YParts.prototype.constructor = YParts;



YParts.prototype.getX = function(){
    return this.chart.getX();
};

YParts.prototype.setX = function(){
    // TODO: block setX() call
};

YParts.prototype.setY = function(){
    // TODO: block setY() call
};



YParts.FEES = "fees";
YParts.COMMISSIONS = "commissions";
YParts.BOUNTIES = "bounties";
YParts.BAR = "bar";
YParts.CIRCLE = "circle";
YParts.KITE = "kite";



// performs any preproccess, modification to this texts object if needed and returns
// an array to it's caller because the paper objects can only proccess array
YParts.prototype.calTxtPoints = function(){
    // TODO: perform any preprocess
    return this.texts;
};

// performs any preproccess, modification to this symbols object if needed
YParts.prototype.calSymPoints = function(){
    // TODO: perform any preprocess
    return this.symbols;
};



export {YParts};



// takes and object containing some other objects and converts
//  and returns it to an array of those child object
function objToArr(obj){
    let arr = [];
    for(var item of obj) {
        arr.push(item);
    }
    return arr;
};
