$(document).ready(function(){
    $('#first').delay(1000).fadeIn(1000).delay(2000).fadeOut(1000);
    $('#second').delay(5000).fadeIn(1000).delay(2000).fadeOut(1000);
    $('#third').delay(9000).fadeIn(1000).delay(2000).fadeOut(1000);
    $('#fourth').delay(13000).fadeIn(1000);
    setTimeout(function() {
        $('body').css('animation-name', 'fade');
        $('body').css('background-color', 'purple');
    }, 13000);
    $('.audio').play();
});