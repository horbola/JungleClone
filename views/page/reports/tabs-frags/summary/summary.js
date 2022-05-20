
export function Summary(){}

Summary.prototype.clickSel = ".sum-bottom-info .left-part .clicks .amount";
Summary.prototype.ordrdItemSel = ".sum-bottom-info .left-part .ordered .amount";

Summary.prototype.shippedItemsSel = ".sum-bottom-info .left-part .shipped .amount";
Summary.prototype.bonusSel = ".sum-bottom-info .left-part .bonus .amount";
Summary.prototype.conversionSel = ".sum-bottom-info .left-part .conversion .amount";

Summary.prototype.earningSel = ".sum-bottom-info .left-part .footer .amount";

Summary.prototype.refSel = ".sum-bottom-info .left-part .total-refs .amount";
Summary.prototype.refEarnSel = ".sum-bottom-info .left-part .total-earnings .amount";
Summary.prototype.earnSummSel = ".sum-bottom-info .left-part .ear-sum .amount";


Summary.prototype.chngTxt = function(arg){
//    window.alert(`orig ${arg.clickTxt} modified ${numberWithCommas(arg.clickTxt)}`);
    
    $(this.clickSel).text(numberWithCommas(arg.clickTxt));
    $(this.ordrdItemSel).text(numberWithCommas(arg.ordrdTxt));
    
    $(this.shippedItemsSel).text(numberWithCommas(arg.shippedItemsTxt));
    $(this.bonusSel).text('$'+numberWithCommas(arg.bonusTxt));
    $(this.conversionSel).text(numberWithCommas(arg.conversionTxt+'%'));
    
    $(this.earningSel).text('$'+numberWithCommas(arg.earnTxt));
    
    $(this.refSel).text(numberWithCommas(arg.refTxt));
    $(this.refEarnSel).text('$'+numberWithCommas(arg.refEarnTxt));
    $(this.earnSummSel).text('$'+numberWithCommas(arg.earnSummTxt));
};


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

