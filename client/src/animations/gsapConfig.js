import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Register Plugins */
gsap.registerPlugin(ScrollTrigger);

/* Default Global Settings */
gsap.defaults({
  duration: 1,
  ease: "power3.out"
});

/* Fade Up Animation */
export const fadeUp = (target, delay = 0) => {
  gsap.from(target, {
    y: 60,
    opacity: 0,
    delay
  });
};

/* Fade In Animation */
export const fadeIn = (target, delay = 0) => {
  gsap.from(target, {
    opacity: 0,
    delay
  });
};

/* Scale Animation */
export const scaleIn = (target, delay = 0) => {
  gsap.from(target, {
    scale: 0.8,
    opacity: 0,
    delay
  });
};

/* Stagger Children */
export const staggerUp = (targets, delay = 0) => {
  gsap.from(targets, {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    delay
  });
};

/* Scroll Reveal */
export const scrollReveal = (target, options = {}) => {
  gsap.from(target, {
    y: options.y || 80,
    opacity: 0,
    duration: options.duration || 1,
    ease: options.ease || "power3.out",
    scrollTrigger: {
      trigger: target,
      start: options.start || "top 85%",
      end: options.end || "bottom 20%",
      toggleActions:
        options.toggleActions ||
        "play none none reverse"
    }
  });
};

/* Parallax Effect */
export const parallaxImage = (target, speed = 100) => {
  gsap.to(target, {
    y: speed,
    ease: "none",
    scrollTrigger: {
      trigger: target,
      scrub: true
    }
  });
};

/* Counter Animation */
export const counterUp = (target, endValue = 1000) => {
  let obj = { val: 0 };

  gsap.to(obj, {
    val: endValue,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => {
      target.innerText = Math.floor(obj.val);
    },
    scrollTrigger: {
      trigger: target,
      start: "top 90%"
    }
  });
};

/* Page Loader Exit */
export const loaderExit = (target) => {
  gsap.to(target, {
    opacity: 0,
    scale: 1.05,
    duration: 0.8,
    onComplete: () => {
      if (target) target.style.display = "none";
    }
  });
};

/* Refresh ScrollTrigger */
export const refreshGSAP = () => {
  ScrollTrigger.refresh();
};

export default gsap;