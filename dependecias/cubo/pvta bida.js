class Cubo{
    angX=-45; angY=45; Ypos; timer =0;
    current_mouseX; current_mouseY;
    before_mouseX; before_mouseY; motor;
    mouse_down; mouse_up; movido = false;
    rotado = false;
    constructor($shadow){
        this.$shadow = $shadow;
        this.$shadow_weight = parseInt($(this.$shadow).css("width"));
        this.contenedor = $("#contenedor");
    }
    rotar_imagenes(cambio){
        //1 es cuando se rota, 0 es volver al original
        //advertencia, notar que aquí se usa la id tal cual sin this.contenedor
        if(cambio){
            $("#contain div div:nth-child(1)").css(`transform`, `translateZ(100px) rotateZ(180deg)`);
            $("#contain div div:nth-child(2)").css(`transform`, `rotateX(180deg) translateZ(100px) rotateZ(0deg)`);
            for(let i = 3; i<=4; i++){
                $(`#contain div div:nth-child(${i})`).css(`transform`, `
                rotateY(${(i===3) ? -90:90}deg) translateZ(100px) rotateZ(180deg)`);
            }
        } else{
            $("#contain div div:nth-child(1)").css(`transform`, `translateZ(100px) rotateZ(0deg)`);
            $("#contain div div:nth-child(2)").css(`transform`, `rotateX(180deg) translateZ(100px) rotateZ(180deg)`);
            for(let i = 3; i<=4; i++){
                $(`#contain div div:nth-child(${i})`).css(`transform`, `
                rotateY(${(i===3) ? -90:90}deg) translateZ(100px) rotateZ(0deg)`);
            }
        }
    }
    movimiento(selector, event){
        this.angX += (this.before_mouseY - this.current_mouseY)*.5;
        this.angY += ((this.angX < 100 && this.angX >-100) || this.angX<-260 || this.angX>260)
            ? (this.current_mouseX - this.before_mouseX)*.5 : (this.before_mouseX - this.current_mouseX)*.5;
        this.angY += (this.angY>405) ? -360: (this.angY<-315) ? 360:0;
        this.angX += (this.angX>315) ? -360: (this.angX<-405) ? 360:0;
        if((this.angX<275 && this.angX > 95) || (this.angX>-275 && this.angX<-95)){
            this.rotar_imagenes(1);
        } else{this.rotar_imagenes(0);}
        $(selector).css("transform", "rotateX("+this.angX+"deg) rotateY("+this.angY+"deg) translateY("+this.Ypos+"px)");
        this.before_mouse = event;
        this.movido = false;
    }
    infinito(selector){
        this.Ypos = Math.sin(this.timer++/10)*30;
        //resetea timer para no almacenar numeros grandes
        this.timer -= (this.Ypos < 1 && this.Ypos !=0 && this.Ypos>0) ? (this.timer-1):0;
        this.angX = -45;
        //resetea angY para no almacenar numeros grandes
        this.angY -= (this.angY>405) ? 360:0;
        $(selector).css("transform", "rotateX(-45deg) rotateY("+this.angY+++"deg) translateY("+this.Ypos+"px)");
        //var ancho = (this.Ypos < 0) ? this.Ypos*-1 + 80:this.Ypos*1 + 80;
        $(this.$shadow).css("box-shadow", `0px -50px ${(this.Ypos < 0) ? this.Ypos*-0.2:this.Ypos*0.08}px rgba(0, 0, 0, ${0.8+this.Ypos*0.01})`);
        $(this.$shadow).css("width", `${this.$shadow_weight-this.Ypos}px`);
    }
    restore(selector){
        self = this;
        this.angY = 45; this.Ypos = Math.sin(this.timer/10)*30;
        $(selector).css("transition", "transform 1500ms");
        $(selector).css("transform", `rotateX(-45deg) rotateY(${this.angY}deg) translateY(${this.Ypos}px)`);
        $(this.contenedor).css("transform", "translateX(0%)");
        window.setTimeout(function(){
            $(selector).css("transition", "transform 1ms");
        },1400)
        window.setTimeout(function(){
            self.rotar_imagenes(0);
        }, 490);
    }
    posiciones(selector){
        if(this.movido){return false;}
        var margen = 35;
        //rosa
        if((this.angX<-90+margen && this.angX>-90-margen) || (this.angX>270-margen && this.angX<270+margen)){
            var angulo = (this.angX<-80 && this.angX>-100) ? -90:270;
            $(selector).css("transition", "transform 500ms"); this.angX = angulo; this.angY = 0;
            $(selector).css("transform", `rotateX(${angulo}deg) rotateY(0deg) translateY(${this.Ypos}px)`);
            this.movido = true;
            window.setTimeout(function(){
                $(this.contenedor).css("transition", "transform 1300ms");
                $(this.contenedor).css("transform", "translateX(-40%)");
                window.setTimeout(function(){
                    $(selector).css("transition", "transform 1ms");
                }, 500);
            }, 500);
            return 1;
        //gris
        } else if(this.angX>90-margen && this.angX<90+margen){
            $(selector).css("transition", "transform 500ms"); this.angX = 90; this.angY = 0;
            $(selector).css("transform", `rotateX(90deg) rotateY(0deg) translateY(${this.Ypos}px)`);
            this.movido = true;
            window.setTimeout(function(){
                $(this.contenedor).css("transition", "transform 1300ms");
                $(this.contenedor).css("transform", "translateX(-40%)");
                window.setTimeout(function(){
                    $(selector).css("transition", "transform 1ms");
                }, 500);
            }, 500);
            return 2;
        }
        //físicas en 4 laterales
        for(var i = 0;i<=4;i++){
            var anguloY = 90*i;
            for(var j = 0;j<=4;j++){
                var anguloX=90*j;
                if(((this.angX<anguloX+margen && this.angX>anguloX-margen) || (this.angX<-anguloX+margen && this.angX>-anguloX-margen))
                && ((this.angY>anguloY-margen && this.angY<anguloY+margen) || (this.angY>-anguloY-margen && this.angY<-anguloY+margen))){
                    var volteadoX = (this.angX<-anguloX+margen && this.angX>-anguloX-margen) ? -anguloX:anguloX;
                    var volteadoY = (this.angY>-anguloY-margen && this.angY<-anguloY+margen) ? -anguloY:anguloY;
                    $(selector).css("transition", "transform 500ms"); this.angX = volteadoX; this.angY = volteadoY;
                    $(selector).css("transform", `rotateX(${volteadoX}deg) rotateY(${volteadoY}deg) translateY(${this.Ypos}px)`);
                    this.movido=true;
                    window.setTimeout(function(){
                        $(this.contenedor).css("transition", "transform 1300ms");
                        $(this.contenedor).css("transform", "translateX(-40%)");
                        window.setTimeout(function(){
                            $(selector).css("transition", "transform 1ms");
                        }, 500);
                    }, 500); console.log(`angX: ${this.angX}\nangY: ${this.angY}`);
                            //html
                    return ((this.angX == 0 && (this.angY == 90 || this.angY == -270)) || (this.angX == 180 && (this.angY == -90 || this.angY == 270))
                            || (this.angX == -180 && (this.angY == -90 || this.angY == 270)) || (this.angX == -360 && (this.angY == 90 || this.angY == -270))) ? 3
                            //css
                            :((this.angX == 0 && (this.angY == 0 || this.angY == 360)) || (this.angX == -180 && (this.angY == 180 || this.angY == -180))
                            || (this.angX == -360 && (this.angY == 0 || this.angY == 360)) || (this.angX == 180 && (this.angY == 180 || this.angY == -180))) ? 4
                            /*extras de css
                            || (this.angX == 0 && this.angY == 360) || (this.angX == -180 && this.angY == -180)
                            || (this.angX == 180 && this.angY == -180) || (this.angX == -360 && this.angY == 360)) ? 4*/
                            //js
                            :((this.angX == 0 && (this.angY == 180 || this.angY == -180)) || (this.angX == -180 && (this.angY == 0 || this.angY == 360))
                            || (this.angX == -360 && (this.angY == 180 || this.angY == -180)) || (this.angX == 180 && (this.angY == 0 || this.angY == 360))) ? 5
                            //sql
                            : 6;
                }
            }
        } return false;
    }
    set current_mouse(event){
        this.current_mouseX = event.pageX;
        this.current_mouseY = event.pageY;
    }
    set before_mouse(event){
        this.before_mouseX = event.pageX;
        this.before_mouseY = event.pageY;
    }
}
class Motor{
    constructor(selector, $shadow){
        this.selected = selector;
        this.$shadow = $shadow;
        this.main();
    }
    main(){
        var cubo = new Cubo(this.$shadow); var timeout = 0; var timep;
        var mouse_down = false; var mouse_up = true; var start = true;
        var selected = this.selected; var contenido = new Habilidades(`#terminal`, "#window", `#extras`, `#mucho-texto`);
        var intervalo = window.setInterval(function(){
            if(start){
                cubo.infinito(selected);
            }
            if(mouse_up && !start){
                timeout++; start = (timeout > 100) ? true:false;
                mouse_up = !start; timeout = (timeout > 100) ? 0:timeout;
                if(timeout == 30){
                    contenido.hide_terminal();
                }
                if(timeout > 69){
                    cubo.restore(selected);
                    $("#estrellas").css("visibility", "hidden");
                }
            }
        }, 50);
        $(this.selected).on("mousedown", function(e){
            mouse_down = true;
            mouse_up = false;
            cubo.before_mouse = e;
            start = false; timep = false;
            $("#aux").fadeOut(2000);
        });
        $(this.selected).on("mouseup mouseleave", function(){
            mouse_down = false;
            mouse_up = true;
            timep = window.setTimeout(function(){
                var posicion = (timeout < 30) ? cubo.posiciones(selected):false;
                //if(posicion != false && timeout < 30)
                if(posicion != false && timeout < 30){
                    $("#estrellas").attr("src", "dependecias/cubo/images/stars.gif");
                    $("#estrellas").css("visibility", "visible");
                    timeout = -500;
                        window.setTimeout(function(){
                        contenido.show_terminal();
                        contenido.mucho_texto(posicion);
                    }, 700); 
                }
            },150);
        });
        $(this.selected).on("dragstart", function(e){
            e.preventDefault();
        });
        $(this.selected).on("mousemove", function(e){
            if(!start && !mouse_up && mouse_down && timep === false){
                timeout=0;
                cubo.current_mouse = e;
                cubo.movimiento(this, e);
            }
            if(timep != false && mouse_up){
                window.clearTimeout(timep);
                timep = false;
            }
        });
    }
}
class Habilidades{
    ubuntu = "#ubuntu";
    constructor(terminal, window, extras, texto){
        //terminal
        this.$terminal = terminal;
        //window
        this.$window = window;
        //extras
        this.$extras = extras;
        //donde aparece el texto
        this.$texto = texto;
        /*this.typed = new Typed('#mucho-texto', {
            strings: ['ola wenassssssssssssssssssssssssssssssssssssssssss', ''],
            typeSpeed: 10,
            backSpeed: 10,
            cursorChar: '_<',
            shuffle: true,
            startDelay: 500,
            //back delay tiene que se mayor a start delay
            backDelay: 2000,
            loop: false,
            onBegin: function(self) {self.onStop}
        });*/
    }
    show_terminal(){
        var that = this;
        $(this.$window).css("width", `600px`);
        $(this.$window).removeClass("invisible");
        window.setTimeout(function(){
            $(that.$window).css("visibility", "visible");
        }, 50);
        window.setTimeout(function(){
            $(`${that.$window} div`).css(`width`, `15px`);
            $(`${that.$window} div`).css(`height`, `15px`);
        }, 100);
        for(let i = 1; i <= 3; i++){
            //notar que aquí uso el id de window
            ScrollReveal().reveal(`${that.$window} div:nth-child(${i})`,{
                duration: 1000,
                origin: `bottom`,
                distance: `30px`,
                delay: 300*i
            });
            /*setTimeout(function(){
                ScrollReveal().clean(`${that.$window} div:nth-child(${i})`);
                console.log("ola k ase");
            }, 1000*i);*/
        }
        window.setTimeout(function(){
            $(that.$terminal).css("visibility", "visible");
            $(that.$terminal).css("height", "400px");
        }, 600);
        $(".ter-text").fadeOut(1); $(".ter-text").fadeIn(1000);
        $(".ter-text").css("visibility", "visible");
        window.setTimeout(function(){
            $(that.$texto).removeClass("invisible");
            ScrollReveal.destroy();
        }, 1000);
    }
    hide_terminal(){
        var that = this;
        $(".ter-text").fadeOut(500);
        $(that.$terminal).css("height", "0px");
        window.setTimeout(function(){
            $(that.$terminal).css("visibility", "hidden"); 
        }, 400);
        window.setTimeout(function(){
            $(`${that.$window} span`).addClass("invisible");
        }, 100)
        window.setTimeout(function(){
            $(that.$window).css("width", `0px`);
            window.setTimeout(function(){
                for(let i = 3; i>=1;i--){
                    window.setTimeout(function(){
                        ScrollReveal().clean(`${that.$window} div:nth-child(${i}`);
                        $(`${that.$window} div:nth-child(${i}`).css("visibility", "hidden");
                        $(`${that.$window} div:nth-child(${i}`).css("width", "0px");
                        $(`${that.$window} div:nth-child(${i}`).css(`height`, `0px`);
                    }, 150/i); // 50
                }
                /*for(let i = 3; i >= 1; i--){
                    ScrollReveal().clean(`${that.$window} div:nth-child(${i})`);
                    //notar que aquí uso el id de window
                    ScrollReveal().reveal(`${that.$window} div:nth-child(${i})`,{
                        duration: 100,
                        origin: `bottom`,
                        distance: `-30px`,
                        delay: 300/i,
                        opacity: null
                    });
                }*/
                window.setTimeout(function(){
                    $(that.$window).css("visibility", "hidden");
                    $(that.$window).addClass("invisible");
                }, 200)
            }, 400); //550
        }, 600);
    }
    show_extras(){

    }
    hide_extras(){

    }
    mucho_texto(caso){
        var self = this; if(self.typed){self.typed.destroy();}
        switch (caso){
            //php
            case 1:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("PHP");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' PHP es el <strong>lenguaje de programación que se usa del lado del back-end</strong>. Con él se establece toda la lógica en el servidor, principalmente se usa para especificar cuando y cuales consultas SQL se deben realizar y dependiendo del resultado las comunica al front-end';
            } break;
            //boostrap
            case 2:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("Boostrap");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' Boostrap <strong>es una framework</strong> basada en HTML, CSS y extenciones de JS que dispone de plantillas de tipografías, botones, formularios y en general, de diseños ya hechos de elementos comunes en cualquier página web. También dispone de clases con reglas ya definidas, con las cuales se puede personalizar cada plantilla según la necesidad';
            } break;
            //html
            case 3:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("HTML");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500); console.log("ola html");
                var theText = ' HTML es el <strong>lenguaje de marcado de hipertexto</strong> con él que se escriben todas las páginas web. Con él se establece la estructura más básica y fundamental de toda página web en cuanto a su contenido se trata: imágenes, texto, contenedores, secciones, etc.';
            } break;
            //css
            case 4:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("CSS");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500); console.log("ola css");
                var theText = ' CSS (hoja de estilo en cascada) es el <strong>lenguaje de diseño gráfico</strong> que se usa en toda página web. La función de este lenguaje es estilizar (color, forma, sombra, etc), acomodar (posición, pivote, margen, etc) o animar el contenido de la página web';
            } break;
            //js
            case 5:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("Java Script");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500); console.log("ola js " + caso);
                var theText = ' Java Script es el <strong>lenguaje de programación que se usa del lado del front-end</strong> (en el navegador del usuario). Este lenguaje es capaz de actualizar el contenido del HTML o CSS de forma dinámica, respondiendo así a las interacciones del usuario. También hace que el cubo de la izquierda se mueva y muestre este texto';
            } break;
            //SQL
            case 6:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("SQL");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500); console.log("ola SQL " + caso);
                var theText = ' SQL (lenguaje de consulta estructurada) es un <strong>lenguaje de dominio específico</strong> que se usa en el desarrollo web del lado del back-end para almacenar, consultar, manipular y gestionar datos almacenados en los servidores del dominio. Su función principal es actualizar, crear o consultar información del lado del servidor';
            } break;
        }
        this.typed = new Typed('#mucho-texto', {
            strings: [theText, ''],
            typeSpeed: 20,
            backSpeed: 7,
            cursorChar: '_<',
            backDelay: 9000,
            startDelay: 1500,
            contentType: 'html',
            onComplete: function(self) {
                window.setTimeout(function(){
                    self.destroy();
                }, 2000*2);
            }
        }); return;
    }
}