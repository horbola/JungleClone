
import {HtmlCanvasElement} from "./../../../lib/js/chart/HtmlElement/html-canvas-element.js";
import {ReportChartListener} from "./../../../lib/js/chart/event/report-chart-listener.js";
import {Chart} from "./../../../lib/js/chart/chart.js";
import {Part} from "./../../../lib/js/chart/calculate/part.js";
import {XParts} from "./../../../lib/js/chart/calculate/x-parts.js";
import {Data} from "./../../../lib/js/chart/data/data.js";
import {Canvas} from "./../../../lib/js/chart/shape/canvas.js";
import {Util} from "./../../../lib/js/chart/util/util.js";


var topTexts = {
    commissions: {
        text: "Commissions",
        x: 0,
        y: 25,
        font: '12px arial',
        fillStyle: '#111',
        paddingLeft: 0,
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
        fillStyle: '#111',
        paddingLeft: 5,
        paddingRight: 0,
        get totTextArea() {
            return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;
        }
    },
    clicks: {
        text: "Clicks",
        x: 0,
        y: 25,
        font: '12px arial',
        fillStyle: '#111',
        paddingLeft: 5,
        paddingRight: 0,
        get totTextArea() {
            return Part.calTxtWidth(this.text) + this.paddingLeft + this.paddingRight;
        }
    }
};

var topSymbols = {
    circle: {
        x: 0,
        y: 25,
        width: 4,
        height: 25,
        fillStyle: "#58e2c2",
        paddingLeft: 0,
        paddingRight: 6,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "circle"
    },
    kite: {
        x: 0,
        y: 25,
        width: 4,
        height: 25,
        fillStyle: "#71a8e6",
        paddingLeft: 25,
        paddingRight: 0,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "kite"
    },
    circle2: {
        x: 0,
        y: 25,
        width: 6,
        height: 25,
        fillStyle: "#ddd",
        paddingLeft: 30,
        paddingRight: 0,
        get totSymAreaX(){return this.width + this.paddingLeft + this.paddingRight;},
        type: "circle2"
    }
};

var bottomTexts = {
    dates: {
        strokeWidth: 4,
        fillStyle: '#aaa',
        font: '11px arial'
    }
};

var leftMarkers = {
    one: {
        txtArr: ['0', '$50.00', '$100.00', '$150.00', '$200.00', '$250.00'],
        txtBase: 500,
        txtExt: 0.00,
        shortener: 'k',
        marUnit: '$',
        marCount: 5,
        baseX: 0,
        marMaxWidthCache: 0,
        get marMaxWidth() {
            if (this.marMaxWidthCache === 0) {
                this.marMaxWidthCache = XParts.calMaxTxtWidth(XParts.buildMarTxtArr(this));
            }
            return this.marMaxWidthCache;
        },
        font: '11px arial',
        fillStyle: '#aaa',
        paddingLeft: 0,
        paddingRight: 15,
        get totMarArea() {
            return this.marMaxWidth + this.paddingLeft + this.paddingRight;
        }
    }
};

var leftVerMars = {
    one: {
        text: 'Earnings',
        baseX: 0,
        translateX: 50,
        translateY: 30,
        rotation: -90,
        alinmentConst: 1,
        strokeWidth: 1,
        font: '14px arial',
        fillStyle: '#aaa',
        fontFamily: 'arial',
        get txtHeight(){return Part.calTxtHeight(this.text);},
        paddingLeft: 20,
        paddingRight: 0,
        get totVerMarArea(){return this.txtHeight + this.paddingLeft + this.paddingRight;}
    }
};

var rightMarkers = {
    one: {
        txtArr: ['0', '250', '500', '750', '1k', '1k'],
        txtBase: 1000,
        shortener: 'k',
        marUnit: '$',
        marCount: 5,
        baseX: 0,
        marMaxWidthCache: 0,
        get marMaxWidth() {
            if (this.marMaxWidthCache === 0) {
                this.marMaxWidthCache = XParts.calMaxTxtWidth(XParts.buildMarTxtArr(this));
            }
            return this.marMaxWidthCache;
        },
        font: '11px arial',
        fillStyle: '#aaa',
        paddingLeft: 15,
        paddingRight: 0,
        get totMarArea() {
            return this.marMaxWidth + this.paddingLeft + this.paddingRight;
        }
    }
};

var rightVerMars = {
    one: {
        text: 'Clicks',
        baseX: 0,
        translateX: 50,
        translateY: 30,
        rotation: 90,
        alinmentConst: -1,
        strokeWidth: 1,
        stroke: '#999',
        font: '14px arial',
        fillStyle: '#aaa',
        fontFamily: 'arial',
        get txtHeight(){return Part.calTxtHeight(this.text);},
        paddingLeft: 10,
        paddingRight: 10,
        get totVerMarArea(){return this.txtHeight + this.paddingLeft + this.paddingRight;}
    }
};

var mainDataShapes = {
    bar: {
        maxRange: 1000,
        fillStyle: "#ddd"
    },
    circle: {
        width: 5,
        height: 5,
        maxRange: 250,
        strokeWidth: 2,
        fillStyle: "#58e2c2"
    },
    kite: {
        width: 5,
        height: 5,
        maxRange: 100,
        strokeWidth: 2,
        fillStyle: "#71a8e6"
    },
    cirSpline: {
        strokeStyle: "#58e2c2",
        lineWidth: 2
    },
    kiteSpline: {
        strokeStyle: "#71a8e6",
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
    let cirCrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.circle, 3, 1);
    let kiteCrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.kite, 3, 1);
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
//            this.canvas.getCanvasTopArea().drawEmpRects(Canvas.TOP_BORDER, borderOnePoints);
            
            // drawing texts for chart top markers.
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_CLICKS, [this.topPart.texts.clicks]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_COMMISSIONS, [this.topPart.texts.commissions]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_BOUNTIES, [this.topPart.texts.bounties]);

            // drawing symbols getting their coords according to the visula type from the main symbol array
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE, [this.topPart.symbols.circle], Canvas.TOP_MARKER_SYMBOL_CIRCLE_PATH2D);
            this.canvas.getCanvasTopArea().drawLines(Canvas.TOP_MARKER_SYMBOL_CIR_CROSS_LINE, cirCrossLinePoints);
            
            this.canvas.getCanvasTopArea().drawKitePaths(Canvas.TOP_MARKER_SYMBOL_KITE, [this.topPart.symbols.kite], Canvas.TOP_MARKER_SYMBOL_KITE_PATH2D);
            this.canvas.getCanvasTopArea().drawLines(Canvas.TOP_MARKER_SYMBOL_KITE_CROSS_LINE, kiteCrossLinePoints);
            
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE2, [this.topPart.symbols.circle2], Canvas.TOP_MARKER_SYMBOL_CIRCLE2_PATH2D);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

function drawRightPart(){
    let marOnePoints = this.rightPart.calMarPoints(this.rightPart.markers.one);
    let verMarOnePoints = this.rightPart.calVerMarPoints(this.rightPart.verMars.one);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
            this.canvas.getCanvasRightArea().drawTexts(Canvas.RIGHT_MARKER_TEXT_ONE, marOnePoints);
            this.canvas.getCanvasRightArea().drawRotTexts(Canvas.RIGHT_VER_MARKER_TEXT_ONE, verMarOnePoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

function drawMainPart(gridLC){
    let gridLinePoints = this.mainPart.calGridLinePoints(gridLC);
    let cirPoints = this.mainPart.calCirPoints(this.data.getDataSet(), Data.COMMISSIONS, this.mainPart.dataShapes.circle);
    let kitePoints = this.mainPart.calKitePoints(this.data.getDataSet(), Data.BOUNTIES, this.mainPart.dataShapes.kite);
    let barPoints = this.mainPart.calBarPoints(this.data.getDataSet(), Data.CLICKS, this.mainPart.dataShapes.bar);
    
    let cirSPoints = this.mainPart.calCirPoints(this.data.getDataSet(), Data.COMMISSIONS, this.mainPart.dataShapes.circle);
    let cirSplinePoints = this.mainPart.calCirSplinePoints(cirSPoints, this.mainPart.dataShapes.cirSpline);
    
    let kiteSPoints = this.mainPart.calKitePoints(this.data.getDataSet(), Data.BOUNTIES, this.mainPart.dataShapes.kite);
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





function MainChart(dataRange) {
    Chart.call(this, new HtmlCanvasElement("canvas"));
    
    this.getTopPart().texts = topTexts;
    this.getTopPart().symbols = topSymbols;
    this.getTopPart().baseX = 440;
    this.getBottomPart().texts = bottomTexts;
    this.getBottomPart().setHeight(115);
    
    this.getLeftPart().markers = leftMarkers;
    this.getLeftPart().verMars = leftVerMars;
    
    this.getRightPart().markers = rightMarkers;
    this.getRightPart().verMars = rightVerMars;
    
    this.getMainPart().dataShapes = mainDataShapes;
    
    this.data.setDataSet(this.data.getDataSet(dataRange));
    
    let dataSet = this.data.getDataSet();
    let max = Util.findMax(dataSet, Data.COMMISSIONS);
    let marInfo = Util.makeMarInfo(max, Data.COMMISSIONS, Util.MAIN_CHART);
    let gridLC = marInfo.gLineC;
    this.getLeftPart().markers.one.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.circle.maxRange = marInfo.maxRange;
    
    max = Util.findMax(dataSet, Data.BOUNTIES);
    marInfo = Util.makeMarInfo(max, Data.BOUNTIES, Util.MAIN_CHART);
    this.getMainPart().dataShapes.kite.maxRange = marInfo.maxRange;
    
    max = Util.findMax(dataSet, Data.CLICKS);
    marInfo = Util.makeMarInfo(max, Data.CLICKS, Util.MAIN_CHART);
    this.getRightPart().markers.one.txtArr = marInfo.txtArr;
    this.getMainPart().dataShapes.bar.maxRange = marInfo.maxRange;
    
    this.draw(gridLC);
}
MainChart.prototype = Object.create(Chart.prototype);
MainChart.prototype.constructor = MainChart;



MainChart.prototype.draw = function(gridLC){
    this.drawTopPart = drawTopPart;
    this.drawTopPart();
    
    this.drawBottomPart();
    
    this.drawLeftPart();
    
    this.drawRightPart = drawRightPart;
    this.drawRightPart();
    
    this.drawMainPart = drawMainPart;
    this.drawMainPart(gridLC);

    var rcl = new ReportChartListener();
    rcl.chartType = "Main Chart";
    this.getMainPart().addChartListener(rcl);
    this.getMainPart().registerChartListener();
//    this.getTopPart().addChartListener(rcl);
    
    
    let topMarSymCir = {
        sym: Canvas.TOP_MARKER_SYMBOL_CIRCLE,
        spline: Canvas.MAIN_CIRCLE_SPLINE
    };
    let topMarSymBar = {
        sym: Canvas.TOP_MARKER_SYMBOL_KITE,
        spline: Canvas.MAIN_KITE_SPLINE
    };
    let topMarSymKite = {
        sym: Canvas.TOP_MARKER_SYMBOL_CIRCLE2
    };
    
//    this.getTopPart().registerChartListener(topMarSymCir, topMarSymBar, topMarSymKite);
};



export {MainChart};
    


