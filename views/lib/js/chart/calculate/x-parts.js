
import {Part} from "./part.js";
import {LeftPart} from "./left-part.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function XParts(chart){
    Part.call(this, chart);
}
XParts.prototype = Object.create(Part.prototype);
XParts.prototype.constructor = XParts;



XParts.prototype.setX = function(x){
    // TODO: block setX() call
};

XParts.prototype.getY = function(){
    return this.chart.getY() + this.chart.getTopPart().getHeight();
};

XParts.prototype.setY = function(y){
    // TODO: setY() call
};

// overrides
XParts.prototype.getWidth = function(){
    let width = 0;
    // this line gives an array from an object value
    // if 'this.verMar' would be used directly than
    // an error saying it's noniterable is thrown.
    let marVals = Object.values(this.markers);
    for (var item of marVals) {
        width += item.totMarArea;
    }
    // this line gives an array from an object value
    // if 'this.verMar' would be used directly than
    // an error saying it's noniterable is thrown.
    let verMarVals = Object.values(this.verMars);
    for (var item of verMarVals) {
        width += item.totVerMarArea;
    }
    return width;
};

// overrides
XParts.prototype.setWidth = function(){
    // TODO: throw error
};

// overrides
XParts.prototype.getHeight = function(){
    let height = this.chart.getHeight() - this.chart.getTopPart().getHeight() - this.chart.getBottomPart().getHeight();
    return height;
};

// overrides
XParts.prototype.setHeight = function(){
    // TODO: throw error
};



XParts.ONE = "one";
XParts.TWO = "two";



XParts.buildMarTxtArr = function(marker) {
    if(marker.txtArr) return marker.txtArr;
    let mc = marker.marCount;
    let tb = marker.txtBase;
    let marTxtArr = [];
    let mInterval = tb / mc;

    // this loop needs to run one more than the marker count
    for (let v = 0; v < mc+1; v++) {
        let marTxt = mInterval * v;
        marTxt = XParts.shortener(marTxt, marker.shortener);
        marTxt = marker.marUnit + marTxt;
        marTxtArr.push(marTxt);
    }
    return marTxtArr;
};

XParts.shortener = function(marker, shortener){
    switch (marker) {
        case 1000:
            return 1 + shortener;
        case 2000:
            return 2 + shortener;
        default:
            return marker;
    }
};

XParts.calMaxTxtWidth = function(txtArr) {
    let c = Part.createContext();
    let maxWidth = 0;
    if(!txtArr || txtArr.length === 0) return maxWidth;
    txtArr.forEach(function (item, index, arr) {
        let txtMetrics = c.measureText(item);
        maxWidth = Math.max(maxWidth, Math.round(txtMetrics.width));
    });
    return maxWidth;
};



XParts.prototype.calMarPoints = function(marker){
    if(!marker) return [];
    let xPartsThis = this;
    // cloning object
    // for primitive: newVariable = originalVariable.valueOf();
    // for object: b = Object.assign({},a);
    
    let marTxtArr = XParts.buildMarTxtArr(marker);
    let maxTxtWidth = XParts.calMaxTxtWidth(marTxtArr);
    let gridGap = this.chart.getMainPart().getHeight() / marker.marCount;
    
    // adjusting baseX for all markers and verticle markers.
    this.adjustBaseX();
    let baseY = this.getY();
    let marPoints = [];
    marTxtArr.forEach(function(item, index, arr){
        let marPoint = {
            text: item,
            // marker.baseX needs to be adjusted before for this line to work properly
            get x(){
                let x = marker.baseX + marker.paddingLeft;
                // if this is 'LeftPart' than a padding to align the markers to right is added by this block.
                if(xPartsThis instanceof LeftPart){
                    let leftAlignmentPadding = maxTxtWidth - Part.calTxtWidth(item);
                    x += leftAlignmentPadding;
                }
                return x;
            },
            get y(){
                // gets the original y position. it's calculated from the baseline
                // of the text. because of this texts get upper than it's area bound.
                // originally y is counted up from top to bottom. but as we need to
                // draw in reverse order so we wrote this expression rather than this:
                /// let y = baseY + (gridGap*index); 
                let y = baseY + xPartsThis.getHeight() - (gridGap*index);
                // half of texts actual height is added to the y position to adjust the coords.
                return y + (Part.calTxtHeight(item)/2);
            },
            font: marker.font,
            fillStyle: marker.fillStyle
        };
        marPoints.push(marPoint);
    });
    return marPoints;
};


XParts.prototype.calVerMarPoints = function(verMar){
    // adjusting baseX for all markers and verticle markers.
    this.adjustBaseX();
    let txtWidth = Part.calTxtWidth(verMar.text);
    let txtY = this.getY() + (this.getHeight()/2) + ((txtWidth/2)*verMar.alinmentConst);
    
    let verMarPoint = [
        {
            text: verMar.text,
            x: verMar.baseX + verMar.paddingLeft,
            y: txtY,
            stroke: verMar.stroke,
            strokeWidth: verMar.strokeWidth,
            font: verMar.font,
            fillStyle: verMar.fillStyle,
            fontFamily: verMar.fontFamily,
            rotation: verMar.rotation,
            translateX: verMar.translateX,
            translateY: verMar.translateY
        }
    ];
    return verMarPoint;
};

 XParts.prototype.adjustBaseX = function(){
     // implement from subclasses. execution order of elements matters here.
     // In which order element will appear here, in that order markers will be drawn.
 };



export {XParts};
