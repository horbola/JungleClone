
import {Part} from "./part.js";
import {XParts} from "./x-parts.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function LeftPart(chart){
    XParts.call(this, chart);
}
LeftPart.prototype = Object.create(XParts.prototype);
LeftPart.prototype.constructor = LeftPart;



LeftPart.prototype.markers = {
    one: {
        txtBase: 400,
        shortener: 'k',
        marUnit: '$',
        marCount: 4,
        baseX: 0,
        marMaxWidthCache: 0,
        get marMaxWidth(){
            if(this.marMaxWidthCache === 0){
                this.marMaxWidthCache = XParts.calMaxTxtWidth(XParts.buildMarTxtArr(this));
            }
            return this.marMaxWidthCache;
        },
        font: 'arial',
        fontColor: '#000',
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
        get totMarArea(){return this.marMaxWidth + this.paddingLeft + this.paddingRight;}
    }
};

LeftPart.prototype.verMars = {
    one: {
        text: 'Earnings',
        baseX: 0,
        translateX: 50,
        translateY: 30,
        rotation: 90,
        alinmentConst: -1,
        strokeWidth: 1,
        stroke: '#999',
        fill: '#999',
        font: 'arial',
        fontColor: '#000',
        fontSize: 12,
        fontFamily: 'arial',
        get txtHeight(){return Part.calTxtHeight(this.text);},
        paddingLeft: 10,
        paddingRight: 0,
        get totVerMarArea(){return this.txtHeight + this.paddingLeft + this.paddingRight;}
    }
};

LeftPart.prototype.borders = {
    one: {
        strokeStyle: "red",
        lineWidth: 1
    }
};

LeftPart.prototype.getX = function(){
    return this.chart.getX();
};



// overrides
LeftPart.prototype.adjustBaseX = function(){
    // execution order of loops matters here. In which order element
    // will appear here, in that order markers will be drawn.
    
    // baseX starts from chartRight's 'x'
    let total = this.getX();
    // this line gives an array from an object value
    // if 'this.verMar' would be used directly than
    // an error saying it's noniterable is thrown.
    let verMarVals = Object.values(this.verMars);
    verMarVals.forEach(function(item, index, arr){
        // each item's baseX is previous item's copulated total area
        total += item.totVerMarArea;
        // to calculate baseX succesfully, we need to minus the current item's area.
        item.baseX = total - item.totVerMarArea;
    });
    
    let marVals = Object.values(this.markers);
    // this line gives an array from an object value
    // if 'this.verMar' would be used directly than
    // an error saying it's noniterable is thrown.
    marVals.forEach(function(item, index, arr){
        total += item.totMarArea;
        item.baseX = total - item.totMarArea;;
    });
};



export {LeftPart};
