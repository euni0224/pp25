$(function () {

    //스크롤 부드럽게
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create({
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
    });
    $(window).resize(function () {
        location.reload();
    });

    // // Cursor custom
    // const cursor = document.querySelector('#cursor'); // cursor
    // const cursorCircle = cursor.querySelector('.cur_cir'); // cursor background

    // const mouse = { x: 0, y: 0 }; // mouse pointer position
    // const pos = { x: 0, y: 0 }; // cursor position
    // const speed = 0.3;

    // const updateCoordinates = e => {
    //     mouse.x = e.clientX;
    //     mouse.y = e.clientY;
    // }

    // window.addEventListener('mousemove', updateCoordinates);

    // function getAngle(diffX, diffY) {
    //     return Math.atan2(diffY, diffX) * 180 / Math.PI;
    // }

    // function getSqueeze(diffX, diffY) {
    //     const distance = Math.sqrt(
    //         Math.pow(diffX, 2) + Math.pow(diffY, 2)
    //     );
    //     const maxSqueeze = 0.1;
    //     const accelerator = 100;
    //     return Math.min(distance / accelerator, maxSqueeze);
    // }


    // const updateCursor = () => {
    //     const diffX = Math.round(mouse.x - pos.x);
    //     const diffY = Math.round(mouse.y - pos.y);

    //     pos.x += diffX * speed;
    //     pos.y += diffY * speed;

    //     const angle = getAngle(diffX, diffY);
    //     const squeeze = getSqueeze(diffX, diffY);

    //     const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
    //     const rotate = 'rotate(' + angle + 'deg)';
    //     const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    //     cursor.style.transform = translate;
    //     cursorCircle.style.transform = rotate + scale;
    // };

    // function loop() {
    //     updateCursor();
    //     requestAnimationFrame(loop);
    // }

    // requestAnimationFrame(loop);


    // const cursorModifiers = document.querySelectorAll('[cursor-type]');

    // cursorModifiers.forEach(cursorModifier => {
    //     cursorModifier.addEventListener('mouseenter', function () {
    //         const className = this.getAttribute('cursor-type');
    //         cursor.classList.add(className);
    //     });

    //     cursorModifier.addEventListener('mouseleave', function () {
    //         const className = this.getAttribute('cursor-type');
    //         cursor.classList.remove(className);
    //     });
    // });



    // var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

    // jQuery(document).ready(function ($) {
    //     if (!isMobile) {
    //         //PC
    //         $('#cursor').css('opacity', '1');

    //         if (navigator.maxTouchPoints == 5) {
    //             $('#cursor').css('opacity', '0');
    //         }

    //     } else {
    //         //MOBILE
    //         $('#cursor').css('opacity', '0');
    //     }


    // });


    $('.work-item').each(function () {
        const scrolladd = $(this);
        ScrollTrigger.create({
            trigger: scrolladd,
            start: 'top center',
            markers: true,
            scrub: 5,
            onEnter: function () {
                scrolladd.addClass('scroll-on');
            },
            onLeaveBack: function () {
                scrolladd.removeClass('scroll-on');
            }
        });
    });


    $('.btn-expand').click(function (e) {
        $(".work-list").toggleClass('expand');
    })

    //푸터 스크롤업
    $('.scroll-up').click(function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
})