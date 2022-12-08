"use strict";
$(document).ready(function () {

    
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 2000);
    
    $('.front-works-img').each(function (indx) {
        var dataBg = $(this).attr('data-front-img');
        $(this).css('background', 'url(' + dataBg + ')');
    });
   
    
    $('.p-works-item').each(function (indx) {
        var dataBg = $(this).attr('data-p-works-item');
        $(this).css('background', 'url(' + dataBg + ')');
    });
    
    $('.anim-el-works').each(function (indx) {
        var dataBgWorks = $(this).attr('data-p-works-item');
        $(this).css('background', 'url(' + dataBgWorks + ')');
    });

    /*- NODE CURSOR -*/
    window.NodeCursor({
        cursor: true,
        node: true,
        cursor_velocity: 1,
        node_velocity: 0.1,
        element_to_hover: '.node-hover',
        element_to_hover_drag: '.drag',
        element_to_hover_zoom: '.zoom-el',
        element_to_hover_zoom_2: '.zoom-el-2',
        cursor_class_hover: 'disable',
        node_class_hover: 'expand',
        node_class_hover_drag: 'drag-cursor',
        node_class_hover_zoom: 'zoom-cursor',
        node_class_hover_zoom_2: 'zoom-cursor-2',
        hide_mode: false,
    });
    
    if (($(window).width()) < 768) {
        var speedText = 3000;
    } else {
        var speedText = 6000;
    }

    $('.tagline-marquee').marquee({
        duration: speedText,
        gap: 10,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: false,
        pauseOnHover: true,
    });

    function animatedText() {
        anime({
            targets: '.an-el-wrap .el-anime',
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 900,
            delay: anime.stagger(100),
            easing: 'cubicBezier(0, 0.4, 0.5, 1.2)',
        });
    }

    function animatedMenuText() {
        if ($('.full-nav').hasClass('full-nav-on') === true) {
            anime({
                targets: '.full-nav-links .nav-line',
                translateY: [100, 0],
                opacity: [0, 1],
                duration: 900,
                delay: anime.stagger(100),
                easing: 'cubicBezier(0, 0.4, 0.5, 1.2)',
            });
        } else {
            return false;
        }
    }
    /*----NAVIGATION -----*/
    var $iconNav = $('.menu-icon'),
        $iconNav_1 = $('.icon-nav-1'),
        $iconNav_2 = $('.icon-nav-2'),
        $fullNav = $('.full-nav'),
        $topLayer = $('.top-layer'),
        $el = $('.el');


    $iconNav.hover(
        function () {
            $iconNav_1.css("margin-top", "3px");
            $iconNav_2.css("margin-top", "0");

        },
        function () {
            $iconNav_1.css("margin-top", "0");
            $iconNav_2.css("margin-top", "6px");
        });

    
    function soundClick() {
        var audio = new Audio();
        audio.src = 'assets/media/button_click.mp3';
        audio.autoplay = true;
    }

    function toogleEl() {
        $('body').toggleClass('scroll-hidden');
        $iconNav.toggleClass('icon-close');
        $iconNav_1.toggleClass('icon-nav-1-on');
        $iconNav_2.toggleClass('icon-nav-2-on');
        $fullNav.toggleClass('full-nav-on');
        $topLayer.toggleClass('active');
    }

    $('a').on('click', function () {
        soundClick();
    });

    $iconNav.on('click', function () {
        soundClick();
        if ($('.text-menu').html() === 'menu') {
            $('.text-menu').html('close');
        } else {
            $('.text-menu').html('menu');
        }

        $('.str-submenu').removeClass('show');
        toogleEl();
        animatedMenuText();
        anime({
            targets: '.menu-active-bg',
            translateY: [100, 0],
            scale: [1.2, 1],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeInOutExpo',
        });
    });


    $('.icon-nav').on('click', function () {
        toogleEl();
    });

    var activeElMenu = $('.menu-active').parent().attr('data-menu-bg'); $('.' + activeElMenu).addClass('menu-active-bg');


    var $menu_bg = $('.menu-bg'),
        $menu_active_bg = $('.menu-active-bg');

    function activeBg() {
        $menu_active_bg.css({ 'opacity': '1', 'transition-duration': '.5s', 'z-index': '3', 'transform': 'scale(1)' });
    }
    activeBg();


    $('.nav-line').hover(
        function () {
            $menu_active_bg.css({ 'opacity': '0', 'transition-duration': '.5s', 'z-index': '2', 'transform': 'scale(1.2)' });
            var attrBg = $(this).attr('data-menu-bg');
            $('.' + attrBg).css({ 'z-index': '4', 'opacity': '1', 'transform': 'scale(1)' });
        },
        function () {
            var attrBgOut = $(this).attr('data-menu-bg');
            $('.' + attrBgOut).css({ 'z-index': '2', 'opacity': '0', 'transform': 'scale(1.2)', 'transition-duration': '.5s' });
            activeBg();
        });

    //======= PARALLAX SLIDER ========
    var parallaxSliderOptions = {
        speed: 1000,
        parallax: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: 1,
        on: {
            progress: function () {
                let interleaveOffset = 0.5;
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    let slideProgress = swiper.slides[i].progress,
                        innerOffset = swiper.width * interleaveOffset,
                        innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector('.img-slider').style.transform =
                        'translateX(' + innerTranslate + 'px)';
                }
            },
            setTransition: function (speed) {
                let swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + 'ms';
                    swiper.slides[i].querySelector('.img-slider').style.transition =
                        speed + 'ms';
                }
            },
            resize: function () {
                this.update();
            }
        }
    };

    var controller = new ScrollMagic.Controller();
    var horizontalController = new ScrollMagic.Controller({ vertical: false });


    
    var animationBg = anime({
        targets: ".img-anim-el",
        translateY: [0, -100],
        easing: 'linear',
        duration: 6000,

    });
    var imgAnimEl = new ScrollMagic.Scene({
        triggerElement: ".img-anim-el",
        offset: 200,
        duration: "100%",
        triggerHook: 1
    }).setAnime(animationBg).addTo(controller);

    var textAbout = anime({
        targets: ".about-text",
        translateY: [200, 0],
        easing: 'linear',
        duration: 6000,
    });

    var aboutText = new ScrollMagic.Scene({
        triggerElement: ".about-text",
        duration: "100%",
        triggerHook: 1
    }).setAnime(textAbout).addTo(controller);


    function removeAnimationText() {
        if ($(window).width() < 768) {
            aboutText.enabled(false);
            imgAnimEl.enabled(false);
            $('.about-text').css('transform', 'translateY(0)');
        } else {
            aboutText.enabled(true);
            imgAnimEl.enabled(true);
            setTimeout(function () {
                $('.img-anim-el').css('transform', 'translateY(0)');
            }, 1000);

        }
    }

    removeAnimationText();

    $(window).resize(function () {
        removeAnimationText();
    });


    /*- ANIMATION HORIZONTAL PORTFOLIO IMAGE -*/
    $('.horizontal-el').each(function () {
        var horizontalEl = this.querySelector('.front-works-img'),
            numberImgEl = this.querySelector('.info-number');

        var animationHorBg = anime({
            targets: horizontalEl,
            translateX: [-160, 0],
            easing: 'linear',
        });

        var animationNumberImgEl = anime({
            targets: numberImgEl,
            translateX: [300, 0],
            easing: 'linear',
        });

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: "150%",
            triggerHook: 1,
        }).setAnime(animationHorBg).addTo(horizontalController);

        new ScrollMagic.Scene({
            triggerElement: this,
            duration: "100%",
            triggerHook: 1,
        }).setAnime(animationNumberImgEl).addTo(horizontalController);

    });


    var widthHeaderText = -($('.header-text-bg-animation').width());
    var haderAnimationBg = anime({
        targets: '.header-text-bg-animation',
        translateX: [0, widthHeaderText],
        easing: 'linear',
        duration: 1000,

    });

    new ScrollMagic.Scene({
        triggerElement: '.header-text-bg',
        duration: "100%",
        triggerHook: 0,
    }).setAnime(haderAnimationBg).addTo(controller);



    /*- ANIMATION NUMBERS INDEX PAGE -*/
    function funFacts() {
        $('.anime-number').each(function () {
            var numberFact = $(this).attr('data-number');
            anime({
                targets: this,
                innerHTML: [0, numberFact],
                duration: 1500,
                easing: 'easeOutCubic',
                round: 1,
            });
        });
    }

    if ($('div').hasClass('fun-facts') === true) {
        new ScrollMagic.Scene({
            triggerElement: ".fun-facts",
            duration: "0",
            triggerHook: 1,
        }).addTo(controller).on("start", function (e) {
            funFacts();
        });;
    }
    /*- BACKGROUND ANIMATION FUN FACTS SECTION -*/
    var widthFunFactsText = -($(window).width());
    var windowHeight = $(window).height();
    var factsAnimationBg = anime({
        targets: '.facts-trigger',
        translateX: [0, widthFunFactsText],
        easing: 'linear',
        duration: 1000,

    });

    new ScrollMagic.Scene({
        triggerElement: '.fun-facts-bg',
        duration: windowHeight,
        triggerHook: .5,
    }).setAnime(factsAnimationBg).addTo(controller);

    /*- SCROLLBAR -*/

    if ($('#main-scrollbar').length) {
        var Scrollbar = window.Scrollbar;
        var $elem = document.querySelector('#main-scrollbar');

        Scrollbar.init($elem, {
            damping: 0.05,
        });
    }

    if ($('#horizontal-scrollbar').length) {
        /*horizontal scroll*/
        var HorizontalScrollbar = window.Scrollbar;
        var front_elem = document.querySelector('#horizontal-scrollbar');
        HorizontalScrollbar.use(HorizontalScrollPlugin, OverscrollPlugin /* you forgot this */);


        HorizontalScrollbar.init(front_elem, {
            damping: 0.05,
            plugins: {
                overscroll: {
                    effect: 'bounce',
                },
            }
        });
    }


    /*- ANIMATION TAGLINE (HORIZONTAL PAGE) -*/
    var durationAnimeTagline = $(window).width();

    var front_tagline_1 = anime({
        targets: '.front-tagline-1',
        translateX: [200, 0],
        easing: 'linear',
        duration: 1000,

    });
    var front_tagline_2 = anime({
        targets: '.front-tagline-2',
        translateX: [400, 0],
        easing: 'linear',
        duration: 1000,

    });
    var front_tagline_3 = anime({
        targets: '.front-tagline-3',
        translateX: [600, 0],
        easing: 'linear',
        duration: 1000,

    });

    new ScrollMagic.Scene({
        triggerElement: '.beginning-section-tag',
        duration: durationAnimeTagline,
        triggerHook: 1,
    }).setAnime(front_tagline_1).addTo(horizontalController);

    new ScrollMagic.Scene({
        triggerElement: '.beginning-section-tag',
        duration: durationAnimeTagline,
        triggerHook: 1,
    }).setAnime(front_tagline_2).addTo(horizontalController);

    new ScrollMagic.Scene({
        triggerElement: '.beginning-section-tag',
        duration: durationAnimeTagline,
        triggerHook: 1,
    }).setAnime(front_tagline_3).addTo(horizontalController);

    /*- ANIMATION HEADER TEXT PAGE -*/
    var frontwidthHeaderText = $(window).width();
    var frontAnimationBg = anime({
        targets: '.front-text-bg-animation',
        translateX: [0, frontwidthHeaderText],
        easing: 'linear',
        duration: 1000,

    });

    new ScrollMagic.Scene({
        triggerElement: '.front-text-bg-animation',
        duration: "100%",
        triggerHook: 0,
    }).setAnime(frontAnimationBg).addTo(horizontalController);

  
    var homeParallaxImgV2 = document.querySelector('.it-2');
    var heightBgParallaxV2 = -($(window).height());
    var homeParallaxBgV2 = anime({
        targets: homeParallaxImgV2,
        translateY: [0, heightBgParallaxV2],
        easing: 'linear',

    });

    new ScrollMagic.Scene({
        triggerElement: '.home-parallax-v2',
        duration: "600%",
        triggerHook: 0
    }).setAnime(homeParallaxBgV2).addTo(controller);

  
    var homeParallaxImgV3 = document.querySelector('.it-3');
    var heightBgParallaxV3 = -($(window).height());
    var homeParallaxBgV3 = anime({
        targets: homeParallaxImgV3,
        translateY: [0, heightBgParallaxV3],
        easing: 'linear',
    });

    new ScrollMagic.Scene({
        triggerElement: '.home-parallax-v2',
        duration: "200%",
        triggerHook: 0,
    }).setAnime(homeParallaxBgV3).addTo(controller);


    /*- PARALLAX PROJECT PORTFOLIO -*/
    var controllerParallaxBg = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: "onEnter", duration: "170%" } });

    
    $('.wrap-panel').each(function () {
        var p_Works_Item = this.querySelector('.p-works-item');

        var parallaxWorks = anime({
            targets: p_Works_Item,
            translateY: '-30%',
            easing: 'linear',
        });

        new ScrollMagic.Scene({
            triggerElement: this,
        }).setAnime(parallaxWorks).addTo(controllerParallaxBg);

    });


    var controllerParallaxText = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: "onEnter", duration: "200%" } });

    
    $('.p-works-item').each(function () {
        var pInfoWorks = this.querySelector('.p-info-works');

        var parallaxWorksText = anime({
            targets: pInfoWorks,
            translateY: [0, -300],
            easing: 'linear',
        });

        new ScrollMagic.Scene({
            triggerElement: this,
        }).setAnime(parallaxWorksText).addTo(controllerParallaxText);

    });
});