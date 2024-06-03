import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const updateYPercent = () => {
  const viewportHeight = window.innerHeight;
  const yPercentValue = -(viewportHeight / 5.8);

  gsap.to('.section__last-img', {
    yPercent: yPercentValue,
    scale: 0.8,
    scrollTrigger: {
      trigger: '.last',
      start: 'top top',
      end: 'top 50%',
      scrub: 2,
      immediateRender: false,
    },
  });
};

updateYPercent();

window.addEventListener('resize', updateYPercent);
