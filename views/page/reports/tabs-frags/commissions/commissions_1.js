
let $nameBtn = $('.com-bottom-grid .grid-names .name');
let $orderedItemsBtn = $('.com-bottom-grid .grid-names .ordered-items');
let tableOrdItems = '.com-bottom-grid .grid-ordered-items';
let tableEarnings = '.com-bottom-grid .grid-earnings';
let tableLinkPerform = '.com-bottom-grid .grid-link-perform';


let $clickedTab = null;
// changing table on click table name buttons.
$nameBtn.click(function () {
    $clickedTab = $(this);
    $($nameBtn).css('cursor', 'pointer');
    $(this).css('cursor', 'default');
    $('.com-bottom-grid .full-grid').removeClass('showing-grid');
    $nameBtn.removeClass('arrow-after hover-bg-clr');
    $(this).addClass("arrow-after hover-bg-clr");
    $($nameBtn).css('color', '#0066c0');
    $(tableOrdItems).removeClass('showing-grid');
    
    switch ($(this).index()) {
        case 0:
            $(tableOrdItems).addClass('showing-grid');
            $(this).css('color', '#111');
            break;
        case 1:
            $(tableEarnings).addClass('showing-grid');
            $(this).css('color', '#111');
            break;
        case 2:
            $(tableLinkPerform).addClass('showing-grid');
            $(this).css('color', '#111');
    }
});

$orderedItemsBtn.click();

