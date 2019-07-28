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
            pause = false,
            activeSlide,
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

        //Setting data URL to backgroundImage && Video
        function setBackgroundImg() {
            sliderItems.each(function (i, item) {
                const url = $(item).data("url");
                $(item).css("background-image", `url(${url})`);
                if ($(item).data("type") === "video") {
                    $(item).append(`<video width="100%" height="100%" controls autoplay>
                                      <source src=${url} >
                                   </video>`);
                }

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
                $(sliderItems).removeClass(activeClassName);
                $(sliderItems[index - 1]).addClass(activeClassName);
                if (index === 0) {
                    $(sliderItems).removeClass(activeClassName);
                    $(sliderItems[0]).addClass(activeClassName);
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
            arrowPrev.hide();

            arrowPrev.on("click", () => slide("prev"));
            arrowNext.on("click", () => slide("next"));
        }

        //Slide
        function slide(event) {
            activeSlide = $('.active');
            let activeDotIndex = activeSlide.index() + 1,
                firstSlide = $(sliderItems[0]),
                slidesCont = $(sliderItems).length,
                nextSlide = activeSlide.next(),
                prevSlide = activeSlide.prev();

            switch (event) {
                case "prev":
                    let prevSlideOffset = activeSlide.position().left - activeSlide.width();
                    activeDotIndex = activeSlide.index() - 1;

                    if (prevSlide.length) {
                        activeSlide.removeClass(activeClassName);
                        prevSlide.addClass(activeClassName);
                        slider.css("transform", `translateX(-${prevSlideOffset}px)`);
                    }
                    break;
                case "next":
                    let nextSlideOffset = nextSlide.position().left;

                    if (nextSlide.length) {
                        activeSlide.removeClass(activeClassName);
                        nextSlide.addClass(activeClassName);
                        slider.css("transform", `translateX(-${nextSlideOffset}px)`);
                    }
                    break;
                default:
                    if (!pause) {
                        let nextSlideOffset = nextSlide.position().left;

                        if (activeSlide.index() === slidesCont - 2) {
                            setTimeout(function () {
                                nextSlideOffset = 0;

                                activeSlide.removeClass(activeClassName);
                                firstSlide.addClass(activeClassName);
                                slider.css("transform", `translateX(0)`);
                                $(dot__item).removeClass("dots__item--active");
                                $(dot__item[0]).addClass("dots__item--active");
                            }, interval);
                        }

                        activeSlide.removeClass(activeClassName);
                        nextSlide.addClass(activeClassName);
                        slider.css("transform", `translateX(-${nextSlideOffset}px)`);

                        $(dot__item).removeClass("dots__item--active");
                        $(dot__item[activeDotIndex]).addClass("dots__item--active");

                        activeSlide.index() !== 1 ? arrowPrev.show() : arrowPrev.hide();

                    }
                    sliderItems.length === (activeSlide.index() + 2) && event !== "prev" ? arrowNext.hide() : arrowNext.show();
                    if (activeSlide.index() === 1 && event === "next") {
                        arrowPrev.show()
                    }

            }

        }

        //Functions invocations
        $(slider).mouseenter(function () {
            pause = true;
        });
        $(slider).mouseleave(function () {
            pause = false;
        });

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
