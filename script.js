/**
 * JavaScript Interactions - Dra. Laura Detoni Queiroz
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 4. Testimonials Slider Logic
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let currentIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        if (index >= testimonials.length) index = 0;
        if (index < 0) index = testimonials.length - 1;
        currentIndex = index;

        testimonials.forEach((card, i) => {
            card.classList.toggle('active', i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentIndex - 1);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            showTestimonial(currentIndex + 1);
            resetAutoSlide();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showTestimonial(i);
                resetAutoSlide();
            });
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, 6000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // 5. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);
});

/**
 * Agendamento Rápido via WhatsApp / Google Agenda
 */
function handleQuickBooking(event) {
    event.preventDefault();
    const dateInput = document.getElementById('booking-date').value;
    const timeInput = document.getElementById('booking-time').value;

    if (!dateInput || !timeInput) {
        alert('Por favor, selecione uma data e um horário.');
        return;
    }

    // Formatar data de YYYY-MM-DD para DD/MM/YYYY
    const parts = dateInput.split('-');
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

    const phone = "5548984089109";
    const text = `Olá Laura! Gostaria de agendar uma consulta para o dia ${formattedDate} às ${timeInput}. Poderia me confirmar a disponibilidade?`;
    const encodedText = encodeURIComponent(text);

    window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}`, '_blank');
}
