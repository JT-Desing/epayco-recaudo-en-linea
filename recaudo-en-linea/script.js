const modeContent = {
  archivo: {
    label: "Cobros masivos y recurrentes",
    title: "Recaudo por archivo",
    text: "Carga un archivo con facturas, cuotas u obligaciones para publicar cobros claros, consultables y listos para pagar en línea.",
    bullets: [
      "Ideal para colegios, propiedad horizontal y empresas de servicios.",
      "Tus clientes consultan el detalle antes de pagar.",
      "Tu equipo reduce validaciones manuales y reprocesos."
    ],
    cta: "Quiero Recaudo por archivo"
  },
  formulario: {
    label: "Cobros flexibles y activación rápida",
    title: "Recaudo por formulario",
    text: "Crea formularios de pago para campañas, eventos, inscripciones o conceptos variables sin depender de desarrollos largos.",
    bullets: [
      "Configura campos, conceptos y valores según la operación.",
      "Publica enlaces de pago fáciles de compartir.",
      "Recibe pagos organizados desde el mismo dashboard."
    ],
    cta: "Quiero Recaudo por formulario"
  },
  linea: {
    label: "Consulta, pago y trazabilidad",
    title: "Recaudo en línea",
    text: "Habilita una experiencia para que cada usuario consulte su obligación, elija su medio de pago y complete el proceso desde cualquier lugar.",
    bullets: [
      "Menos fricción para el cliente final.",
      "Más autonomía sin perder control operativo.",
      "Seguimiento en tiempo real de cada transacción."
    ],
    cta: "Quiero Recaudo en línea"
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function setMode(modeKey) {
  const content = modeContent[modeKey] || modeContent.archivo;
  const panel = qs(".mode-panel");

  qsa(".mode-tab").forEach((tab) => {
    const isActive = tab.dataset.mode === modeKey;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  qs("#modeLabel").textContent = content.label;
  qs("#modeTitle").textContent = content.title;
  qs("#modeText").textContent = content.text;
  qs("#modeCta").textContent = content.cta;

  const list = qs("#modeBullets");
  list.replaceChildren();
  content.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = bullet;
    list.appendChild(item);
  });

  if (hasGsap && !prefersReducedMotion && panel) {
    gsap.fromTo(
      qsa(".mode-panel > *"),
      { autoAlpha: 0, y: 18, filter: "blur(6px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.48, stagger: 0.045, ease: "power3.out" }
    );
  }
}

function initTabs() {
  qsa(".mode-tab").forEach((tab) => {
    tab.addEventListener("click", () => setMode(tab.dataset.mode));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

      const tabs = qsa(".mode-tab");
      const index = tabs.indexOf(tab);
      let nextIndex = index;

      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;

      event.preventDefault();
      tabs[nextIndex].focus();
      setMode(tabs[nextIndex].dataset.mode);
    });
  });
}

function initFaq() {
  qsa(".faq-list details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      qsa(".faq-list details").forEach((other) => {
        if (other !== item) other.removeAttribute("open");
      });
    });
  });
}

function initSmoothAnchors() {
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = qs(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });
}

function fallbackReveal() {
  const targets = qsa("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  targets.forEach((target) => observer.observe(target));
}

function initGsap() {
  if (!hasGsap || prefersReducedMotion) {
    fallbackReveal();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });

  gsap.timeline({ defaults: { duration: 0.78 } })
    .from(".site-header", { y: -28, autoAlpha: 0 })
    .from(".hero-copy > *", { y: 34, autoAlpha: 0, stagger: 0.065 }, "-=0.25")
    .from(".control-console", { y: 58, scale: 0.96, rotateX: 7, rotateY: -5, autoAlpha: 0, duration: 1.05 }, "-=0.55")
    .from(".floating-ticket", { x: 34, y: 26, autoAlpha: 0, duration: 0.7 }, "-=0.45")
    .from(".hero-flow span", { scaleX: 0, transformOrigin: "left center", stagger: 0.08, duration: 0.55 }, "-=0.45");

  gsap.to(".control-console", {
    y: -44,
    rotateX: -2,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8
    }
  });

  gsap.to(".floating-ticket", {
    x: -18,
    y: 48,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8
    }
  });

  gsap.to(".hero-glow", {
    y: 120,
    scale: 0.86,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  qsa(".section, .quick-stats").forEach((section) => {
    const targets = qsa(
      "[data-reveal], .stats-grid article, .comparison-card, .engine-step, .benefit-grid article, .sector-card, .timeline article, .brand-wall span, .proof-metrics article, .faq-list details",
      section
    );

    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y: 46, autoAlpha: 0, filter: "blur(7px)" },
      {
        y: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.72,
        stagger: { each: 0.055, from: "start" },
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 22%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  qsa(".engine-step, .benefit-grid article, .sector-card, .timeline article, .proof-metrics article").forEach((card, index) => {
    gsap.to(card, {
      y: index % 2 === 0 ? -16 : 14,
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  qsa(".brand-wall span").forEach((brand, index) => {
    gsap.to(brand, {
      y: index % 2 === 0 ? -18 : 18,
      scale: 1.025,
      scrollTrigger: {
        trigger: brand,
        start: "top 92%",
        end: "bottom 10%",
        scrub: true
      }
    });
  });

  gsap.to(".mode-panel", {
    y: -26,
    rotateX: 2,
    scrollTrigger: {
      trigger: ".modalities-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.8
    }
  });

  gsap.to(".closing-panel", {
    y: -30,
    scale: 1.012,
    scrollTrigger: {
      trigger: ".final-cta",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  ScrollTrigger.refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initFaq();
  initSmoothAnchors();
  setMode("archivo");
  initGsap();
});
