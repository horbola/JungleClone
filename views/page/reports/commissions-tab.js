
import {HtmlCanvasElement} from "./../../lib/js/chart/HtmlElement/html-canvas-element.js";
import {ReportChartListener} from "./../../lib/js/chart/event/report-chart-listener.js";
import {Chart} from "./../../lib/js/chart/chart.js";
import {Part} from "./../../lib/js/chart/calculate/part.js";
import {XParts} from "./../../lib/js/chart/calculate/x-parts.js";
import {Canvas} from "./../../lib/js/chart/shape/Canvas.js";
import {Data} from "./../../lib/js/chart/data/Data.js";
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
    clicks: {
        text: "Clicks",
        x: 0,
        y: 25,
        font: '12px arial',
        fillStyle: "#111",
        paddingLeft: 6,
        paddingRight: 10,
        get totTextArea() {
            return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;
        }
    },
    orderedItems: {
        text: "Ordered Items",
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
        fillStyle: "#d05254",
        paddingLeft: 30,
        paddingRight: 0,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "circle2"
    },
    kite: {
        x: 0,
        y: 25,
        width: 4,
        height: 25,
        fillStyle: "#f0b83a",
        paddingLeft: 25,
        paddingRight: 0,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "kite"
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
        txtArr: ["0", "500", "1k", "2k"],
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
        paddingLeft: 10,
        paddingRight: 10,
        get totMarArea() {
            return this.marMaxWidth + this.paddingLeft + this.paddingRight;
        }
    },
    two: {
        txtArr: ["0", "500", "1k", "2k"],
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
        maxRange: 2000,
        fillStyle: "#58e2c2"
    },
    circle: {
        width: 5,
        height: 5,
        maxRange: 500,
        strokeWidth: 2,
        fillStyle: "#d05254"
    },
    kite: {
        width: 5,
        height: 5,
        maxRange: 500,
        strokeWidth: 2,
        fillStyle: "#f0b83a"
    },
    cirSpline: {
        strokeStyle: "#d05254",
        lineWidth: 2
    },
    kiteSpline: {
        strokeStyle: "#f0b83a",
        lineWidth: 2
    },
    gridLine: {
        count: 4,
        strokeStyle: '#ddd',
        strokeWidth: 1
    }
};

function drawTopPart(){
    this.getTopPart().adjustCoords();
    let cir2CrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.circle2, 3, 1);
    let kiteCrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.kite, 3, 1);
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            // drawing texts for chart top markers.
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_EARNINNGS, [this.topPart.texts.earnings]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_CLICKS, [this.topPart.texts.clicks]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_ORDERED_ITEMS, [this.topPart.texts.orderedItems]);

            // drawing symbols getting their coords according to the visula type from the main symbol array
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE, [this.topPart.symbols.circle], Canvas.TOP_MARKER_SYMBOL_CIRCLE_PATH2D);
            
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE2, [this.topPart.symbols.circle2], Canvas.TOP_MARKER_SYMBOL_CIRCLE2_PATH2D);
            this.canvas.getCanvasTopArea().drawLines(Canvas.TOP_MARKER_SYMBOL_CIR2_CROSS_LINE, cir2CrossLinePoints);
            
            this.canvas.getCanvasTopArea().drawKitePaths(Canvas.TOP_MARKER_SYMBOL_KITE, [this.topPart.symbols.kite], Canvas.TOP_MARKER_SYMBOL_KITE_PATH2D);
            this.canvas.getCanvasTopArea().drawLines(Canvas.TOP_MARKER_SYMBOL_KITE_CROSS_LINE, kiteCrossLinePoints);
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
    let marTwoPoints = this.rightPart.calMarPoints(this.rightPart.markers.two);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasRightArea().drawTexts(Canvas.RIGHT_MARKER_TEXT_ONE, marOnePoints);
            this.canvas.getCanvasRightArea().drawTexts(Canvas.RIGHT_MARKER_TEXT_TWO, marTwoPoints);
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
    let barPoints = this.mainPart.calBarPoints(this.data.getDataSet(), Data.SELL_EARNS, this.mainPart.dataShapes.bar);
    let cirPoints = this.mainPart.calCirPoints(this.data.getDataSet(), Data.CLICKS, this.mainPart.dataShapes.circle);
    let kitePoints = this.mainPart.calKitePoints(this.data.getDataSet(), Data.ORDRD_ITEMS, this.mainPart.dataShapes.kite);
    
    let cirSPoints = this.mainPart.calCirPoints(this.data.getDataSet(), Data.CLICKS, this.mainPart.dataShapes.circle);
    let cirSplinePoints = this.mainPart.calCirSplinePoints(cirSPoints, this.mainPart.dataShapes.cirSpline);
    
    let kiteSPoints = this.mainPart.calKitePoints(this.data.getDataSet(), Data.ORDRD_ITEMS, this.mainPart.dataShapes.kite);
    let kiteSplinePoints = this.mainPart.calKiteSplinePoints(kiteSPoints, this.mainPart.dataShapes.kiteSpline);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasMainArea().drawLines(Canvas.MAIN_LINE, gridLinePoints);
            this.canvas.getCanvasMainArea().drawRects(Canvas.MAIN_BAR, barPoints);
            this.canvas.getCanvasMainArea().drawCircles(Canvas.MAIN_CIRCLE, cirPoints);
            this.canvas.getCanvasMainArea().drawKite(Canvas.MAIN_KITE, kitePoints);
            
            this.canvas.getCanvasMainArea().drawSpline(Canvas.MAIN_CIRCLE_SPLINE, cirSplinePoints, Canvas.MAIN_CIR_SPLINE_PATH2D);
            this.canvas.getCanvasMainArea().drawSpline(Canvas.MAIN_KITE_SPLINE, kiteSplinePoints, Canvas.MAIN_KITE_SPLINE_PATH2D);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};





function CommissionsChart(commissionsCanvas, dataRange) {
    Chart.call(this, new HtmlCanvasElement(commissionsCanvas));
    
    this.getTopPart().texts = topTexts;
    this.getTopPart().symbols = topSymbols;
    
    this.getBottomPart().texts = bottomTexts;
    
    this.getLeftPart().markers = leftMarkers;
    this.getLeftPart().verMars = verMars;
    
    this.getRightPart().markers = rightMarkers;
    this.getRightPart().verMars = verMars;
    
    this.getMainPart().dataShapes = mainDataShapes;
    
    this.data.setStallData(dataRange.selectedStall);
    
//    debugger;
    
    this.data.setDataSet(this.data.getDataSet(dataRange));
    
    let dataSet = this.data.getDataSet();
    let max = Util.findMax(dataSet, Data.SELL_EARNS);
    let marInfo = Util.makeMarInfo(max, Data.SELL_EARNS, Util.COMMISSIONS_CHART);
    let gridLC = marInfo.gLineC;
    this.getLeftPart().markers.one.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.bar.maxRange = marInfo.maxRange;
    
    max = Util.findMax(dataSet, Data.CLICKS);
    marInfo = Util.makeMarInfo(max, Data.CLICKS, Util.COMMISSIONS_CHART);
    this.getRightPart().markers.one.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.circle.maxRange = marInfo.maxRange;

    max = Util.findMax(dataSet, Data.ORDRD_ITEMS);
    marInfo = Util.makeMarInfo(max, Data.ORDRD_ITEMS, Util.COMMISSIONS_CHART);
    this.getRightPart().markers.two.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.kite.maxRange = marInfo.maxRange;
    
    this.draw(gridLC);
}
CommissionsChart.prototype = Object.create(Chart.prototype);
CommissionsChart.prototype.constructor = CommissionsChart;



CommissionsChart.prototype.draw = function(gridLC){
    this.getTopPart().baseX = 787;
    this.drawTopPart = drawTopPart;
    this.drawTopPart();
    
    this.drawBottomPart();

    this.drawLeftPart = drawLeftPart;
    this.drawLeftPart();
    
    this.drawRightPart = drawRightPart;
    this.drawRightPart();
    
    this.drawMainPart = drawMainPart;
    this.drawMainPart(gridLC);

    var rcl = new ReportChartListener();
    rcl.chartType = "Commissions Chart";
    this.getMainPart().addChartListener(rcl);
//    let barPoints = this.canvas.getCanvasMainArea().shapes.get(Canvas.MAIN_BAR);
    this.getMainPart().registerChartListener(/*barPoints*/);
    
    this.getTopPart().addChartListener(rcl);
    
    let topMarSymCir = {
        sym: Canvas.TOP_MARKER_SYMBOL_CIRCLE,
        spline: Canvas.MAIN_CIRCLE_SPLINE
    };
    
    let topMarSymCir2 = {
        sym: Canvas.TOP_MARKER_SYMBOL_CIRCLE2,
        spline: Canvas.MAIN_KITE_SPLINE
    };
    
//    this.getTopPart().registerChartListener(topMarSymCir, topMarSymCir2);
};





export {CommissionsChart};
    
