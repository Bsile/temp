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

      enter(data) {
        hidePage();
      },

      async beforeEnter(data) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      },
    },
  ],
});

barba.hooks.once((data) => {
  initializeLenis(); // Initialiser Lenis lors du chargement initial
});

barba.hooks.enter((data) => {
  window.scrollTo(0, 0);
  if (data.next.namespace === 'about') {
    setupXpHover();
    initParallax();
    imgOnHover();
    loadSwiperScripts().then(() => {
      swiperAnimation();
    });
    loadAboutScripts().then(() => {
      webglpixeleffect();
    });
  }
  if (data.next.namespace === 'home') {
    popupvimeo();
  }
  if (data.next.namespace === 'extrapixels') {
    initScroll();
  }
});


barba.hooks.afterLeave((data) => {
  data.current.container.remove();
  if (data.current.namespace === 'about') {
    cleanupWebGL();
    destroySwiper();
    cleanupParallax();
  }
  if (data.next.namespace === 'extrapixels') {
    cleanupScroll();
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
});

barba.hooks.afterEnter((data) => {
  var vids = document.querySelectorAll("video"); vids.forEach(vid => { var playPromise = vid.play(); if (playPromise !== undefined) { playPromise.then(_ => {}).catch(error => {}); }; });
  ScrollTrigger.refresh();
});

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
