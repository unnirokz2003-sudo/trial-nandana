/* =========================================
   HOUSE OF CIANNE
   DEMO 01 — INTERACTIONS
========================================= */
/* =====================================
   STICKY HEADER
===================================== */

const siteHeader =
    document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (!siteHeader) return;

    if (window.scrollY > 50) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

});

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuButton = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");

            if (mobileMenu.classList.contains("active")) {
                menuButton.innerHTML = "×";
            } else {
                menuButton.innerHTML = "☰";
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                menuButton.innerHTML = "☰";
            });
        });
    }


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, .intro-content, .service-card, .feature-content, .feature-image, .process-step, .gallery-item, .contact-grid"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal-visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    /* =====================================
       STAGGER SERVICE CARDS
    ===================================== */

    document.querySelectorAll(".service-card").forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });


    /* =====================================
       STAGGER PROCESS STEPS
    ===================================== */

    document.querySelectorAll(".process-step").forEach((step, index) => {
        step.style.transitionDelay = `${index * 80}ms`;
    });


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav a");

    const navObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.desktop-nav a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }

            });

        },
        {
            threshold: 0.45
        }
    );

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* =====================================
       PARALLAX EFFECT
    ===================================== */

    const hero = document.querySelector(".hero");

    if (hero && window.innerWidth > 768) {

        window.addEventListener("scroll", () => {

            const scrollPosition = window.scrollY;

            if (scrollPosition < window.innerHeight) {

                hero.style.backgroundPositionY =
                    `${50 + scrollPosition * 0.025}%`;

            }

        });
    }


    /* =====================================
       SMOOTH CTA HOVER
    ===================================== */

    document.querySelectorAll(".btn, .whatsapp-btn").forEach(button => {

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-2px)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });

    });


    /* =====================================
       WHATSAPP
    ===================================== */

    const whatsappButtons =
        document.querySelectorAll(".whatsapp-btn");

    whatsappButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            /*
                Replace this number later.

                IMPORTANT:
                Use international format without + or spaces.

                Example:
                919876543210
            */

            const phoneNumber = "YOUR_WHATSAPP_NUMBER";

            const message =
                "Hello House of Cianne! I would like to enquire about a custom outfit.";

            const whatsappURL =
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

        });

    });


    /* =====================================
       PAGE LOAD ANIMATION
    ===================================== */

    document.body.classList.add("page-loaded");
/* =====================================
   HERO SLIDER
===================================== */

const heroSlides =
    document.querySelectorAll(".hero-slide");

const heroContent =
    document.querySelectorAll(".hero-slide-content");

const nextButton =
    document.querySelector(".hero-next");

const previousButton =
    document.querySelector(".hero-prev");

const currentSlideNumber =
    document.querySelector(".current-slide");

const progressBar =
    document.querySelector(".hero-progress-bar");


let currentSlide = 0;

const totalSlides = heroSlides.length;

const slideDuration = 5000;

let slideTimer;


/* SHOW SLIDE */

function showSlide(index) {

    heroSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    heroContent.forEach(content => {
        content.classList.remove("active");
    });


    heroSlides[index].classList.add("active");

    heroContent[index].classList.add("active");


    currentSlideNumber.textContent =
        String(index + 1).padStart(2, "0");


    /* RESET PROGRESS */

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            progressBar.style.transition =
                `width ${slideDuration}ms linear`;

            progressBar.style.width = "100%";

        });

    });

}


/* NEXT */

function nextSlide() {

    currentSlide =
        (currentSlide + 1) % totalSlides;

    showSlide(currentSlide);

    restartTimer();
}


/* PREVIOUS */

function previousSlide() {

    currentSlide =
        (currentSlide - 1 + totalSlides) % totalSlides;

    showSlide(currentSlide);

    restartTimer();
}


/* AUTO PLAY */

function restartTimer() {

    clearInterval(slideTimer);

    slideTimer =
        setInterval(nextSlide, slideDuration);

}


/* BUTTONS */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSlide
    );

}

if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousSlide
    );

}


/* START */

showSlide(0);

restartTimer();


/* =====================================
   TOUCH SWIPE
===================================== */

let touchStartX = 0;
let touchEndX = 0;

const heroSection =
    document.querySelector(".hero");


if (heroSection) {

    heroSection.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    heroSection.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;


            if (Math.abs(distance) < 50) {
                return;
            }


            if (distance < 0) {
                nextSlide();
            } else {
                previousSlide();
            }

        },
        { passive: true }
    );

}
});