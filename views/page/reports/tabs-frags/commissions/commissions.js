
export function Commissions(args){
    this.args = args;
}

Commissions.prototype.bottomInfoParentSel = '.com-bottom-info .com-chart-bottom';
Commissions.prototype.clicksSel = '.clicks .amount';
Commissions.prototype.orderedItemsSel = '.ordered .amount';
Commissions.prototype.shippedItemsSel = '.shipped .amount';
Commissions.prototype.returnedItemsSel = '.returned .amount';
Commissions.prototype.conversionSel = '.conversion .amount';
Commissions.prototype.shipIteReveSel = '.shipped-revenue .amount';
Commissions.prototype.bonusSel = '.bonus .amount';
Commissions.prototype.totEarSel = '.total-earnings .amount';
Commissions.prototype.args = {};


Commissions.prototype.commTablesSel = '.com-bottom-table table';
Commissions.prototype.commTableOrdItemSel = '.com-bottom-table .table-ordered-items';
Commissions.prototype.commTableEarningSel = '.com-bottom-table .table-earnings';
Commissions.prototype.commTableLinkPerformSel = '.com-bottom-table .table-link-perform';

Commissions.prototype.sevDayTableSel = '.seven-day-table';
Commissions.prototype.thirDayTableSel = '.thirty-day-table';
Commissions.prototype.thisWeekTableSel = '.this-week-table';
Commissions.prototype.lastWeekTableSel = '.last-week-table';
Commissions.prototype.thisMonthTableSel = '.this-month-table';
Commissions.prototype.lastMonthTableSel = '.last-month-table';
Commissions.prototype.thisQuarterTableSel = '.this-quarter-table';
Commissions.prototype.lastQuarterTableSel = '.last-quarter-table';
Commissions.prototype.thisYearTableSel = '.this-year-table';
Commissions.prototype.lastYearTableSel = '.last-year-table';


Commissions.prototype.changeBottomInfo = function (args) {
    if (args)
        this.args = args;
    this.changeClicks(this.args.clicksAmount);
    this.changeOrderedItems(this.args.orderedItemsAmount);
    this.changeShippedItems(this.args.shippedItemsAmount);
    this.changeReturnedItems(this.args.returnedItemsAmount);
    this.changeConversion(this.args.conversionAmount);
    this.changeShipIteReve(this.args.shipIteReveAmount);
    this.changeBonus(this.args.bonusAmount);
    this.changeTotEar(this.args.totEarAmount);
};
Commissions.prototype.changeClicks = function (amount) {
    this.changeTxt(this.clicksSel, amount);
};
Commissions.prototype.changeOrderedItems = function (amount) {
    this.changeTxt(this.orderedItemsSel, amount);
};
Commissions.prototype.changeShippedItems = function (amount) {
    this.changeTxt(this.shippedItemsSel, amount);
};
Commissions.prototype.changeReturnedItems = function (amount) {
    this.changeTxt(this.returnedItemsSel, amount);
};
Commissions.prototype.changeConversion = function (amount) {
    this.changeTxt(this.conversionSel, amount+'%');
};
Commissions.prototype.changeShipIteReve = function (amount) {
    this.changeTxt(this.shipIteReveSel, '$'+amount+'.00');
};
Commissions.prototype.changeBonus = function (amount) {
    this.changeTxt(this.bonusSel, '$'+amount);
};
Commissions.prototype.changeTotEar = function (amount) {
    this.changeTxt(this.totEarSel, '$'+amount+'.00');
};
Commissions.prototype.changeTxt = function (childSel, amount) {
    $(this.bottomInfoParentSel).find(childSel).text(amount);
};




Commissions.prototype.show7DayTables = function () {
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.show30DayTables = function () {
//    this.changeTables(this.thirDayTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showThisWeekTables = function () {
//    this.changeTables(this.thisWeekTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showLastWeekTables = function () {
//    this.changeTables(this.lastWeekTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showThisMonthTables = function () {
//    this.changeTables(this.thisMonthTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showLastMonthTables = function () {
//    this.changeTables(this.lastMonthTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showThisQurarterTables = function () {
//    this.changeTables(this.thisQuarterTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showLastQurarterTables = function () {
//    this.changeTables(this.lastQuarterTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showThisYearTables = function () {
//    this.changeTables(this.thisYearTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.showLastYearTables = function () {
//    this.changeTables(this.lastYearTableSel);
    this.changeTables(this.sevDayTableSel);
};
Commissions.prototype.changeTables = function (dayTableSel) {
    $(this.commTablesSel).css('display', 'none');
    $(this.commTableOrdItemSel).find(dayTableSel).css('display', 'block');
    $(this.commTableEarningSel).find(dayTableSel).css('display', 'block');
    $(this.commTableLinkPerformSel).find(dayTableSel).css('display', 'block');
};



