
import {Carousel} from "./../../../lib/js/carousel.js";
import {CaroProdCarousel} from "./carousel-products.js";
import {MainChart} from "./earnings-overview.js";
import {Util} from "./../../../lib/js/chart/util/util.js"
import {Data} from "./../../../lib/js/chart/data/data.js";




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



var fees = ".earnings-overview .canvas-bottom .total-fees .amount";
var bounties = ".earnings-overview .canvas-bottom .total-bounties .amount";
var clicks = ".earnings-overview .canvas-bottom .total-clicks .amount";

var shipped = ".earnings-overview .month-summary .shipped.price";
var earning = ".earnings-overview .month-summary .earning.price";
var ordered = ".earnings-overview .month-summary .ordered.price";
var clicksAside = ".earnings-overview .month-summary .clicks.price";
var conversion = ".earnings-overview .month-summary .conversion.price";

var lastUpdated = ".earnings-overview .month-summary .footer-msg .last-updated";

let data = new Data();
let dataSet = data.getDataSet(dataRange);
let calculatedData = calcData(dataSet);

$(fees).text("$" + numberWithCommas(calculatedData.sellEarnings + ".29"));
$(bounties).text("$" + numberWithCommas(calculatedData.bounties + ".00"));
$(clicks).text(numberWithCommas(calculatedData.clicks));

$(shipped).text(numberWithCommas(calculatedData.shipped));
$(earning).text("$" + numberWithCommas(calculatedData.sellEarnings + ".00"));
$(ordered).text(numberWithCommas(calculatedData.orderedItems));
$(clicksAside).text(numberWithCommas(calculatedData.clicks));
$(conversion).text(numberWithCommas(calculatedData.conversion + "%"));

function calcData(dataSet) {
    let clicks = 0;
    let orderedItems = 0;
    let sellEarnings = 0;
    let bounties = 0;
    let referrals = 0;
    let referralEarnings = 0;
    let shipped = 0;
    let returned = 0;
    let conversion = 0;
    let shippedRev = 0;
    let bonus = 0;

    for (let i = 0; i < dataSet.length; i++) {
        clicks += dataSet[i].clicks;
        orderedItems += dataSet[i].ordered_items;
        sellEarnings += dataSet[i].sell_earnings;
        bounties += dataSet[i].bounties;
        referrals += dataSet[i].referrals;
        referralEarnings += dataSet[i].referral_earnings;
        shipped += dataSet[i].shipped;
        returned += dataSet[i].returned;
        shippedRev += dataSet[i].shippedRev;
        bonus += dataSet[i].bonus;
    }
    conversion = (clicks / orderedItems);
    conversion = conversion.toFixed(2);
    let calculatedData = {
        clicks: clicks,
        orderedItems: orderedItems,
        sellEarnings: sellEarnings,
        bounties: bounties,
        referrals: referrals,
        referralEarnings: referralEarnings,
        shipped: shipped,
        returned: returned,
        conversion: conversion,
        shippedRev: shippedRev,
        bonus: bonus
    };
    return calculatedData;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

buildDateStr();

function buildDateStr() {
    let date = new Date();
    let dat = date.getDate();
    let month = convToMonStr(date.getMonth());
    let year = date.getFullYear();
    let dateString = month +" " +dat +" " +year;
    $(lastUpdated).text("Last updated: " + dateString);
}

function convToMonStr(monNum){
    switch(monNum){
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
}
