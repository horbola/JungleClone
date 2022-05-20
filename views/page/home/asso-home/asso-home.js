
import {Carousel} from "./../../../lib/js/carousel.js";
import {CaroProdCarousel} from "./carousel-products.js";
import {MainChart} from "./earnings-overview.js";
import {Util} from "./../../../lib/js/chart/util/util.js"



var homeMenu = "#main-nav .home";
var homeMenuDD = "#main-nav .home .drop-btn";
var homeMenuLi = "#main-nav li";
$(function(){
    $(homeMenu).addClass('home-focus');
    $(homeMenu).css('background-color', '#ececec');
    $(homeMenuDD).css('color', '#222e2e');
    // unset color #222e3e;
});

$(homeMenuLi).click(function(){
    $(homeMenu).removeClass('home-focus');
    $(homeMenu).css('background-color', '#222e3e');
    $(homeMenuDD).css('color', '#fff');
});



var slidesCont = "#caro .slider .image-container";
var slides = "#caro .slider .image-container .slide";
var $leftArrow = $("#caro .angle-left");
var $rightArrow = $("#caro .angle-right");
var $btns = $("#caro .slider .buttons .btn");

var carousel = new Carousel(slidesCont, slides);
carousel.setAutoSlideInterval(3000);

$leftArrow.click(function(){
    carousel.next(-1);
});

$rightArrow.click(function(){
    carousel.next(+1);
});

$btns.click(function(){
    carousel.changeSlide($(this).index());
});



var $tab1 = $('#product-link-search-content-tab');
var $tab2 = $('#nav-profile-tab');
$(function(){
    $tab2.css('color', '#444');
});
$tab1.click(function(){
    $tab2.css('color', '#444');
    $tab1.css('color', '#c45500');
});

$tab2.click(function(){
    $tab1.css('color', '#444');
    $tab2.css('color', '#c45500');
});


var caroProdSlidesCont = "section.carousel-products .imgs";
var caroProdSlides = "section.carousel-products .imgs .slide";
var $caroProdLeftArrow = $('section.carousel-products .controls .left-control');
var $caroProdRightArrow = $('section.carousel-products .controls .right-control');

var caroProd = new CaroProdCarousel(caroProdSlidesCont, caroProdSlides);

$caroProdLeftArrow.click(function(){
    caroProd.next(-1);
});

$caroProdRightArrow.click(function(){
    caroProd.next(+1);
});







let dataRange = {
    get backDate() {
        let today = new Date();
        let back = new Date();
        back.setDate(today.getDate() - 30);
        return back;
    },
    get pastMonth() {
        return Util.convToMonStr(this.pastMonthInd).toLowerCase();
    },
    get pastMonthInd() {
        return this.backDate.getMonth();
    },
    get pastMonthStart() {
        return this.backDate.getDate();
    },

    get today() {
        let today = new Date();
        today.setDate(today.getDate()-1);
        return new Date(today);
    },
    get currMonth() {
        return Util.convToMonStr(this.currMonthInd).toLowerCase();
    },
    get currMonthInd() {
        return this.today.getMonth();
    },
    get currMonthEnd() {
        return this.today.getDate();
    },

    start: 1,
    count: 5,
    get end() {
        return this.start + this.count;
    }
};

var mainChart = new MainChart(dataRange);



