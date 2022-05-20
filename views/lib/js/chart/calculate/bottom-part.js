
import {Part} from "./part.js";
import {YParts} from "./y-parts.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function BottomPart(chart, height){
    YParts.call(this, chart, height);
}
BottomPart.prototype = Object.create(YParts.prototype);
BottomPart.prototype.constructor = BottomPart;



BottomPart.prototype.texts = {
    dates: {
        strokeWidth: 1,
        stroke: '#999',
        fill: '#999',
        font: 'arial',
        fontColor: '#000',
        fontSize: 12,
        fontFamily: 'arial'
    }
};

BottomPart.prototype.borders = {
    one: {
        strokeStyle: "red",
        lineWidth: 1
    }
};

// overrides
// this function is reimplemented from chartPart so that it returns
// chartBottom's own y which is modified by this class. if it's not
// overridden then it would return the chart's 'y' which is
// modifired by it's chartYSides class.
BottomPart.prototype.getY = function(){
    let y = this.chart.getLeftPart().getY() + this.chart.getLeftPart().getHeight();
    return y;
};



BottomPart.DATES = "dates";



// overrides.
BottomPart.prototype.calTxtPoints = function(dataS, txtShape){
    let leftPartW = this.chart.getLeftPart().getWidth();
    let rightPartW = this.chart.getRightPart().getWidth();
    let baseX = this.getX() + leftPartW;
    let aWidth = this.getWidth() - leftPartW - rightPartW;
    let numOfData = dataS.length;
    let txtAreaWidth = aWidth/numOfData;
    // this is the center area of each part of the chart which represents different shapes
    let txtAreaCenter = txtAreaWidth/2;
    let calTxtWidth = Part.calTxtWidth;
    let calTxtHeight = Part.calTxtHeight;
    
    let txtPoints = [];
    for(let v = 0; v < numOfData; v+=skip()){
        let text = dataS[v].day;
        text = adjustBottomText(v, text);
        
        let copulatedTxtAreaCenter = baseX + txtAreaCenter + (v*txtAreaWidth);
        let txtX = copulatedTxtAreaCenter - (calTxtWidth(text)/2);
        // if this field is in this for loop other than outside of it then 
        // it's possible to adjust each text's y position if there are
        // different heights for different texts
//        let txtY = this.getY() + (this.getHeight()/2) + (calTxtHeight(text)/2);
        let txtY = this.getY() + calTxtHeight(text) + 15;

        let txtPoint = {
            text: text,
            x: txtX,
            y: txtY,
            stroke: txtShape.stroke,
            strokeWidth: txtShape.strokeWidth,
            font: txtShape.font,
            fillStyle: txtShape.fillStyle,
            fontFamily: txtShape.fontFamily
        };
        txtPoints.push(txtPoint);
    }
    return txtPoints;
    
    
    
    function skip() {
        if (numOfData > 12)
            return 3;
        else
            return 1;
    }

    function adjustBottomText(step, text) {
        if (step === 0)
            text = text + ' ' + dataS[step].month;
        if (numOfData === 7 && step === 6)
            text = text + ' ' + dataS[step].month;
        if (step !== 0) {
            if (skip() === 1) {
                let dayOne = Number(dataS[step].day);
                if (dayOne === 1) {
                    text = text + ' ' + dataS[step].month;
                }
            } else if (skip() === 3) {
                let dayOne = Number(dataS[step].day);
                if (dayOne === 1 || dayOne === 2 || dayOne === 3) {
                    text = text + ' ' + dataS[step].month;
                }
            }
        }
        return text;
    }
};



export {BottomPart};
