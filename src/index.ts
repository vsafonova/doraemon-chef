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

  function setupScrollanimation() {
    const tl = gsap.timeline();

    // INITIAL SECTION STATE 1
    tl.to(position, {
      x: 1.5,
      y: 1.255,
      z: 4.135,
      scrollTrigger: {
        trigger: ".first",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    })
    .to(target, {
      x: -1.5,
      y: 1.065,
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
          end: "top 80%",
          scrub: 1,
          immediateRender: false,
        },
      })
      .to(target, {
        x: -1,
        y: 0,
        z: -0.37,
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
      x: -0.13,
      y: 0.175,
      z: -2,
      scrollTrigger: {
        trigger: ".third",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
      onUpdate,
    }).to(target, {
      x: 0,
      y: 2.13,
      z: -0.4,
      scrollTrigger: {
        trigger: ".third",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    });
  }

  setupScrollanimation();

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
