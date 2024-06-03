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
    // start: "top 80%",
    // end: "bottom 60%",
    start: "top 60%",
    end: "bottom center",
    scrub: true,
    markers: false,
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

// gsap.to(".char", {
//   scrollTrigger: {
//     trigger: "#text",
//     start: "top 80%",
//   },
//   x: 0,
//   stagger: 0.05,
//   delay: 0.2,
//   duration: 0.1,
// });

// gsap.to(".char", {
//   scrollTrigger: {
//     trigger: "#text",
//     start: "bottom 30%",
//     scrub: true,
//     markers: true,
//   },
//   x: 400,
//   stagger: 0.03,
//   duration: 0.1,
// });

gsap.to(".char", {
  scrollTrigger: {
    trigger: "#text",
    start: "top center",
    // start: "top 80%",
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
    markers: true,
  },
  x: 400,
  stagger: 0.03,
  duration: 0.1,
});

// scroll to top
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
