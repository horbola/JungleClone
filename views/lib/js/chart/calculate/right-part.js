
import {Part} from "./part.js";
import {XParts} from "./x-parts.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function RightPart(chart){
    XParts.call(this, chart);
}
RightPart.prototype = Object.create(XParts.prototype);
RightPart.prototype.constructor = RightPart;



RightPart.prototype.markers = {
    one: {
        txtBase: 1000,
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
    },
    two: {
        txtBase: 500,
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

RightPart.prototype.verMars = {
    one: {
        text: 'Clicks',
        baseX: 0,
        translateX: 50,
        translateY: 30,
        rotation: -90,
        alinmentConst: 1,
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

RightPart.prototype.borders = {
    one: {
        strokeStyle: "red",
        lineWidth: 1
    }
};



// overrides
// this function is reimplemented from chartPart so that it returns
// chartRight's own x which is modified by this class. if it's not
// overridden then it would return the chart's 'x' which is
// modifired by it's chartXSides class.
RightPart.prototype.getX = function(){
    let x = this.chart.getMainPart().getX() + this.chart.getMainPart().getWidth();
    return x;
};



// overrides
RightPart.prototype.adjustBaseX = function(){
    // execution order of loops matters here. In which order element
    // will appear here, in that order markers will be drawn.
    
    // baseX starts from chartRight's 'x'
    let total = this.getX();
    let marVal = Object.values(this.markers);
    marVal.forEach(function(item, index, arr){
        // each item's baseX is previous item's copulated total area
        total += item.totMarArea;
        // to calculate baseX succesfully, we need to minus the current item's area.
        item.baseX = total - item.totMarArea;;
    });
    let verMarVal = Object.values(this.verMars);
    verMarVal.forEach(function(item, index, arr){
        total += item.totVerMarArea;
        item.baseX = total - item.totVerMarArea;
    });
};



export {RightPart};
