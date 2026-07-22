/* ==========================================================
   AM DESIGN — Interatividade (JavaScript puro)
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Dados dos serviços ---------- */
  const services = [
    {
      title: "Letreiros Personalizados",
      desc: "Peças exclusivas em diversos materiais, projetadas sob medida para a identidade da sua marca.",
      icon: '<path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2M9 20h6M12 4v16"/>',
    },
    {
      title: "Fachadas em ACM",
      desc: "Revestimentos modernos e duráveis que valorizam e destacam o seu ponto comercial.",
      icon: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M9 4v16"/>',
    },
    {
      title: "Aluguel de Andaimes",
      desc: "Estruturas seguras e certificadas para instalações em altura, com montagem ágil.",
      icon: '<path d="M4 4v16M20 4v16M4 9h16M4 15h16M9 4v16M15 4v16"/>',
    },
    {
      title: "Impressões em 3D",
      desc: "Prototipagem e peças tridimensionais com alta precisão de detalhes e acabamento.",
      icon: '<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
    },
    {
      title: "Letreiros Luminosos",
      desc: "Comunicação visual que brilha dia e noite, com iluminação eficiente e uniforme.",
      icon: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c.7.7 1 1.3 1 2h6c0-.7.3-1.3 1-2a7 7 0 0 0-4-12z"/>',
    },
    {
      title: "Letreiro LED Neon",
      desc: "O charme do neon com a tecnologia LED: efeitos vibrantes, econômicos e duradouros.",
      icon: '<path d="M4 12c0-4 2-7 8-7s8 3 8 7-2 7-8 7-8-3-8-7z"/><path d="M8 12h8"/>',
    },
    {
      title: "Corte Router CNC",
      desc: "Cortes e usinagens precisas em MDF, acrílico e PVC para projetos de qualquer complexidade.",
      icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    },
    {
      title: "Corte Laser CO2",
      desc: "Detalhamento fino e gravações perfeitas em acrílico, madeira e diversos materiais.",
      icon: '<path d="M12 2v8M12 10l-3 12M12 10l3 12"/><circle cx="12" cy="10" r="2"/>',
    },
  ];

  /* ---------- Render dos cards ---------- */
  function renderServices() {
    const grid = document.getElementById("servicesGrid");
    if (!grid) return;
    grid.innerHTML = services
      .map(
        (s, i) => `
      <article class="card" data-reveal style="transition-delay:${(i % 4) * 80}ms">
        <div class="card-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s.icon}</svg>
        </div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </article>`
      )
      .join("");

    // efeito de brilho seguindo o mouse
    grid.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Header com fundo ao rolar ---------- */
  function initHeaderScroll() {
    const header = document.getElementById("header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  function initMobileMenu() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    const close = () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ---------- Scroll suave (com offset do header) ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  /* ---------- Animações ao rolar (reveal) ---------- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Contadores animados ---------- */
  function initCounters() {
    const nums = document.querySelectorAll(".stat-num");
    if (!nums.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const end = parseInt(el.dataset.count, 10) || 0;
          const dur = 1400;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * end) + (end >= 100 ? "+" : "");
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((n) => io.observe(n));
  }

  /* ---------- Slideshow do fallback do vídeo ---------- */
  function initSlideshow() {
    const slides = document.querySelectorAll(".slideshow .slide");
    if (slides.length < 2) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, 4500);
  }

  /* ---------- Botão de play do vídeo ---------- */
  function initVideo() {
    const video = document.getElementById("heroVideo");
    const fallback = document.getElementById("videoFallback");
    const playBtn = document.getElementById("playBtn");
    if (!video || !playBtn) return;

    playBtn.addEventListener("click", () => {
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => fallback && (fallback.style.display = "none")).catch(() => {
          // Sem arquivo de vídeo ainda: mantém o slideshow institucional
          console.log("[v0] Vídeo institucional ainda não disponível — exibindo apresentação em imagens.");
        });
      }
    });

    video.addEventListener("playing", () => fallback && (fallback.style.display = "none"));
    video.addEventListener("pause", () => fallback && (fallback.style.display = ""));
  }

  /* ---------- Ano no rodapé ---------- */
  function initYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderServices();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
    initCounters();
    initSlideshow();
    initVideo();
    initYear();
  });
})();
