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
        height: window.innerHeight
      };
    }

    // follwoing line is not required to work pinning on touch screen

    /* pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed"*/
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
locoScroll()


function growOnHover() {
  const hoverables = document.querySelectorAll('#link');

  // Listeners

  document.body.addEventListener('mousemove', onMouseMove);
  for (let i = 0; i < hoverables.length; i++) {
    hoverables[i].addEventListener('mouseenter', onMouseHover);
    hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
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

  }
  function onMouseHoverOut() {
    TweenMax.to(mouse, .3, {
      scale: 1,
    });

  }
}
growOnHover();


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
textanimation()


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
  tl.to("#content, #video", {
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