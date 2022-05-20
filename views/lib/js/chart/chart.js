
import {Data} from "./data/data.js";

import {TopPart} from "./calculate/top-part.js";
import {BottomPart} from "./calculate/bottom-part.js";
import {LeftPart} from "./calculate/left-part.js";
import {RightPart} from "./calculate/right-part.js";
import {MainPart} from "./calculate/main-part.js";

import {Canvas} from "./shape/canvas.js";
import {Konva} from "./shape/konva.js";
import {SVG} from "./shape/svg.js";



// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function Chart(canE){
    this.canE = canE.getHtmlCanvasElement();
    this.x = canE.getX();
    this.y = canE.getY();
    this.width = canE.getWidth();
    this.height = canE.getHeight();
    
    this.data = new Data();
    
    this.topPart = new TopPart(this, 50);
    this.bottomPart = new BottomPart(this, 50);
    this.leftPart = new LeftPart(this);
    this.rightPart = new RightPart(this);
    this.mainPart = new MainPart(this);

    this.canvas = new Canvas(this.canE);
    this.konva = new Konva();
    this.svg = new SVG();
}



// these filds holds the inctance of data, calculation of points for different 
// area of drawing and diffrent paper and are instanciated by constructor function
//Chart.prototype.dataSet;
//Chart.prototype.chartTop;
//Chart.prototype.chartRight;
//Chart.prototype.chartBottom;
//Chart.prototype.chartLeft;
//Chart.prototype.chartMain;
//Chart.prototype.canvas;
//Chart.prototype.konva;
//Chart.prototype.svg;



Chart.prototype.getX = function(){
    return this.x;
};

Chart.prototype.getY = function(){
    return this.y;
};

Chart.prototype.getWidth = function(){
    return this.width;
};
Chart.prototype.setWidth = function(width){
    this.width = width;
};

Chart.prototype.getHeight = function(){
    return this.height;
};
Chart.prototype.setHeight = function(height){
    this.width = height;
};



// return the data object not the dataSet object.
Chart.prototype.getData = function(){
    return this.data;
};

Chart.prototype.getTopPart = function(){
    return this.topPart;
};

Chart.prototype.getBottomPart = function(){
    return this.bottomPart;
};

Chart.prototype.getLeftPart = function(){
    return this.leftPart;
};

Chart.prototype.getRightPart = function(){
    return this.rightPart;
};

Chart.prototype.getMainPart = function(){
    return this.mainPart;
};

Chart.prototype.getCanvas = function(){
    return this.canvas;
};

Chart.prototype.getKonva = function(){
    return this.konva;
};

Chart.prototype.getSVG = function(){
    return this.SVG;
};

Chart.prototype.getPaper = function(){
    return this.canE;
};

// setters
Chart.prototype.setData = function(data){
    this.data = data;
};

Chart.prototype.setTopPart = function(topPart){
    this.topPart = topPart;
};

Chart.prototype.setBottomPart = function(bottomPart){
    this.bottomPart = bottomPart;
};

Chart.prototype.setLeftPart = function(leftPart){
    this.leftPart = leftPart;
};

Chart.prototype.setRightPart = function(rightPart){
    this.rightPart = rightPart;
};

Chart.prototype.setMainPart = function(mainPart){
    this.mainPart = mainPart;
};

Chart.prototype.setCanvas = function(canvas){
    this.canvas = canvas;
};

Chart.prototype.setKonva = function(konva){
    this.konva = konva;
};

Chart.prototype.setSVG = function(SVG){
    this.SVG = SVG;
};

Chart.prototype.setPaper = function(canE){
    this.canE = canE;
};



Chart.prototype.drawTopPart = function(){
    this.getTopPart().adjustCoords();
    let borderOnePoints = this.topPart.calBorderPoints(this.topPart.borders.one);
    let cirCrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.circle);
    let barCrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.bar);
    let kiteCrossLinePoints = this.topPart.calSymCrossLinePoints(this.topPart.symbols.kite);
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
//            this.canvas.getCanvasTopArea().drawEmpRects(Canvas.TOP_BORDER, borderOnePoints);
            
            // drawing texts for chart top markers.
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_FEES, [this.topPart.texts.fees]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_COMMISSIONS, [this.topPart.texts.commissions]);
            this.canvas.getCanvasTopArea().drawTexts(Canvas.TOP_MARKER_TEXT_BOUNTIES, [this.topPart.texts.bounties]);

            // drawing symbols getting their coords according to the visula type from the main symbol array
            this.canvas.getCanvasTopArea().drawCirPaths(Canvas.TOP_MARKER_SYMBOL_CIRCLE, [this.topPart.symbols.circle], Canvas.TOP_MARKER_SYMBOL_CIRCLE_PATH2D);
            this.canvas.getCanvasTopArea().drawLines(Canvas.TOP_MARKER_SYMBOL_CIR_CROSS_LINE, cirCrossLinePoints);
            
            this.canvas.getCanvasTopArea().drawRectPaths(Canvas.TOP_MARKER_SYMBOL_BAR, [this.topPart.symbols.bar], Canvas.TOP_MARKER_SYMBOL_BAR_PATH2D);
            this.canvas.getCanvasTopArea().drawLines(Canvas.TOP_MARKER_SYMBOL_BAR_CROSS_LINE, barCrossLinePoints);
            
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


Chart.prototype.drawBottomPart = function(){
    let borderOnePoints = this.bottomPart.calBorderPoints(this.bottomPart.borders.one);
    let txtPoints = this.bottomPart.calTxtPoints(this.data.getDataSet(), this.bottomPart.texts.dates);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
//            this.canvas.getCanvasBottomArea().drawEmpRects(Canvas.BOTTOM_BORDER, borderOnePoints);
            this.canvas.getCanvasBottomArea().drawTexts(Canvas.BOTTOM_MARKER_TEXT, txtPoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

Chart.prototype.drawLeftPart = function(){
    let borderOnePoints = this.leftPart.calBorderPoints(this.leftPart.borders.one);
    let verMarOnePoints = this.leftPart.calVerMarPoints(this.leftPart.verMars.one);
    let marOnePoints = this.leftPart.calMarPoints(this.leftPart.markers.one);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
//            this.canvas.getCanvasLeftArea().drawEmpRects(Canvas.LEFT_BORDER, borderOnePoints);
            this.canvas.getCanvasLeftArea().drawRotTexts(Canvas.LEFT_VER_MARKER_TEXT_ONE, verMarOnePoints);
            this.canvas.getCanvasLeftArea().drawTexts(Canvas.LEFT_MARKER_TEXT_ONE, marOnePoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

Chart.prototype.drawRightPart = function(){
    let borderOnePoints = this.rightPart.calBorderPoints(this.rightPart.borders.one);
    let marOnePoints = this.rightPart.calMarPoints(this.rightPart.markers.one);
    let marTwoPoints = this.rightPart.calMarPoints(this.rightPart.markers.two);
    let verMarOnePoints = this.rightPart.calVerMarPoints(this.rightPart.verMars.one);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
//            this.canvas.getCanvasRightArea().drawEmpRects(Canvas.RIGHT_BORDER, borderOnePoints);
            this.canvas.getCanvasRightArea().drawTexts(Canvas.RIGHT_MARKER_TEXT_ONE, marOnePoints);
            this.canvas.getCanvasRightArea().drawTexts(Canvas.RIGHT_MARKER_TEXT_TWO, marTwoPoints);
            this.canvas.getCanvasRightArea().drawRotTexts(Canvas.RIGHT_VER_MARKER_TEXT_ONE, verMarOnePoints);
            break;
        case 'Layer':
        // TODO: drawing on konva
            break;
        case 'SVG':
        // TODO: drawing on SVG
    }
};

Chart.prototype.drawMainPart = function(dataItemRange){
    let borderOnePoints = this.mainPart.calBorderPoints(this.mainPart.borders.one);
    let gridLinePoints = this.mainPart.calGridLinePoints(4);
    let barPoints = this.mainPart.calBarPoints(this.data.getDataSet(), Data.SELL_EARNS, this.mainPart.dataShapes.bar);
    let cirPoints = this.mainPart.calCirPoints(this.data.getDataSet(), Data.CLICKS, this.mainPart.dataShapes.circle);
    let kitePoints = this.mainPart.calKitePoints(this.data.getDataSet(), Data.COMMISSIONS, this.mainPart.dataShapes.kite);
    let cirSplinePoints = this.mainPart.calCirSplinePoints(cirPoints, this.mainPart.dataShapes.cirSpline);
    let kiteSplinePoints = this.mainPart.calKiteSplinePoints(kitePoints, this.mainPart.dataShapes.kiteSpline);
    
    let name = this.getPaper().constructor.name;
    switch (name) {
        case 'HTMLCanvasElement':
//            this.canvas.getCanvasMainArea().drawEmpRects(Canvas.MAIN_BORDER, borderOnePoints);
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



export {Chart};
