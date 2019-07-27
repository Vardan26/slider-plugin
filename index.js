import "./src/css/styles.scss";
import $ from "jquery"

(function ($) {
    $.fn.slider = function (opt) {
        let slider = this,
            sliderItems = slider.children(),
            dots = opt.dots ? opt.dots : false,
            arrows = opt.arrows === false ? opt.arrows : true,
            interval = opt.interval ? opt.interval : 500,
            slideShow = opt.slideShow === false ? opt.slideShow : true,
            arrowNext,
            arrowPrev;

        //Add wrapper container
        slider.wrap("<div class='slider-wrapper'></div>");

        //Add initial classNames
        slider.addClass("slider");
        sliderItems.addClass("slider__item");
        $(sliderItems[0]).addClass("active");


        //Setting data URL to backgroundImage
        function setBackgroundImg() {
            sliderItems.each(function (i, item) {
                const url = $(item).data("url");
                $(item).css("background-image", `url(${url})`);
            });
        }

        //Slider Dots
        function showDots() {
            slider.after("<ul class='dots'></ul>");
            let dots = $(".dots");

            sliderItems.each(function () {
                $('<li class="dots__item"></li>').appendTo($(dots));
            });
        }

        //Slider Arrows
        function showArrows() {
            slider.after("<ul class='arrows'></ul>");
            let arrows = $(".arrows");
            arrows.append('<li class="arrow prev"></li> <li class="arrow next"></li>');
            arrowPrev = $(".prev");
            arrowNext = $(".next");

            arrowPrev.on("click", () => slide("prev"));
            arrowNext.on("click", () => slide("next"));
        }

        //Slide
        function slide(event) {
            let active = $('.active'),
                transitionWidth;

            if (event === "prev") {
                if (active.prev().length) {
                    active.removeClass("active");
                    active.prev().addClass("active");
                    transitionWidth = active.position().left - active.width();
                    slider.css("transform", `translateX(-${transitionWidth}px)`);
                } else if (active.prev().index() === -1) {
                    active.removeClass("active");
                    $(sliderItems[sliderItems.length - 1]).addClass("active");
                    console.log(active.position().left);
                    // slider.css("transform", `translateX(0)`);
                }
            }
            else if (event === "next") {
                if (active.next().length) {
                    active.removeClass("active");
                    active.next().addClass("active");
                    transitionWidth = active.next().position().left;
                    slider.css("transform", `translateX(-${transitionWidth}px)`);
                }
                else if (active.next().index() === -1) {
                    $(sliderItems[sliderItems.length - 1]).removeClass("active");
                    $(sliderItems[0]).addClass("active");
                    slider.css("transform", `translateX(0)`);
                }
            }
            else if (slideShow && active.index() === sliderItems.length - 1) {
                setTimeout(function () {
                    $(sliderItems[sliderItems.length - 1]).removeClass("active");
                    $(sliderItems[0]).addClass("active");
                    slider.css("transform", `translateX(0)`);
                }, interval);
            }
            else if (event === "mouseover") {
                return false
            }
            else {
                active.removeClass("active");
                active.next().addClass("active");
                transitionWidth = active.next().position().left;
                slider.css("transform", `translateX(-${transitionWidth}px)`);
            }

            console.log(this);
        }

        //SetInterval
        function startSetInterval() {
            console.log(slideShow);

        }

        //Pause on mouse over
        $(slider).on("mouseover", function () {
            console.log();
            slide("mouseover")
        });

        //Functions invocations
        if (sliderItems.data("url")) {
            setBackgroundImg()
        }
        if (dots) {
            showDots()
        }
        if (arrows) {
            showArrows()
        }
        if (slideShow) {
            setInterval(slide, interval);
        }
    };
})($);


$('.slider-0').slider({
    dots: true,
    slideShow: true,
    arrows: false,
    interval: 1000
});
