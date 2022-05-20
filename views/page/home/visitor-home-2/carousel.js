
import {Carousel} from "./../../../lib/js/carousel.js"

function VisitorHome2Carosel(slideCont, slides, circleSelector){
    Carousel.call(this, slideCont, slides);
    this.circleSelector = circleSelector;
}
VisitorHome2Carosel.prototype = Object.create(Carousel.prototype);
VisitorHome2Carosel.prototype.constructor = VisitorHome2Carosel;



VisitorHome2Carosel.prototype.displaySlide = function(index){
    this.current_slide_index = index;
    let $slides = $(this.slide_selector);
    if(this.current_slide_index > $slides.length-1) this.current_slide_index = 0;
    if(this.current_slide_index < 0) this.current_slide_index = $slides.length - 1;
    
    // use this code in case of a fading slide.
    // slides.each(function (indx, value) {
    //     $(value).css("display", "none");
    // });
    // document.querySelectorAll(this.slide_selector)[this.current_slide_index].style.display = "block";
    
    var amount = -this.current_slide_index * 1100;
    $(this.slide_container_selector).css('left', amount);
};

VisitorHome2Carosel.prototype.next = function (nextIndex) {
    let nextIn = this.current_slide_index + nextIndex;
    this.displaySlide(nextIn);

    let btns = document.querySelectorAll(this.circleSelector);
    btns.forEach(function (elem, index, arr) {
        btns[index].classList.remove("active");
    });

    btns[nextIn - 1].classList.add("active");
};

// if nextIndex is positive then the slide will travel forward
// and if negative the slide will travel backward.




export {VisitorHome2Carosel};