(function($) {
    "use strict"; // Start of use strict

    var backgroundIndex = 0;

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })

    function changeBackground() {
        backgroundIndex += 1;
        if (backgroundIndex == 4) {
            backgroundIndex = 0;
        }
        $(".half-right").animate({
            opacity: 0
        }, 0).css(
            "background-image", "url('img/main"+ backgroundIndex +".jpg')"
        ).animate({opacity: 1}, 3000);
    }

    setInterval(changeBackground, 4000);

})(jQuery); // End of use strict