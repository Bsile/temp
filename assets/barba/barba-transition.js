import { showPage, hidePage } from '/temp/assets/barba/transition.js';

barba.init({
  debug: false,
  transitions: [
    {
      name: 'page-transition',
      once() { },

      async leave(data) {
        await showPage(data);
      },

      enter() {
        hidePage();
      },
    },
  ],
});

barba.hooks.once((data) => {
  updateHeader(data.next.namespace);
  initializeLenis(); // Initialiser Lenis lors du chargement initial
});

barba.hooks.enter((data) => {
  updateHeader(data.next.namespace);
  if (data.next.namespace === 'about') {
    loadScripts().then(() => {
      webglpixeleffect();
      imgOnHover();
    });
  }
});

barba.hooks.afterLeave((data) => {
  data.current.container.remove();
  if (data.current.namespace === 'about') {
    cleanupWebGL();
  }
});

barba.hooks.beforeEnter((data) => {
  resetCursor(); // Réinitialiser le curseur avant d'entrer dans la nouvelle page
});

barba.hooks.after((data) => {
  pageentrance();
  popupvimeo();
  growOnHover(); // Réinitialiser les écouteurs d'événements après chaque transition
  initializeLenis(); // Réinitialiser Lenis après chaque transition
  safariEdit();
});

const updateHeader = (data) => {
  const navPages = document.querySelectorAll('nav > a');

  navPages.forEach((item) => {
    const getData = item.textContent.toLowerCase().includes(data);

    item.classList.remove('--active');
    getData && item.classList.add('--active');
  });
};

function leaveAnimation(container) {
  return new Promise(async resolve => {
    await gsap
      .to(container, {
        duration: 1,
        opacity: 0,
      })
      .then();
    resolve();
  });
}
