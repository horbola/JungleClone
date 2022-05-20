
import {Part} from "./part.js";
import {ChartEvent} from "../event/chart-event.js";
import {Canvas} from "./../shape/canvas.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function MainPart(chart){
    Part.call(this, chart);
}
MainPart.prototype = Object.create(Part.prototype);
MainPart.prototype.constructor = MainPart;



// overrides
MainPart.prototype.getWidth = function(){
    let width = this.chart.getWidth() - this.chart.getLeftPart().getWidth() - this.chart.getRightPart().getWidth();
    return width;
};

// overrides
MainPart.prototype.getHeight = function(){
    // chartLeft height, chartMain Height and chartRight height are same.
    let height = this.chart.getLeftPart().getHeight();
    return height;
};

// overrides
MainPart.prototype.setWidth = function(){
    // TODO: throw error
};

// overrides
MainPart.prototype.setHeight = function(){
    // TODO: throw error
};

MainPart.prototype.dataShapes = {
    bar: {
        maxRange: 1000,
        stroke: "#000",
        fillStyle: "#ddd"
    },
    circle: {
        width: 5,
        height: 5,
        maxRange: 500,
        stroke: "#000",
        strokeWidth: 2,
        fillStyle: "#58e2c2"
    },
    kite: {
        width: 5,
        height: 5,
        maxRange: 500,
        stroke: "#000",
        strokeWidth: 2,
        fillStyle: "#71a8e6"
    },
    cirSpline: {
        strokeStyle: "#58e2c2",
        lineWidth: 1
    },
    kiteSpline: {
        strokeStyle: "#71a8e6",
        lineWidth: 3
    },
    gridLine: {
        count: 4,
        strokeStyle: '#ddd',
        strokeWidth: 1
    }
};

MainPart.prototype.borders = {
    one: {
        strokeStyle: "red",
        lineWidth: 1
    }
};




MainPart.prototype.getX = function(){
    return this.chart.getX() + this.chart.getLeftPart().getWidth();
};

MainPart.prototype.setX = function(x){
    // TODO: setX() call
};

MainPart.prototype.getY = function(){
    // in case y, chartLeft, chartRight and chartMain are same.
    return this.chart.getLeftPart().getY();
};

MainPart.prototype.setY = function(y){
    // TODO: setY() call
};



MainPart.BAR = "bar";
MainPart.CIRCLE = "circle";
MainPart.KITE = "kite";
MainPart.CIR_SPLINE = "cirSpline";
MainPart.KITE_SPLINE = "kiteSpline";



// this function calculates the points and associate other info 
// for grid lines.
// param gridLC is use to adjust if different number of
// grid line needs to be drawn for different chart.
MainPart.prototype.calGridLinePoints = function(gridLC){
    let gridLine = this.dataShapes.gridLine;
    if(gridLC) gridLine.count = gridLC;
    let gGap = this.getHeight() / gridLine.count;
    let startX = this.getX();
    let endX = startX + this.getWidth();

    let gridLinePoints = [];
    // this loop needs to run one more than the grid line count
    for(let v = 0; v < gridLine.count+1; v++){
        let startY = this.getY() +(gGap*v);
        let endY = startY;
        
        let gridLinePoint = {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
            strokeStyle: gridLine.strokeStyle,
            strokeWidth: gridLine.strokeWidth
        };
        gridLinePoints.push(gridLinePoint);
    }
    return gridLinePoints;
};

// this function calculate the points and associate other info
// for bar drwaing.
// the parameter 'dataName' is the entry of data in the 
// main dataSet object on which this bar should be drawn.
MainPart.prototype.calBarPoints = function(dataSet, dataName, dataShape){
    let width = this.getWidth();
    let height = this.getHeight();
    let numOfData = dataSet.length;
    let barWidth = width/numOfData;
    let barPadding = barWidth/4;
    let filledBarWidth = barWidth/2;
    
    let barPoints = [];
    for(let v = 0; v < numOfData; v++){
        let uprLeftCorX = this.getX() + barPadding + (v*barWidth);
        let value = dataSet[v][dataName];
        let barHeight = Math.round((height/dataShape.maxRange)*value);
        let uprLeftCorY = this.getY() + (height-barHeight);
        
        let barPoint = {
            x: uprLeftCorX,
            y: uprLeftCorY,
            width: filledBarWidth,
            height: barHeight,
            fillStyle: dataShape.fillStyle,
            stroke: dataShape.stroke,
            hoverColor: 'rgba(113,251,219,1)'
//            get id(){dataSet[v].day;}
        };
        barPoints.push(barPoint);
    }
    return barPoints;
};

// this function calculate the points and associate other info 
// for circle drwaing.
MainPart.prototype.calCirPoints = function(dataSet, dataName, dataShape){
    let width = this.getWidth();
    let height = this.getHeight();
    let numOfData = dataSet.length;
    let cirWidth = width/numOfData;
    let cirCenter = cirWidth/2;
    
//    debugger;
    
    let cirPoints = [];
    for(let v = 0; v < numOfData; v++){
        let cirX = this.getX() + cirCenter + (v*cirWidth);
        let value = dataSet[v][dataName];
        let barHeight = Math.round((height/dataShape.maxRange)*value);
        let cirY = this.getY() + (height-barHeight);
        
        let cirPoint = {
            x: cirX,
            y: cirY,
            width: dataShape.width,
            fillStyle: dataShape.fillStyle,
            stroke: dataShape.stroke,
            strokeWidth: dataShape.strokeWidth,
            get id(){dataSet[v].day;}
        };
        cirPoints.push(cirPoint);
    }
    return cirPoints;
};

MainPart.prototype.calKitePoints = function(dataSet, dataName, dataShape){
//    debugger;
    let kitePoints = this.calCirPoints(dataSet, dataName, dataShape);
    return kitePoints;
};

// first find the circle points. then finds points for quadratic curve
// drawing to draw the spline connecting the circles.
MainPart.prototype.calCirSplinePoints = function(cirPoints, cirSpline){
    cirPoints.forEach(function(item, index, arr){
        item.stroke = cirSpline.stroke;
        item.fillStyle = cirSpline.fillStyle;
        item.lineWidth = cirSpline.lineWidth;
        item.strokeStyle = cirSpline.strokeStyle;
    });
    return cirPoints;
};

// first find the kite points. then finds points for quadratic curve
// drawing to draw the spline connecting the kites.
MainPart.prototype.calKiteSplinePoints = function(kitePoints, kiteSpline){
    return this.calCirSplinePoints(kitePoints, kiteSpline);
};



let currentIndex = 0;
// overrides
MainPart.prototype.registerChartListener = function(/*barPoints*/){
    let chartEvent = new ChartEvent();
    let canE = this.chart.getPaper();
    let canvas = this.chart.getCanvas();
    let canMainArea = canvas.getCanvasMainArea();
    let barPoints = canMainArea.shapes.get(Canvas.MAIN_BAR);
    let mpX = this.getX();
    let mpY = this.getY();
    let mpW = this.getWidth();
    let mpH = this.getHeight();
    let dataS = this.chart.getData().getDataSet();
    let lpw = this.chart.getLeftPart().getWidth();
    let tph = this.chart.getTopPart().getHeight();
    let listeners = this.chartListener;
    
    $(canE).mousemove(function(eventObj) {
        let barArea = mpW / dataS.length;
        let pointX = eventObj.pageX - $(canE).offset().left - lpw;
        let pointY = eventObj.pageY - $(canE).offset().top - tph;
        
        let accuBarArea = 0;
        for (let i = 0; i < dataS.length; i++) {
            accuBarArea += barArea;
            let xCond = (pointX > (accuBarArea - barArea)) && (pointX < accuBarArea);
            let yCond = (pointY > 0) && (pointY < mpH);
            if (xCond && yCond) {
                currentIndex = i;
                chartEvent.currBarInd = currentIndex;
                chartEvent.pointY = pointY;
                chartEvent.popupX = (function(){
                    return (barArea*(currentIndex+1)) - (barArea/2);
                })();
                chartEvent.dataS = dataS;
                chartEvent.barPoints = barPoints;
                chartEvent.cirPoints = canvas.getCanvasMainArea().shapes.get(Canvas.MAIN_CIRCLE);
                chartEvent.kitePoints = canvas.getCanvasMainArea().shapes.get(Canvas.MAIN_KITE);
                chartEvent.canMainArea = canMainArea;
                chartEvent.mainPartHeight = mpH;
                
                listeners.forEach(function (item, index, arr) {
                    chartEvent.chartType = item.chartType;
                    item.mouseInBar(chartEvent);
                });
            }
        }
    });
    
    $(canE).on('mouseleave', function(eventObj){
        let xCond = (eventObj.pageX < ($(canE).offset().left + lpw)) || (eventObj.pageX > ($(canE).offset().left + lpw + mpW));
        let yCond = (eventObj.pageY < ($(canE).offset().top + tph)) || (eventObj.pageY > ($(canE).offset().top + tph + mpH));
        if(xCond || yCond) {
            listeners.forEach(function (item, index, arr) {
                item.mouseLeavesMainPart(chartEvent);
            });
        }
    });
    
//    $(canE).mousemove(function(eventObj) {
//        let canMainArea = canvas.getCanvasMainArea();
//        
//        let cirSplinePath = canvas.getCanvasMainArea().shapes.get(Canvas.MAIN_CIR_SPLINE_PATH2D);
//        if(cirSplinePath){
//            let ctx = canvas.getContext();
//            chartEvent.spline = canMainArea.shapes.get(Canvas.MAIN_CIRCLE_SPLINE);
//            chartEvent.canMainArea = canMainArea;
//            chartEvent.eventObj = eventObj;
//            
//            // Checks whether point is inside circle
//            if (ctx.isPointInPath(cirSplinePath, eventObj.offsetX, eventObj.offsetY)) {
//                listeners.forEach(function (item, index, arr) {
//                    item.mouseInSpline(chartEvent);
//                });
//            }
//            else {
//                listeners.forEach(function (item, index, arr) {
//                    item.mouseOutSpline(chartEvent);
//                });
//            }
//        }
//        
//        let kiteSplinePath = canvas.getCanvasMainArea().shapes.get(Canvas.MAIN_CIR_SPLINE_PATH2D);
//        if(kiteSplinePath){
//            let ctx = canvas.getContext();
//            chartEvent.spline = canMainArea.shapes.get(Canvas.MAIN_KITE_SPLINE);
//            chartEvent.canMainArea = canMainArea;
//            chartEvent.eventObj = eventObj;
//            
//            // Checks whether point is inside circle
//            if (ctx.isPointInPath(cirSplinePath, eventObj.offsetX, eventObj.offsetY)) {
//                listeners.forEach(function (item, index, arr) {
//                    item.mouseInSpline(chartEvent);
//                });
//            }
//            else {
//                listeners.forEach(function (item, index, arr) {
//                    item.mouseOutSpline(chartEvent);
//                });
//            }
//        }
//    });
};



export {MainPart};
