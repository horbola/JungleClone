

let $nameBtn = $('.com-bottom-table .table-names .name');
let $orderedItemsBtn = $('.com-bottom-table .table-names .ordered-items');
let tableOrdItems = '.com-bottom-table .table-ordered-items';
let tableEarnings = '.com-bottom-table .table-earnings';
let tableLinkPerform = '.com-bottom-table .table-link-perform';


let $clickedTab = null;
// changing table on click table name buttons.
$nameBtn.click(function () {
    $clickedTab = $(this);
    $($nameBtn).css('cursor', 'pointer');
    $(this).css('cursor', 'default');
    $('.com-bottom-table .full-table').removeClass('showing-table');
    $nameBtn.removeClass('arrow-after hover-bg-clr');
    $(this).addClass("arrow-after hover-bg-clr");
    $($nameBtn).css('color', '#0066c0');
    $(tableOrdItems).removeClass('showing-table');
    
    switch ($(this).index()) {
        case 0:
            $(tableOrdItems).addClass('showing-table');
            $(this).css('color', '#111');
            break;
        case 1:
            $(tableEarnings).addClass('showing-table');
            $(this).css('color', '#111');
            break;
        case 2:
            $(tableLinkPerform).addClass('showing-table');
            $(this).css('color', '#111');
    }
});

$orderedItemsBtn.click();

