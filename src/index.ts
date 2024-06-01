
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  mobileAndTabletCheck,
  BloomPlugin,
  Vector3,
  GammaCorrectionPlugin,
  MeshBasicMaterial2,
  Color,
  AssetImporter,
  addBasePlugins,
} from 'webgi';
import './styles.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    useRgbm: false,
  });

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  const camera = viewer.scene.activeCamera;
  const position = camera.position;
  const target = camera.target;


  //loader
const importer = manager.importer as AssetImporter;

//debugging loader
const timestart = Date.now()

importer.addEventListener("onProgress", (ev) => {
  const progressRatio = ev.loaded / ev.total;
  const progressPercent = (progressRatio *100).toFixed(0)
  console.log(progressRatio)
  const percentDisplay = document.querySelector(".loaded-percent")
  document
    .querySelector(".progress")
    ?.setAttribute("style", `transform: scaleX(${progressRatio})`);

if (percentDisplay) {
  percentDisplay.textContent = progressPercent + "%" 
}

});

importer.addEventListener("onLoad", (ev) => {
  const timeend = Date.now()
  console.log("page loaded in:" + (timeend-timestart) + "ms")
  gsap.to(".loader", {
    x: "100%",
    duration: 0.8,
    ease: "power4.inOut",
    delay: 1,
    onComplete: () => {
      document.body.style.overflowY = "auto";
    
    },
  });
});


  //   await addBasePlugins(viewer);

  await viewer.addPlugin(GBufferPlugin);
  await viewer.addPlugin(new ProgressivePlugin(32));
  await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm));
  await viewer.addPlugin(SSRPlugin);
  await viewer.addPlugin(SSAOPlugin);
  await viewer.addPlugin(BloomPlugin);

  viewer.renderer.refreshPipeline();

  const model = await manager.addFromPath('./assets/scene.glb');
  // const model = await manager.addFromPath('./assets/scene2.glb');
  const scene = viewer.scene;

  const soundEl = new Audio('./assets/yoo.mp3');
  let soundOn = false;

  function setupScrollanimation() {
    const tl = gsap.timeline();

    // INITIAL SECTION STATE 1
    tl.to(position, {
      x: 1.5,
      y: 1,
      z: 5,
      scrollTrigger: {
        trigger: '.first',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    }).to(target, {
      x: -1.5,
      y: 1,
      z: -0.185,
      scrollTrigger: {
        trigger: '.first',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        immediateRender: false,
      },
    });

    // FIRST SECTION STATE 2
    tl.to(position, {
      x: -2,
      y: 0,
      z: 6,
      scrollTrigger: {
        trigger: '.second',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    })
      .to('.section_one_container', {
        xPercent: '-150',
        opacity: 0,
        scale: 0.1,
        scrollTrigger: {
          trigger: '.second',
          start: 'top bottom',
          end: 'top 50%',
          scrub: 2,
          immediateRender: false,
        },
      })
      .to(target, {
        x: -1,
        y: 0,
        z: -5,
        scrollTrigger: {
          trigger: '.second',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          immediateRender: false,
        },
      });

    // LAST SECTION STAGE 3
    tl.to(position, {
      x: -10,
      y: 0.5,
      z: 6,
      scrollTrigger: {
        trigger: '.third',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    }).to(target, {
      x: 10,
      y: 1,
      z: -3,
      scrollTrigger: {
        trigger: '.third',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        immediateRender: false,
        markers: true,
      },
    });

       // LAST SECTION STAGE 3
       tl.to(position, {
        x: -10,
        y: 0.5,
        z: 6,
        scrollTrigger: {
          trigger: '.third',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          immediateRender: false,
        },
        onUpdate,
      }).to(target, {
        x: 10,
        y: 1,
        z: -3,
        scrollTrigger: {
          trigger: '.third',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          immediateRender: false,
          markers: true,
        },
      });

    // ScrollTrigger for stoping the camera ad hiding the model
    ScrollTrigger.create({
      trigger: '.third',
      start: 'center center',
      onEnter: () => {
        needsUpdate = false;
        scene.visible = false;
      },
      onLeaveBack: () => {
        needsUpdate = true;
        scene.visible = true;
      },
    });
  }

  function setUpBestSectionAnimation() {
    const bestTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.fifth',
        start: 'top bottom',
        end: 'top top',
      },
    });
    const duration = 3.5;
    const delay = -3;
    const ease = "sine.in";
    bestTl
      .from('.best_slider-one', {
        x: -1 * 1300,
        duration,
        ease,
        onStart: () => {
          playSound();
        },
      })
      .from('.best_slider-two', { x: window.innerWidth, duration: duration *2, delay, ease })
      .from('.best_slider-three', { x: -1 * 1300, duration, delay, ease });
  }

  function playSound() {
    if (!soundOn) {
      console.log('sound would be played but muted');
      return;
    }
    console.log('sound will be played');
    soundEl.play();
  }

  setupScrollanimation();
  setUpBestSectionAnimation();
  
  // WEBGI UPDATE
  let needsUpdate = true;

  function onUpdate() {
    needsUpdate = true;
    viewer.renderer.resetShadows();
  }

  viewer.addEventListener('preFrame', () => {
    if (needsUpdate) {
      camera.positionTargetUpdated(true);
      needsUpdate = false;
    }
  });
}

setupViewer();
