/**
 * Gallery Load More Functionality
 * Shows 10 images initially, then loads 10 more on each "Load More" button click
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
        const gallery = document.querySelector('#image-gallery .cs-gallery');
        if (!gallery) return;

        const items = gallery.querySelectorAll('.cs-gallery-item');
        const totalItems = items.length;
        const itemsPerPage = 10;
        let visibleCount = itemsPerPage;

        // Hide all items beyond the first 10
        items.forEach((item, index) => {
            if (index >= itemsPerPage) {
                item.classList.add('gallery-item-hidden');
            }
        });

        // Create and add Load More button
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'cs-load-more-btn';
        loadMoreBtn.textContent = 'Load More';
        loadMoreBtn.setAttribute('aria-label', 'Load more images');
        
        // Insert button after gallery
        gallery.parentElement.appendChild(loadMoreBtn);

        // Update button visibility
        function updateButtonVisibility() {
            if (visibleCount >= totalItems) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
                const remaining = totalItems - visibleCount;
                loadMoreBtn.textContent = `Load More (${remaining} remaining)`;
            }
        }

        // Initial button state
        updateButtonVisibility();

        // Load More button click handler
        loadMoreBtn.addEventListener('click', function() {
            // Show next 10 items
            const nextBatch = Math.min(visibleCount + itemsPerPage, totalItems);
            
            for (let i = visibleCount; i < nextBatch; i++) {
                if (items[i]) {
                    items[i].classList.remove('gallery-item-hidden');
                    // Trigger animation
                    items[i].style.animationDelay = `${(i - visibleCount) * 0.05}s`;
                    items[i].style.animation = 'fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                }
            }
            
            visibleCount = nextBatch;
            updateButtonVisibility();

            // Smooth scroll to newly loaded items
            if (items[visibleCount - itemsPerPage]) {
                items[visibleCount - itemsPerPage].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        });
    }
})();

