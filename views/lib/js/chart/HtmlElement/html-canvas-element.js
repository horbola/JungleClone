
function HtmlCanvasElement(canvas){
    this.htmlCanvasElement = document.getElementById(canvas);
}

HtmlCanvasElement.prototype.getHtmlCanvasElement = function(){
    return this.htmlCanvasElement;
};

HtmlCanvasElement.prototype.getX = function(){
    return $(this.htmlCanvasElement).position().left;
};

HtmlCanvasElement.prototype.getY = function(){
    return $(this.htmlCanvasElement).position().top;
};

HtmlCanvasElement.prototype.getWidth = function(){
    return $(this.htmlCanvasElement).width();
};

HtmlCanvasElement.prototype.getHeight = function(){
    return $(this.htmlCanvasElement).height();
};



export {HtmlCanvasElement};
