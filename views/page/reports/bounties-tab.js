
import {HtmlCanvasElement} from "./../../lib/js/chart/HtmlElement/html-canvas-element.js";
import {ReportChartListener} from "./../../lib/js/chart/event/report-chart-listener.js";
import {Chart} from "./../../lib/js/chart/chart.js";
import {Part} from "./../../lib/js/chart/calculate/part.js";
import {XParts} from "./../../lib/js/chart/calculate/x-parts.js";
import {Canvas} from "./../../lib/js/chart/shape/canvas.js";
import {Data} from "./../../lib/js/chart/data/data.js";
import {Util} from "./../../lib/js/chart/util/util.js";


var topTexts = {
    earnings: {
        text: "Earnings",
        x: 0,
        y: 25,
        font: '12px arial',
        fillStyle: "#111",
        baseX: 300,
        paddingLeft: 5,
        paddingRight: 5,
        get totTextArea() {
            return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;
        }
    },
    refferals: {
        text: "Refferals",
        x: 0,
        y: 25,
        font: '12px arial',
        fillStyle: "#111",
        paddingLeft: 6,
        paddingRight: 10,
        get totTextArea() {
            return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;
        }
    }
};

var topSymbols = {
    circle: {
        x: 0,
        y: 25,
        width: 6,
        height: 25,
        fillStyle: "#58e2c2",
        paddingLeft: 0,
        paddingRight: 0,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "circle"
    },
    circle2: {
        x: 0,
        y: 25,
        width: 4,
        height: 25,
        fillStyle: "#71a8e6",
        paddingLeft: 30,
        paddingRight: 0,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "circle2"
    }
};


var bottomTexts = {
    dates: {
        font: '11px arial',
        fillStyle: '#999'
    }
};

var leftMarkers = {
    one: {
        txtBase: 300,
        shortener: 'k',
        marUnit: '$',
        marCount: 3,
        baseX: 0,
        marMaxWidthCache: 0,
        get marMaxWidth() {
            if (this.marMaxWidthCache === 0) {
                this.marMaxWidthCache = XParts.calMaxTxtWidth(XParts.buildMarTxtArr(this));
            }
            return this.marMaxWidthCache;
        },
        font: '12px arial',
        fillStyle: "#58e2c2",
        paddingLeft: 10,
        paddingRight: 20,
        get totMarArea() {
            return this.marMaxWidth + this.paddingLeft + this.paddingRight;
        }
    }
};

var verMars = {};

var rightMarkers = {
    one: {
        txtArr: ['0', '1', '1', '2'],
        txtBase: 0,
        shortener: '',
        marUnit: '',
        marCount: 3,
        baseX: 0,
        marMaxWidthCache: 0,
        get marMaxWidth() {
            if (this.marMaxWidthCache === 0) {
                this.marMaxWidthCache = XParts.calMaxTxtWidth(XParts.buildMarTxtArr(this));
            }
            return this.marMaxWidthCache;
        },
        font: '12px arial',
        fillStyle: "#71a8e6",
        paddingLeft: 10,
        paddingRight: 10,
        get totMarArea() {
            return this.marMaxWidth + this.paddingLeft + this.paddingRight;
        }
    }
};

verMars = {};

var mainDataShapes = {
    bar: {
        maxRange: 1000,
        fillStyle: "#58e2c2"
    },
    circle: {
        width: 5,
        height: 5,
        maxRange: 500,
        strokeWidth: 2,
        fillStyle: "#71a8e6"
    },
    cirSpline: {
        strokeStyle: "#71a8e6",
        lineWidth: 2
    },
    gridLine: {
        count: 4,
        strokeStyle: '#ddd',
        strokeWidth: 2
    }
};

function drawTopPart(){
    this.getTopPart().adjustCoords();
    let cir2CrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.circle2, 3, 1);
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            // drawing texts for chart top markers.
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_EARNINNGS, [this.topPart.texts.earnings]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_REFFS, [this.topPart.texts.refferals]);

            // drawing symbols getting their coords according to the visula type from the main symbol array
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE, [this.topPart.symbols.circle], Canvas.TOP_MARKER_SYMBOL_CIRCLE_PATH2D);
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE2, [this.topPart.symbols.circle2], Canvas.TOP_MARKER_SYMBOL_CIRCLE2_PATH2D);
            this.canvas.getCanvasTopArea().drawLines(Canvas.TOP_MARKER_SYMBOL_CIR2_CROSS_LINE, cir2CrossLinePoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

function drawBottomPart(){
    let txtPoints = this.bottomPart.calTxtPoints(this.data.getDataSet(), this.bottomPart.texts.dates);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasBottomArea().drawTexts(Canvas.BOTTOM_MARKER_TEXT, txtPoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

function drawLeftPart(){
    let marOnePoints = this.leftPart.calMarPoints(this.leftPart.markers.one);
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasLeftArea().drawTexts(Canvas.LEFT_MARKER_TEXT_ONE, marOnePoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

function drawRightPart (){
    let marOnePoints = this.rightPart.calMarPoints(this.rightPart.markers.one);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasRightArea().drawTexts(Canvas.RIGHT_MARKER_TEXT_ONE, marOnePoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

function drawMainPart (gridLC){
    let gridLinePoints = this.mainPart.calGridLinePoints(gridLC);
    let barPoints = this.mainPart.calBarPoints(this.data.getDataSet(), Data.REF_EARNS, this.mainPart.dataShapes.bar);
    let cirPoints = this.mainPart.calCirPoints(this.data.getDataSet(), Data.REFERRALS, this.mainPart.dataShapes.circle);
    
    let cirSPoints = this.mainPart.calCirPoints(this.data.getDataSet(), Data.REFERRALS, this.mainPart.dataShapes.circle);
    let cirSplinePoints = this.mainPart.calCirSplinePoints(cirSPoints, this.mainPart.dataShapes.cirSpline);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasMainArea().drawLines(Canvas.MAIN_LINE, gridLinePoints);
            this.canvas.getCanvasMainArea().drawRects(Canvas.MAIN_BAR, barPoints);
            
            this.canvas.getCanvasMainArea().drawCircles(Canvas.MAIN_CIRCLE, cirPoints);
            this.canvas.getCanvasMainArea().drawSpline(Canvas.MAIN_CIRCLE_SPLINE, cirSplinePoints, Canvas.MAIN_CIR_SPLINE_PATH2D);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};



function BountiesChart(bountiesCanvas, dataRange) {
    Chart.call(this, new HtmlCanvasElement(bountiesCanvas));
    this.getTopPart().texts = topTexts;
    this.getTopPart().symbols = topSymbols;
    
    this.getBottomPart().texts = bottomTexts;
    
    this.getLeftPart().markers = leftMarkers;
    this.getLeftPart().verMars = verMars;
    
    this.getRightPart().markers = rightMarkers;
    this.getRightPart().verMars = verMars;
    
    this.getMainPart().dataShapes = mainDataShapes;
    
    this.data.setDataSet(this.data.getDataSet(dataRange));
    
    let dataSet = this.data.getDataSet();
    let max = Util.findMax(dataSet, Data.REF_EARNS);
    let marInfo = Util.makeMarInfo(max, Data.REF_EARNS, Util.BOUNTIES_CHART);
    let gridLC = marInfo.gLineC;
    this.getLeftPart().markers.one.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.bar.maxRange = marInfo.maxRange;

    max = Util.findMax(dataSet, Data.REFERRALS);
    marInfo = Util.makeMarInfo(max, Data.REFERRALS, Util.BOUNTIES_CHART);
    this.getRightPart().markers.one.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.circle.maxRange = marInfo.maxRange;
    
    this.canvas.resize();
    this.draw(gridLC);
}
BountiesChart.prototype = Object.create(Chart.prototype);
BountiesChart.prototype.constructor = BountiesChart;



BountiesChart.prototype.draw = function(gridLC){
    this.getTopPart().baseX = 890;
    this.drawTopPart = drawTopPart;
    this.drawTopPart();
    
//    setData(this.data.getDataSet());
    this.drawBottomPart();
//    setData(this.data.getDataSet(), true);

    this.drawLeftPart = drawLeftPart;
    this.drawLeftPart();
    
    this.drawRightPart = drawRightPart;
    this.drawRightPart();
    
    this.drawMainPart = drawMainPart;
    this.drawMainPart(gridLC);
    
    

    var rcl = new ReportChartListener();
    rcl.chartType = "Bounties Chart";
    this.getMainPart().addChartListener(rcl);
    this.getMainPart().registerChartListener();
    
    this.getTopPart().addChartListener(rcl);
    
    let topMarSymCir = {
        sym: Canvas.TOP_MARKER_SYMBOL_CIRCLE
    };
    
    let topMarSymCir2 =  {
        sym: Canvas.TOP_MARKER_SYMBOL_CIRCLE2,
        spline: Canvas.MAIN_CIRCLE_SPLINE
    };
    
//    this.getTopPart().registerChartListener(topMarSymCir, topMarSymCir2);
};


// this function sets the month name of the data itme with the day number
// functions as the resetter also.
function setData(dataS, reset){
    let dayFirstOrigStr = dataS[0].day;
    let monOfDayFirst = dataS[0].month;
    dataS[0].day = dayFirstOrigStr.substring(0, 2) + ' ' + monOfDayFirst;
    
    let dayLastOrigStr = '';
    if(dataS.length <= 7){
        dayLastOrigStr = dataS[dataS.length - 1].day;
        let monOfDayLast = dataS[dataS.length - 1].month;
        dataS[dataS.length - 1].day = dayLastOrigStr.substring(0, 2) + ' ' + monOfDayLast;
    }

    let dayOneOrigStr = '';
    let dayOneArrInd = 0;
    let monOfDayOne = 0;

    for (let i = 1; i < dataS.length; i++) {
        if (dataS[i].day === '01') {
            dayOneOrigStr = dataS[i].day;
            dayOneArrInd = i;
            monOfDayOne = dataS[i].month;
            dataS[i].day = dayOneOrigStr.substring(0, 2) + ' ' + monOfDayOne;
            break;
        }
    }

    if (reset === true) {
        dataS[0].day = dayFirstOrigStr.substring(0, 2);
        if(dataS.length <= 7){
            dataS[dataS.length - 1].day = dayLastOrigStr.substring(0, 2);
        }
        if (dayOneArrInd !== 0) {
            dataS[dayOneArrInd].day = dayOneOrigStr.substring(0, 2);
        }
    }
}



export {BountiesChart};
    




