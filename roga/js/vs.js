
/*=======================================
Home Intro
=======================================*/

var Intro = function($html) {
    'use strict';

    // Document click handler
    $(document).on('click', function(event) {
        if ($html.hasClass('intro')) {
            event.preventDefault();
            $html.removeClass('intro');
        }
    });

    // Logo click handler
    $('.logo').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $html.addClass('intro');
    });

    // Mousewheel handler
    $(window).on('mousewheel', function(event) {
        event.preventDefault();
        if ($html.hasClass('intro')) {
            $html.removeClass('intro');
        }
    });
    
    // Keydown handler
    $(document).on('keydown', function(event) {
        if ($html.hasClass('intro') && [37, 38, 39, 40, 32, 13].indexOf(event.which) > -1) {
            $html.removeClass('intro');
        }
    });
}


/*=======================================
HomeSlider
=======================================*/

var HomeSlider = function($slider) {
    'use strict';

    var slider = this;
    var $slides = $slider.find('.slide');
    var slideOffset = 100;

    // Set slider width
    $slider.css('width', ($slides.length * slideOffset) + '%');

    // Set active class
    $slides.eq(0).addClass('active');

    // Slide to index
    slider.go = function(index) {
        // Set slider position
        if (bowser.msie && bowser.version < 10) {
            $slider.stop(true).animate({ left: -(index * slideOffset) + '%' }, 300, 'easeOutQuad');
        }
        else {
            $slider.css({ left: -(index * slideOffset) + '%' });
        }

        // Set active class
        $slides.removeClass('active').eq(index).addClass('active');
    }


    // Arrow click
    $slider.on('click', '.arrow .arrow-right', function(event) {
        event.preventDefault();
        slider.go(1);
    });

    // Swipe handler
    $slider.swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
            var activeIndex = $slides.filter('.active').index();
            var index;

            switch(direction) {
                case 'left':
                    index = activeIndex + 1;
                    break;

                case 'right':
                    index = activeIndex - 1;
                    break;
            }

            index = Math.max(Math.min(index, $slides.length-1), 0);
            slider.go(index);
        },
        allowPageScroll: 'vertical'
        //threshold:0
    });
};


/*=======================================
WorkSlider
=======================================*/

var WorkSlider = function($slider) {
    'use strict';

    var slider = this;
    var $sliderWrapper = $slider.find('.slider-wrapper');
    var $sliderNav = $slider.find('.slider-nav');
    var $slides = $sliderWrapper.find('.slide');
    var slideOffset = 79;

    // Iterate slides
    $slides.each(function(index) {

        // Position slides
        var $slide = $(this);
        $slide.css({ left: (index * slideOffset) + '%' });

        // Create pagination
        var $bullet = $('<li><a href="#">'+ (index + 1) +'</a></li>');
        $sliderNav.append($bullet);

        // Set active classes
        if (index === 0) {
            $slide.addClass('active');
            $bullet.find('a').addClass('active');
        }
    });

    // Slide to index
    slider.go = function(index) {
        // Set slider position
        if (bowser.msie && bowser.version < 10) {
            $sliderWrapper.stop(true).animate({ left: -(index * slideOffset) + '%' }, 300, 'easeOutQuad');
        }
        else {
            $sliderWrapper.css({ left: -(index * slideOffset) + '%' });
        }

        // Set active classes
        $slides.removeClass('active').eq(index).addClass('active');
        $sliderNav.find('a').removeClass('active').eq(index).addClass('active');
    }

    // Slides click handler
    // Maybe add touchend or tap event?
    $slides.on('click', function(event) {
        var $slide = $(this);
        if (! $slide.hasClass('active')) {
            event.preventDefault();
            var index = $slide.index();
            slider.go(index);
        }
    });

    // Pagination click handler
    $sliderNav.on('click', 'a', function(event) {
        event.preventDefault();
        var index = $(this).parent().index();
        slider.go(index);
    });

    // Swipe handler
    $slider.swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
            var activeIndex = $slides.filter('.active').index();
            var index;

            switch(direction) {
                case 'left':
                    index = activeIndex + 1;
                    break;

                case 'right':
                    index = activeIndex - 1;
                    break;
            }

            index = Math.max(Math.min(index, $slides.length-1), 0);
            slider.go(index);
        },
        allowPageScroll: 'vertical'
        //threshold:0
    });
};


/*=======================================
PhotoSlider
=======================================*/

var PhotoSlider = function($slider) {
    'use strict';

    var slider = this;
    var $sliderWrapper = $slider.find('.photo-wrapper');
    var $sliderNav = $slider.find('.nav');
    var slideOffset = 50;

    // Hide prev button
    $sliderNav.filter('.prev').hide();

    // Calc minimum left value
    var minLeft = Math.round($sliderWrapper.width() / $sliderWrapper.parent().width()) * -100 + 100;

    function go(to) {
        to = Math.min(Math.max(to, minLeft), 0);

        // Slide to
        if (bowser.msie && bowser.version < 10) {
            $sliderWrapper.stop(true).animate({ left: to + '%' }, 300, 'easeOutQuad');
        }
        else {
            $sliderWrapper.css('left', to + '%');
        }

        // Fix nav
        $sliderNav.filter('.prev').toggle(to < 0);
        $sliderNav.filter('.next').toggle(to > minLeft);
    }

    $sliderNav.on('click', function(event) {
        event.preventDefault();

        var from = parseInt($sliderWrapper[0].style.left, 10);
        var to = from + ($(this).hasClass('prev') ? slideOffset : -slideOffset);

        // Slide
        go(to);
    });

    // Swipe handler
    $slider.swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {

            var from = parseInt($sliderWrapper[0].style.left, 10);
            var to;

            switch(direction) {
                case 'left':
                    to = from - slideOffset;
                    break;

                case 'right':
                    to = from + slideOffset;
                    break;
            }

            // Slide
            go(to);
        },
        allowPageScroll: 'vertical'
        //threshold:0
    });
};


/*=======================================
DOM Ready
=======================================*/

$(function() {
    'use strict';

    var $html = $('html');
    var $body = $('body');

    // IE only
    if (bowser.msie) {
        // Add conditional classes
        $html.addClass('ie ie' + Math.floor(bowser.version));
        
        // Hide intro for IE9 and lower
        if (bowser.version < 10) {
            $html.removeClass('intro');
        }
    }

    // Mobile nav toggle button
    $(document).on('click', '.mobile-nav-btn', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $body.toggleClass('mobile-nav-open');
    });
    // $(document).on('click tap', 'body.mobile-nav-open', function(event) {
    //     //event.preventDefault();
    //     //event.stopPropagation();
    //     //console.log(event.target);
    //     // $body.removeClass('mobile-nav-open');
    //     // if ($(event.target).closest('#header').length === 0) {
    //     //     event.preventDefault();
    //     //     event.stopPropagation();
    //     //     return false;
    //     // }
    // });
    
    // Foto row slider
    $('.photos-row.slider').each(function() {
        var photoSlider = new PhotoSlider($(this));
    });


    /*=======================================
    Page specific
    =======================================*/

    // Home
    if ($html.hasClass('home')) {
        var intro = new Intro($html);
        var $homeSlider = $('.slider');
        var homeSlider = new HomeSlider($homeSlider);
    }
    // Work
    else if ($html.hasClass('work-detail')) {
        var $workSlider = $('.slider-container');
        var workSlider = new WorkSlider($workSlider);

        // if ($('#footer .projects').length === 1) {
        //     var iscroll = new IScroll('#footer .projects', {
        //         scrollX: true,
        //         scrollY: false,
        //         mouseWheel: true
        //         //scrollbars: true
        //     });
        // }
    }
    // Contact
    else if ($html.hasClass('contact')) {
        var $form = $('.contact-us form');

        // Focus & blur handlers
        $form.find('input, textarea')
            .focusin(function() {
                $(this).parent('.field').addClass('active');
            })
            .focusout(function() {
                $(this).parent('.field').removeClass('active');
            });

        // Textarea autosize
        // http://www.jacklmoore.com/autosize/
        $form.find('textarea').autosize({
            //append: "\n"
        });
    }
    
});



