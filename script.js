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

    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const horaHoje = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // 1. Gerar documento PDF formatado para a Psicóloga salvar no computador/Google Drive
    const pdfTemplate = document.createElement('div');
    pdfTemplate.id = 'pdf-render-temp';
    pdfTemplate.style.position = 'fixed';
    pdfTemplate.style.left = '-9999px';
    pdfTemplate.style.top = '0';
    pdfTemplate.style.width = '750px';
    pdfTemplate.style.backgroundColor = '#ffffff';
    pdfTemplate.style.padding = '30px';
    pdfTemplate.style.fontFamily = 'Arial, sans-serif';
    pdfTemplate.style.color = '#33241F';
    pdfTemplate.style.lineHeight = '1.6';
    pdfTemplate.style.zIndex = '-9999';

    pdfTemplate.innerHTML = `
        <div style="text-align: center; border-bottom: 2px solid #9E4B31; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #9E4B31; margin: 0 0 5px 0; font-size: 20px;">DRA. LAURA DETONI QUEIROZ</h2>
            <p style="margin: 0; font-size: 13px; color: #5C4740;">Psicóloga Clínica • CRP 12/13874</p>
            <p style="margin: 3px 0 0 0; font-size: 11px; color: #8C726A;">Atendimento Psicológico Online e Presencial</p>
        </div>

        <div style="background-color: #F9EBE6; padding: 12px 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #9E4B31;">
            <h3 style="margin: 0; color: #9E4B31; font-size: 15px;">FICHA DE ANAMNESE INICIAL & TERMO DE CONSENTIMENTO (TCLE)</h3>
            <p style="margin: 3px 0 0 0; font-size: 11px; color: #5C4740;">Data do Registro: ${dataHoje} às ${horaHoje}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #9E4B31; border-bottom: 1px solid #E07A5F; padding-bottom: 4px; font-size: 13px; margin-bottom: 10px;">1. DADOS PESSOAIS DO PACIENTE</h4>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Nome Completo:</strong> ${nome}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Data de Nascimento:</strong> ${nascFormatada}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>CPF:</strong> ${cpf}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>E-mail:</strong> ${email}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Cidade/Estado:</strong> ${cidade}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #9E4B31; border-bottom: 1px solid #E07A5F; padding-bottom: 4px; font-size: 13px; margin-bottom: 10px;">2. CONTATO DE EMERGÊNCIA</h4>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Nome do Contato:</strong> ${emergNome}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Grau de Parentesco / Relação:</strong> ${emergRelacao}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Telefone de Emergência:</strong> ${emergTel}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="color: #9E4B31; border-bottom: 1px solid #E07A5F; padding-bottom: 4px; font-size: 13px; margin-bottom: 10px;">3. HISTÓRICO TERAPÊUTICO & QUEIXA PRINCIPAL</h4>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Já fez terapia anteriormente?</strong> ${jaFezTerapia}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Uso de medicação psiquiátrica:</strong> ${medicacao}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #33241F;"><strong>Motivo da Busca:</strong> ${motivo ? motivo : 'Não informado'}</p>
        </div>

        <div style="background-color: #F8F8F8; padding: 12px; border-radius: 6px; border: 1px solid #DDD; font-size: 11px; margin-top: 25px;">
            <h4 style="margin: 0 0 5px 0; color: #33241F; font-size: 12px;">DECLARAÇÃO DE ACEITE DO TERMO (TCLE)</h4>
            <p style="margin: 0; color: #555;">Declaro que li e concordo com os Termos de Consentimento Livre e Esclarecido (TCLE) para atendimento psicológico online, de acordo com a Resolução CFP nº 11/2018 e Código de Ética do Psicólogo. Aceite realizado digitalmente em ${dataHoje} às ${horaHoje}.</p>
            <p style="margin: 8px 0 0 0; font-weight: bold; color: #9E4B31;">Assinatura Digital do Paciente: ${nome} (CPF: ${cpf})</p>
        </div>
    `;

    document.body.appendChild(pdfTemplate);

    // Nome limpo para o arquivo PDF
    const nomeLimpo = nome.replace(/[^a-zA-Z0-9]/g, '_');
    const opt = {
        margin: 10,
        filename: `Ficha_Anamnese_${nomeLimpo}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Baixar o arquivo PDF com segurança
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(pdfTemplate).save().then(() => {
            if (document.body.contains(pdfTemplate)) {
                document.body.removeChild(pdfTemplate);
            }
        }).catch(err => {
            console.error("Erro ao gerar PDF:", err);
            if (document.body.contains(pdfTemplate)) {
                document.body.removeChild(pdfTemplate);
            }
        });
    }

    // 2. Formatar mensagem resumida do WhatsApp
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

📄 *O PDF do Prontuário Completo com o TCLE Assinado foi gerado automaticamente no dispositivo.*
📎 *Por favor, clique no clipe de anexo abaixo para me enviar o PDF gerado.*
✅ *Aceite do TCLE e Sigilo Profissional confirmado.*`;

    const phone = "5548984089109";
    const encodedText = encodeURIComponent(mensagem);

    window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encodedText}`, '_blank');
}


