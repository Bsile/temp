function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true }
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }



    // follwoing line is not required to work pinning on touch screen

    /* pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed"*/
  });


  ScrollTrigger.addEventListener("refresh", () => locoScroll.init());
  new ResizeObserver(() => locoScroll.update()).observe(document.querySelector("#main"));

  ScrollTrigger.refresh();

}


let lenis;

function initializeLenis() {
  if (lenis) {
    lenis.destroy(); // Détruire l'ancienne instance de Lenis si elle existe
    console.log('Lenis destroyed');
  }

  // init lenis
  lenis = new Lenis({ wrapper: document.body });({
    lerp: 0.1,
    smooth: true,
  });

  console.log('Lenis initialized');

  const loop = (time) => {
    lenis.raf(time);
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  lenis.on('scroll', (e) => {
    console.log(e);
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      lenis.scrollTo(this.getAttribute('href'));
    });
  });
}
initializeLenis();




function growOnHover() {
  const hoverables = document.querySelectorAll('#link');
  const texthoverables = document.querySelectorAll('#textlink');
  const textinteraction = document.querySelectorAll('#hoverinteraction')

  // Listeners

  document.body.addEventListener('mousemove', onMouseMove);
  for (let i = 0; i < hoverables.length; i++) {
    hoverables[i].addEventListener('mouseenter', onMouseHover);
    hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
  }
  for (let i = 0; i < texthoverables.length; i++) {
    texthoverables[i].addEventListener('mouseenter', textOnMouseHover);
    texthoverables[i].addEventListener('mouseleave', textOnMouseHoverOut);
  }
  // Move the cursor

  function onMouseMove(e) {
    TweenMax.to(mouse, .5, {
      x: e.clientX - 0,
      y: e.clientY - 0
    });

  }

  // Hover an element
  function onMouseHover() {
    TweenMax.to(mouse, .3, {
      scale: 2,
    });
    TweenMax.to(textinteraction, .3, {
      scale: 1,
    });

  }
  function onMouseHoverOut() {
    TweenMax.to(mouse, .3, {
      scale: 1,
    });
    TweenMax.to(textinteraction, .3, {
      scale: 0,
    });

  }

  function textOnMouseHover() {
    TweenMax.to(mouse, .3, {
      scale: 2,
    });
    TweenMax.to(mouse, 0, {
      backdropFilter: 'invert(1) grayscale(1)',
      backgroundColor: 'var(--contenthover)',
    });

  }
  function textOnMouseHoverOut() {
    TweenMax.to(mouse, .3, {
      scale: 1,
    });
    TweenMax.to(mouse, 0, {
      backdropFilter: 'none',
      backgroundColor: 'var(--content)',
    });

  }
}
growOnHover();


function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function safariEdit() {
  const elements = document.getElementsByClassName("bg");
  if (isSafari()) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.visibility = 'hidden';
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.visibility = 'visible';
    }
  }
}

safariEdit();




function darkmode() {
  const wasDarkmode = localStorage.getItem('darkmode') === 'true';
  localStorage.setItem('darkmode', !wasDarkmode);
  const element = document.body;
  element.classList.toggle('dark-mode', !wasDarkmode);
}
function onload() {
  document.body.classList.toggle('dark-mode', localStorage.getItem('darkmode') === 'true');
}


function popupvimeo() {
  $(document).ready(function () {
    $('.popup-vimeo').magnificPopup({ type: 'iframe', removalDelay: 300, mainClass: 'mfp-fade' });
  });
}
popupvimeo()


function textanimation() {

  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "lines, words",
    tagName: "span",
    wordClass: 'word'
  });


  // Text animation
  const textrev = gsap.timeline();

  textrev.from(".word", {
    y: 120,
    stagger: 0.03,
    duration: 1,
    ease: "circ.out",
  });

  gsap.set("[text-split]", { opacity: 1 });

}


function textOnHover(text) {
  const divTexte = document.getElementById('hoverinteraction');

  switch (text) {
    case 'reel':
      divTexte.textContent = 'Play';
      break;
    case 'project':
      divTexte.textContent = 'Voir';
      break;
      case 'btn':
      divTexte.textContent = ' ';
      break;
      case 'dark':
      divTexte.textContent = 'Switch';
      break;
    default:
      break;
  }

}


function changeText(text) {
  const divTexte = document.getElementById('pagename');

  switch (text) {
    case 'work':
      divTexte.textContent = 'Work';
      break;
    case 'about':
      divTexte.textContent = 'About';
      break;
    case 'contact':
      divTexte.textContent = 'Contact';
      break;
    default:
      break;
  }

}


function introanimation() {
  var tl = gsap.timeline()
  tl.set("#loader h3", {
    visibility: "visible"
  })
    .set("#video, #content", {
      yPercent: 50,
    })
    .set("#work", {
      yPercent: 20,
    })
  tl.from("#loader h3", {
    yPercent: 100,
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
  })
  tl.add('start')
  tl.to("#loader h3", {
    opacity: 1,
    yPercent: -100,
    duration: 1,
    stagger: 0.1,
    ease: "expo.inOut",
  }, 'start')
  tl.to("#content, #video, #playcontainer", {
    yPercent: 0,
    duration: 1,
    ease: "expo.inOut",
  }, 'start')
  tl.to("#work", {
    yPercent: 0,
    duration: 1.1,
    ease: "expo.inOut",
  }, 'start')
  tl.to("#loader", {
    yPercent: -100,
    duration: 1,
    ease: "expo.inOut",
  }, 'start')
  tl.to("#loader", {
    display: "none"
  })
}
introanimation()


function pageentrance() {
  var tl = gsap.timeline();
  tl.set("#video, #content", {
    yPercent: 50,
  })
    .set("#work", {
      yPercent: 20,
    });
  tl.add('start');
  tl.to("#content, #video", {
    yPercent: 0,
    duration: 1,
    ease: "expo.inOut",
  }, 'start');
  tl.to("#work", {
    yPercent: 0,
    duration: 1.1,
    ease: "expo.inOut",
  }, 'start');
  tl.delay(0.1);
}