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
            animation = opt.animation,
            activeClassName = animation === "slide" ? "active" : "active fade",
            activeItem,
            arrowNext,
            arrowPrev,
            dot__item;

        //Add wrapper container
        slider.wrap("<div class='slider-wrapper'></div>");

        //Add initial classNames
        slider.addClass("slider");
        sliderItems.addClass("slider__item");
        $(sliderItems[0]).addClass(activeClassName);
        animation === "fade" ? slider.addClass("slider--fade") : null;

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
            dot__item = $(".dots__item");
            $(dot__item[0]).addClass("dots__item--active");
            $(dot__item).on("click", function () {
                let index = $(this).index();
                console.log(index);
                $(sliderItems).removeClass(activeClassName);
                $(sliderItems[index - 1] ).addClass(activeClassName);
                if(index === 0){
                    $(sliderItems).removeClass(activeClassName);
                    $(sliderItems[0]).addClass(activeClassName);
                    console.log(sliderItems[0]);
                }
                slide();
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
            activeItem = $('.active');
            let activeDotIndex = activeItem.index() + 1,
                transitionWidth;

            if (event === "prev") {
                activeDotIndex = activeItem.index() - 1;

                if (activeItem.prev().length) {
                    activeItem.removeClass(activeClassName);
                    activeItem.prev().addClass(activeClassName);
                    transitionWidth = activeItem.position().left - activeItem.width();
                    slider.css("transform", `translateX(-${transitionWidth}px)`);
                } else if (activeItem.prev().index() === -1) {
                    activeDotIndex = sliderItems.length - 1;
                    activeItem.removeClass(activeClassName);
                    $(sliderItems[sliderItems.length - 1]).addClass(activeClassName);
                    transitionWidth = $(sliderItems[sliderItems.length - 1]).position().left;
                    slider.css("transform", `translateX(-${transitionWidth}px)`);
                }
            }
            else if (event === "next") {
                if (activeItem.next().length) {
                    activeItem.removeClass(activeClassName);
                    activeItem.next().addClass(activeClassName);
                    transitionWidth = activeItem.next().position().left;
                    slider.css("transform", `translateX(-${transitionWidth}px)`);
                } else if (activeItem.next().index() === -1) {
                    activeItem.removeClass(activeClassName);
                    $(sliderItems[0]).addClass(activeClassName);
                    slider.css("transform", `translateX(0)`);
                }
            }
            else if (slideShow && activeItem.index() === sliderItems.length - 1) {
                activeItem.removeClass(activeClassName);
                $(sliderItems[0]).addClass(activeClassName);
                slider.css("transform", `translateX(0)`);
            }
            else {
                activeItem.removeClass(activeClassName);
                activeItem.next().addClass(activeClassName);
                transitionWidth = activeItem.next().position().left;
                slider.css("transform", `translateX(-${transitionWidth}px)`);
            }

            $(dot__item).removeClass("dots__item--active");
            $(dot__item[activeDotIndex]).addClass("dots__item--active");
            if ((activeItem.index() === sliderItems.length - 1) && event !== "prev") {
                $(dot__item[0]).addClass("dots__item--active");
            }
        }

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
    slideShow: false,
    arrows: true,
    interval: 2000,
    animation: "slide"
});
