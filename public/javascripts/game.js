$(document).ready(function(){
    $('#nav-link1').removeClass('active');
    $('#nav-link10').addClass('active');
    $('a.upload').click(() => {
        $('form.upload').slideToggle(500);
    });
    $('a.objection').click(() => {
        $('form.objection').slideToggle(500);
    });
    
});