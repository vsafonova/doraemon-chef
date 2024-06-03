import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.to('.welcome', {
  yPercent: '150',
  opacity: 0,
  scale: 0.8,
  scrollTrigger: {
    trigger: '.second',
    start: 'top bottom',
    end: 'top 50%',
    scrub: 2,
    immediateRender: false,
  },
});

function toggleTextVisibility() {
  const initialEl = document.getElementById('welcome-first');
  const scrollEl = document.getElementById('welcome-second');

  function showScroll() {
    scrollEl.style.display = 'flex';
    initialEl.style.display = 'none';
  }

  initialEl.addEventListener('mouseover', showScroll);
}

toggleTextVisibility();
