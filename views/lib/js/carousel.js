
function Carousel(slide_container_selector, slide_selector){
    this.slide_container_selector = slide_container_selector;
    this.slide_selector = slide_selector;
    this.adjContWidth();
}


Carousel.prototype.current_slide_index = 0;

Carousel.prototype.displaySlide = function(index){
    this.current_slide_index = index;
    let $slides = $(this.slide_selector);
    if(this.current_slide_index > $slides.length-1) this.current_slide_index = 0;
    if(this.current_slide_index < 0) this.current_slide_index = $slides.length - 1;
    
    // use this code in case of a fading slide.
    // slides.each(function (indx, value) {
    //     $(value).css("display", "none");
    // });
    // document.querySelectorAll(this.slide_selector)[this.current_slide_index].style.display = "block";
    
    var amount = -this.current_slide_index * 1070;
    $(this.slide_container_selector).css('left', amount);
};

// if nextIndex is positive then the slide will travel forward
// and if negative the slide will travel backward.
Carousel.prototype.next = function(nextIndex){
    this.displaySlide(this.current_slide_index + nextIndex);
};

Carousel.prototype.changeSlide = function(changingIndex) {
    this.current_slide_index = changingIndex;
    this.next(0);
};



Carousel.prototype.sIntervId = 0;
Carousel.prototype.setAutoSlideInterval = function(intervalTime) {
    this.sIntervId = setInterval(this.next.bind(this,+1), intervalTime);
};

Carousel.prototype.stopAutoSliding = function() {
    clearInterval(this.sIntervId);
};



export {Carousel};






Carousel.prototype.adjContWidth = function() {
    let outerThis = this;
    var slidesWidth = 0;
    $.map($(this.slide_selector), function (elem, index) {
        slidesWidth += outerThis.getSlideWidth(elem);
    });
    $(this.slide_container_selector).width(slidesWidth);
};

Carousel.prototype.getSlideWidth = function(slide) {
    let slideWidth = $(slide).css('width');
    slideWidth = slideWidth.substring(0, slideWidth.length - 2);

    let marginLeft = $(slide).css('margin-left');
    marginLeft = marginLeft.substring(0, marginLeft.length - 2);

    let marginRight = $(slide).css('margin-right');
    marginRight = marginRight.substring(0, marginRight.length - 2);
    return Number(slideWidth) + 
           Number(marginLeft) + 
           Number(marginRight);
};

