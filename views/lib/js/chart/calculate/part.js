
// chartTop and chartBottom aquire the full width of the
// complete chart width and take height in neccessary amount
// to draw it's chart top and bottom marker. the rest height
// of the chart is allocated to chartLeft, chartMain and chartRight
// portion. that means chartWidth === chartLeft + chartMain + chartRight.
// the height of each of these three parts is the same so
// theseThreePartHeight === chartHeight - chartTop - chartBottom.
// so it resembles like diagram below.

/*
 * 
---------------------------------
---------------------------------
|  |                          |  |                             
|  |                          |  |
|  |                          |  |
|  |                          |  |
|  |                          |  |
|  |                          |  |
----------------------------------
----------------------------------
 *
 */

// constructor function must be at the top of a file. this is a module file.
// if not, preceding properties can't be found.
function Part(chart){
    this.chart = chart;
}



Part.prototype.x = 0;
Part.prototype.getX = function(){
    return this.x;
};
Part.prototype.setX = function(x){
    this.x = x;
};

Part.prototype.y = 0;
Part.prototype.getY = function(){
    return this.y;
};
Part.prototype.setY = function(y){
    this.y = y;
};

Part.prototype.width = 0;
Part.prototype.getWidth = function(){
    return this.width;
};
Part.prototype.setWidth = function(width){
    this.width = width;
};

Part.prototype.height = 0;
Part.prototype.getHeight = function(){
    return this.height;
};
Part.prototype.setHeight = function(height){
    this.height = height;
};

Part.prototype.calBorderPoints = function(border){
    let thiss = this;
    let borderPoint = {
        x: thiss.getX(),
        y: thiss.getY(),
        width: thiss.getWidth(),
        height: thiss.getHeight(),
        strokeStyle: border.strokeStyle,
        lineWidth: border.lineWidth
    };
    return [borderPoint];
};

Part.prototype.addChartListener = function(chartListener){
    if(!this.chartListener)
        this.chartListener = [];
    this.chartListener.push(chartListener);
};

Part.prototype.registerChartListener = function(){
    // TODO: implement from subclass.
};




Part.createContext = function(){return document.createElement('canvas').getContext('2d');};

Part.calTxtWidth = function(text){
    let c = Part.createContext();
    let txtMetrics = c.measureText(text);
    return txtMetrics.width;
};

Part.calTxtHeight = function(text){
    let c = Part.createContext();
    let txtMetrics = c.measureText(text);
    // fontHeight gets you the bounding box height that is constant regardless of the string being rendered.
    let fontHeight = txtMetrics.fontBoundingBoxAscent + txtMetrics.fontBoundingBoxDescent;
    // actualHeight is specific to the string being rendered.
    let actualHeight = txtMetrics.actualBoundingBoxAscent + txtMetrics.actualBoundingBoxDescent;
    return actualHeight;
};



export {Part};
