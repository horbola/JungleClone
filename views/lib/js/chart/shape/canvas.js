
// this class represnts all coordinates for an html canvas

// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function Canvas(canvasArea){
    this.canvasArea = canvasArea;
    this.shapes = new Map();
}


// this is the main canvas area object for an area
// defined by html canvas element. this is an html canvas object.
// *type: HTMLCanvasElement
// **Canvas.prototype.canvasArea;

// these fields holds canvas class instance. each of which
// represents a portion of this canvas area. these are
// returned by associted accessor methods
// *type: Canvas
// **Canvas.prototype.canvasTopArea;
// **Canvas.prototype.canvasRightArea;
// **Canvas.prototype.canvasBottomArea;
// **Canvas.prototype.canvasLeftArea;
// **Canvas.prototype.canvasMainArea;

// a Map object which contains points for diffrent shape.
// **Canvas.prototype.shapes;

// these static fields is used for name selection
// which is used as a key of 'shapes' 'Map' object.
Canvas.TOP_BORDER = 1;
Canvas.TOP_MARKER_TEXT = 2;
Canvas.TOP_MARKER_TEXT_BOUNTIES = 3;
Canvas.TOP_MARKER_TEXT_COMMISSIONS = 4;
Canvas.TOP_MARKER_TEXT_FEES = 5;
Canvas.TOP_MARKER_TEXT_CLICKS = 51;
Canvas.TOP_MARKER_TEXT_ORDERED_ITEMS = 55;
Canvas.TOP_MARKER_TEXT_EARNINNGS = 56;
Canvas.TOP_MARKER_TEXT_REFFS = 57;
Canvas.TOP_MARKER_SYMBOL = 6;
Canvas.TOP_MARKER_SYMBOL_BAR = 7;
Canvas.TOP_MARKER_SYMBOL_BAR_PATH2D = 29;
Canvas.TOP_MARKER_SYMBOL_CIRCLE = 8;
Canvas.TOP_MARKER_SYMBOL_CIRCLE2 = 53;
Canvas.TOP_MARKER_SYMBOL_CIRCLE_PATH2D = 29;
Canvas.TOP_MARKER_SYMBOL_CIRCLE2_PATH2D = 54;
Canvas.TOP_MARKER_SYMBOL_KITE = 9;
Canvas.TOP_MARKER_SYMBOL_KITE_PATH2D = 29;
Canvas.TOP_MARKER_SYMBOL_CIR_CROSS_LINE = 40;
Canvas.TOP_MARKER_SYMBOL_CIR2_CROSS_LINE = 52;
Canvas.TOP_MARKER_SYMBOL_BAR_CROSS_LINE = 41;
Canvas.TOP_MARKER_SYMBOL_KITE_CROSS_LINE = 42;
Canvas.LEFT_BORDER = 10;
Canvas.LEFT_MARKER_TEXT_ONE = 11;
Canvas.LEFT_MARKER_TEXT_TWO = 12;
Canvas.LEFT_VER_MARKER_TEXT_ONE = 13;
Canvas.LEFT_VER_MARKER_TEXT_TWO = 14;
Canvas.RIGHT_BORDER = 13;
Canvas.RIGHT_MARKER_TEXT_ONE = 15;
Canvas.RIGHT_MARKER_TEXT_TWO = 16;
Canvas.RIGHT_VER_MARKER_TEXT_ONE = 17;
Canvas.RIGHT_VER_MARKER_TEXT_TWO = 18;
Canvas.BOTTOM_BORDER = 19;
Canvas.BOTTOM_MARKER_TEXT = 20;
Canvas.MAIN_LINE = 27;
Canvas.MAIN_BORDER = 21;
Canvas.MAIN_BAR = 22;
Canvas.MAIN_BAR2 = 60;
Canvas.MAIN_CIRCLE = 23;
Canvas.MAIN_KITE = 24;
Canvas.MAIN_CIRCLE_SPLINE = 25;
Canvas.MAIN_KITE_SPLINE = 26;
Canvas.MAIN_CIR_SPLINE_PATH2D = 27;
Canvas.MAIN_KITE_SPLINE_PATH2D = 28;



// sets the canvas on which drawing should be redered.
// parameter 'canvasArea' is made by and taken from 'chart/main.js'.
Canvas.prototype.setCanvasArea = function(canvasArea){
    if(this.canvasArea !== null)
        this.canvasArea = canvasArea;
};

// returns the html canvas area object on which drawing should be redered.
Canvas.prototype.getCanvasArea = function(){
    return this.canvasArea;
};

// retrive the context of canvas to be used
Canvas.prototype.getContext = function(){
    return this.canvasArea.getContext("2d");
};

Canvas.prototype.resize = function () {
    let w = this.getContext().canvas.width;
    let h = this.getContext().canvas.height;
    this.getContext().canvas.width = w;
    this.getContext().canvas.height = h;
};

// creates a context on the fly for some utility operation.
Canvas.prototype.createContext = function(){
    return document.createElement('canvas').getContext('2d');
};





// returns the canvas top area of this canvas's area
Canvas.prototype.getCanvasTopArea = function(){
    if(!this.canvasTopArea)
        this.canvasTopArea = new Canvas(this.canvasArea);
    return this.canvasTopArea;
};
// returns the canvas right area of this canvas's area
Canvas.prototype.getCanvasRightArea = function(){
    if(!this.canvasRightArea)
        this.canvasRightArea = new Canvas(this.canvasArea);
    return this.canvasRightArea;
};
// returns the canvas bottom area of this canvas's area
Canvas.prototype.getCanvasBottomArea = function(){
    if(!this.canvasBottomArea)
        this.canvasBottomArea = new Canvas(this.canvasArea);
    return this.canvasBottomArea;
};
// returns the canvas left area of this canvas's area
Canvas.prototype.getCanvasLeftArea = function(){
    if(!this.canvasLeftArea)
        this.canvasLeftArea = new Canvas(this.canvasArea);
    return this.canvasLeftArea;
};
// returns the canvas main area of this canvas's area
Canvas.prototype.getCanvasMainArea = function(){
    if(!this.canvasMainArea)
        this.canvasMainArea = new Canvas(this.canvasArea);
    return this.canvasMainArea;
};




// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawTexts = function(name, texts){
    if(!this.shapes.has(name)) this.shapes.set(name, texts);
    this.getContext().save();
    for (var text of this.shapes.get(name)) {
        this.getContext().font = text.font;
        this.getContext().fillStyle = text.fillStyle;
        this.getContext().fillText(text.text, text.x, text.y);
    }
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawRotTexts = function(name, texts){
    if(!this.shapes.has(name)) this.shapes.set(name, texts);
    this.getContext().save();
    for (var text of this.shapes.get(name)) {
        this.getContext().translate(text.x, text.y);
        this.getContext().rotate(text.rotation * (Math.PI/180));
        this.getContext().fillStyle = text.fillStyle;
        this.getContext().font = text.font;
        this.getContext().fillText(text.text, 0, 0);
    }
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawLines = function(name, lines){
    if(!this.shapes.has(name)) this.shapes.set(name, lines);
    this.getContext().save();
    for (var line of this.shapes.get(name)) {
        this.getContext().beginPath();
        this.getContext().moveTo(line.startX, line.startY);
        this.getContext().lineTo(line.endX, line.endY);
        this.getContext().strokeStyle = line.strokeStyle;
        this.getContext().stroke();
    }
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
// BUG_ALERT...
Canvas.prototype.drawSpline = function(name, splinePoints, splineName){
    if(!this.shapes.has(name)) this.shapes.set(name, splinePoints);
    this.getContext().save();
    
    this.getContext().lineWidth = splinePoints[0].lineWidth;
    // move to the first point
    let splinePath = new Path2D();
    splinePath.moveTo((splinePoints[0].x), splinePoints[0].y);
    for (var i = 0; i < this.shapes.get(name).length-1; i++){
        var x_mid = (splinePoints[i].x + splinePoints[i + 1].x) / 2;
        var y_mid = (splinePoints[i].y + splinePoints[i + 1].y) / 2;
        var cp_x1 = (x_mid + splinePoints[i].x) / 2;
        var cp_x2 = (x_mid + splinePoints[i + 1].x) / 2;
        splinePath.quadraticCurveTo(cp_x1, splinePoints[i].y, x_mid, y_mid);
        splinePath.quadraticCurveTo(cp_x2, splinePoints[i + 1].y, splinePoints[i + 1].x, splinePoints[i + 1].y);
    }
    this.getContext().strokeStyle = splinePoints[0].strokeStyle;
    this.getContext().stroke(splinePath);
    this.getContext().restore();
    this.shapes.set(splineName, splinePath);
};



Canvas.prototype.drawSplineVer1 = function(name, splinePoints){
    if(!this.shapes.has(name)) this.shapes.set(name, splinePoints);
    this.getContext().save();
    // move to the first point
    this.getContext().moveTo(splinePoints[0].x, splinePoints[0].y);
    let i = 0;
    for(i = 1; i < this.shapes.get(name).length-2; i++){
        var xc = (splinePoints[i].x + splinePoints[i+1].x) / 2;
        var yc = (splinePoints[i].y + splinePoints[i+1].y) / 2;
        this.getContext().quadraticCurveTo(splinePoints[i].x, splinePoints[i].y, xc, yc);
    }
     // curve through the last two points
    this.getContext().quadraticCurveTo(splinePoints[i].x, splinePoints[i].y, splinePoints[i+1].x, splinePoints[i+1].y);
    this.getContext().stroke();
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawCircles = function(name, circles){
    if(!this.shapes.has(name)) this.shapes.set(name, circles);
    this.getContext().save();
    
    for (var circle of this.shapes.get(name)) {
        this.getContext().beginPath();
        this.getContext().arc(circle.x, circle.y, circle.width, 0, 2 * Math.PI);
        this.getContext().fillStyle = circle.fillStyle;
        this.getContext().fill();
    }
    this.getContext().restore();
};

// clears a circles already drawn.
Canvas.prototype.clearCircle = function(name){
    if(this.shapes.has(name)){
        for (var circle of this.shapes.get(name)) {
//            debugger;
//            this.getContext().globalCompositeOperation = 'destination-out';
//            this.getContext().arc(circle.x, circle.y, circle.width, 0, Math.PI * 2, true);
//            this.getContext().fill();
        }
    }
    this.shapes.delete(name);
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawCirPaths = function(name, circles, pathName){
    if(!this.shapes.has(name)) this.shapes.set(name, circles);
    this.getContext().save();
    
    let circlePath = new Path2D();
    for (var circle of this.shapes.get(name)) {
        this.getContext().beginPath();
        circlePath.arc(circle.x, circle.y, circle.width, 0, 2 * Math.PI);
        this.getContext().fillStyle = circle.fillStyle;
        this.getContext().fill(circlePath);
    }
    this.shapes.set(pathName, circlePath);
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawRects = function(name, rects){
    if(!this.shapes.has(name)) this.shapes.set(name, rects);
    this.getContext().save();
    
    for (var rect of this.shapes.get(name)) {
        this.getContext().fillStyle = rect.fillStyle;
        this.getContext().fillRect(rect.x, rect.y, rect.width, rect.height);
    }
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawRectPaths = function(name, rects, pathName){
    if(!this.shapes.has(name)) this.shapes.set(name, rects);
    this.getContext().save();
    
    let rectPath = new Path2D();
    for (var rect of this.shapes.get(name)) {
        this.getContext().fillStyle = rect.fillStyle;
        rectPath.rect(rect.x, rect.y, rect.width, rect.height);
        this.getContext().fill(rectPath);
    }
    this.shapes.set(pathName, rectPath);
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawEmpRects = function(name, borders){
    if(!this.shapes.has(name)) this.shapes.set(name, borders);
    this.getContext().save();
    
    for (var border of this.shapes.get(name)) {
        this.getContext().beginPath();
        this.getContext().lineWidth = border.lineWidth;
        this.getContext().strokeStyle = border.strokeStyle;
        this.getContext().rect(border.x, border.y, border.width, border.height);
        this.getContext().stroke();
    }
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawKite = function(name, kites){
    if(!this.shapes.has(name)) this.shapes.set(name, kites);
    this.getContext().save();
    for (var kite of this.shapes.get(name)) {
        let x = kite.x;
        let y = kite.y;
        let r = kite.width;
        
        this.getContext().beginPath();
        
        this.getContext().moveTo(x - r, y);
        this.getContext().lineTo(x, y + r);
        this.getContext().lineTo(x + r, y);
        this.getContext().lineTo(x, y - r);
        
//        debugger;
        this.getContext().fillStyle = kite.fillStyle;
        this.getContext().fill();
    }
    this.getContext().restore();
};

// if a name and points is provided and no points is already in the map
// then first it stores the points in the shape map and draw the shapes
// taking points from the shape map. if a name is provided but no points
// then it draws the shapes taking points from the shape map previously stored
Canvas.prototype.drawKitePaths = function(name, kites, pathName){
    if(!this.shapes.has(name)) this.shapes.set(name, kites);
    this.getContext().save();
    
    let kitePath = new Path2D();
    for (var kite of this.shapes.get(name)) {
        let x = kite.x;
        let y = kite.y;
        let r = kite.width;
        
        this.getContext().beginPath();
        
        kitePath.moveTo(x - r, y);
        kitePath.lineTo(x, y + r);
        kitePath.lineTo(x + r, y);
        kitePath.lineTo(x, y - r);
        
        this.getContext().fillStyle = kite.fillStyle;
        this.getContext().fill(kitePath);
    }
    this.shapes.set(pathName, kitePath);
    this.getContext().restore();
};


export {Canvas};
