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

const animateButton = () => {
  gsap.to('.book-button-last', {
    yPercent: '450',
    xPercent: '100',
    scale: 1.3,
    scrollTrigger: {
      trigger: '.last',
      start: 'top top',
      end: 'top 50%',
      scrub: 2,
      immediateRender: false,
    },
  });
};

animateButton();

window.addEventListener('resize', updateYPercent);

const bookTableButton = document.querySelectorAll('.book-table-button');

bookTableButton.forEach((button) => {
  button.addEventListener('click', () => {
    alert('We apologise. This section of our website is under development.');
  });
});
