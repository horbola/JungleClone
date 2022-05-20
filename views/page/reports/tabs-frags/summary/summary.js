
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
    $(this.clickSel).text(arg.clickTxt);
    $(this.ordrdItemSel).text(arg.ordrdTxt);
    
    $(this.shippedItemsSel).text(arg.shippedItemsTxt);
    $(this.bonusSel).text('$'+arg.bonusTxt);
    $(this.conversionSel).text(arg.conversionTxt+'%');
    
    $(this.earningSel).text('$'+arg.earnTxt);
    
    $(this.refSel).text(arg.refTxt);
    $(this.refEarnSel).text('$'+arg.refEarnTxt);
    $(this.earnSummSel).text('$'+arg.earnSummTxt);
};


