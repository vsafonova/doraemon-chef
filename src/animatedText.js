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
    start: "top 60%",
    end: "bottom center",
    scrub: true,
    markers: false,
  },
});

tl.to(".animated-text", {
  x: 1060,
});

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".animated-text",
    start: "bottom center",
    scrub: true,
    markers: false,
  },
});

tl2.to(".animated-text", {
  x: -100,
  ease: "power2.out",
});

// pancake-img

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: "#pancake-img",
    start: "top center",
    scrub: true,
    markers: false,
  },
});

tl3.to("#pancake-img", {
  // duration: 1,
  scale: 1.6,
  ease: "power2.out",
});

// -----------------------------------------------
// smooth scroll
const lenis = new Lenis();

// lenis.on("scroll", (e) => {
//   console.log(e);
// });

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
    start: "top 90%",
  },
  y: 0,
  stagger: 0.05,
  delay: 0.2,
  duration: 0.1,
});

gsap.to(".char", {
  scrollTrigger: {
    trigger: "#text",
    start: "bottom 30%",
    scrub: true,
  },
  y: 480,
  stagger: 0.01,
  duration: 0.1,
});

// scroll to top
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
