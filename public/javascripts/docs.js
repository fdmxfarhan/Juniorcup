$(document).ready(function(){

    $('#nav-link1').removeClass('active');
    $('#nav-link4').addClass('active');
    
    var theme = 'light';
    $('.sidebar-toggle').click(()=>{
        $('.sidebar').show(1000);
        $('.sidebar-modal').fadeIn(800);
    });
    $('.sidebar-modal').click(()=>{
        $('.sidebar').hide(1000);
        $('.sidebar-modal').fadeOut(800);
    });
    $('.bg-button').click(()=>{
        if(theme == 'light'){
            $(':root').css('--bgcolor', 'rgb(26, 26, 26)');
            $(':root').css('--bgcolor2', 'rgb(26, 26, 26)');
            $(':root').css('--txtcolor', 'white');
            $(':root').css('--bordercolor', 'rgb(37, 37, 37)');
            $('.moon').hide();
            $('.sun').show();
            $('.bg-button').css('right', '0');
            $('.bg-button').css('left', 'auto');
            theme = 'dark';
        }
        else if(theme == 'dark'){
            $(':root').css('--bgcolor', 'white');
            $(':root').css('--bgcolor2', 'transparent');
            $(':root').css('--txtcolor', 'rgb(26, 26, 26)');
            $(':root').css('--bordercolor', 'lightgray');
            $('.sun').hide();
            $('.moon').show();
            $('.bg-button').css('left', '0');
            $('.bg-button').css('right', 'auto');
            theme = 'light';
        }
        
    });
});