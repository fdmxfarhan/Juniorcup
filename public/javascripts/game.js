$(document).ready(function(){
    $('#nav-link1').removeClass('active');
    $('#nav-link2').addClass('active');
    $('a.upload').click(() => {
        $('form.upload').slideToggle(500);
    });
    $('a.objection').click(() => {
        $('form.objection').slideToggle(500);
    });
    
});