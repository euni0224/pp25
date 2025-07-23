$(function () {
    let split, animation;

    function setup() {
        // 기존 split/animation 초기화
        if (split) split.revert();
        if (animation) animation.revert();

        // SplitText 생성 (글자를 단어, 문자, 줄로 분리)
        split = SplitText.create(".se-01 h2", { type: "chars,words,lines" });
    }

    // 애니메이션 실행 함수
    function animateWords() {
        if (animation) animation.revert();

        animation = gsap.from(split.words, {
            y: -100,
            opacity: 0,
            rotation: gsap.utils.random(-80, 80, 1),
            duration: 0.7,
            ease: "back",
            stagger: 0.15
        });
    }

    // 최초 실행 및 리사이즈 대응
    $(window).on("load ", function () {
        setup();
    });

    gsap.set("html, body", { overflow: "hidden" });

    const intro = gsap.timeline({
        defaults: {
            duration: 2,
        },
    });

    intro
        .addLabel("intro_1")
        .to(".intro ul", {
            width: "100%",
            height: "100%",
            transform: "rotate(0deg) translate(0%, 0%)"
        }, "intro_1")
        .to(".intro li div", { width: "0%" }, "intro_1")

        .add(() => {
            setTimeout(() => {
                $("#hd h1").removeClass("intro");
            }, 300);
        }, "intro_1")

        .addLabel("intro_2")
        .to(".intro", { display: "none" }, "intro_2")
        .to("html, body", { overflow: "visible" }, "intro_2")

        // 여기서 h2를 보이게 만들고 animateWords 실행
        .set(".se-01 h2", { visibility: "visible" }, "intro_2")
        .add(() => { animateWords(); }, "intro_2");

    //스크롤 부드럽게
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrambleTextPlugin, SplitText);
    ScrollSmoother.create({
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
    });
    // $(window).resize(function () {
    //     location.reload();
    // });

    // Cursor custom
    const cursor = document.querySelector('#cursor'); // cursor
    const cursorCircle = cursor.querySelector('.cur_cir'); // cursor background

    const mouse = { x: 0, y: 0 }; // mouse pointer position
    const pos = { x: 0, y: 0 }; // cursor position
    const speed = 0.3;

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.1;
        const accelerator = 100;
        return Math.min(distance / accelerator, maxSqueeze);
    }


    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);

        pos.x += diffX * speed;
        pos.y += diffY * speed;

        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);

        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
        const rotate = 'rotate(' + angle + 'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);


    const cursorModifiers = document.querySelectorAll('[cursor-type]');

    cursorModifiers.forEach(cursorModifier => {
        cursorModifier.addEventListener('mouseenter', function () {
            const className = this.getAttribute('cursor-type');
            cursor.classList.add(className);
        });

        cursorModifier.addEventListener('mouseleave', function () {
            const className = this.getAttribute('cursor-type');
            cursor.classList.remove(className);
        });
    });



    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

    jQuery(document).ready(function ($) {
        if (!isMobile) {
            //PC
            $('#cursor').css('opacity', '1');

            if (navigator.maxTouchPoints == 5) {
                $('#cursor').css('opacity', '0');
            }

        } else {
            //MOBILE
            $('#cursor').css('opacity', '0');
        }


    });



    $('.work-item').each(function () {
        const scrolladd = $(this);
        ScrollTrigger.create({
            trigger: scrolladd,
            start: 'top center+=20%',
            end: 'bottom center',
            // markers: true,
            scrub: 5,
            onEnter: function () {
                scrolladd.addClass('scroll-on');
            },
            onLeave: function () {
                scrolladd.removeClass('scroll-on');
                scrolladd.addClass('scroll-on2');
            },
            onEnterBack: function () {
                scrolladd.addClass('scroll-on');
                scrolladd.removeClass('scroll-on2');
            },
            onLeaveBack: function () {
                scrolladd.removeClass('scroll-on');
            }
        });
    });


    $('.btn-expand').click(function (e) {
        e.preventDefault();
        $(".work-list").toggleClass('expand');
    })

    // //푸터 스크롤업
    // $('.scroll-up').click(function (e) {
    //     e.preventDefault();
    //     window.scrollTo({ top: 0, behavior: 'smooth' })
    // })
    const st = SplitText.create("p", { type: "chars", charsClass: "char" });

    st.chars.forEach((char) => {
        gsap.set(char, { attr: { "data-content": char.innerHTML } });
    });

    const textBlock = document.querySelector(".text-block");

    textBlock.onpointermove = (e) => {
        st.chars.forEach((char) => {
            const rect = char.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100)
                gsap.to(char, {
                    overwrite: true,
                    duration: 1.2 - dist / 100,
                    scrambleText: {
                        text: char.dataset.content,
                        chars: "😆",
                        speed: 0.5,
                    },
                    ease: 'none'
                });
        });
    };
    const scrolladd = $('.se-03');

    ScrollTrigger.create({
        trigger: scrolladd,
        start: 'top center+=20%',
        end: 'bottom center',
        markers: true,
        scrub: 5,
        onEnter: function () {
            scrolladd.addClass('scroll-on');
        },
        onLeaveBack: function () {
            scrolladd.removeClass('scroll-on');
        }
    });



})