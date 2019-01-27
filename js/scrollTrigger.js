document.addEventListener('DOMContentLoaded', function(){
    var trigger = new ScrollTrigger({
        addHeight: true
    });
    console.log('added trigger');
});

window.mapScroll = () => {
    const currentTimeline = document.getElementById('myRange').value
    if (currentTimeline < 100) {     
        $('html, body').animate({
            scrollTop: $("#map").offset().top + 1
        }, 200, function() {
            $("#timeline").removeClass( "hidden" )
            //$("#timeline").addClass( "visible" )
            $("body").css({overflow:"hidden"})
        });
    }
}

window.displaySlider = function() {
    $("#timeline").removeClass( "hidden" )
    //$("#timeline").addClass( "visible" )

    //$("body").css({overflow:"hidden"})
};

window.hideSlider = function() {
   // $("#timeline").removeClass( "visible" )
    $("#timeline").addClass( "hidden" )
};

const enableBodyScroll = () => {
    $("body").css({overflow:"visible"})
}
var browserHeight = $(window).height(); 
var browserWidth = $(window).width()
document.getElementById('welcome').style.height = browserHeight + "px";
document.getElementById('goodbye').style.height = browserHeight + "px";

// Binding the scrolling to the 
$('#map').bind('mousewheel', function(e){
    const delta = e.originalEvent.deltaY;
    let timelineVal = parseInt(document.getElementById('myRange').value);
    if (delta < 0) {
        document.getElementById('myRange').value = Math.max(timelineVal - 1, 1);
    } else if (delta > 0) {
        document.getElementById('myRange').value = Math.min(timelineVal + 1, 100);
    }
    const currentTimeline = document.getElementById('myRange').value
    if (currentTimeline == 100 || currentTimeline == 1) {
        enableBodyScroll();
    }
});
  