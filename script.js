document.addEventListener('DOMContentLoaded', () => {

  // ---- SCROLL REVEAL (Animação ao rolar a página) ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // ---- BOTÃO VOLTAR AO TOPO ----
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- MENU MOBILE ----
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navToggle.textContent = open ? '✕' : '☰';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.textContent = '☰';
  }));

  // ---- VALIDAÇÃO DO FORMULÁRIO E ENVIO DE E-MAIL ----
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  function validate(input, fn) {
    const err = fn(input.value);
    const span = input.parentElement.querySelector('.error-msg');
    span.textContent = err;
    return !err;
  }

  const validators = {
    name: v => v.trim().length >= 2 ? '' : 'Nome muito curto (mínimo 2 caracteres).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Insira um e-mail válido.',
    message: v => v.trim().length >= 10 ? '' : 'A mensagem precisa ter pelo menos 10 caracteres.'
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = [
      validate(nameInput, validators.name),
      validate(emailInput, validators.email),
      validate(messageInput, validators.message)
    ].every(Boolean);

    if (!ok) return;

    // Pega o e-mail preenchido no formulário para montar o assunto e o corpo
    const subject = encodeURIComponent(`Contato via Portfólio — ${nameInput.value.trim()}`);
    const body = encodeURIComponent(
      `Nome: ${nameInput.value.trim()}\nE-mail: ${emailInput.value.trim()}\n\nMensagem:\n${messageInput.value.trim()}`
    );
    
    // Dispara o cliente de e-mail padrão do usuário
    window.location.href = `mailto:${emailInput.value.trim()}?subject=${subject}&body=${body}`;
  });
});