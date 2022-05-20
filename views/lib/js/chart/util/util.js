
import {Data} from "./../data/data.js";



function Util(){}

Util.MAIN_CHART = 1;
Util.SUMMARY_CHART = 2;
Util.COMMISSIONS_CHART = 3;
Util.BOUNTIES_CHART = 4;



Util.aM = function(){};

Util.convToMonStr = function(monNum){
    switch (monNum) {
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
};

Util.convToMonNum = function(monStr){
    switch (monStr) {
        case "Jan":
            return 0;
        case "Feb":
            return 1;
        case "Mar":
            return 2;
        case "Apr":
            return 3;
        case "May":
            return 4;
        case "Jun":
            return 5;
        case "Jul":
            return 6;
        case "Aug":
            return 7;
        case "Sep":
            return 8;
        case "Oct":
            return 9;
        case "Nov":
            return 10;
        case "Dec":
            return 11;
    }
};







Util.findMax = function(arr, item) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i][item]);
    }
    return max;
};



Util.makeMarInfo = function(value, dataType, chartType){
    let marInfo = {
        txtArr: [],
        maxRange: 1000,
        get gLineC(){return this.txtArr.length - 1;}
    };
    
    switch(chartType){
        case Util.MAIN_CHART:
            switch(dataType){
                case Data.COMMISSIONS:
                    mainChart_com_mar(value, marInfo);
                    break;
                case Data.BOUNTIES:
                    mainChart_boun_mar(value, marInfo);
                    break;
                case Data.CLICKS:
                    mainChart_click_mar(value, marInfo);
            }
            break;
        case Util.SUMMARY_CHART:
            switch(dataType){
                case Data.COMMISSIONS:
                    sumChart_com_mar(value, marInfo);
                    break;
                case Data.BOUNTIES:
                    sumChart_boun_mar(value, marInfo);
            }
            break;
        case Util.COMMISSIONS_CHART:
            switch(dataType){
                case Data.SELL_EARNS:
                    comChart_sellEarn_mar(value, marInfo);
                    break;
                case Data.CLICKS:
                    comChart_click_mar(value, marInfo);
                    break;
                case Data.ORDRD_ITEMS:
                    comChart_ordrd_mar(value, marInfo);
                    break;
            }
            break;
        case Util.BOUNTIES_CHART:
            switch(dataType){
                case Data.REF_EARNS:
                    bounChart_refEarns_mar(value, marInfo);
                    break;
                case Data.REFERRALS:
                    bounChart_referrals_mar(value, marInfo);
            }
    }
    return  marInfo;
};



Util.avgDayInfo = function(severalMonths, lastYear=false){
    let dataS = [];
    for (let i = 0; i < severalMonths.length; i++) {
        let aDay = {};
        let month = '';
        let day = 0;
        let clicks = 0;
        let ordered_items = 0;
        let sell_earnings = 0;
        let commissions = 0;
        let bounties = 0;
        let referrals = 0;
        let referral_earnings = 0;
        let shipped = 0;
        let returned = 0;
        let conversion = 0;
        let shippedRev = 0;
        let bonus = 0;

        let aMonth = severalMonths[i];
        for (let j = 0; j < aMonth.length; j++) {
            let elem = aMonth[j];
            month = elem.month;
            if(i === 0)
                day = '';
            else day = month;
            clicks += elem.clicks;
            ordered_items += elem.ordered_items;
            sell_earnings += elem.sell_earnings;
            commissions += elem.commissions;
            bounties += elem.bounties;
            referrals += elem.referrals;
            referral_earnings += elem.referral_earnings;
            shipped += elem.shipped;
            returned += elem.returned;
            conversion += elem.conversion;
            shippedRev += elem.shippedRev;
            bonus += elem.bonus;
        }

        aDay.month = month;
        aDay.day = day;
        aDay.clicks = Math.round(clicks);
        aDay.ordered_items = Math.round(ordered_items);
        aDay.sell_earnings = Math.round(sell_earnings);
        aDay.commissions = Math.round(commissions);
        aDay.bounties = Math.round(bounties);
        aDay.referrals = Math.round(referrals);
        aDay.referral_earnings = Math.round(referral_earnings);
        aDay.shipped = Math.round(shipped);
        aDay.returned = Math.round(returned);
        aDay.conversion = Math.round(conversion);
        aDay.shippedRev = Math.round(shippedRev);
        aDay.bonus = Math.round(bonus);
        aDay.lastYear = lastYear;
        dataS.push(aDay);
    }
    return dataS;
};


Util.determineYear = function(info){
    let d = new Date();
    let thisMonth = d.getMonth();
    let year = d.getFullYear();
    if (info.lastYear || Util.convToMonNum(info.month) > thisMonth) {
        year = d.getFullYear() - 1;
    }
    return year;
};

Util.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

Util.getTop = function(mpH, popupH, barPointY){
    // barPiintY and the popupY are same.
    // let barPointY = barPoint.y;
    let popupY = barPointY;
    if ((popupY + popupH) > mpH) {
        popupY = popupY - ((popupY + popupH) - mpH);
    }
    return popupY;
};




function mainChart_com_mar(value, marInfo){
    if (value > -1 && value < 251) {
        marInfo.maxRange = 250;
        marInfo.txtArr = [
            "0", "$50.00", "$100.00", "$150.00", "$200.00", "$250.00"
        ];
    } else if (value > 250 && value < 1251) {
        marInfo.maxRange = 1250;
        marInfo.txtArr = [
            "0", "$250.00", "$500.00", "$750.00", "$1.00k", "$1250.00"
        ];
    } else if (value > 1250 && value < 50001) {
        marInfo.maxRange = 50000;
        marInfo.txtArr = [
            "0", "$10.00k", "$20.00k", "$30.00k", "$40.00k", "$50.00k"
        ];
    }
}

function mainChart_boun_mar(value, marInfo){
    if (value > -1 && value < 51) {
        marInfo.maxRange = 50;
        marInfo.txtArr = [
            "0", "10", "20", "30", "40", "50"
        ];
    } else if (value > 50 && value < 751) {
        marInfo.maxRange = 750;
        marInfo.txtArr = [
            "0", "150", "300", "450", "600", 750
        ];
    }
}

function mainChart_click_mar(value, marInfo){
    if (value > -1 && value < 1001) {
        marInfo.maxRange = 1000;
        marInfo.txtArr = [
            "0", "200", "400", "600", "800", "1k"
        ];
    } else if (value > 1000 && value < 2501) {
        marInfo.maxRange = 2500;
        marInfo.txtArr = [
            "0", "500", "1k", "1500", "2k", "2500"
        ];
    }
    else if (value > 2500 && value < 25001) {
        marInfo.maxRange = 25000;
        marInfo.txtArr = [
            "0", "5k", "10k", "15k", "2k", "25k"
        ];
    }
}



function sumChart_com_mar(value, marInfo){
    if (value > -1 && value < 1.6) {
        marInfo.maxRange = 1.5;
        marInfo.txtArr = [
            "0", "$0.50", "$1.00", "$1.50"
        ];
    } else if (value > 1.5 && value < 151) {
        marInfo.maxRange = 150;
        marInfo.txtArr = [
            "0", "$50.00", "$100.00", "$150.00"
        ];
    } else if (value > 150 && value < 6001) {
        marInfo.maxRange = 6000;
        marInfo.txtArr = [
            "0", "$2.00k", "$4.00k", "$6.00k"
        ];
    } else if (value > 6000 && value < 30001) {
        marInfo.maxRange = 30000;
        marInfo.txtArr = [
            "0", "$10.00k", "$20.00k", "$30.00k"
        ];
    }
}

function sumChart_boun_mar(value, marInfo){
    if (value > -1 && value < 76) {
        marInfo.maxRange = 75;
        marInfo.txtArr = [
            "0", "25", "50", "75"
        ];
    } else if (value > 75 && value < 500) {
        marInfo.maxRange = 500;
        marInfo.txtArr = [
            "0", "250", "500", "500"
        ];
    }
}





function comChart_sellEarn_mar(value, marInfo) {
    if (value > -1 && value < 31) {
        marInfo.maxRange = 30;
        marInfo.txtArr = [
            "0", "$10.00", "$20.00", "$30.00"
        ];
    } else if (value > 30 && value < 76) {
        marInfo.maxRange = 75;
        marInfo.txtArr = [
            "0", "$25.00", "$50.00", "$75.00"
        ];
    } else if (value > 75 && value < 151) {
        marInfo.maxRange = 150;
        marInfo.txtArr = [
            "0", "$50.00", "$100.00", "$150.00"
        ];
    } else if (value > 150 && value < 301) {
        marInfo.maxRange = 300;
        marInfo.txtArr = [
            "0", "$100.00", "$200.00", "$300.00"
        ];
    } else if (value > 300 && value < 901) {
        marInfo.maxRange = 900;
        marInfo.txtArr = [
            "0", "$300.00", "$600.00", "$900.00"
        ];
    }else if (value > 300 && value < 6001) {
        marInfo.maxRange = 6000;
        marInfo.txtArr = [
            "0", "$2.00k", "$4.00k", "$6.00k"
        ];
    } else if (value > 6000 && value < 30001) {
        marInfo.maxRange = 30000;
        marInfo.txtArr = [
            "0", "$10.00k", "$20.00k", "$30.00k"
        ];
    }
}

function comChart_click_mar(value, marInfo) {
    if (value > -1 && value < 751) {
        marInfo.maxRange = 750;
        marInfo.txtArr = [
            "0", "250", "500", "750"
        ];
    }if (value > 750 && value < 3001) {
        marInfo.maxRange = 3000;
        marInfo.txtArr = [
            "0", "1k", "2k", "3k"
        ];
    } 
    else if (value > 3000 && value < 9001) {
        marInfo.maxRange = 9000;
        marInfo.txtArr = [
            "0", "3k", "6k", "9k"
        ];
    } else if (value > 30000 && value < 90001) {
        marInfo.maxRange = 90000;
        marInfo.txtArr = [
            "0", "30k", "60k", "90k"
        ];
    } else if (value > 90000 && value < 150001) {
        marInfo.maxRange = 150000;
        marInfo.txtArr = [
            "0", "50k", "100k", "150k"
        ];
    }
}

function comChart_ordrd_mar(value, marInfo) {
    if (value > -1 && value < 76) {
        marInfo.maxRange = 75;
        marInfo.txtArr = [
            "0", "25", "50", "75"
        ];
    } else if (value > 75 && value < 301) {
        marInfo.maxRange = 300;
        marInfo.txtArr = [
            "0", "100", "200", "300"
        ];
    } else if (value > 150 && value < 3001) {
        marInfo.maxRange = 3000;
        marInfo.txtArr = [
            "0", "1k", "2k",  "3k"
        ];
    } else if (value > 3000 && value < 9001) {
        marInfo.maxRange = 9000;
        marInfo.txtArr = [
            "0", "3k", "6k",  "9k"
        ];
    }
}



function bounChart_refEarns_mar(value, marInfo){
    if (value > -1 && value < 1.6) {
        marInfo.maxRange = 1.5;
        marInfo.txtArr = [
            "0", "$0.50", "$1.00", "$1.50"
        ];
    } else if (value > 1.5 && value < 7) {
        marInfo.maxRange = 6;
        marInfo.txtArr = [
            "0", "$2.00", "$4.00", "$6.00"
        ];
    } else if (value > 6 && value < 16) {
        marInfo.maxRange = 15;
        marInfo.txtArr = [
            "0", "$5.00", "$10.00", "$15.00"
        ];
    } else if (value > 15 && value < 31) {
        marInfo.maxRange = 30;
        marInfo.txtArr = [
            "0", "$10.00", "$20.00", "$30.00"
        ];
    } else if (value > 30 && value < 91) {
        marInfo.maxRange = 90;
        marInfo.txtArr = [
            "0", "$30.00", "$60.00", "$90.00"
        ];
    } else if (value > 90 && value < 301) {
        marInfo.maxRange = 300;
        marInfo.txtArr = [
            "0", "$100.00", "$200.00", "$300.00"
        ];
    }
}

function bounChart_referrals_mar(value, marInfo){
    if (value > -1 && value < 3) {
        marInfo.maxRange = 2;
        marInfo.txtArr = [
            "0", "1", "1", "2"
        ];
    } else if (value > 2 && value < 7) {
        marInfo.maxRange = 6;
        marInfo.txtArr = [
            "0", "2", "4", "6"
        ];
    } else if (value > 6 && value < 16) {
        marInfo.maxRange = 15;
        marInfo.txtArr = [
            "0", "5", "10", "15"
        ];
    } else if (value > 15  && value < 46) {
        marInfo.maxRange = 45;
        marInfo.txtArr = [
            "0", "15", "30", "45"
        ];
    } else if (value > 45 && value < 91) {
        marInfo.maxRange = 90;
        marInfo.txtArr = [
            "0", "30", "60", "90"
        ];
    }
}


export {Util};

