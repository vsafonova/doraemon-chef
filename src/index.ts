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
} from "webgi";
import "./styles.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
    useRgbm: false,
  });

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  const camera = viewer.scene.activeCamera;
  const position = camera.position;
  const target = camera.target;

  //   await addBasePlugins(viewer);
  await viewer.addPlugin(GBufferPlugin);
  await viewer.addPlugin(new ProgressivePlugin(32));
  await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm));
  await viewer.addPlugin(SSRPlugin);
  await viewer.addPlugin(SSAOPlugin);
  await viewer.addPlugin(BloomPlugin);

  viewer.renderer.refreshPipeline();

  await manager.addFromPath("./assets/scene.glb");

  const soundEl = new Audio("./assets/yoo.mp3")

  function setupScrollanimation() {
    const tl = gsap.timeline();

    // INITIAL SECTION STATE 1
    tl.to(position, {
      x: 1.5,
      y: 1,
      z: 5,
      scrollTrigger: {
        trigger: ".first",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    }).to(target, {
      x: -1.5,
      y: 1,
      z: -0.185,
      scrollTrigger: {
        trigger: ".first",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    });

    // FIRST SECTION STATE 2
    tl.to(position, {
      x: 0,
      y: 0,
      z: 8.27,
      scrollTrigger: {
        trigger: ".second",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    })
      .to(".section_one_container", {
        xPercent: "-150",
        opacity: 0,
        scale: 0.8, // Added zoom effect
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top 50%",
          scrub: 2,
          immediateRender: false,
        },
      })
      .to(target, {
        x: -1,
        y: 1.1,
        z: -18,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false,
        },
      });

    // SECOND SECTION (between first and last for smoother transition)
    // tl.to(position, {
    //   x: 1.5, // Intermediate position for smooth transition
    //   y: 1.255,
    //   z: 4.135,
    //   scrollTrigger: {
    //     trigger: '.second-and-half', // Assuming there's an intermediate section
    //     start: 'top bottom',
    //     end: 'top top',
    //     scrub: true,
    //     immediateRender: false,
    //   },
    //   onUpdate,
    // }).to(target, {
    //   x: -1.5,
    //   y: 1.065,
    //   z: -0.185,
    //   scrollTrigger: {
    //     trigger: '.second-and-half',
    //     start: 'top bottom',
    //     end: 'top top',
    //     scrub: true,
    //     immediateRender: false,
    //   },
    // });

    // LAST SECTION STAGE 3

    tl.to(position, {
      x: 4,
      y: -5,
      z: 4,
      scrollTrigger: {
        trigger: ".third",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    }).to(target, {
      x: -1.5,
      y: 1,
      z: -0.185,
      scrollTrigger: {
        trigger: ".third",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
        markers: true,
      },
    });
  }

  function setUpBestSectionAnimation() {
    const bestTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fifth",
        start: "top bottom",
        end: "top top",
        toggleActions: "play reverse play reverse",
      },
    });
    const duration = 3;
    const delay = 1.5;
    const ease = "back.out";
    bestTl
      .from(".best_slider-one", {
        x: -1 * 810,
        duration,
        ease,
        onStart: () => {
         playSound()
        },
      })
      .from(".best_slider-two", { x: window.innerWidth, duration, delay, ease })
      .from(".best_slider-three", { x: -1 * 810, duration, delay, ease });
  }

  function playSound(){
    console.log("sound will be played")
    soundEl.play()
}

  //   tl.to(position, {
  //     x: -0.13,
  //     y: 0.175,
  //     z: -2,
  //     scrollTrigger: {
  //       trigger: ".third",
  //       start: "top bottom",
  //       end: "top top",
  //       scrub: true,
  //       immediateRender: false,
  //     },
  //     onUpdate,
  //   }).to(target, {
  //     x: 0,
  //     y: 2.13,
  //     z: -0.4,
  //     scrollTrigger: {
  //       trigger: ".third",
  //       start: "top bottom",
  //       end: "top top",
  //       scrub: true,
  //       immediateRender: false,
  //     },
  //   });
  // }

  setupScrollanimation();
  setUpBestSectionAnimation();
  // WEBGI UPDATE
  let needsUpdate = true;

  function onUpdate() {
    needsUpdate = true;
    viewer.renderer.resetShadows();
    //   viewer.setDirty()
  }

  viewer.addEventListener("preFrame", () => {
    if (needsUpdate) {
      camera.positionTargetUpdated(true);
      needsUpdate = false;
    }
  });
}

setupViewer();
