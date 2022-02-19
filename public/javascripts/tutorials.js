$(document).ready(() => {
    $('.dark-switch').click(() => {
        $('.dark-switch').hide();
        $('.light-switch').show();
        $(':root').css('--dark-background', '#e2ecee');
        $(':root').css('--light-background', '#324054');
        $(':root').css('--light', '#181b2c');
        $(':root').css('--dark', 'white');
    });
    $('.light-switch').click(() => {
        $('.dark-switch').show();
        $('.light-switch').hide();
        $(':root').css('--dark-background', '#324054');
        $(':root').css('--light-background', '#e2ecee');
        $(':root').css('--light', 'white');
        $(':root').css('--dark', '#181b2c');
    });
    
});