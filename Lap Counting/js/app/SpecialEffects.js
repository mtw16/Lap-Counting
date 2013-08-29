
function goToSetup() {
    var table = document.getElementById("myTable");
    if (table.rows.length > 1) {
        $(".configuration-save-box").hide();
    }
    else {
        $(".configuration-save-box").show();
    }

    if ($(".initialSetup-box").is(":hidden")) {
      
        $(".firstPage").hide('drop', { direction: 'left' }, 10);
        $(".secondPage").fadeToggle('slow');
    }
    else {
        $(".initialSetup-box").hide('drop', { direction: 'left' }, 20);
        setTimeout($(".secondPage").fadeToggle('slow'), 200);
    }
};

function submitConfig() {
    createRunners();
}

function goRace() {
    var table = document.getElementById("myTable");
    if (table.rows.length <= 1) {
        alert("cannot go to race until a runner has been added");
        showConfigurationBox()
    }
    else {
        $(".secondPage").hide('drop', { direction: 'left' }, 100);
        $(".firstPage").fadeToggle('slow');
        $('.laptimes-box').fadeToggle('show');
        updateAthletes();
        $('.laptimes-box').fadeToggle('hide');
    }
};

function showConfigurationBox() {
    var table = document.getElementById("myTable");
    if (table.rows.length > 1) {
        $(".configuration-save-box").hide();
    }
    else {
        $(".configuration-save-box").show();
    }
    $('.configuration-box').fadeToggle('fast');
    $('.laptimes-box').hide();
    $('.timesConfig-box').hide();
    $('.array-box').hide();
    updateAthletes();
};

function showLaptimesBox() {
    $('.configuration-box').hide();
    $('.timesConfig-box').hide();
    $('.laptimes-box').fadeToggle('fast');
    $('.array-box').hide();
    updateAthletes();
};

function showArrayBox() {
    $('.configuration-box').hide();
    $('.timesConfig-box').hide();
    $('.laptimes-box').hide();
    $('.array-box').fadeToggle('fast');
};
function showTimesConfigBox() {
    $('.configuration-box').hide();
    $('.laptimes-box').hide();
    $('.timesConfig-box').fadeToggle('fast');
    $('.array-box').hide();
};



//Sort by button number
$("#Number").click(function()
{
    
    isClicked=$(this).data('clicked');
    if (isClicked) {isClicked=false;} else {isClicked=true;}
    $(this).data('clicked',isClicked);

    if(isClicked)
    {
        $("#mainTable-box").jSort({
            sort_by: 'button',
            item: 'div',
            order: 'desc'
        });
    }
    else
    {
        $("#mainTable-box").jSort({
            sort_by: 'button',
            item: 'div',
            order: 'asc'
        });
    }
});

$("#Times").click(function () {
    
    isClicked = $(this).data('clicked');
    if (isClicked) { isClicked = false; } else { isClicked = true; }
    $(this).data('clicked', isClicked);

    if (isClicked) {
        $("#mainTable-box").jSort({
            sort_by: 'span text.buttonPLabel',
            item: 'div',
            order: 'desc',
        });
    }
    else {
        $("#mainTable-box").jSort({
            sort_by: 'span text.buttonPLabel',
            item: 'div',
            order: 'asc',
        });
    }
});


