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

    // Scroll Reveal Animation Logic using Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation');
                const delay = element.getAttribute('data-delay') || 0;

                setTimeout(() => {
                    // Add the appropriate animation class
                    element.classList.add(`animate-${animationType}`);
                }, delay);
                
                // Stop observing once the element is animated
                observer.unobserve(element);
            }
        });
    }, {
        // Options for the observer: trigger when 15% of the element is visible
        threshold: 0.15 
    });

    // Apply observer to all elements with the data-animation attribute
    document.querySelectorAll('[data-animation]').forEach(el => {
        // Ensure initial hidden state for elements outside viewport
        if (!el.classList.contains('animate-fade-up')) { 
            if (el.getAttribute('data-animation') === 'fade-up') el.style.transform = 'translateY(20px)';
            if (el.getAttribute('data-animation') === 'fade-down') el.style.transform = 'translateY(-20px)';
            if (el.getAttribute('data-animation') === 'fade-right') el.style.transform = 'translateX(-20px)';
            if (el.getAttribute('data-animation') === 'fade-left') el.style.transform = 'translateX(20px)';
        }

        observer.observe(el);
    });
});
