# 🌿 Dra. Laura Detoni Queiroz | Landing Page de Psicologia Clínica

> Site profissional, acolhedor e minimalista desenvolvido para a **Dra. Laura Detoni Queiroz** (CRP 12/13874), psicóloga clínica especializada em **Terapia Cognitivo-Comportamental (TCC)**.

![Paleta Terrosa e Salmão](https://img.shields.io/badge/Paleta-Tons_Terrosos_%26_Salm%C3%A3o-9E4B31?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsivo](https://img.shields.io/badge/Design-100%25_Responsivo-08a889?style=for-the-badge)

---

## 📌 Sobre o Projeto

Este projeto consiste em uma **Landing Page de Alta Conversão e Acolhimento**, inspirada nos melhores padrões da psicologia clínica contemporânea. O site foi projetado para transmitir segurança, clareza, empatia e facilidade no agendamento de consultas presenciais e online (no Brasil e exterior).

### 🌟 Destaques do Design
- **Paleta de Cores em Tons Terrosos & Salmão**: Combinação de Terracota/Argila (`#9E4B31`), Salmão Suave (`#E07A5F` / `#F2A48E`) e Fundo Linho Off-White (`#FDFBF8`).
- **Tipografia Minimalista e Contemporânea**: Utilização das fontes do Google Fonts **Outfit** (títulos elegantes sans-serif) e **Plus Jakarta Sans** (corpo de texto limpo e fluido).
- **Mobile-First & Responsivo**: Adaptado para uma experiência impecável em smartphones, tablets e desktops.

---

## 🚀 Funcionalidades Principais

1. **Hero Section (Capa Impactante)**:
   - Apresentação da profissional com moldura orgânica, badges de certificação e chamada direta para consulta.
   - CRP 12/13874 e atendimento online em destaque.

2. **Seção Acolhimento & Desafios**:
   - Cards explicativos sobre ansiedade, sobrecarga emocional, tomada de decisão e autoconhecimento.
   - Apresentação dos benefícios da Terapia Cognitivo-Comportamental (TCC).

3. **Agendamento com Sincronização do Google Agenda**:
   - Formulário interativo de escolha de data/horário que envia o pedido formatado direto para o WhatsApp da psicóloga.
   - Estrutura preparada para incorporar o iframe de agendamento automático do **Google Agenda**, **Cal.com** ou **Calendly**.

4. **Atendimento Online**:
   - Explicação sobre o sigilo profissional, comodidade das consultas à distância e flexibilidade de horários.

5. **Carrossel de Depoimentos**:
   - Slider dinâmico em JavaScript com relatos de pacientes, notas 5 estrelas e navegação por setas e pontos.

6. **Sobre Mim**:
   - Biografia humanizada da Dra. Laura Detoni Queiroz com fotos reais do consultório.

7. **Dúvidas Frequentes (FAQ Accordion)**:
   - Respostas expansíveis sobre TCC, duração das sessões, valores (de acordo com as orientações do CFP) e agendamentos.

8. **Widget Flutuante do WhatsApp**:
   - Botão fixo com efeito de animação e tooltip chamativa para agendamento instantâneo.

---

## 📁 Estrutura de Arquivos

```bash
site-psicologa/
├── assets/
│   └── images/
│       ├── laura-hero.jpg      # Foto do Hero (Atendimento Online no Laptop)
│       ├── laura-sobre.jpg     # Foto da Seção Sobre Mim (Poltrona Terracota com Tablet)
│       ├── laura-online.jpg    # Foto em miniatura para o card Atendimento Online
│       └── laura-real.jpg      # Foto original enviada
├── index.html                  # Estrutura HTML5 semântica e SEO otimizado
├── style.css                   # Sistema de design CSS (variáveis, animações e layout)
├── script.js                   # Interatividades em JS (Menu, FAQ, Slider e Agendamento)
└── README.md                   # Documentação completa do repositório
```

---

## 💻 Como Executar Localmente

1. Clone o repositório em sua máquina:
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd SEU-REPOSITORIO
   ```
3. Abra o arquivo `index.html` em qualquer navegador web, ou utilize a extensão **Live Server** no VS Code.

---

## 🌐 Como Fazer Deploy (Colocar Online)

### Opção 1: Netlify (Mais Rápido)
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arraste a pasta do projeto. O site estará online em poucos segundos.

### Opção 2: GitHub Pages
1. No seu repositório no GitHub, vá em **Settings** > **Pages**.
2. Em **Source**, selecione a branch `main` (ou `master`) e a pasta `/root`.
3. Clique em **Save**. Em instantes o link estará disponível em `https://seu-usuario.github.io/seu-repositorio/`.

---

## 📅 Como Conectar o Google Agenda

Para conectar a agenda pessoal do Google da Laura ao site:
1. No **Google Agenda**, clique em **`+ Criar`** > **`Horários de agendamento`**.
2. Configure a duração das sessões (ex: 50 min) e os dias/horários de atendimento.
3. Copie o **Link da Página de Agendamento** gerado pelo Google.
4. Cole o link no arquivo `index.html` no campo `<iframe id="google-calendar-iframe" src="LINK_DO_GOOGLE"></iframe>`.

---

## 📞 Contato & Redes

- **Profissional**: Dra. Laura Detoni Queiroz
- **Registro**: CRP 12/13874
- **WhatsApp**: +55 (48) 98408-9109

---

<div align="center">
  <sub>Desenvolvido com carinho para a saúde emocional e bem-estar. 🌸</sub>
</div>
