//
//    Toggle Mobile Navigation
//
const navbarMenu = document.querySelector("#navigation #navbar-menu");
const hamburgerMenu = document.querySelector("#navigation .hamburger-menu");
const dropdownMenus = document.querySelectorAll("#navigation .dropdown");
const about = document.querySelector('#About\\ Us')
const contact = document.querySelector('#Contact')

const screenWidth = window.screen.width;



hamburgerMenu.addEventListener('click', function () {
    const isNavOpen = navbarMenu.classList.contains("open");
    if (!isNavOpen) {
        hamburgerMenu.setAttribute("aria-expanded", true);
        hamburgerMenu.classList.add("clicked");
        navbarMenu.classList.add("open");
    } else {
        hamburgerMenu.setAttribute("aria-expanded", false);
        hamburgerMenu.classList.remove("clicked");
        navbarMenu.classList.remove("open");
        // Close all open dropdowns
        dropdownMenus.forEach(dropdown => {
            dropdown.setAttribute("aria-expanded", false);
            dropdown.classList.remove("open");
        });
        if (screenWidth < 770) {
            about.style.display = 'block'
            contact.style.display = 'block'
        }
    }
});

// Add click handlers for all dropdowns
dropdownMenus.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function () {
            const isOpen = dropdown.classList.contains("open");
            if (!isOpen) {
                dropdown.setAttribute("aria-expanded", true);
                dropdown.classList.add("open");
                if (screenWidth < 770) {
                    about.style.display = 'none'
                    contact.style.display = 'none'
                }
            } else {
                dropdown.setAttribute("aria-expanded", false);
                dropdown.classList.remove("open");
                if (screenWidth < 770) {
                    about.style.display = 'block'
                    contact.style.display = 'block'
                }
            }
        });
    }
});