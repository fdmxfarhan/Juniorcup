$(document).ready(() => {
    $('#tab1').show();
    $('#tab2').hide();
    $('#tab3').hide();
    $('#tab4').hide();
    $('#tab5').hide();
    $('#img2').hide();
    $('#img3').hide();
    $('#img4').hide();
    $('#img5').hide();
    $('#img6').hide();
    $('#img7').hide();
    $('#img8').hide();
    var cnt = 0;
    
    $('#link1').click(() => {
        $('#tab1').slideDown(500);
        $('#tab2').hide();
        $('#tab3').hide();
        $('#tab4').hide();
        $('#tab5').hide();
        $('#link1').addClass('active');
        $('#link2').removeClass('active');
        $('#link3').removeClass('active');
        $('#link4').removeClass('active');
        $('#link5').removeClass('active');
    });
    $('#link2').click(() => {
        $('#tab1').hide();
        $('#tab2').slideDown(500);
        $('#tab3').hide();
        $('#tab4').hide();
        $('#tab5').hide();
        $('#link1').removeClass('active');
        $('#link2').addClass('active');
        $('#link3').removeClass('active');
        $('#link4').removeClass('active');
        $('#link5').removeClass('active');
    });
    $('#link3').click(() => {
        $('#tab1').hide();
        $('#tab2').hide();
        $('#tab3').slideDown(500);
        $('#tab4').hide();
        $('#tab5').hide();
        $('#link1').removeClass('active');
        $('#link2').removeClass('active');
        $('#link3').addClass('active');
        $('#link4').removeClass('active');
        $('#link5').removeClass('active');
    });
    $('#link4').click(() => {
        $('#tab1').hide();
        $('#tab2').hide();
        $('#tab3').hide();
        $('#tab4').slideDown(500);
        $('#tab5').hide();
        $('#link1').removeClass('active');
        $('#link2').removeClass('active');
        $('#link3').removeClass('active');
        $('#link4').addClass('active');
        $('#link5').removeClass('active');
    });
    $('#link5').click(() => {
        $('#tab1').hide();
        $('#tab2').hide();
        $('#tab3').hide();
        $('#tab4').hide();
        $('#tab5').slideDown(500);
        $('#link1').removeClass('active');
        $('#link2').removeClass('active');
        $('#link3').removeClass('active');
        $('#link4').removeClass('active');
        $('#link5').addClass('active');
    });
    $('.next-btn').click(() => {
        cnt++;
        cnt%=8;
    });
    $('.prev-btn').click(() => {
        cnt--;
        if(cnt == -1) cnt = 7
    });
    setInterval(() => {
        if(cnt == 0){
            $('#img1').show();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 1){
            $('#img1').hide();
            $('#img2').show();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 2){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').show();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 3){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').show();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 4){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').show();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 5){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').show();
            $('#img7').hide();
            $('#img8').hide();
        }
        if(cnt == 6){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').show();
            $('#img8').hide();
        }
        if(cnt == 7){
            $('#img1').hide();
            $('#img2').hide();
            $('#img3').hide();
            $('#img4').hide();
            $('#img5').hide();
            $('#img6').hide();
            $('#img7').hide();
            $('#img8').show();
        }
        
    }, 1);


    $('#code1').click(() => {
        $('#collapse1').slideToggle(500);
        $('#plus1').toggle(500);
        $('#minus1').toggle(500);
    });
    $('#code2').click(() => {
        $('#collapse2').slideToggle(500);
        $('#plus2').toggle(500);
        $('#minus2').toggle(500);
    });
    $('#code3').click(() => {
        $('#collapse3').slideToggle(500);
        $('#plus3').toggle(500);
        $('#minus3').toggle(500);
    });
    $('#code4').click(() => {
        $('#collapse4').slideToggle(500);
        $('#plus4').toggle(500);
        $('#minus4').toggle(500);
    });
    $('#code5').click(() => {
        $('#collapse5').slideToggle(500);
        $('#plus5').toggle(500);
        $('#minus5').toggle(500);
    });
    $('#code6').click(() => {
        $('#collapse6').slideToggle(500);
        $('#plus6').toggle(500);
        $('#minus6').toggle(500);
    });
    $('#code7').click(() => {
        $('#collapse7').slideToggle(500);
        $('#plus7').toggle(500);
        $('#minus7').toggle(500);
    });
    $('#code8').click(() => {
        $('#collapse8').slideToggle(500);
        $('#plus8').toggle(500);
        $('#minus8').toggle(500);
    });
    $('#code9').click(() => {
        $('#collapse9').slideToggle(500);
        $('#plus9').toggle(500);
        $('#minus9').toggle(500);
    });
    $('#code10').click(() => {
        $('#collapse10').slideToggle(500);
        $('#plus10').toggle(500);
        $('#minus10').toggle(500);
    });
    $('#code11').click(() => {
        $('#collapse11').slideToggle(500);
        $('#plus11').toggle(500);
        $('#minus11').toggle(500);
    });
    $('#code12').click(() => {
        $('#collapse12').slideToggle(500);
        $('#plus12').toggle(500);
        $('#minus12').toggle(500);
    });
    $('#code13').click(() => {
        $('#collapse13').slideToggle(500);
        $('#plus13').toggle(500);
        $('#minus13').toggle(500);
    });
    $('#code14').click(() => {
        $('#collapse14').slideToggle(500);
        $('#plus14').toggle(500);
        $('#minus14').toggle(500);
    });
    $('#code15').click(() => {
        $('#collapse15').slideToggle(500);
        $('#plus15').toggle(500);
        $('#minus15').toggle(500);
    });
     
});