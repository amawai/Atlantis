const MAX_NUM = 400
const MIN_NUM = 0
const STARTING_YEAR = 1900
var enableTimescroll = false;

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

// Binding the scrolling to the 
$('#map').bind('mousewheel', function(e){
    const delta = e.originalEvent.deltaY;
    let timelineVal = parseInt(document.getElementById('myRange').value);
    if (delta < 0) {
        document.getElementById('myRange').value = Math.max(timelineVal - 1, MIN_NUM);
    } else if (delta > 0) {
        document.getElementById('myRange').value = Math.min(timelineVal + 1, MAX_NUM);
    }
    const currentTimeline = document.getElementById('myRange').value
    const convertedYear = parseInt(currentTimeline) + STARTING_YEAR;
    console.log(convertedYear)
    $('#currentYear').text(convertedYear);
    if (currentTimeline == MAX_NUM || currentTimeline == MIN_NUM) {
        enableBodyScroll();
        hideSliderFunc();
        if (currentTimeline == MAX_NUM) {
            scrollToGoodbye();
        }
    }
});
  