
import {Part} from "./part.js";
import {YParts} from "./y-parts.js";
import {Canvas} from "./../shape/canvas.js";
import {ChartEvent} from "./../event/chart-event.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function TopPart(chart, height) {
    YParts.call(this, chart, height);
}
TopPart.prototype = Object.create(YParts.prototype);
TopPart.prototype.constructor = TopPart;



TopPart.prototype.baseX = 300;

TopPart.prototype.texts = {
    fees: {
        text: "Fees",
        x: 0,
        y: 25,
        font: '12px arial',
        color: "#000",
        paddingLeft: 10,
        paddingRight: 10,
        get totTextArea(){return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;}
    },
    commissions: {
        text: "Commissions",
        x: 0,
        y: 25,
        font: '12px arial',
        color: "#000",
        paddingLeft: 10,
        paddingRight: 10,
        get totTextArea(){return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;}
    },
    bounties: {
        text: "Bounties",
        x: 0,
        y: 25,
        font: '12px arial',
        color: "#000",
        paddingLeft: 10,
        paddingRight: 10,
        get totTextArea(){return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;}
    }
};
    
TopPart.prototype.symbols = {
    circle: {
        x: 0,
        y: 27,
        width: 10,
        height: 25,
//        get height(){return this.width;},
        stroke: "#000",
        fillStyle: "#58e2c2",
        paddingLeft: 10,
        paddingRight: 20,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "circle"
    },
    bar: {
        x: 0,
        y: 20,
        width: 15,
        height: 15,
//        get height(){return this.width;},
        stroke: "#000",
        fillStyle: "#000",
        paddingLeft: 5,
        paddingRight: 20,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "bar"
    },
    kite: {
        x: 0,
        y: 27,
        width: 10,
        height: 25,
//        get height(){return this.width;},
        stroke: "#000",
        fillStyle: "#58e2c2",
        paddingLeft: 10,
        paddingRight: 20,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "kite"
    }
};

TopPart.prototype.borders = {
    one: {
        strokeStyle: "red",
        lineWidth: 1
    }
};

TopPart.CIRCLE = "circle";
TopPart.BAR = "bar";
TopPart.KITE = "kite";


// overrides
TopPart.prototype.getY = function(){
    return this.chart.getY();
};



TopPart.prototype.adjustCoords = function(){
    let txtVals = Object.values(this.texts);
    let symVals = Object.values(this.symbols);
    let outerThis = this;
    
    // 'total' starts from the 'baseX' in the first object.
    let total = this.baseX;
    txtVals.forEach((text, index, arr) => {
        let symbol = symVals[index];
        total += symbol.totSymAreaX;
        symbol.x = (total - symbol.totSymAreaX) + symbol.paddingLeft;
//        symbol.y = outerThis.getY() + (outerThis.getHeight()/2) + (symbol.height/2);

        // each item's baseX is previous item's copulated total area
        total += text.totTextArea;
        // to calculate baseX succesfully, we need to minus the current item's area.
        text.x = (total - text.totTextArea) + text.paddingLeft;
        text.y = outerThis.getY() + (outerThis.getHeight()/2) + (Part.calTxtHeight(text)/2);
    });
};

TopPart.prototype.calSymCrossLinePoints = function(symbol, outSymWid, innSybWid){
//    debugger;
    let outerThis = this;
    let symCrossLinePoint = {
        get startX(){
            if(innSybWid){
                return symbol.x - symbol.width - outSymWid;
            }
            else return symbol.x - outSymWid;
        },
        get endX(){return this.startX + (symbol.width * 2) + (outSymWid * 2);},
        get startY(){
            if(symbol === outerThis.symbols.bar){
                return symbol.y + (symbol.height/2);
            }
            else return symbol.y;
        },
        get endY(){return this.startY;},
        strokeStyle: symbol.fillStyle
    };
    return [symCrossLinePoint];
};


// overrides
TopPart.prototype.registerChartListener = function(symOne, symTwo, symThree){
    let canTopArea = this.chart.getCanvas().getCanvasTopArea();
    let canMainArea = this.chart.getCanvas().getCanvasMainArea();
    let canE = this.chart.getPaper();
    let listeners = this.chartListener;
    let chartEvent = new ChartEvent();
    
    if(symOne){
        let cirSym = canTopArea.shapes.get(symOne.sym)[0];
        let cirSymPageX = $(canE).offset().left + cirSym.x;
        let cirSymPageY = $(canE).offset().top + cirSym.y;
        $(canE).on("mousemove" ,function(eventObj) {
            let xCon = (eventObj.pageX > cirSymPageX) && (eventObj.pageX < (cirSymPageX + cirSym.width));
            let yCon = (eventObj.pageY > cirSymPageY) && (eventObj.pageY < (cirSymPageY + cirSym.height));
            if (xCon && yCon) {
                listeners.forEach(function (item, index, arr) {
                    chartEvent.currSym = cirSym.type;
                    if(symOne.spline){
                        chartEvent.canMainArea = canMainArea;
                        chartEvent.spline = canMainArea.shapes.get(symOne.spline);
                        chartEvent.eventObj = eventObj;
                    }
                    item.mouseInSym(chartEvent);
                });
            }
        });
    }
    
    
    if(symTwo){
        let barSym = canTopArea.shapes.get(symTwo.sym)[0];
        let barSymPageX = $(canE).offset().left + barSym.x;
        let barSymPageY = $(canE).offset().top + barSym.y;
        $(canE).mousemove(function (eventObj) {
            let xCon = (eventObj.pageX > barSymPageX) && (eventObj.pageX < (barSymPageX + barSym.width));
            let yCon = (eventObj.pageY > barSymPageY) && (eventObj.pageY < (barSymPageY + barSym.height));
            if (xCon && yCon) {
                listeners.forEach(function (item, index, arr) {
                    chartEvent.currSym = barSym.type;
                    if(symTwo.spline){
                        chartEvent.canMainArea = canMainArea;
                        chartEvent.spline = canMainArea.shapes.get(symTwo.spline);
                    }
                    item.mouseInSym(chartEvent);
                });
            }
        });
    }
    
    
    if(symThree){
        let kiteSym = canTopArea.shapes.get(symThree.sym)[0];
        let kiteSymPageX = $(canE).offset().left + kiteSym.x;
        let kiteSymPageY = $(canE).offset().top + kiteSym.y;
        $(canE).mousemove(function (eventObj) {
            let xCon = (eventObj.pageX > kiteSymPageX) && (eventObj.pageX < (kiteSymPageX + kiteSym.width));
            let yCon = (eventObj.pageY > kiteSymPageY) && (eventObj.pageY < (kiteSymPageY + kiteSym.height));
            if (xCon && yCon) {
                listeners.forEach(function (item, index, arr) {
                    chartEvent.currSym = kiteSym.type;
                    if(symThree.spline){
                        chartEvent.canMainArea = canMainArea;
                        chartEvent.spline = canMainArea.shapes.get(symThree.spline);
                    }
                    item.mouseInSym(chartEvent);
                });
            }
        });
    }
};


export {TopPart};








// overrides
TopPart.prototype.registerChartListenerNotUsed = function(){
    let canTopArea = this.chart.getCanvas().getCanvasTopArea();
    let canE = this.chart.getPaper();
    let canvas = this.chart.getCanvas();
    let listeners = this.chartListener;
    let chartEvent = new ChartEvent();
    let ctx = canvas.getContext();
    
    
    let cirPath = canTopArea.shapes.get(Canvas.TOP_MARKER_SYMBOL_CIRCLE_PATH2D);
    $(canE).mousemove(function(eventObj) {
        // Checks whether point is inside circle
        if (canvas.getContext().isPointInPath(cirPath, eventObj.offsetX, eventObj.offsetY)) {
            listeners.forEach(function (item, index, arr) {
                chartEvent.currSym = TopPart.CIRCLE;
                item.mouseInCir(chartEvent);
            });
        }
    });
    
    let barPath = canTopArea.shapes.get(Canvas.TOP_MARKER_SYMBOL_BAR_PATH2D);
    $(canE).mousemove(function(eventObj) {
        // Checks whether point is inside circle
        if (canvas.getContext().isPointInPath(barPath, eventObj.offsetX, eventObj.offsetY)) {
            listeners.forEach(function (item, index, arr) {
                chartEvent.currSym = TopPart.BAR;
                item.mouseInBar(chartEvent);
            });
        }
    });
    
    let kitePath = canTopArea.shapes.get(Canvas.TOP_MARKER_SYMBOL_KITE_PATH2D);
    $(canE).mousemove(function(eventObj) {
        // Checks whether point is inside circle
        if (ctx.isPointInPath(kitePath, eventObj.offsetX, eventObj.offsetY)) {
            listeners.forEach(function (item, index, arr) {
                chartEvent.currSym = TopPart.KITE;
                item.mouseInKite(chartEvent);
            });
        }
    });
};