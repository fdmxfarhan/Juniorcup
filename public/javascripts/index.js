$(document).ready(function(){
    var Showinfo = false;
    $('#info-text').hide();
    $('#info-img').hide();
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        // alert(scroll);
        if(scroll > 400 && !Showinfo)
        {
            $('#info-text').fadeIn(1000);
            $('#info-img').fadeIn(1000);
            Showinfo = true;
        }
    });
});