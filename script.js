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

/**
 * Typeform / Google Forms Style Wizard Navigation
 */
let currentStepNumber = 1;

function updateWizardProgress(step) {
    currentStepNumber = step;
    const progressFill = document.getElementById('wizard-progress-bar');
    const stepCounter = document.getElementById('step-counter');
    const stepPercentage = document.getElementById('step-percentage');

    if (!progressFill) return;

    const percentages = { 1: 25, 2: 50, 3: 75, 4: 100 };
    const percentage = percentages[step] || 25;

    progressFill.style.width = `${percentage}%`;
    stepCounter.textContent = `Etapa ${step} de 4`;
    stepPercentage.textContent = `${percentage}% concluído`;
}

function nextWizardStep(targetStep) {
    // Validar campos obrigatórios do passo atual antes de prosseguir
    const currentStepEl = document.getElementById(`wizard-step-${targetStep - 1}`);
    if (currentStepEl) {
        const requiredInputs = currentStepEl.querySelectorAll('[required]');
        for (let input of requiredInputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }
        }
    }

    // Ocultar todos os passos
    document.querySelectorAll('.wizard-step').forEach(step => {
        step.classList.remove('active');
    });

    // Mostrar o passo alvo
    const targetStepEl = document.getElementById(`wizard-step-${targetStep}`);
    if (targetStepEl) {
        targetStepEl.classList.add('active');
        updateWizardProgress(targetStep);
        window.scrollTo({ top: 250, behavior: 'smooth' });
    }
}

function prevWizardStep(targetStep) {
    document.querySelectorAll('.wizard-step').forEach(step => {
        step.classList.remove('active');
    });

    const targetStepEl = document.getElementById(`wizard-step-${targetStep}`);
    if (targetStepEl) {
        targetStepEl.classList.add('active');
        updateWizardProgress(targetStep);
        window.scrollTo({ top: 250, behavior: 'smooth' });
    }
}

function handleWizardSubmit(event) {
    event.preventDefault();
    handleAnamneseSubmit(event);
}

/**
 * Ficha de Anamnese & TCLE Digital
 */
function handleAnamneseSubmit(event) {
    event.preventDefault();

    const nome = document.getElementById('ana-nome').value.trim();
    const nasc = document.getElementById('ana-nasc').value;
    const cpf = document.getElementById('ana-cpf').value.trim();
    const whatsapp = document.getElementById('ana-whatsapp').value.trim();
    const email = document.getElementById('ana-email').value.trim();
    const cidade = document.getElementById('ana-cidade').value.trim();

    const emergNome = document.getElementById('ana-emerg-nome').value.trim();
    const emergRelacao = document.getElementById('ana-emerg-relacao').value.trim();
    const emergTel = document.getElementById('ana-emerg-tel').value.trim();

    const jaFezTerapia = document.getElementById('ana-ja-fez-terapia').value;
    const medicacao = document.getElementById('ana-medicacao').value;
    const motivo = document.getElementById('ana-motivo').value.trim();
    const aceitoTermo = document.getElementById('ana-aceito-termo').checked;

    if (!aceitoTermo) {
        alert('Por favor, confirme que você concorda com o Termo de Consentimento Livre e Esclarecido (TCLE).');
        return;
    }

    // Formatar data de nascimento YYYY-MM-DD para DD/MM/YYYY
    let nascFormatada = nasc;
    if (nasc && nasc.includes('-')) {
        const p = nasc.split('-');
        nascFormatada = `${p[2]}/${p[1]}/${p[0]}`;
    }

    const mensagem = `📋 *FICHA DE CADASTRO & TCLE DIGITAL*
Dra. Laura Detoni Queiroz (CRP 12/13874)

👤 *Paciente:* ${nome}
📅 *Nascimento:* ${nascFormatada}
🆔 *CPF:* ${cpf}
📱 *WhatsApp:* ${whatsapp}
📧 *E-mail:* ${email}
🏙️ *Cidade/UF:* ${cidade}

🚨 *Contato de Emergência:* ${emergNome} (${emergRelacao} - Tel: ${emergTel})
💬 *Histórico:* Já fez terapia: ${jaFezTerapia} | Medicação: ${medicacao}
📝 *Motivo:* ${motivo ? motivo : 'Não especificado'}

✅ *Declaro que li e concordo com o Termo de Consentimento Livre e Esclarecido (TCLE) e Sigilo Profissional.*`;

    const phone = "5548984089109";
    const encodedText = encodeURIComponent(mensagem);

    window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}`, '_blank');
}
