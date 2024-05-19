import { showPage, hidePage } from '/temp/assets/barba/transition.js';

barba.init({
  debug: true,
  transitions: [
    {
      name: 'page-transition',
      once() {},

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
});

barba.hooks.enter((data) => {
  updateHeader(data.next.namespace);
});


barba.hooks.after((data) => {
    
    textanimation();

    pageentrance();

    popupvimeo();

    growOnHover();

});






const updateHeader = (data)=> {
  const navPages = document.querySelectorAll('nav > a');

  navPages.forEach((item)=> {
    const getData = item.textContent.toLowerCase().includes(data);

    item.classList.remove('--active')
    getData && item.classList.add('--active');
  })
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