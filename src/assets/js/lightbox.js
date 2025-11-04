/**
 * Simple Lightbox for Gallery Images
 */
(function() {
    'use strict';

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Image lightbox');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
        <button class="lightbox-next" aria-label="Next image">&#8250;</button>
        <div class="lightbox-content">
            <img src="" alt="" class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    let images = [];

    // Get all gallery images
    function initLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-image');
        images = Array.from(galleryImages);
        
        images.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox();
            });
        });
    }

    // Open lightbox
    function openLightbox() {
        if (images.length === 0) return;
        
        const img = images[currentImageIndex];
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Gallery image';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        lightbox.setAttribute('tabindex', '-1');
        lightbox.focus();
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt || 'Gallery image';
    }

    // Navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        const lightboxImg = lightbox.querySelector('.lightbox-image');
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt || 'Gallery image';
    }

    // Event listeners
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();

