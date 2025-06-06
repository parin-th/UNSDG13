document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const iconOpen = menuButton ? menuButton.querySelector('svg:first-child') : null;
        const iconClose = menuButton ? menuButton.querySelector('svg:last-child') : null;

        if (menuButton && mobileMenu && iconOpen && iconClose) {
            menuButton.addEventListener('click', () => {
                const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
                menuButton.setAttribute('aria-expanded', !expanded);
                mobileMenu.classList.toggle('hidden');
                iconOpen.classList.toggle('hidden');
                iconClose.classList.toggle('hidden');
            });
        }

        const homeNav = document.getElementById('nav-home');
        if (homeNav) {
            homeNav.classList.add('nav-link-active');
        }
        const mobileHomeNav = mobileMenu ? mobileMenu.querySelector('a[href="index.html"]') : null;
        if (mobileHomeNav) {
             mobileHomeNav.classList.add('nav-link-active');
        }

        // Scroll Animations & Number Counter Trigger
        const scrollElements = document.querySelectorAll(".scroll-animate");
        const numberCounters = document.querySelectorAll(".number-counter");

        // Hero Parallax Effect
        const heroBg = document.querySelector('.hero-bg'); // Declare heroBg early

        const elementInView = (el, dividend = 1) => {
            if (!el) return false;
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };

        const animateCounter = (counterElement) => {
            const target = +counterElement.dataset.target;
            counterElement.innerText = '0'; // Start from 0
            const duration = 1500; // milliseconds
            const incrementTime = 20; // update every 20ms
            const totalIncrements = duration / incrementTime;
            const incrementValue = target / totalIncrements;
            let currentValue = 0;

            const interval = setInterval(() => {
                currentValue += incrementValue;
                if (currentValue >= target) {
                    counterElement.innerText = Math.floor(target);
                    clearInterval(interval);
                } else {
                    counterElement.innerText = Math.floor(currentValue);
                }
            }, incrementTime);
        };

        const displayScrollElement = (element) => {
            if (!element) return;
            element.classList.add("is-visible");

            if (element.classList.contains('number-counter') && !element.dataset.animated) {
                animateCounter(element);
                element.dataset.animated = 'true';
            }
        };
        
        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                }
            });
            numberCounters.forEach(counter => {
                if (!counter.dataset.animated && elementInView(counter, 1.25)) {
                     // Check if parent is visible if counter itself is not a .scroll-animate
                    const parentScrollAnimate = counter.closest('.scroll-animate');
                    if (parentScrollAnimate && parentScrollAnimate.classList.contains('is-visible')) {
                         animateCounter(counter);
                         counter.dataset.animated = 'true';
                    } else if (!parentScrollAnimate) { // If no .scroll-animate parent, animate directly
                         animateCounter(counter);
                         counter.dataset.animated = 'true';
                    }
                }
            });
        };


        function handleHeroParallax() {
            if (heroBg) {
                const scrollPosition = window.pageYOffset;
                heroBg.style.backgroundPositionY = scrollPosition * 0.4 + 'px';
            }
        }

        // Back to Top Button Functionality
        const backToTopButton = document.getElementById("backToTopBtn");

        function scrollFunctionForBackToTop() {
            if (backToTopButton) {
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    backToTopButton.classList.add("show");
                } else {
                    backToTopButton.classList.remove("show");
                }
            }
        }

        if (backToTopButton) {
            backToTopButton.addEventListener("click", function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Consolidate scroll listeners
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                handleScrollAnimation();
                handleHeroParallax();
                scrollFunctionForBackToTop(); // Call directly
            }, 10); 
        }, false);

        // Initial calls on load
        handleScrollAnimation();
        handleHeroParallax();
        scrollFunctionForBackToTop(); // For initial state of back-to-top button
    });