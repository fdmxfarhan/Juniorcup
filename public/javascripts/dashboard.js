$(document).ready(function(){
    $('.navigation').mouseenter(()=>{
        $('.dashboard').css('width', '87%');
    });
    $('.navigation').mouseleave(()=>{
        $('.dashboard').css('width', '94%');
    });
    $('a.user-login').mouseenter(()=>{
        $('.user-action').show(1000);
    });
    $('.user-action').mouseleave(()=>{
        $('.user-action').hide(500);
    });
});