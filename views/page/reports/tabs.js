
export function Tabs(summTabCont, commTabCont, bounTabCont){
    this.summTabCont = summTabCont;
    this.commTabCont = commTabCont;
    this.bounTabCont = bounTabCont;
}

Tabs.prototype.args;
    
Tabs.prototype.setValue = function(args){
    this.args = args;
};
Tabs.prototype.chngTabControlTxt = function(args){
    this.chngTabControlTxtInner(args);
};


Tabs.prototype.chngTabControlTxtInner = function(args){
    this.chngSumTabTxt(args.summInt, args.summFrac);
    this.chngCommTabTxt(args.commInt, args.commFrac);
    this.chngBounTabTxt(args.bounInt, args.bounFrac);
};

Tabs.prototype.chngSumTabTxt = function(i, f){
    changeTxt(this.summTabCont, i, f);
};
Tabs.prototype.chngCommTabTxt = function(i, f){
    changeTxt(this.commTabCont, i, f);
};
Tabs.prototype.chngBounTabTxt = function(i, f){
    changeTxt(this.bounTabCont, i, f);
};



function changeTxt(context, i=100, f=.01){
    f = String(f).split('.');
    let text = "<sup>$</sup>" + i + "<sup>" + f[1] + "</sup>";
    $(context).children('.amount').html(text);
}

