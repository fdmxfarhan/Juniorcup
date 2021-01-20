$(document).ready(function(){
    var numbers = [];
    for(var i=0; i<100; i++)
    {
        numbers.push(i);
    }
    if($(window).width() > 800){
        $('.navigation').mouseenter(()=>{
            $('.dashboard').css('width', '87%');
        });
        $('.navigation').mouseleave(()=>{
            $('.dashboard').css('width', '94%');
        });
    }
    else{
        $('.navigation').mouseenter(()=>{
            $('.dashboard').css('width', '60%');
        });
        $('.navigation').mouseleave(()=>{
            $('.dashboard').css('width', '90%');
        });
    }
    $('a.user-login').mouseenter(()=>{
        $('.user-action').show(800);
        // $('.transparent-modal').show();
    });
    $('.user-action').mouseleave(()=>{
        $('.user-action').hide(500);
    });
    $('button.navbar-toggler').click(()=>{
        $('#navbarSupportedContent.collapse').show(800);
        $('.transparent-modal').show();
    });
    $('.transparent-modal').click(()=>{
        $('#navbarSupportedContent.collapse').hide(500);
        $('.transparent-modal').hide();
        // $('.user-action').hide(500);
    });
    $('a.add-team').click(()=>{
        $('.pop-up-modal').fadeIn(500);
        $('#add-team-popup').show(500);
    });
    $('.pop-up-modal').click(()=>{
        $('.pop-up-modal').hide();
        $('#add-team-popup').hide();
        numbers.forEach(num => {
            $(`#team-info-${num}`).hide();
        });
    });
    $('span.close').click(()=>{
        $('.pop-up-modal').hide();
        $('#add-team-popup').hide();
        numbers.forEach(num => {
            $(`#team-info-${num}`).hide();
        });
    });
    numbers.forEach(num => {
        $(`#team-info-btn-${num}`).click(()=>{
            $('.pop-up-modal').fadeIn(500);
            $(`#team-info-${num}`).show(500);
        });
    });
    $('a.add-member').click(()=>{
        $('form.add-member').slideDown(500);
        $('a.add-member').fadeOut(100);
    });
});