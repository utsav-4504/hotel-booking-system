import gsap from "./gsapConfig";

/*
Usage Example:

import { useEffect, useRef } from "react";
import pageTransition from "../utils/pageTransition";

const pageRef = useRef(null);

useEffect(() => {
  const cleanup = pageTransition(pageRef);
  return cleanup;
}, []);
*/

function pageTransition(pageRef) {
  if (!pageRef?.current) return;

  const ctx = gsap.context(() => {
    const page = pageRef.current;

    /* Set Initial State */
    gsap.set(page, {
      opacity: 0,
      y: 30
    });

    /* Enter Animation */
    gsap.to(page, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out"
    });

    /* Animate children stagger */
    const items = page.querySelectorAll(".animate-item");

    if (items.length > 0) {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 25
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out"
        }
      );
    }
  }, pageRef);

  return () => ctx.revert();
}

/* Exit Animation */
export const pageExit = (target, callback) => {
  if (!target) return;

  gsap.to(target, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      if (callback) callback();
    }
  });
};

/* Route Overlay Transition */
export const overlayTransition = (overlayRef, done) => {
  if (!overlayRef?.current) return;

  const overlay = overlayRef.current;

  const tl = gsap.timeline({
    onComplete: () => {
      if (done) done();
    }
  });

  tl.set(overlay, {
    yPercent: 100,
    display: "block"
  })
    .to(overlay, {
      yPercent: 0,
      duration: 0.5,
      ease: "power4.inOut"
    })
    .to(overlay, {
      yPercent: -100,
      duration: 0.5,
      ease: "power4.inOut",
      delay: 0.1
    })
    .set(overlay, {
      display: "none"
    });
};

export default pageTransition;