
import {HtmlCanvasElement} from "./../../lib/js/chart/HtmlElement/html-canvas-element.js";
import {ReportChartListener} from "./../../lib/js/chart/event/report-chart-listener.js";
import {Chart} from "./../../lib/js/chart/chart.js";
import {Part} from "./../../lib/js/chart/calculate/part.js";
import {XParts} from "./../../lib/js/chart/calculate/x-parts.js";
import {Canvas} from "./../../lib/js/chart/shape/canvas.js";
import {Data} from "./../../lib/js/chart/data/data.js";
import {Util} from "./../../lib/js/chart/util/util.js";


var topTexts = {
    commissions: {
        text: "Commissions",
        x: 0,
        y: 25,
        font: '12px arial',
        fillStyle: "#111",
        paddingLeft: 10,
        paddingRight: 10,
        get totTextArea() {
            return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;
        }
    },
    bounties: {
        text: "Bounties",
        x: 0,
        y: 25,
        font: '12px arial',
        fillStyle: "#111",
        paddingLeft: 10,
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
        width: 6,
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
        txtArr: [],
        txtBase: 2000,
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
        fillStyle: "#d05254",
        paddingLeft: 0,
        paddingRight: 0,
        get totMarArea() {
            return this.marMaxWidth + this.paddingLeft + this.paddingRight;
        }
    },
    two: {
        txtArr: [],
        txtBase: 150,
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
        fillStyle: "#f0b83a",
        paddingLeft: 0,
        paddingRight: 10,
        get totMarArea() {
            return this.marMaxWidth + this.paddingLeft + this.paddingRight;
        }
    }
};

var mainDataShapes = {
    bar: {
        maxRange: 1000,
        fillStyle: "#58e2c2"
    },
    bar2: {
        maxRange: 1000,
        fillStyle: "#71a8e6"
    },
    gridLine: {
        count: 4,
        strokeStyle: '#ddd',
        strokeWidth: 1
    }
};



function drawTopPart(){
    this.getTopPart().adjustCoords();
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            // drawing texts for chart top markers.
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_COMMISSIONS, [this.topPart.texts.commissions]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_BOUNTIES, [this.topPart.texts.bounties]);

            // drawing symbols getting their coords according to the visula type from the main symbol array
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE, [this.topPart.symbols.circle], Canvas.TOP_MARKER_SYMBOL_CIRCLE_PATH2D);
//            debugger;
            let l = [this.topPart.symbols.circle2];
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE2, [this.topPart.symbols.circle2], Canvas.TOP_MARKER_SYMBOL_CIRCLE2_PATH2D);
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
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
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
    let barPoints = this.mainPart.calBarPoints(this.data.getDataSet(), Data.COMMISSIONS, this.mainPart.dataShapes.bar);
    let bar2Points = this.mainPart.calBarPoints(this.data.getDataSet(), Data.BOUNTIES, this.mainPart.dataShapes.bar2, true);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasMainArea().drawLines(Canvas.MAIN_LINE, gridLinePoints);
            this.canvas.getCanvasMainArea().drawRects(Canvas.MAIN_BAR, barPoints);
            this.canvas.getCanvasMainArea().drawRects(Canvas.MAIN_BAR2, bar2Points);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};








function SummaryChart(summaryCanvas, dataRange) {
    Chart.call(this, new HtmlCanvasElement(summaryCanvas));
    this.getTopPart().texts = topTexts;
    this.getTopPart().symbols = topSymbols;
    
    this.getBottomPart().texts = bottomTexts;
    
    this.getLeftPart().markers = leftMarkers;
    this.getLeftPart().verMars = verMars;
    
    this.getRightPart().verMars = verMars;
    this.getRightPart().markers = rightMarkers;
    
    this.getMainPart().dataShapes = mainDataShapes;
    this.getMainPart().calBarPoints = calBarPoints;
    
    this.data.setDataSet(this.data.getDataSet(dataRange));
    
    let dataSet = this.data.getDataSet();
    let max = Util.findMax(dataSet, Data.COMMISSIONS);
    let marInfo = Util.makeMarInfo(max, Data.COMMISSIONS, Util.SUMMARY_CHART);
    let gridLC = marInfo.gLineC;
    this.getLeftPart().markers.one.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.bar.maxRange = marInfo.maxRange;
    
    max = Util.findMax(dataSet, Data.COMMISSIONS);
    marInfo = Util.makeMarInfo(max, Data.BOUNTIES, Util.SUMMARY_CHART);
    this.getMainPart().dataShapes.bar2.maxRange = marInfo.maxRange;
    
    this.canvas.resize();
    this.draw(gridLC);
}
SummaryChart.prototype = Object.create(Chart.prototype);
SummaryChart.prototype.constructor = SummaryChart;



SummaryChart.prototype.draw = function(gridLC){
    this.getTopPart().baseX = 860;
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
    rcl.chartType = "Summary Chart";
    this.getMainPart().addChartListener(rcl);
    this.getMainPart().registerChartListener();
};



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



export {SummaryChart};
    











function calBarPoints(dataSet, dataName, dataShape, bar2){
    let width = this.getWidth();
    let height = this.getHeight();
    let numOfData = dataSet.length;
    let barWidth = width/numOfData;
    let barPadding = barWidth/4;
    let filledBarWidth = barWidth/4;
    
    let filledBar2Width = 0;
    if(bar2)
        filledBar2Width = filledBarWidth;
    
    let barPoints = [];
    for(let v = 0; v < numOfData; v++){
        let uprLeftCorX = this.getX() + barPadding + (v*barWidth) + filledBar2Width;
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

