/**
 * Hero Slideshow Functionality
 * Automatically cycles through hero images every 5 seconds
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const slideshow = document.querySelector('#hero-2042 .cs-hero-slideshow');
        if (!slideshow) return;

        const slides = slideshow.querySelectorAll('.cs-hero-slide');
        if (slides.length === 0) return;

        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        function showSlide(index) {
            // Remove active class from all slides
            slides.forEach((slide, i) => {
                slide.classList.remove('cs-hero-slide-active');
                // Preload next image
                if (i === (index + 1) % slides.length) {
                    const img = slide.querySelector('img');
                    if (img && img.loading === 'lazy') {
                        img.loading = 'eager';
                    }
                }
            });

            // Add active class to current slide
            if (slides[index]) {
                slides[index].classList.add('cs-hero-slide-active');
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Initialize first slide
        showSlide(0);

        // Start slideshow - changes every 5 seconds
        setInterval(nextSlide, slideInterval);
    }
})();

