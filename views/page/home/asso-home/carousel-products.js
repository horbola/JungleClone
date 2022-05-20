
import {Carousel} from "./../../../lib/js/carousel.js";

function CaroProdCarousel(slidesCont, slides){
    Carousel.call(this, slidesCont, slides);
}
CaroProdCarousel.prototype = Object.create(Carousel.prototype);
CaroProdCarousel.prototype.constructor = CaroProdCarousel;



CaroProdCarousel.prototype.displaySlide = function (index) {
    this.current_slide_index = index;
    
    let contWidth = $(this.slide_container_selector).width();
    var parentWidth = $('section.carousel-products').width();
    let modulus = parseInt(contWidth / parentWidth);
    
    if (this.current_slide_index > modulus - 1)
        this.current_slide_index = 0;
    if (this.current_slide_index < 0)
        this.current_slide_index = modulus - 1;
    
    var amount = -this.current_slide_index * parentWidth;
    $(this.slide_container_selector).css('left', amount);
};


export {CaroProdCarousel};


