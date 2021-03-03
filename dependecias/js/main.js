window.scrollTo(0, 0);
function setStyle(caso){
    $("#css-js").html(`#principal::after{
        content: ""; display: block;
        width: 4px;
        height: 0%;
        background-color: #fff;
        transition: height 300ms;
        position: absolute;
        ${(caso == 1) ? "left: -1px;": "right: -1px;"}
        top: 0%;
      }
      #principal::before{
        content: ""; display: block;
        width: 4px;
        height: 0%;
        background-color: #fff;
        transition: height 300ms;
        position: absolute;
        ${(caso == 1) ? "right: -1px;": "left: -1px;"}
        bottom: 0%;
      }`);
}
$(window).scroll(function(){
    var windowHeigth = $(window).scrollTop();
    var cabecera = $("#cabecera").offset().top;
    if(windowHeigth >= cabecera-250){
        $(".navbar").fadeOut();
    } else{ $(".navbar").fadeIn();}
});
$(document).ready(function(){
    window.setTimeout(function(){
        $("#principal").addClass("cambio1");
        window.setTimeout(function(){
            $("#css-js").html(`#principal::before{
                content: ""; display: block;
                width: 0%;
                height: 4px;
                background-color: #fff;
                transition: width 300ms;
                position: absolute;
                left: -1px;
                bottom: 100%;
            }
            #principal::after{
                content: ""; display: block;
                width: 0%;
                height: 4px;
                background-color: #fff;
                transition: width 300ms;
                position: absolute;
                right: -1px;
                top: 100%;
            }`);
            $("#principal").removeClass("cambio1");
            window.setTimeout(function(){
                setStyle(1);
                $("#principal").addClass("cambio2");
                window.setTimeout(function(){
                    setStyle(2);
                    $("#principal").removeClass("cambio2");
                    window.setTimeout(function(){
                        $("#principal").css("background-color", "rgba(0, 0, 0, 0.726)");
                        $("#principal").css("color", "#fff");
                        $("#principal").css("box-shadow", "0px 0px 10px black");
                        $(".navbar").hide(); $(".navbar").fadeIn(2000);
                        $(".navbar").removeClass("invisible");
                        var motor = new Motor($("#cubo"), $("#shadow"));
                        ScrollReveal().reveal("#cabecera", {
                            duration: 500,
                            origin: "right",
                            distance: "70px",
                            delay: 100,
                            reset: true
                        });
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    }, 700);
});
var whats = "hidden"; $("#numero").hide();
var mail = "hidden"; $("#mail").hide();
$(".prevent").click(function(e){
    e.preventDefault();
})
function whatsReveal(){
    if(whats == "hidden"){
        whats = "shown";
        $("#revelar").css("transform", "translateX(120px)");
        $("#numero").css("transform", "translateX(60px)");
        window.setTimeout(function(){
            $("#numero").fadeIn(500);
        }, 200);
    } else{
        whats = "hidden";
        $("#revelar").css("transform", "translateX(0px)");
        $("#numero").css("transform", "translateX(20px)");
        $("#numero").hide();
    }
}
function mailReveal(){
    if(mail == "hidden"){
        mail = "shown";
        $("#revelar2").css("transform", "translateX(305px)");
        $("#mail").css("transform", "translateX(60)");
        window.setTimeout(function(){
            $("#mail").fadeIn(500);
        }, 200);
        $("#mail-open").removeClass("fa-envelope");
        $("#mail-open").addClass("fa-envelope-open");
    } else{
        mail = "hidden";
        $("#revelar2").css("transform", "translateX(0px)");
        $("#mail").css("transform", "translateX(20)");
        $("#mail").hide();
        $("#mail-open").addClass("fa-envelope");
        $("#mail-open").removeClass("fa-envelope-open");
    }
}