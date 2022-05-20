
import {VisitorHome2Carosel} from "./carousel.js"



var slideCont = "#caro .slider .image-container";
var slides = "#caro .slider .image-container img";
var circleSelector = "#caro .dots .circle";

var vh2c = new VisitorHome2Carosel(slideCont, slides, circleSelector);
vh2c.setAutoSlideInterval(3000);

$(circleSelector).click(function(){
    vh2c.changeSlide($(this).index());
});



