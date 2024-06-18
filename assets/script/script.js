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
  lenis = new Lenis;({
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
      divTexte.textContent = ' ';
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
    .set("#work, #testimonials", {
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
  tl.to("#work, #testimonials", {
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


function webglpixeleffect() {
  const imageContainer = document.getElementById("imageContainer");
  const imageElement = document.getElementById("webglpixeleffect");

  let easeFactor = 0.02;
  let scene, camera, renderer, planeMesh;
  let mousePosition = { x: 0.5, y: 0.5 };
  let targetMousePosition = { x: 0.5, y: 0.5 };
  let aberrationIntensity = 0.0;
  let prevPosition = { x: 0.5, y: 0.5 };

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;

        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
  `;

  function initializeScene(texture) {
    scene = new THREE.Scene();

    const imageAspect = imageElement.naturalWidth / imageElement.naturalHeight;
    const containerAspect = imageContainer.offsetWidth / imageContainer.offsetHeight;

    camera = new THREE.OrthographicCamera(
      -containerAspect, containerAspect, 1, -1, 0.01, 10
    );
    camera.position.z = 1;

    const shaderUniforms = {
      u_mouse: { type: "v2", value: new THREE.Vector2() },
      u_prevMouse: { type: "v2", value: new THREE.Vector2() },
      u_aberrationIntensity: { type: "f", value: 0.0 },
      u_texture: { type: "t", value: texture }
    };

    let planeWidth, planeHeight;
    if (containerAspect > imageAspect) {
      planeWidth = 2 * containerAspect;
      planeHeight = planeWidth / imageAspect;
    } else {
      planeHeight = 2;
      planeWidth = planeHeight * imageAspect;
    }

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

    planeMesh = new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        uniforms: shaderUniforms,
        vertexShader,
        fragmentShader
      })
    );

    scene.add(planeMesh);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(imageContainer.offsetWidth, imageContainer.offsetHeight);

    imageContainer.appendChild(renderer.domElement);
  }

  function onResize() {
    const containerAspect = imageContainer.offsetWidth / imageContainer.offsetHeight;
    const imageAspect = imageElement.naturalWidth / imageElement.naturalHeight;

    camera.left = -containerAspect;
    camera.right = containerAspect;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();

    let planeWidth, planeHeight;
    if (containerAspect > imageAspect) {
      planeWidth = 2 * containerAspect;
      planeHeight = planeWidth / imageAspect;
    } else {
      planeHeight = 2;
      planeWidth = planeHeight * imageAspect;
    }

    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

    renderer.setSize(imageContainer.offsetWidth, imageContainer.offsetHeight);
  }

  window.addEventListener('resize', onResize);

  initializeScene(new THREE.TextureLoader().load(imageElement.src));

  animateScene();

  function animateScene() {
    requestAnimationFrame(animateScene);

    mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
    mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

    planeMesh.material.uniforms.u_mouse.value.set(
      mousePosition.x,
      1.0 - mousePosition.y
    );

    planeMesh.material.uniforms.u_prevMouse.value.set(
      prevPosition.x,
      1.0 - prevPosition.y
    );

    aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);

    planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;

    renderer.render(scene, camera);
  }

  imageContainer.addEventListener("mousemove", handleMouseMove);
  imageContainer.addEventListener("mouseenter", handleMouseEnter);
  imageContainer.addEventListener("mouseleave", handleMouseLeave);

  function handleMouseMove(event) {
    easeFactor = 0.02;
    let rect = imageContainer.getBoundingClientRect();
    prevPosition = { ...targetMousePosition };

    targetMousePosition.x = (event.clientX - rect.left) / rect.width;
    targetMousePosition.y = (event.clientY - rect.top) / rect.height;

    aberrationIntensity = 1;
  }

  function handleMouseEnter(event) {
    easeFactor = 0.02;
    let rect = imageContainer.getBoundingClientRect();

    mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
    mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
  }

  function handleMouseLeave() {
    easeFactor = 0.05;
    targetMousePosition = { ...prevPosition };
  }
}

webglpixeleffect();
