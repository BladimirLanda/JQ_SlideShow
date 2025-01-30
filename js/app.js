//PLUGIN

$(document).ready( app() );

function app() {

    //Declaración de Plugin o complemento de jQuery -> $.pluginDeclarado 
    $.slideShow = function(opciones) {

        //Parametros
        opcionesPlugin = $.extend({   
            divDestino: ".slide-show",
            slidesNum: [],
            anchoSlide: 600,
            intervalo: 1500,
            colorBtn: 'yellow'
        }, opciones);

        const { divDestino, slidesNum, anchoSlide, intervalo, colorBtn } = opcionesPlugin;

        if(slidesNum.length === 0) {
            alert('ERROR: Los slides son necesarios');
            return;
        }

        let actual = 0;
        const ancho = anchoSlide;
        const slides = slidesNum.length;

        //Creación SlideShow
        let contenido = '';
        contenido += '<ul>';

        for (let i = 0; i < slidesNum.length; i++) {
            contenido += `<li><img src=${slidesNum[i]} alt="slide${i}"></li>`;
        }

        contenido += "</ul>";

        $(divDestino).append(contenido);

        const $slideShow = $(`${divDestino} ul`);

        //Creación Botones
        contenido = '';
        contenido += '<div class="slideShowButtons">';

        for (let i = 0; i < slidesNum.length; i++) {
            contenido += `<div data-idx=${i} class="slideButton"></div>`;
        }

        contenido += '</div>';

        $(divDestino).after(contenido); //.after()|.before(): Coloca el elemento como hermano

        const $slideShowButtons = $('.slideShowButtons');

        //Funciones
        $slideShowButtons.find('div').eq(0).css({
            backgroundColor: colorBtn
        });

        //--
        function move() {
            actual--;

            if(actual <= (slides * -1)) {
                actual = 0;
            }

            moverxPunto(actual);
        }

        //--
        function moverxPunto(actual, click) {
            if(click) {
                window.clearInterval(interval);
            }

            const margen = actual * ancho;

            const idx = actual * -1;
            const $puntoActual = $slideShowButtons.find('div').eq(idx);
            const $puntosOtros = $slideShowButtons.find('div').not($puntoActual); //.not(): Método de exclusión
            

            $slideShow.animate({
                marginLeft: margen,
            }, 450);

            $puntoActual.css({
                backgroundColor: colorBtn
            });

            $puntosOtros.css({
                backgroundColor: '#a1a1a1'
            });
        }

        //--
        const interval = window.setInterval(function() {
            move();
        }, intervalo);

        //--
        $('.slideButton').on('click', function() {
            let idx = $(this).data('idx');
            idx *= -1;

            const click = true;

            moverxPunto(idx, click);
        });

    }

}
