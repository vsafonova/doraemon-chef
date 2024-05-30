import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const textEl = new SplitType("#text");

gsap.to(".char", {
  scrollTrigger: {
    trigger: "#text",
    start: "top bottom",
  },
  y: 0,
  stagger: 0.05,
  delay: 0.2,
  duration: 0.1,
});
