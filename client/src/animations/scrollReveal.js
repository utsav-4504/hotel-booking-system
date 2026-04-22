import gsap from "./gsapConfig";

/*
Usage Example:

import { useEffect, useRef } from "react";
import scrollReveal from "../utils/scrollReveal";

const sectionRef = useRef(null);

useEffect(() => {
  const cleanup = scrollReveal(sectionRef);
  return cleanup;
}, []);
*/

function scrollReveal(
  containerRef,
  options = {}
) {
  if (!containerRef?.current) return;

  const {
    selector = ".reveal-item",
    y = 70,
    x = 0,
    opacity = 0,
    stagger = 0.15,
    duration = 0.9,
    start = "top 85%",
    end = "bottom 20%",
    once = false
  } = options;

  const ctx = gsap.context(() => {
    const items =
      containerRef.current.querySelectorAll(selector);

    if (!items.length) return;

    gsap.set(items, {
      opacity,
      y,
      x
    });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      x: 0,
      stagger,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start,
        end,
        toggleActions: once
          ? "play none none none"
          : "play none none reverse"
      }
    });
  }, containerRef);

  return () => ctx.revert();
}

/* Left Reveal */
export const revealLeft = (
  ref,
  selector = ".reveal-left"
) => {
  return scrollReveal(ref, {
    selector,
    x: -80,
    y: 0
  });
};

/* Right Reveal */
export const revealRight = (
  ref,
  selector = ".reveal-right"
) => {
  return scrollReveal(ref, {
    selector,
    x: 80,
    y: 0
  });
};

/* Zoom Reveal */
export const revealZoom = (
  containerRef,
  selector = ".reveal-zoom"
) => {
  if (!containerRef?.current) return;

  const ctx = gsap.context(() => {
    const items =
      containerRef.current.querySelectorAll(selector);

    gsap.fromTo(
      items,
      {
        scale: 0.85,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions:
            "play none none reverse"
        }
      }
    );
  }, containerRef);

  return () => ctx.revert();
};

/* Text Split Reveal */
export const revealText = (
  elementRef
) => {
  if (!elementRef?.current) return;

  const el = elementRef.current;
  const words = el.innerText.split(" ");

  el.innerHTML = words
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden mr-2"><span class="word inline-block">${word}</span></span>`
    )
    .join("");

  const wordNodes =
    el.querySelectorAll(".word");

  gsap.fromTo(
    wordNodes,
    {
      y: "120%",
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      stagger: 0.06,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%"
      }
    }
  );
};

export default scrollReveal;