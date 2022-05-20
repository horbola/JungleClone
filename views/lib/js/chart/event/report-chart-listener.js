
import {ChartListener} from "./chart-listener.js";
import {TopPart} from "./../calculate/top-part.js";
import {Util} from "./../util/util.js";



function ReportChartListener(){
    ChartListener.call(this);
}
ReportChartListener.prototype = Object.create(ChartListener.prototype);
ReportChartListener.prototype.constructor = ReportChartListener;


ReportChartListener.prototype.drawIndex = -1;
ReportChartListener.prototype.mouseInBar = function(chartEvent){
    let info = chartEvent.dataS[chartEvent.currBarInd];
    let barPoint = chartEvent.barPoints[chartEvent.currBarInd];
    
    let dayTxt = info.day;
    const isDigit = /\d+/.test(dayTxt);
    if(!isDigit) dayTxt = '';
    
    if(chartEvent.chartType === "Main Chart"){
        $('section.earnings-overview #chart-popup').css({
            display: 'block',
            overflow: 'hidden',
            left: barPoint.x + barPoint.width/2,
            get top(){return getTop();}
        });
        
        let mainTitleTxt = Util.capitalizeFirstLetter(info.month) +' ' +info.day +' ' + Util.determineYear(info);
        let mainComTxt = '$' +info.commissions +'.00';
        let mainBounTxt = '$' +info.bounties +'.00';
        
        $('section.earnings-overview #chart-popup .title').text(mainTitleTxt);
        $('section.earnings-overview #chart-popup li:nth-child(1) .value').text(mainComTxt);
        $('section.earnings-overview #chart-popup li:nth-child(2) .value').text(mainBounTxt);
        $('section.earnings-overview #chart-popup li:nth-child(3) .value').text(info.clicks);
    }
    else if(chartEvent.chartType === "Summary Chart"){
        $('.summary-tab #chart-popup').css({
            display: 'block',
            overflow: 'hidden',
            left: barPoint.x + barPoint.width/2,
            get top(){return getTop();}
        });
        
        let summaryTitleTxt = Util.capitalizeFirstLetter(info.month) +' ' +dayTxt +' ' + Util.determineYear(info);
        let summaryComTxt = '$' + info.commissions + '.00';
        let summaryBounTxt = info.bounties;
        let summaryTotTxt = 'Total: ' + summaryComTxt;
        
        $('.summary-tab #chart-popup .title').text(summaryTitleTxt);
        $('.summary-tab #chart-popup li:nth-child(1) .value').text(summaryComTxt);
        $('.summary-tab #chart-popup li:nth-child(2) .value').text(summaryBounTxt);
        $('.summary-tab #chart-popup .total.value').text(summaryTotTxt);
    }
    
    else if(chartEvent.chartType === "Commissions Chart"){
        $('.commissions-tab #chart-popup').css({
            display: 'block',
            zIndex: 99,
            overflow: 'hidden',
            left: barPoint.x + barPoint.width/2,
            get top(){return getTop();}
        });
        
        let comTitleTxt = Util.capitalizeFirstLetter(info.month) +' ' +dayTxt +' ' + Util.determineYear(info);
        let comEarTxt = '$' + info.sell_earnings + '.00';
        let comClicks = info.clicks;
        let comOrderedItemTxt = info.ordered_items;
        
        $('.commissions-tab #chart-popup .title').text(comTitleTxt);
        $('.commissions-tab #chart-popup li:nth-child(1) .value').text(comEarTxt);
        $('.commissions-tab #chart-popup li:nth-child(2) .value').text(comClicks);
        $('.commissions-tab #chart-popup li:nth-child(3) .value').text(comOrderedItemTxt);
    }
    
    else if(chartEvent.chartType === "Bounties Chart"){
        $('.bounties-tab #chart-popup').css({
            display: 'block',
            overflow: 'hidden',
            left: barPoint.x + barPoint.width/2,
            get top(){return getTop();}
        });
        
        let bounTitleTxt = Util.capitalizeFirstLetter(info.month) +' ' +dayTxt +' ' + Util.determineYear(info);
        let refEarTxt = '$' +info.referral_earnings +'.00';
        let refTxt = info.referrals;
        
        $('.bounties-tab #chart-popup .title').text(bounTitleTxt);
        $('.bounties-tab #chart-popup li:nth-child(1) .value').text(refEarTxt);
        $('.bounties-tab #chart-popup li:nth-child(2) .value').text(refTxt);
    }
    function getTop(){
        let mpH = chartEvent.mainPartHeight;
        let popupH = $('.commissions-tab #chart-popup').height();
        let barPointY = barPoint.y;
        return Util.getTop(mpH, popupH, barPointY);
    }
};

ChartListener.prototype.mouseLeavesBar = function(chartEvent){
    
};

ReportChartListener.prototype.mouseLeavesMainPart = function(chartEvent){
    if(chartEvent.chartType === "Main Chart"){
        $('section.earnings-overview #chart-popup').css("display", 'none');
    }
    else if(chartEvent.chartType === "Summary Chart"){
        $('.summary-tab #chart-popup').css("display", 'none');
    }
    else if(chartEvent.chartType === "Commissions Chart"){
        $('.commissions-tab #chart-popup').css("display", 'none');
    }
    else if(chartEvent.chartType === "Bounties Chart"){
        $('.bounties-tab #chart-popup').css("display", 'none');
    }
};

ReportChartListener.prototype.mouseInSpline = function(chartEvent){
    this.mouseInSym(chartEvent);
};

ReportChartListener.prototype.mouseOutSpline = function(chartEvent){
//    this.mouseLeavesSym(chartEvent);
};






ReportChartListener.prototype.mouseInSym = function(chartEvent){
//    debugger;
    let splinePoints = chartEvent.spline;
    splinePoints[0].lineWidth = 3;
    chartEvent.canMainArea.drawSpline('', splinePoints, '');
};

ReportChartListener.prototype.mouseLeavesSym = function(chartEvent){
    let splinePoints = chartEvent.spline;
    splinePoints[0].lineWidth = 2;
    chartEvent.canMainArea.drawSpline('', splinePoints, '');
};



export {ReportChartListener};


