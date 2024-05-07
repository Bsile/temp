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
        scale: 2
      });

    }
    function onMouseHoverOut() {
      TweenMax.to(mouse, .3, {
        scale: 1
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



$(document).ready(function() {
  $('.popup-vimeo').magnificPopup({type:'iframe',removalDelay: 300,mainClass: 'mfp-fade'});
});




function textanimation() {
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", (event) => {



  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "lines, words, chars",
    tagName: "span"
  });

  const textrev = gsap.timeline();

            textrev.from(".word",{
              y:120,
              stagger:0.03,
              duration:1,
              ease: "circ.out",
            });

            gsap.set("[text-split]", { opacity: 1 });
})
}

textanimation()
