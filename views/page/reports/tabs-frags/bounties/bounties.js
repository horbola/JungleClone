
export function Bounties(args){
    this.args = args;
}


Bounties.prototype.bottomInfoParentSel = '.boun-bottom-info .boun-chart-bottom';
Bounties.prototype.totRefSel = '.total-referrals .amount';
Bounties.prototype.totEarSel = '.total-earnings .amount';
Bounties.prototype.args = {};


Bounties.prototype.bounTablesSel = '.boun-bottom-table table';
Bounties.prototype.bounTableBounSel = '.boun-bottom-table .table-bounties';

Bounties.prototype.sevDayTableSel = '.seven-day-table';
Bounties.prototype.thirDayTableSel = '.thirty-day-table';
Bounties.prototype.thisWeekTableSel = '.this-week-table';
Bounties.prototype.lastWeekTableSel = '.last-week-table';
Bounties.prototype.thisMonthTableSel = '.this-month-table';
Bounties.prototype.lastMonthTableSel = '.last-month-table';
Bounties.prototype.thisQuarterTableSel = '.this-quarter-table';
Bounties.prototype.lastQuarterTableSel = '.last-quarter-table';
Bounties.prototype.thisYearTableSel = '.this-year-table';
Bounties.prototype.lastYearTableSel = '.last-year-table';


Bounties.prototype.titleDate = '.boun-bottom-table .table-names .name .date';
Bounties.prototype.resSpanModDate = 'section.tabs .sec-header .index .result-span-model .date';




Bounties.prototype.changeBottomInfo = function (args) {
    if (args)
        this.args = args;
    this.changeTotRef(this.args.totRefAmount);
    this.changeTotEar(this.args.totEarAmount);
};
Bounties.prototype.changeTotRef = function (amount) {
    this.changeTxt(this.totRefSel, amount);
};
Bounties.prototype.changeTotEar = function (amount) {
    this.changeTxt(this.totEarSel, '$'+amount);
};
Bounties.prototype.changeTxt = function (childSel, amount) {
    $(this.bottomInfoParentSel).find(childSel).text(amount);
};




Bounties.prototype.show7DayTable = function () {
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.show30DayTable = function () {
//    this.changeTable(this.thirDayTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showThisWeekTable = function () {
//    this.changeTable(this.thisWeekTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showLastWeekTable = function () {
//    this.changeTable(this.lastWeekTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showThisMonthTable = function () {
//    this.changeTable(this.thisMonthTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showLastMonthTable = function () {
//    this.changeTable(this.lastMonthTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showThisQurarterTable = function () {
//    this.changeTable(this.thisQuarterTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showLastQurarterTable = function () {
//    this.changeTable(this.lastQuarterTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showThisYearTable = function () {
//    this.changeTable(this.thisYearTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.showLastYearTable = function () {
//    this.changeTable(this.lastYearTableSel);
    this.changeTable(this.sevDayTableSel);
};
Bounties.prototype.changeTable = function (dayTableSel) {
    $(this.bounTablesSel).css('display', 'none');
    $(this.bounTableBounSel).find(dayTableSel).css('display', 'block');
};



Bounties.prototype.updateTitleDate = function(){
    let t = $(this.resSpanModDate).text();
    let splits = t.split('/');
    if(!splits[2]){
        splits = t.split('(');
    }
    $(this.titleDate).text(splits[0]);
};