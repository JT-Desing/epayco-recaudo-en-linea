const modeContent = {
  archivo: {
    label: 'Cobros masivos y recurrentes',
    title: 'Recaudo por archivo',
    text: 'Carga un archivo con facturas, cuotas u obligaciones para que tus clientes consulten el detalle y paguen en línea.',
    bullets: [
      'Ideal para colegios, administración y servicios recurrentes.',
      'Permite ordenar obligaciones por usuario, unidad o concepto.',
      'Reduce validaciones manuales después del pago.'
    ],
    cta: 'Quiero Recaudo por archivo'
  },
  formulario: {
    label: 'Cobros variables y campañas',
    title: 'Recaudo por formulario',
    text: 'Crea formularios personalizados para recibir pagos por conceptos definidos por tu negocio, eventos, campañas o inscripciones.',
    bullets: [
      'Ideal para inscripciones, eventos y cobros temporales.',
      'Permite publicar una experiencia clara sin construir un flujo propio.',
      'Ayuda a capturar información útil junto al pago.'
    ],
    cta: 'Quiero Recaudo por formulario'
  },
  linea: {
    label: 'Consulta y pago autónomo',
    title: 'Recaudo en línea',
    text: 'Habilita una experiencia para que tus usuarios consulten su obligación y paguen desde cualquier lugar.',
    bullets: [
      'Ideal para empresas que quieren digitalizar la consulta de obligaciones.',
      'Reduce preguntas repetitivas sobre montos, conceptos y estado.',
      'Entrega más autonomía al cliente y más visibilidad al equipo.'
    ],
    cta: 'Quiero Recaudo en línea'
  }
};

const modeLabel = document.querySelector('#modeLabel');
const modeTitle = document.querySelector('#modeTitle');
const modeText = document.querySelector('#modeText');
const modeBullets = document.querySelector('#modeBullets');
const modeCta = document.querySelector('#modeCta');

document.querySelectorAll('.mode-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const nextMode = modeContent[tab.dataset.mode];

    document.querySelectorAll('.mode-tab').forEach((button) => {
      const isActive = button === tab;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    modeLabel.textContent = nextMode.label;
    modeTitle.textContent = nextMode.title;
    modeText.textContent = nextMode.text;
    modeCta.textContent = nextMode.cta;
    modeBullets.replaceChildren(...nextMode.bullets.map((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));

    if (window.gsap) {
      gsap.fromTo(
        '.mode-panel > *',
        { y: 18, rotateX: -5, filter: 'blur(5px)' },
        { y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.46, stagger: 0.06, ease: 'power3.out' }
      );
    }
  });
});

document.querySelectorAll('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) {
      return;
    }

    document.querySelectorAll('.faq-list details').forEach((other) => {
      if (other !== item) {
        other.open = false;
      }
    });
  });
});

const revealElements = document.querySelectorAll('[data-reveal]');

function enableFallbackReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => observer.observe(element));
}

window.addEventListener('load', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ invalidateOnRefresh: true });

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-copy > *', { y: 34, duration: 0.9, stagger: 0.07 })
      .from('.product-frame', { y: 46, scale: 0.965, rotateX: 7, rotateY: -5, duration: 1 }, '<0.1')
      .from('.floating-note', { x: 28, y: 24, rotate: -2, duration: 0.82 }, '<0.35');

    gsap.to('.product-frame', {
      y: -42,
      rotateX: -2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      }
    });

    gsap.to('.floating-note', {
      y: 48,
      x: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8
      }
    });

    gsap.to('.hero', {
      backgroundPosition: '0 -120px, 0 -90px, 0 0',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.utils.toArray('.section, .quick-stats').forEach((section) => {
      const targets = section.querySelectorAll(
        '[data-reveal], .stats-grid article, .contrast-card, .engine-step, .sector-card, .timeline article, .brand-wall span, .proof-metrics article, .faq-list details'
      );

      if (!targets.length) {
        return;
      }

      gsap.fromTo(targets, {
        y: 42,
        scale: 0.985,
        filter: 'blur(5px)'
      }, {
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.74,
        ease: 'power3.out',
        stagger: { each: 0.055, from: 'start' },
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          end: 'bottom 22%',
          toggleActions: 'play reverse play reverse'
        }
      });
    });

    gsap.utils.toArray('.engine-step').forEach((step, index) => {
      gsap.to(step, {
        x: index % 2 === 0 ? 18 : -18,
        y: index % 2 === 0 ? -10 : 10,
        scale: 1.015,
        ease: 'none',
        scrollTrigger: {
          trigger: step,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    gsap.utils.toArray('.sector-card, .timeline article, .proof-metrics article').forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 === 0 ? -16 : 14,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    gsap.utils.toArray('.brand-wall span').forEach((logo, index) => {
      gsap.to(logo, {
        y: index % 2 === 0 ? -18 : 18,
        scale: 1.025,
        ease: 'none',
        scrollTrigger: {
          trigger: '.brand-wall',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    gsap.to('.mode-panel', {
      y: -28,
      rotateX: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '.modalities-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      }
    });

    gsap.to('.closing-panel', {
      y: -30,
      scale: 1.018,
      ease: 'none',
      scrollTrigger: {
        trigger: '.final-cta',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  } else {
    enableFallbackReveal();
  }
});
