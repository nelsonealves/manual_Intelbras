// para abrir/fechar menu lateral quando tela for menor que 992px
$(document).ready(function(){
    $("#toggleMenu").click(function(){
        $("#nav").toggleClass("menu");
        $(".overlay").toggleClass("active");
    });
});

// funções para indicar link ativo no menu lateral
if($('#nav').length){
    $('#nav').affix({
        offset: {     
          top: $('#nav').offset().top,
          bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 40
        }
    });
}

$('#nav').on('activate.bs.scrollspy', function () {
    item = $('#nav').find(".active").last();
    item.animatescroll({element: '#nav', padding:20});
});

// para indicar no menu superior qual manual ativo
$(document).ready(function(){
    var path = window.location.pathname;

    if (path.includes("manualHardware")){
        $("#op1").addClass("active");
    }
    else if (path.includes("manualGerWeb")){
        $("#op2").addClass("active");
    }
    else if (path.includes("manualOpeRamal")){
        $("#op3").addClass("active");
    }
});

// var $doc = $('html, body');
// $('a').click(function() {
//     $doc.animate({
//         scrollTop: $( $.attr(this, 'href') ).offset().top
//     }, 200);
//     return false;
// });