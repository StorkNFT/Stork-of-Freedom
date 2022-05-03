var reveals = document.querySelectorAll(".reveal");
var scrollLastExecution = 0;
var scrollAwaitTime = 100;

// I've tried to fix that scroll is lagging if you click on menu
// elements. So, I've moved all reveals to global scope so not to
// find them everytime on scroll. Plus I've added this scrollLastExecution
// for scroll to fire only every scrollAwaitTime milliseconds. It seems
// that scroll across all page isn't lagging anymore but you can delete
// this if you wish.

// @levchik
function reveal() {
    if (Date.now() - scrollAwaitTime <= scrollLastExecution) {
        return;
    }

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 50;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }

    scrollLastExecution = Date.now();
}

window.addEventListener("scroll", reveal);


window.addEventListener('DOMContentLoaded', event => {

    // Initialize photo gallery.
    jQuery('.image-gallery a').simpleLightbox();

    // Initialize slider.
    let slider = jQuery('.parthners-slider');
    slider.slick({
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    reveal();

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});