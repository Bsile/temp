$('img').attr('draggable', false);





// Vérifiez si lenis n'est pas déjà déclaré globalement
if (typeof window.lenis === 'undefined') {
  window.lenis = null;
}

function initializeLenis() {
  if (window.lenis) {
    window.lenis.destroy(); // Détruire l'ancienne instance de Lenis si elle existe
    /*console.log('Lenis destroyed');*/
  }

  // init lenis
  window.lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
  });

  /*console.log('Lenis initialized');*/

  const loop = (time) => {
    window.lenis.raf(time);
    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  window.lenis.on('scroll', (e) => {
    /*console.log(e);*/
  });

  window.lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    window.lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const clickListener = function (e) {
      e.preventDefault();
      window.lenis.scrollTo(this.getAttribute('href'));
    };

    anchor.removeEventListener('click', clickListener);
    anchor.addEventListener('click', clickListener);
  });
}
initializeLenis();







let mouseMoveListener;
let hoverListeners = [];
let textHoverListeners = [];

function growOnHover() {
  const hoverables = document.querySelectorAll('#link');
  const texthoverables = document.querySelectorAll('#textlink');
  const textinteraction = document.querySelectorAll('#hoverinteraction')

  if (mouseMoveListener) {
    document.body.removeEventListener('mousemove', mouseMoveListener);
  }
  mouseMoveListener = onMouseMove;
  document.body.addEventListener('mousemove', mouseMoveListener);

  hoverListeners.forEach(listener => {
    listener.element.removeEventListener('mouseenter', listener.mouseEnter);
    listener.element.removeEventListener('mouseleave', listener.mouseLeave);
  });
  hoverListeners = [];

  for (let i = 0; i < hoverables.length; i++) {
    hoverListeners.push({
      element: hoverables[i],
      mouseEnter: onMouseHover,
      mouseLeave: onMouseHoverOut
    });
    hoverables[i].addEventListener('mouseenter', onMouseHover);
    hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
  }

  textHoverListeners.forEach(listener => {
    listener.element.removeEventListener('mouseenter', listener.mouseEnter);
    listener.element.removeEventListener('mouseleave', listener.mouseLeave);
  });
  textHoverListeners = [];

  for (let i = 0; i < texthoverables.length; i++) {
    textHoverListeners.push({
      element: texthoverables[i],
      mouseEnter: textOnMouseHover,
      mouseLeave: textOnMouseHoverOut
    });
    texthoverables[i].addEventListener('mouseenter', textOnMouseHover);
    texthoverables[i].addEventListener('mouseleave', textOnMouseHoverOut);
  }

  function onMouseMove(e) {
    TweenMax.to(mouse, 0.5, {
      x: e.clientX - 0,
      y: e.clientY - 0
    });
  }

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


function resetCursor() {
  TweenMax.to(mouse, .3, {
    scale: 1,
    backdropFilter: 'none',
    backgroundColor: 'var(--content)'
  })
  TweenMax.to(mouse, 1, {
    x: e.clientX - 0,
    y: e.clientY - 0
  });
}





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
    console.log('Removing previous event listeners for .popup-vimeo...');
    // Détacher tous les écouteurs d'événements précédemment attachés à .popup-vimeo
    $('.popup-vimeo').off('click.magnificPopup');

    console.log('Adding new event listeners for .popup-vimeo...');
    // Ajouter les nouveaux écouteurs d'événements
    $('.popup-vimeo').magnificPopup({
      type: 'iframe',
      removalDelay: 300,
      mainClass: 'mfp-fade'
    });
  });
}

popupvimeo();



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
    case 'swiper':
      divTexte.textContent = '< >';
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
    .set(".intro1", {
      yPercent: 50,
    })
    .set(".intro2", {
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
  tl.to(".intro1", {
    yPercent: 0,
    duration: 1,
    ease: "expo.inOut",
  }, 'start')
  tl.to(".intro2", {
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
  tl.set(".intro1", {
    yPercent: 50,
  })
    .set(".intro2", {
      yPercent: 20,
    });
  tl.add('start');
  tl.to(".intro1", {
    yPercent: 0,
    duration: 1,
    ease: "expo.inOut",
  }, 'start');
  tl.to(".intro2", {
    yPercent: 0,
    duration: 1.1,
    ease: "expo.inOut",
  }, 'start');
  tl.delay(0.1);
}





document.addEventListener('DOMContentLoaded', function () {
  function isAboutPage() {
    return window.location.pathname.endsWith('about.html');
  }

  if (isAboutPage()) {
    loadAboutScripts().then(() => {
      webglpixeleffect();
      imgOnHover();
      setupXpHover();
      swiperAnimation();
      initParallax();
    });
  }
});





function loadAboutScripts() {
  return new Promise((resolve, reject) => {
    if (typeof THREE !== 'undefined') {
      console.log('Three.js is already loaded.');
      resolve();
    } else {
      // Check if the script is already being loaded
      const existingScript = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"]');
      if (existingScript) {
        console.log('Three.js script is already being loaded.');
        existingScript.addEventListener('load', resolve);
        existingScript.addEventListener('error', reject);
      } else {
        console.log('Loading Three.js script...');
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js';
        script.onload = () => {
          console.log('Three.js script loaded successfully.');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load Three.js script.');
          reject();
        };
        document.head.appendChild(script);
      }
    }
  });
}



let renderer, scene, camera, planeMesh;
let animationFrameId = null;

function webglpixeleffect() {
  console.log('Initializing WebGL effect...');
  const imageContainer = document.getElementById("imageContainer");
  const imageElement = document.getElementById("webglpixeleffect");

  let easeFactor = 0.02;
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
    console.log('Initializing scene...');
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
    console.log('Resizing...');
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

  function animateScene() {
    animationFrameId = requestAnimationFrame(animateScene);

    if (!renderer || !scene || !camera) return;

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

  animateScene();

  // Définitions de fonctions pour les écouteurs d'événements
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

  // Ajout des nouveaux event listeners
  console.log('Adding new event listeners...');
  imageContainer.addEventListener("mousemove", handleMouseMove);
  imageContainer.addEventListener("mouseenter", handleMouseEnter);
  imageContainer.addEventListener("mouseleave", handleMouseLeave);

  // Nettoyage
  function cleanupWebGL() {
    if (renderer) {
      console.log('Cleaning up WebGL...');
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;

      // Suppression des event listeners de imageContainer
      console.log('Removing event listeners...');
      imageContainer.removeEventListener("mousemove", handleMouseMove);
      imageContainer.removeEventListener("mouseenter", handleMouseEnter);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);

      // Suppression de l'écouteur d'événements resize
      window.removeEventListener('resize', onResize);

      // Suppression de l'élément renderer de imageContainer
      if (renderer.domElement) {
        renderer.domElement.remove();
      }

      // Dispose du renderer Three.js
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.context = null;
      renderer.domElement = null;
      renderer = null;

      // Nettoyage de la scène Three.js
      if (scene) {
        while (scene.children.length > 0) {
          const child = scene.children[0];
          scene.remove(child);
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        }
      }

      scene = null;
      camera = null;
      planeMesh = null;
    }
  }

  // Assurez-vous d'ajouter cleanupWebGL à la portée globale pour pouvoir l'appeler depuis l'extérieur
  window.cleanupWebGL = cleanupWebGL;
}








let imgMouseMoveListener;
let imgHoverListeners = [];

function imgOnHover() {
  const imghover = document.querySelectorAll('#imghover');
  const imgbehind = document.querySelector('#imgbehind');

  if (imgMouseMoveListener) {
    document.body.removeEventListener('mousemove', imgMouseMoveListener);
  }
  imgMouseMoveListener = onMouseMove;
  document.body.addEventListener('mousemove', imgMouseMoveListener);

  imgHoverListeners.forEach(listener => {
    listener.element.removeEventListener('mouseenter', listener.mouseEnter);
    listener.element.removeEventListener('mouseleave', listener.mouseLeave);
  });
  imgHoverListeners = [];

  for (let i = 0; i < imghover.length; i++) {
    imgHoverListeners.push({
      element: imghover[i],
      mouseEnter: imgOnMouseHover,
      mouseLeave: imgOnMouseHoverOut
    });
    imghover[i].addEventListener('mouseenter', imgOnMouseHover);
    imghover[i].addEventListener('mouseleave', imgOnMouseHoverOut);
  }

  function onMouseMove(e) {
    TweenMax.to(imgbehind, 1, {
      x: e.pageX,
      y: e.pageY
    });
  }

  function imgOnMouseHover() {
    TweenMax.to(imgbehind, .2, {
      scale: 1,
    });
  }

  function imgOnMouseHoverOut() {
    TweenMax.to(imgbehind, .2, {
      scale: 0,
    });
  }
}





let xpHoverListeners = [];

function setupXpHover() {
  const columns = document.querySelectorAll('.xpcolumn');

  // Clear previous listeners to avoid duplication
  xpHoverListeners.forEach(listener => {
    listener.element.removeEventListener('mouseenter', listener.mouseEnter);
    listener.element.removeEventListener('mouseleave', listener.mouseLeave);
  });
  xpHoverListeners = [];

  columns.forEach(column => {
    const targetClass = column.getAttribute('data-target');
    const targetElements = document.querySelectorAll(targetClass);

    const mouseEnter = () => {
      targetElements.forEach(element => element.classList.add('hovered'));
    };

    const mouseLeave = () => {
      targetElements.forEach(element => element.classList.remove('hovered'));
    };

    xpHoverListeners.push({
      element: column,
      mouseEnter: mouseEnter,
      mouseLeave: mouseLeave
    });

    column.addEventListener('mouseenter', mouseEnter);
    column.addEventListener('mouseleave', mouseLeave);
  });
}








let swiperInstance;

function loadSwiperScripts() {
  return new Promise((resolve, reject) => {
    if (typeof Swiper !== 'undefined') {
      console.log('Swiper.js is already loaded.');
      resolve();
    } else {
      // Check if the script is already being loaded
      const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"]');
      if (existingScript) {
        console.log('Swiper.js script is already being loaded.');
        existingScript.addEventListener('load', resolve);
        existingScript.addEventListener('error', reject);
      } else {
        console.log('Loading Swiper.js script...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        script.onload = () => {
          console.log('Swiper.js script loaded successfully.');
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load Swiper.js script.');
          reject();
        };
        document.head.appendChild(script);

        // Load Swiper CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
        document.head.appendChild(link);
      }
    }
  });
}

function swiperAnimation() {
  if (swiperInstance) {
    console.log('Swiper instance already exists.');
    return;
  }

  swiperInstance = new Swiper(".mySwiper", {
    autoHeight: true,
    grabCursor: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: false,
    },
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
      900: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
    },
  });
}

function destroySwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
    console.log('Swiper instance destroyed.');
  }
}

function initSwiper() {
  loadSwiperScripts().then(() => {
    swiperAnimation();
  }).catch((error) => {
    console.error('Error loading Swiper scripts:', error);
  });
}






function initParallax() {
  gsap.utils.toArray(".parallax").forEach((section, i) => {
      const heightDiff = 50; // Valeur fixe, ajustez selon vos besoins
      const scaleAmount = 1.3; // Agrandissement initial de l'image

      gsap.fromTo(section, {
          y: -heightDiff,
          scale: scaleAmount,
      }, {
          scrollTrigger: {
              trigger: section,
              scrub: true
          },
          y: 100, // Valeur finale de déplacement Y lors du scroll
          scale: scaleAmount, // Maintient l'agrandissement initial
          ease: "none"
      });
  });
}

function cleanupParallax() {
  console.log('Nettoyage du parallaxe en cours...');
  
  gsap.utils.toArray(".parallax-container .parallax").forEach((section, i) => {
      const tweens = gsap.getTweensOf(section);

      if (tweens.length > 0) {
          console.log(`Arrêt des animations pour l'élément ${section}`);
          tweens.forEach(tween => {
              tween.kill(); // Arrête toutes les animations associées à la section
          });
      } else {
          console.log(`Aucune animation trouvée pour l'élément ${section}`);
      }
  });

  console.log('Nettoyage du parallaxe terminé.');
}





