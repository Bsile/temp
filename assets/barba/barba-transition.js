import { showPage, hidePage } from '/temp/assets/barba/transition.js';

barba.init({
  debug: false,
  transitions: [
    {
      name: 'page-transition',
      once() { },

      async leave(data) {
        await showPage(data);
        data.current.container.remove();
      },

      enter() {
        hidePage();
      },
      async beforeEnter(data) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      },
    },
  ],
});

barba.hooks.once((data) => {
  updateHeader(data.next.namespace);
  initializeLenis(); // Initialiser Lenis lors du chargement initial
});

barba.hooks.enter((data) => {
  window.scrollTo(0, 0);
  updateHeader(data.next.namespace);
  if (data.next.namespace === 'about') {
    loadSwiperScripts();
    loadAboutScripts().then(() => {
      webglpixeleffect();
      imgOnHover();
      setupXpHover();
      initParallax();
      swiperAnimation();
    });
  }
  if (data.next.namespace === 'home') {
    popupvimeo();
  }
});


barba.hooks.afterLeave((data) => {
  data.current.container.remove();
  if (data.current.namespace === 'about') {
    cleanupWebGL();
    destroySwiper();
    cleanupParallax();
  }
});

barba.hooks.beforeEnter((data) => {
  $(data.next.container).find('img').attr('draggable', false);
  resetCursor(); // Réinitialiser le curseur avant d'entrer dans la nouvelle page
});

barba.hooks.after((data) => {
  pageentrance();
  growOnHover(); // Réinitialiser les écouteurs d'événements après chaque transition
  initializeLenis(); // Réinitialiser Lenis après chaque transition
  safariEdit();
});

barba.hooks.afterEnter((data) => {
  var vids = document.querySelectorAll("video"); vids.forEach(vid => { var playPromise = vid.play(); if (playPromise !== undefined) { playPromise.then(_ => {}).catch(error => {}); }; });
  ScrollTrigger.refresh();
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
