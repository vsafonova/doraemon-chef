import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
// ------------------------------------------------------
// https://www.youtube.com/watch?v=PrQeeUt49f4

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".animated-text",
    start: "top 80%",
    end: "bottom 60%",
    scrub: true,
    markers: true,
  },
});

tl.to(".animated-text", {
  x: 1200,
});

// smooth scroll
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ---------------------------------------------------------
const textEl = new SplitType("#text");

gsap.to(".char", {
  scrollTrigger: {
    trigger: "#text",
    start: "top center",
  },
  y: 0,
  stagger: 0.05,
  delay: 0.2,
  duration: 0.1,
});

gsap.to(".char", {
  scrollTrigger: {
    trigger: "#text",
    start: "bottom center",
    scrub: true,
  },
  x: -400,
  stagger: 0.05,
  delay: 0.2,
  duration: 0.1,
});
