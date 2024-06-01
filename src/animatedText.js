import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

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
