/* =========================================================
   AgroForte - script.js
   Desenvolvido em JavaScript moderno (ES6+)
   Funcionalidades:
   ✔ Menu Mobile Responsivo
   ✔ Scroll Reveal com Intersection Observer
   ✔ Filtro Dinâmico de Cards
   ✔ Carousel / Slider Moderno
   ✔ Validação de Formulário
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. MENU RESPONSIVO (MOBILE)
     ========================================================= */

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Abre e fecha menu mobile
  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fecha menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  /* =========================================================
     2. SCROLL REVEAL (ANIMAÇÃO AO ROLAR)
     ========================================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .card, .section-title, .hero-content"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {

        // Adiciona classe quando elemento aparece
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }

      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* =========================================================
     3. FILTRO DINÂMICO DE CONTEÚDO
     ========================================================= */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const filterCards = document.querySelectorAll(".filter-card");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      // Remove botão ativo
      filterButtons.forEach(btn => btn.classList.remove("active"));

      // Adiciona botão ativo
      button.classList.add("active");

      const category = button.dataset.filter;

      filterCards.forEach(card => {

        // Mostra todos
        if (category === "all") {
          card.style.display = "block";

          // Filtro por categoria
        } else if (card.dataset.category === category) {
          card.style.display = "block";

        } else {
          card.style.display = "none";
        }

      });

    });

  });

  /* =========================================================
     4. CAROUSEL / SLIDER
     ========================================================= */

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-slide");
  const prevBtn = document.querySelector(".prev-slide");

  let currentSlide = 0;

  // Função para mostrar slide
  const showSlide = (index) => {

    slides.forEach(slide => {
      slide.classList.remove("active");
    });

    slides[index].classList.add("active");

  };

  // Próximo slide
  const nextSlide = () => {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);
  };

  // Slide anterior
  const prevSlide = () => {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  };

  // Eventos botões
  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  // Auto play do slider
  if (slides.length > 0) {
    showSlide(currentSlide);

    setInterval(() => {
      nextSlide();
    }, 5000);
  }

  /* =========================================================
     5. SCROLL SUAVE
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });

  /* =========================================================
     6. VALIDAÇÃO DE FORMULÁRIO
     ========================================================= */

  const contactForm = document.querySelector("#contactForm");
  const feedback = document.querySelector("#formFeedback");

  // Função validar email
  const validateEmail = (email) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

  };

  contactForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#mensagem").value.trim();

    // Reset feedback
    feedback.textContent = "";
    feedback.className = "";

    // Verificação campos vazios
    if (!name || !email || !message) {

      feedback.textContent = "Por favor, preencha todos os campos.";
      feedback.classList.add("error");

      return;

    }

    // Verificação email válido
    if (!validateEmail(email)) {

      feedback.textContent = "Digite um e-mail válido.";
      feedback.classList.add("error");

      return;

    }

    // Sucesso
    feedback.textContent =
      "Mensagem enviada com sucesso! Em breve entraremos em contato.";

    feedback.classList.add("success");

    // Limpa formulário
    contactForm.reset();

  });

  /* =========================================================
     7. DARK MODE COM LOCAL STORAGE
     ========================================================= */

  const darkModeToggle = document.querySelector("#darkModeToggle");

  // Aplica dark mode salvo
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // Alternar dark mode
  darkModeToggle?.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Salva preferência
    if (document.body.classList.contains("dark-mode")) {

      localStorage.setItem("darkMode", "enabled");

    } else {

      localStorage.setItem("darkMode", "disabled");

    }

  });

});
