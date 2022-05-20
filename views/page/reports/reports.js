
// importing from the three charts
import {Data} from "./../../lib/js/chart/data/data.js";


import {SummaryChart} from './summary-tab.js';
import {CommissionsChart} from './commissions-tab.js';
import {BountiesChart} from './bounties-tab.js';
import {Tabs} from './tabs.js';

import {Commissions} from './tabs-frags/commissions/commissions.js';
import {Bounties} from './tabs-frags/bounties/bounties.js';
import {Summary} from './tabs-frags/summary/summary.js';

let chartLoader = '.chart-loader';
let glasspane = '.glasspane';
let tabHeadUpdTime = 'section.tabs .sec-header .days .update .time';
let resModel = 'section.tabs .sec-header .result-span-model';
let resPan = '.result-span-panel';
let last7day = '.result-span-panel .last-7-day';
let resPanLi = '.result-span-panel li';
let resPanUpLi = '.result-span-panel li.date-preset-up-li';
let resPanLiSel = '.result-span-panel li.selectd';
let cirOut = '.circle-out';
let applyBtn = '.result-span-panel .commands .apply-btn';


// let trackIdModHover = 'section.tabs .tracking-id-model .tracking-id-panel';
let trackIdMod = 'section.tabs .tracking-id-model';
let trackId = 'section.tabs .tracking-id-model .tracking-id';
let trackIdPan = 'section.tabs .tracking-id-panel';
let selectedStallSel = 'section.tabs .tracking-id-panel .selectedStall';
let trackIdPanLi = 'section.tabs .tracking-id-panel li';
let trackApplyBtn = 'section.tabs .tracking-id-panel .apply-btn';

let SecTabs = "section.tabs";
let tabs = 'section.tabs .sec-tab .tab';
let summTabControl = 'section.tabs .sec-tab .summary';
let commTabControl = 'section.tabs .sec-tab .commissions';
let bounTabControl = 'section.tabs .sec-tab .bounties';
let dynamic = "section.tabs .dynamic";
let tabsAttrSel = '.sec-content [class*="-tab"]';

let sum_tab = ".summary-tab";
let com_tab = ".commissions-tab";
let boun_tab = ".bounties-tab";

let comTab= "section.tabs .sec-content .commissions-tab";
let sumTab= "section.tabs .sec-content .summary-tab";
let bounTab = "section.tabs .sec-content .bounties-tab";

let tabHeadTopic = 'section.tabs .sec-header .topic';
let tabHideBorder = 'section.tabs .sec-tab .tab .hide-border';
let hideBorder = '.hide-border';
let tabTitle = '.title';
let resTitDate = '.result-span-panel .title .date';
let resCloseBtn = '.result-span-panel .title .close-btn';

let daySel = '.day';
let todaySel = '.today';
let rawDateSel = '.raw-date';
let dataRangeCountSel = '.data-range-count';
let dateRangeSel = '.date-range';
let resPanLiDRCountSel = '.result-span-panel li .data-range-count';
let resPanLiRawDate = '.result-span-panel li .raw-date';

let resModDate = '.sec-header .result-span-model .date';
let resModRange = '.sec-header .result-span-model .range';


let datePresetUpLi = '.date-preset-up-li';
let datePresetUpCirOut = '.date-preset-up-li .circle-out';
let datePresetUpDRCount = '.date-preset-up-li .pre-data-range-count';
let datePresetUpRawDate = '.date-preset-up-li .pre-raw-date';
let datePresetUpDay = '.date-preset-up-li .pre-day';
let datePresetUpDateRange = '.date-preset-up-li .pre-date-range';

let presetDropDMenu = '.preset-dropdown-menu';
let datePreset = '.date-preset';
let datePresetBtn = '.date-preset .button';
let presetLi = '.result-span-panel .preset-li';
let presetLiSelcted = '.date-preset .preset-li.selectd';
let presetLiRawDatePrevSel = '.result-span-panel .preset-li .preset-raw-date-prev';
let presetLiRawDateRecentSel = '.result-span-panel .preset-li .preset-raw-date-recent';

let presetDataRangeCountSel = '.preset-data-range-count';
let presetRawDatePrevSel = '.preset-raw-date-prev';
let presetRawDateRecentSel = '.preset-raw-date-recent';
let presetDaySel = '.preset-day';
let presetDateRangeSel = '.preset-date-range';


let sumCanStr = "summary-canvas";
let comCanStr = "commissions-canvas";
let bounCanStr = "bounties-canvas";

let sumCan = "section.tabs .sec-content .summary-tab #summary-canvas";
let comCan = "section.tabs .sec-content .commissions-tab #commissions-canvas";
let bounCan = "section.tabs .sec-content .bounties-tab #bounties-canvas";


let rectOutSel = '.rect-out';
let rectFillSel = '.rect-fill';






$(document).on("click", function (e) {
    if (e.target === document || e.target.tagName === "BODY" || e.target.tagName === "HTML") {
        // Clicked on blank space
        $(presetDropDMenu).css('display', 'none');
        $(resPan).css('display', 'none');
        presetLiClicked = false;
    }
});

function updatingLastUpdate(){
    let date = new Date();
    let dat = date.getDate();
    let month = convToMonStr(date.getMonth());
    let year = date.getFullYear();
    let dateString = month +" " +dat +" " +year +" +00:00";
    $(tabHeadUpdTime).text(dateString);
}






$(resModel).hover(function (e) {
    $(resPan).css('display', 'block');
    addCloseBtnBorder();
}, function (e) {
    if(!presetLiClicked) {
        $(resPan).css('display', 'none');
        $(presetDropDMenu).css('display', 'none');
    }
    $(resPanLi).find(cirOut).css('box-shadow', '');
});

// adjusts the display and box-shadow of .'circle-fill' and '.circle-out'
$(resPanLi).click(function(event){
    $(resPanLi).removeClass('selectd');
    $(this).addClass('selectd');
    // removing the box shadow of previ ously selected item
    $(resPanLi).find(cirOut).css('box-shadow', '');
    $(this).find(cirOut).css('box-shadow', '0px 0px 4px 1px #C55601');
    
    if($(this).is(resPanUpLi)){
        processPresetDates();
        return;
    }
    else updatePanelTitle($(this));
    
    clearCloseBtnBorder();
});

let presetLiClicked = false;
$(datePresetBtn).click(function(){
    $(resPan).css('display', 'block');
    $(presetDropDMenu).css('display', 'block');
    presetLiClicked = true;
});

$(presetLi).click(function(event){
    exchangePresetDates(this);
    updatePanelTitleFromPreset();
    $(presetDropDMenu).css('display', 'none');
    let presetDayTxt = $(this).children('.preset-day').text();
    let presetDateRangeTxt = $(this).children('.preset-date-range').text();
    let datePresetBtnTxt = presetDayTxt + ' ( ' + presetDateRangeTxt + ' )';
    $(datePresetBtn).text(datePresetBtnTxt);
    presetLiClicked = true;
});

$(applyBtn).click(function(event){
    if(event.hasOwnProperty('originalEvent'))
        loader();
    $(resPan).css('display', 'none');
    $(presetDropDMenu).css('display', 'none');
    updateHeaderDate($(resPanLiSel), $(resPanLi));
    updateChart();
});

$(trackId).click(function(){
    
});

// handles showing data stall-wise.
var liSet = new Set();
var selectedIdx = -1;
var $selectedNode = null;
$(trackIdPanLi).click(function(){
    // changing the stall title in tracking id model
    $selectedNode = $(this);
    // selecting the stall in the tracking id model
    let index = $(this).index();
    selectedIdx = index;
    if (index === 0) {
        toggle(this);
        if(liSet.has(index)){
            $(trackIdPanLi).each(function(){
                toggleOff(this);
                liSet.add($(this).index());
            });
        }
        else {
            $(trackIdPanLi).each(function(){
                toggleOn(this);
                liSet.delete($(this).index());
            });
        }
    }
    else {
        if (liSet.has(index)) {
            $(trackIdPanLi).each(function(){
                toggleOff($(this));
                liSet.add($(this).index());
            });
            toggleOn(this);
            liSet.delete(index);
        } else {
            $(trackIdPanLi).each(function(){
                toggleOff($(this));
                liSet.add($(this).index());
            });
            liSet.add(index);
        }
    };
    
    updateHeadStallIdx(index);
    
    // implements the logic to control the appearance of a checkbox.
    function toggle(context){
        let idx = $(context).index();
        if (liSet.has(idx)) {
            toggleOn(context);
            liSet.delete(idx);
        } else {
            toggleOff(context);
            liSet.add(idx);
        }
    }
    
    // these funcitons control the appearance of checkbox.
    function toggleOn(context){
        $(context).find(rectFillSel).css('display', 'inline-block');
        $(context).find(rectOutSel).css('background-color', '#f8d57b');
        $(context).find(rectOutSel).css('border-color', '#111');
        $(context).find(rectOutSel).css('box-shadow', 'none');
    }
    
    function toggleOff(context){
        $(context).find(rectFillSel).css('display', 'none');
        $(context).find(rectOutSel).css('background-color', '#fff');
        $(context).find(rectOutSel).css('border-color', '#c45500');
        $(context).find(rectOutSel).css('box-shadow', '0 0 5px 3px #f8d57b');
    }
});

function updateHeadStallIdx(index){
    $(selectedStallSel).text(index);
}

$(trackApplyBtn).click(function(){
    $(trackId).text($selectedNode.text());
    $(trackIdPan).css('display', 'none');
    updateDataRange();
    updateChart();
    console.log(`dataRange.selectedStall: ${dataRange.selectedStall}, dataRange.lastYear: ${dataRange.lastYear}`);
});

$(trackIdMod).hover(function(){
    $(trackIdPan).css('display', 'block');
},
function(){
    $(trackIdPan).css('display', 'none');
});

function updateDataRange(){
    let idx = $(selectedStallSel).text();
    dataRange.selectedStall = Number(idx);
}





let dataRange = {
    pastMonth: 'jan',
    pastMonthInd: 0,
    pastMonthStart: 1,
    
    currMonth: 'dec',
    currMonthInd: 11,
    currMonthEnd: '31',
    start: 1,
    count: 5,
    get end(){return this.start + this.count;},
    sevMons: false,
    
    selectedStall: 0,
    lastYear: false
};

// this section shows tabs, charts and updates title topic
$(function(){
    updatingLastUpdate();
    upResSpanModDates();
    updateHeaderDate($(resPanLiSel), $(resPanLi));
    $(tabs).click(tabClickEffect);
    $('section.tabs .sec-tab .commissions').click();
    updatePanelTitle($(resPanLiSel));
    //showingCommissions();
//    showing = commissions;
    
    $(last7day).click();
    $(applyBtn).click();
});

$(last7day).click(function(){
    // window.alert("im clicked");
});

// values to determine showing tab
const summary = "summary";
const commissions = "commissions";
const bounties = "bounties";

// values for title topic
const summaryTopic = "Overview";
const commissionsTopic = "Commissions";
const bountiesTopic = "Bounties";

let summaryChart;
let commissionsChart;
let bountiesChart;
let currentChart;


// saving the clicked tab so that according to it hover out could be adjusted.
var $clickedTab = null;
// conroller variable to display the tab
var showing = null;
// main function to show tab, draw chart and update title topic
$(tabs).click(function(event){
    $(this).css('cursor', 'default');
    if(event.hasOwnProperty('originalEvent'))
        loader();
    if($(this).is(".summary") && (showing !== summary)){
        showingSummary();
        updateTopic(summaryTopic);
        showing = summary;
    }
    else if ($(this).is(".commissions") && (showing !== commissions)) {
        showingCommissions();
        updateTopic(commissionsTopic);
        showing = commissions;
    }
    else if ($(this).is(".bounties") && (showing !== bounties)) {
        showingBounties();
        updateTopic(bountiesTopic);
        showing = bounties;
    }
});


function loader(){
    $(chartLoader).css('display', 'block');
    $(glasspane).css('display', 'block');
    setTimeout(function(){
        $(chartLoader).css('display', 'none');
        $(glasspane).css('display', 'none');
    }, 1000);
}

// toggles '.tab-border-hover' class on summary tab, commissions tab and
// bounties tab with the event handler
$(tabs).hover(function(e){
    // if a tab is clicked once and after that another tab is clicked
    // and if the mouse pointer travels from the second tab to the
    // first tab then the tab gains the exteded hieght which was enabled by
    // on click. but if the travelling happens again it gets ok.
    $(this).addClass('tab-border-hover');
    $(this).children(hideBorder).css('display', 'block');
    $(this).css('cursor', 'default');
    if (!$(this).is($clickedTab)) {
        $(this).children(tabTitle).css('color', '#c45500');
        $(this).children(tabTitle).css('text-decoration', 'underline');
        $(this).css('cursor', 'pointer');
    }
}, function(e){
    if(!$(this).is($clickedTab)){
        $(this).css('height', '89px');
        $(this).removeClass('tab-arrow tab-border-hover');
    }
    $(this).children(hideBorder).css('display', 'none');
    $(this).children(tabTitle).css('color', '#0066c0');
    $(this).children(tabTitle).css('text-decoration', 'none');
    $($clickedTab).children(hideBorder).css('display', 'block');
    if($(this).is($clickedTab)){
        $(this).children(tabTitle).css('color', '#333');
    }
});


// adds height and '.tab-arrow' plus '.tab-border-hover' classes.
function tabClickEffect(e){
    $clickedTab = $(this);
    // removing height and classes first added by previous click.
    $(this).css('height', '91px');
    $(tabs).removeClass('tab-arrow tab-border-hover');
    
    // adding height and classes for this tab.
    $(this).css('height', '93px');
    $(this).addClass('tab-arrow tab-border-hover');
    
    $(tabHideBorder).css('display', 'none');
    $(this).children(hideBorder).css('display', 'block');
    
    $(tabs).each(function(){
        $(this).children(tabTitle).css('color', '#0066c0');
    });
    $(this).children(tabTitle).css('color', '#333');
    $(this).children(tabTitle).css('text-decoration', 'none');
}

// shows the underlying tabs of the charts
function show(tabsSelec, tabSelec){
    $(tabsSelec).each(function () {
        if ($(this).is(tabSelec))
            $(this).css('display', 'block');
        else
            $(this).css('display', 'none');
    });
}







// updates the title topic in the tab header
function updateTopic(topic){
    $(tabHeadTopic).text(topic);
}

function processPresetDates(){
    $(datePresetUpDay).css('display', 'none');
    $(datePresetUpDateRange).css('display', 'none');
//    $(presetDropDMenu).css('display', 'none');
}

function exchangePresetDates(context){
    let presetDataRangeCountTxt = $(context).find(presetDataRangeCountSel).text();
    let presetRawDatePrevTxt = $(context).find(presetRawDatePrevSel).text();
    let presetRawDateRecentTxt = $(context).find(presetRawDateRecentSel).text();
    let presetDayTxt = $(context).find(presetDaySel).text();
    let presetDateRangeTxt = $(context).find(presetDateRangeSel).text();
    
    $(datePresetUpRawDate).css('display', 'none');
    $(datePresetUpDay).css('display', 'none');
    $(datePresetUpDateRange).css('display', 'none');
    
    let txt = presetRawDatePrevTxt + " | " + presetRawDateRecentTxt;
    $(datePresetUpDRCount).text(presetDataRangeCountTxt);
    $(datePresetUpRawDate).text(txt);
    $(datePresetUpDay).text(presetDayTxt);
    $(datePresetUpDateRange).text(presetDateRangeTxt);
}

function updatePanelTitle(context){
    var dayStr = context.find('.day').text();
    var dateStr = context.find('.date-range').text();
    var title = dateStr + " (" + dayStr + ")";
    $(resTitDate).text(title);
}

function updatePanelTitleFromPreset(){
    var title = $(datePresetUpDateRange).text() + " (" + $(datePresetUpDay).text() + ")";
    $(resTitDate).text(title);
}

function clearCloseBtnBorder(){
    $(resCloseBtn).css({
        'border' : 'none',
        'box-shadow' : 'none'
    });
}

function addCloseBtnBorder(){
    $(resCloseBtn).css({
        "border": "1px solid #C45500",
        "box-shadow": "0px 0px 5px 0px #C45500"
    });
}

function updateHeaderDate(context, lis){
    if(context.is($(resPanUpLi))) {
        var presetDayStr = $(datePresetUpDay).text();
        var presetDateStr = $(datePresetUpDateRange).text();
        $(resModDate).text(presetDateStr + ' / ');
        $(resModRange).text(presetDayStr);
        updateDataRangeFromPreset();
        return;
    }
    
    var dayStr = context.find(daySel).text();
    var dateStr = context.find(dateRangeSel).text();
    $(resModDate).text(dateStr +' / ');
    $(resModRange).text(dayStr);
    updateDataRange();
    
    
    function updateDataRange() {
        let todayStr = lis.find(todaySel).text();
        let today = new Date(todayStr);
        let backStr = context.find(rawDateSel).text();
        let back = new Date(backStr);
        
        dataRange.sevMons = false;
        dataRange.pastMonth = convToMonStr(back.getMonth()).toLowerCase();
        dataRange.pastMonthInd = back.getMonth();
        dataRange.pastMonthStart = back.getDate();
        
        dataRange.currMonth = convToMonStr(today.getMonth()).toLowerCase();
        dataRange.currMonthInd = today.getMonth();
        dataRange.currMonthEnd = today.getDate();
        
        dataRange.start = back.getDate();
        
        let dataRangeCount = context.find(dataRangeCountSel).text();
        dataRange.count = Number(dataRangeCount);
    }
    function updateDataRangeFromPreset() {
        let preRawDateStr = $(datePresetUpRawDate).text();
        let todayStr = preRawDateStr.split('|')[1].trim();
        let today = new Date(todayStr);
        let backStr = preRawDateStr.split('|')[0].trim();
        let back = new Date(backStr);
        
        if(today.getMonth() !== back.getMonth()){
            dataRange.sevMons = true;
        }
        else dataRange.sevMons = false;
        
        dataRange.pastMonth = convToMonStr(back.getMonth()).toLowerCase();
        dataRange.pastMonthInd = back.getMonth();
        dataRange.pastMonthStart = back.getDate();
        
        dataRange.currMonth = convToMonStr(today.getMonth()).toLowerCase();
        dataRange.currMonthInd = today.getMonth();
        dataRange.currMonthEnd = today.getDate();
        
        dataRange.start = back.getDate();
    }
}



// updates the dates for each li element according to it's range
// and stores the dates a raw string in a span under each li so
// that later date objects could be created from this raw string
function upResSpanModDates(){
    let today = new Date();
    today.setDate(today.getDate()-1);
    
    let thisDayStr = buildDateStr(today);
    let thisDayRawStr = today.toString();
    let todayDataRangeCount = 1;
    
    
    
    let yesterday = new Date();
    yesterday = yesterday.setDate(today.getDate()-1);
    
    let yesterdayStr = buildDateStr(yesterday);
    let yesterdayRawStr = new Date(yesterday).toString();
    let yesterdayDataRangeCount = 1;
    
    
    thisDayStr = yesterdayStr;
    
    
    let sevenDayBef = new Date();
    sevenDayBef = sevenDayBef.setDate(today.getDate()-7);
    let sevenDayBefStr = buildDateStr(sevenDayBef);
    
    sevenDayBefStr = sevenDayBefStr + " - "+ yesterdayStr;
    let sevenDayBefRawStr = new Date(sevenDayBef).toString();
    let seveDayBefDataRangeCount = 7;
    
    
    
    let oneMonBef = new Date();
    oneMonBef = oneMonBef.setDate(today.getDate()-30);
    let oneMonBefStr = buildDateStr(oneMonBef);
    
    oneMonBefStr = oneMonBefStr + " - "+ yesterdayStr;
    let oneMonBefRawStr = new Date(oneMonBef).toString();
    let oneMonBefDataRangeCount = 30;
    
    
    
    
    // updates range count hidden fields
    let dataRangeCountStrArr = [
        todayDataRangeCount,
        yesterdayDataRangeCount,
        seveDayBefDataRangeCount,
        oneMonBefDataRangeCount
    ];
    $.map($(resPanLi).find(dataRangeCountSel), function(elem, index){
        $(elem).text(dataRangeCountStrArr[index]);
    });
    $(resPanLiDRCountSel).css('display', 'none');
    
    // updates raw date hidden fields
    let dateRawStrArr = [
        thisDayRawStr,
        yesterdayRawStr,
        sevenDayBefRawStr,
        oneMonBefRawStr
    ];
    $.map($(resPanLi).find(rawDateSel), function(elem, index){
        $(elem).text(dateRawStrArr[index]);
    });
    $(resPanLiRawDate).css('display', 'none');
    
    // updates date-range hidden fields
    let dateStrArr = [
        thisDayStr,
        yesterdayStr,
        sevenDayBefStr,
        oneMonBefStr
    ];
    $.map($(resPanLi).find(dateRangeSel), function(elem, index){
        $(elem).text(dateStrArr[index]);
    });
    
    // function for the sub popup
    upPresetDates();
}

function upPresetDates(){
    let today = new Date();
    today.setDate(today.getDate()-1);
    let todayStr = buildDateStr(today);
    
    let thisSundayStr = buildDateStr(findSundayOfThisWeek());
    let thisWeekStr = thisSundayStr +' - '+ todayStr;
    
    let lastSundayStr = buildDateStr(findSundayOfLastWeek());
    let lastSaturdayStr = buildDateStr(findSaturdayOfLastWeek());
    let lastWeekStr = lastSundayStr + ' - ' + lastSaturdayStr;
    
    let firstDayOfThisMonthStr = buildDateStr(findFirstDayOfThisMonth());
    let thisMonthStr = firstDayOfThisMonthStr + ' - ' + todayStr;
    
    let firstDayOfLastMonthStr = buildDateStr(findFirstDayOfLastMonth());
    let lastDayOfLastMonthStr = buildDateStr(findLastDayOfLastMonth());
    let lastMonthStr = firstDayOfLastMonthStr + ' - ' + lastDayOfLastMonthStr;
    
    let firstDayOfThisQuarterStr = buildDateStr(findFirstDayOfthisQuarter());
    let thisQuarterStr = firstDayOfThisQuarterStr + ' - ' + todayStr;
    
    let firstDayOfLastQuarterStr = buildDateStr(findFirstDayOfLastQuarter());
    let lastDayOfLastQuarterStr = buildDateStr(findLastDayOfLastQuarter());
    let lastQuarterStr = firstDayOfLastQuarterStr + ' - ' + lastDayOfLastQuarterStr;
    
    let firstDayOfThisYearStr = buildDateStr(findFirstDayOfThisYear());
    let thisYearStr = firstDayOfThisYearStr + ' - ' + todayStr;
    
    let firstDayOfLastYearStr = buildDateStr(findFirstDayOfLastYear());
    let lastDayOfLastYearStr = buildDateStr(findLastDayOfLastYear());
    let lastYearStr = firstDayOfLastYearStr + ' - ' + lastDayOfLastYearStr;
    
    let firstDateRawStrArr = [
        findSundayOfThisWeek(),
        findSundayOfLastWeek(),
        findFirstDayOfThisMonth(),
        findFirstDayOfLastMonth(),
        findFirstDayOfthisQuarter(),
        findFirstDayOfLastQuarter(),
        findFirstDayOfThisYear(),
        findFirstDayOfLastYear()
    ];
    let lastDateRawStrArr = [
        new Date(today),
        findSaturdayOfLastWeek(),
        new Date(today),
        findLastDayOfLastMonth(),
        new Date(today),
        findLastDayOfLastQuarter(),
        new Date(today),
        findLastDayOfLastYear()
    ];
        
    
    $.map($(presetLi).find(presetRawDatePrevSel), function (elem, index) {
        $(elem).text(firstDateRawStrArr[index]);
    });
    $(presetLiRawDatePrevSel).css('display', 'none');
    
    $.map($(presetLi).find(presetRawDateRecentSel), function (elem, index) {
        $(elem).text(lastDateRawStrArr[index]);
    });
    $(presetLiRawDateRecentSel).css('display', 'none');

    let dateStrArr = [
        thisWeekStr,
        lastWeekStr,
        thisMonthStr,
        lastMonthStr,
        thisQuarterStr,
        lastQuarterStr,
        thisYearStr,
        lastYearStr
    ];
    $.map($(presetLi).find(presetDateRangeSel), function (elem, index) {
        $(elem).text(dateStrArr[index]);
    });
}







function calcData(dataSet){
//    debugger;
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
    
    for(let i = 0; i<dataSet.length; i++){
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
    conversion = (clicks/orderedItems);
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


let showingTableRange = null;
$(resPanLi).click(function () {
    if ($(this).is('.today')) {
        showingTableRange = 'today';
    } else if ($(this).is('.yesterday')) {
        showingTableRange = 'yesterday';
    } else if ($(this).is('.last-7-day')) {
        showingTableRange = 'last-7-day';
    } else if ($(this).is('.last-30-day')) {
        showingTableRange = 'last-30-day';
    } else if ($(this).is('.this-week')) {
        showingTableRange = 'this-week';
    } else if ($(this).is('.last-week')) {
        showingTableRange = 'last-week';
    } else if ($(this).is('.this-month')) {
        showingTableRange = 'this-month';
    } else if ($(this).is('.last-month')) {
        showingTableRange = 'last-month';
    } else if ($(this).is('.this-quarter')) {
        showingTableRange = 'this-quarter';
    } else if ($(this).is('.last-quarter')) {
        showingTableRange = 'last-quarter';
    } else if ($(this).is('.this-year')) {
        showingTableRange = 'this-year';
    } else if ($(this).is('.last-year')) {
        showingTableRange = 'last-year';
    }
});

// changing text of tab controls
let tabsClass = new Tabs(summTabControl, commTabControl, bounTabControl);
let data = new Data();
    let dataSet = data.getDataSet(dataRange);
    let calculatedData = calcData(dataSet);
    
    let bounFrac = .04;
    let commFrac = .02;
    
    tabsClass.chngTabControlTxt({
        summInt: calculatedData.sellEarnings + calculatedData.bounties,
        summFrac: bounFrac + commFrac,
        commInt: calculatedData.sellEarnings,
        commFrac: commFrac,
        bounInt: calculatedData.bounties,
        bounFrac: bounFrac
    });

function updateChart(){
    switch(showing){
        case summary:
            showingSummary();
            break;
        case commissions:
            showingCommissions();
            break;
        case bounties:
            showingBounties();
            break;
    }
    
    let dataSet = data.getDataSet(dataRange);
    let calculatedData = calcData(dataSet);
    
    let bounFrac = .04;
    let commFrac = .02;
    
    tabsClass.chngTabControlTxt({
        summInt: calculatedData.sellEarnings + calculatedData.bounties,
        summFrac: bounFrac + commFrac,
        commInt: calculatedData.sellEarnings,
        commFrac: commFrac,
        bounInt: calculatedData.bounties,
        bounFrac: bounFrac
    });
}

let summ = new Summary({
    
});
let comm = new Commissions({
    clicksAmount: 0,
    orderedItemsAmount: 0,
    shippedItemsAmount: 0,
    returnedItemsAmount: 0,
    conversionAmount: 0,
    shipIteReveAmount: 0,
    bonusAmount: 0,
    totEarAmount: 0
});
let boun = new Bounties({
    totRefAmount: 0,
    totEarAmount: 0
});




function showingSummary(){
    show(tabsAttrSel, sum_tab);
    
    dataRange.lastYear = false;
    if(showingTableRange === 'last-year')
        dataRange.lastYear = true;
    
    summaryChart = new SummaryChart(sumCanStr, dataRange);
    
    let dataSet = summaryChart.data.getDataSet();
    let calculatedData = calcData(dataSet);
    showingSummTables(calculatedData);
}
function showingSummTables(calculatedData) {
    summ.chngTxt({
        clickTxt: calculatedData.clicks,
        ordrdTxt: calculatedData.orderedItems,
        shippedItemsTxt: calculatedData.shipped,
        bonusTxt: calculatedData.bonus,
        conversionTxt: calculatedData.conversion,
        earnTxt: calculatedData.sellEarnings,
        refTxt: calculatedData.referrals,
        refEarnTxt: calculatedData.referralEarnings,
        earnSummTxt: calculatedData.bounties + calculatedData.sellEarnings
    });
}






function showingCommissions(){
    show(tabsAttrSel, com_tab);
    
    dataRange.lastYear = false;
    if(showingTableRange === 'last-year')
        dataRange.lastYear = true;
    
    commissionsChart = new CommissionsChart(comCanStr, dataRange);
    let dataSet = commissionsChart.data.getDataSet();
    let calculatedData = calcData(dataSet);
    showingCommTables(calculatedData);
}
function showingCommTables(calculatedData) {
    comm.changeBottomInfo({
        clicksAmount: calculatedData.clicks,
        orderedItemsAmount: calculatedData.orderedItems,
        shippedItemsAmount: calculatedData.shipped,
        returnedItemsAmount: calculatedData.returned,
        conversionAmount: calculatedData.conversion,
        shipIteReveAmount: calculatedData.shippedRev,
        bonusAmount: calculatedData.bonus,
        totEarAmount: calculatedData.sellEarnings
    });
}


function showingBounties(){
    show(tabsAttrSel, boun_tab);
    
    dataRange.lastYear = false;
    if(showingTableRange === 'last-year')
        dataRange.lastYear = true;
    
    bountiesChart = new BountiesChart(bounCanStr, dataRange);
    
    let dataSet = bountiesChart.data.getDataSet();
    let calculatedData = calcData(dataSet);
    showingBounTables(calculatedData);
}
function showingBounTables(calculatedData) {
    boun.updateTitleDate();
    boun.changeBottomInfo({
        totRefAmount: calculatedData.referrals,
        totEarAmount: calculatedData.referralEarnings
    });
}














function buildDateStr(date) {
    let dt = new Date(date);
    let month = convToMonStr(dt.getMonth());
    let day = dt.getDate();
    let year = dt.getFullYear();
    let dateStr = month + " " + day + " " + year;
    return dateStr;
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

function findSundayOfThisWeek(){
    var curr = new Date;
    var sunDayOfThisWeek = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    return sunDayOfThisWeek;
}

function findSundayOfLastWeek(){
    var curr = new Date;
    var sunDayOfLastWeek = new Date(curr.setDate(curr.getDate() - curr.getDay() - 7));
    return sunDayOfLastWeek;
}

function findSaturdayOfLastWeek(){
    var curr = new Date;
    var saturdayDayOfLastWeek = new Date(curr.setDate(curr.getDate() - curr.getDay() - 1));
    return saturdayDayOfLastWeek;
}

function findFirstDayOfThisMonth(){
    var curr = new Date;
    curr.setDate(1);
    return curr;
}

function findFirstDayOfLastMonth(){
    var curr = new Date();
    curr.setDate(1);
    curr.setMonth(curr.getMonth() - 1);
    return curr;
}

function findLastDayOfLastMonth(){
    let today = new Date();
    var lastDayPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    return lastDayPrevMonth;
}

function findFirstDayOfthisQuarter(){
    var curr = new Date();
    curr.setDate(1);
    switch(curr.getMonth()){
        case 0:
        case 1:
        case 2:
            curr.setMonth(0);
            break;
        case 3:
        case 4:
        case 5:
            curr.setMonth(3);
            break;
        case 6:
        case 7:
        case 8:
            curr.setMonth(6);
            break;
        case 9:
        case 10:
        case 11:
            curr.setMonth(9);
    }
    return curr;
}

function findFirstDayOfLastQuarter(){
    var curr = new Date();
    curr.setDate(1);
    switch (curr.getMonth()) {
        case 0:
        case 1:
        case 2:
            curr.setMonth(9);
            break;
        case 3:
        case 4:
        case 5:
            curr.setMonth(0);
            break;
        case 6:
        case 7:
        case 8:
            curr.setMonth(3);
            break;
        case 9:
        case 10:
        case 11:
            curr.setMonth(6);
    }
    return curr;
}

function findLastDayOfLastQuarter(){
    var curr = new Date();
    switch (curr.getMonth()) {
        case 0:
        case 1:
        case 2:
            curr.setMonth(11);
            break;
        case 3:
        case 4:
        case 5:
            curr.setMonth(2);
            break;
        case 6:
        case 7:
        case 8:
            curr.setMonth(5);
            break;
        case 9:
        case 10:
        case 11:
            curr.setMonth(8);
    }
    let d = new Date(curr);
    var lastDayOfLastQuarter = new Date(d.getFullYear(), d.getMonth()+1, 0);
    curr.setDate(lastDayOfLastQuarter.getDate());
    return curr;
}

function findFirstDayOfThisYear(){
    var curr = new Date();
    curr.setDate(1);
    curr.setMonth(0);
    return curr;
}

function findFirstDayOfLastYear(){
    var curr = new Date();
    curr.setDate(1);
    curr.setMonth(0);
    curr.setFullYear(new Date().getFullYear()-1);
    return curr;
}

function findLastDayOfLastYear(){
    var curr = new Date();
    curr.setDate(0);
    curr.setMonth(11);
    curr.setFullYear(new Date().getFullYear()-1);
    return curr;
}


