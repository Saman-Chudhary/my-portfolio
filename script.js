document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Reveal Animation Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation');
                const delay = element.getAttribute('data-delay') || 0;

                setTimeout(() => {
                    if (animationType === 'fade-up') {
                        element.classList.add('animate-fade-up');
                    } else if (animationType === 'fade-right') {
                        element.classList.add('animate-fade-right');
                    } else if (animationType === 'fade-left') {
                        element.classList.add('animate-fade-left');
                    }
                    observer.unobserve(element);
                }, delay);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Apply observer to all elements with the data-animation attribute
    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });
});