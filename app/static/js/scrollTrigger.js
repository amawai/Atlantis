const MAX_NUM = 400
const MIN_NUM = 0
const STARTING_YEAR = 1900

const STANDARD_COMMITMENT_RATE = 1;
const INCREASED_COMMITMENT_RATE = 0.5;
const DECREASED_COMMITMENT_RATE = 2;
var commitmentRate = STANDARD_COMMITMENT_RATE;

let currentYear = STARTING_YEAR;
var enableTimescroll = false;

increaseCommitment = () => {
    console.log('increasing commitment')
    commitmentRate = INCREASED_COMMITMENT_RATE;
}

standardCommitment = () => {
    console.log('standardizing commitment')
    commitmentRate = STANDARD_COMMITMENT_RATE;
}

decreaseCommitment = () => {
    console.log('decreasing commitment')
    commitmentRate = DECREASED_COMMITMENT_RATE;
}

document.addEventListener('DOMContentLoaded', function(){
    var trigger = new ScrollTrigger({
        addHeight: true
    });
});

window.mapScroll = () => {
    const currentTimeline = document.getElementById('myRange').value
    if (currentTimeline < MAX_NUM) {     
        $('html, body').animate({
            scrollTop: $("#map").offset().top
        }, 200, function() {
            $("#timeline").removeClass( "hidden" )
            //$("#timeline").addClass( "visible" )
            $("body").css({overflow:"hidden"})
        });
    }
}

const resetTimeline = () => {
    document.getElementById('myRange').value = MIN_NUM;
    updateYear(MIN_NUM);
    $('html, body').animate({
        scrollTop: $("#map").offset().top
    }, 200, function() {
        $("#timeline").removeClass( "hidden" )
        //$("#timeline").addClass( "visible" )
        $("body").css({overflow:"hidden"})
    });
}

window.displaySlider = function() {
    $("#timeline").removeClass( "hidden" )
    $("#timeline").addClass("visible");
};

const hideSliderFunc = () => {
    $("#timeline").removeClass( "visible" )
    $("#timeline").addClass( "hidden" )
}

window.hideSlider = function() {
    hideSliderFunc();
};

const enableBodyScroll = () => {
    $("body").css({overflow:"visible"})
}

var browserHeight = $(window).height(); 
var browserWidth = $(window).width()
document.getElementById('welcome').style.height = browserHeight + "px";
document.getElementById('goodbye').style.height = browserHeight + "px";

const scrollToGoodbye = () => {
    $('html, body').animate({
        scrollTop: $("#goodbye").offset().top + 2
    }, 200);
}

$("#myRange").on("input change", function() {
    const currentTimeline = document.getElementById('myRange').value
    updateYear(currentTimeline);
});

function updateYear (value) {
    const year = parseInt(value) + STARTING_YEAR;
    $('#currentYear').text(year);

    (year > currentYear) ? decreaseAlt() : increaseAlt();
    currentYear = year;
}

function increaseAlt() {
    for (var i=0; i < circles_data.length; i++) {
      circles_data[i]["alt"] += 1 * commitmentRate;
    }
    checkFloods(circles);
}

function decreaseAlt() {
    for (var i=0; i < circles_data.length; i++) {
        circles_data[i]["alt"] -= 1 * commitmentRate;
    }
    checkFloods(circles);
}

// Binding the scrolling to the timeline
$('#timeline').bind('mousewheel', function(e){
    const delta = e.originalEvent.deltaY;
    let timelineVal = parseInt(document.getElementById('myRange').value);
    if (delta < 0) {
        document.getElementById('myRange').value = Math.max(timelineVal - 1, MIN_NUM);
    } else if (delta > 0) {
        document.getElementById('myRange').value = Math.min(timelineVal + 1, MAX_NUM);
    }
    const currentTimeline = document.getElementById('myRange').value
    updateYear(currentTimeline);
    if (currentTimeline == MAX_NUM || currentTimeline == MIN_NUM) {
        enableBodyScroll();
        hideSliderFunc();
        if (currentTimeline == MAX_NUM) {
            scrollToGoodbye();
        }
    }
});
  