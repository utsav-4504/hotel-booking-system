import gsap from "./gsapConfig";

/*
Usage Example:

import { useEffect, useRef } from "react";
import {
  splitTextReveal,
  typingText,
  gradientTextPulse
} from "../utils/textAnimation";

const titleRef = useRef(null);

useEffect(() => {
  splitTextReveal(titleRef);
}, []);
*/

function splitTextReveal(
  elementRef,
  options = {}
) {
  if (!elementRef?.current) return;

  const {
    delay = 0,
    stagger = 0.05,
    duration = 0.8,
    y = "120%"
  } = options;

  const element = elementRef.current;
  const text = element.innerText.trim();

  const words = text.split(" ");

  element.innerHTML = words
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden mr-2">
          <span class="split-word inline-block">${word}</span>
        </span>`
    )
    .join("");

  const wordNodes =
    element.querySelectorAll(".split-word");

  gsap.fromTo(
    wordNodes,
    {
      y,
      opacity: 0
    },
    {
      y: "0%",
      opacity: 1,
      delay,
      stagger,
      duration,
      ease: "power3.out"
    }
  );
}

/* Typing Effect */
function typingText(
  elementRef,
  text = "",
  speed = 0.05
) {
  if (!elementRef?.current) return;

  const el = elementRef.current;

  gsap.set(el, { textContent: "" });

  let i = 0;

  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
    }
  }, speed * 1000);

  return () => clearInterval(interval);
}

/* Fade Words */
function fadeWords(
  elementRef,
  options = {}
) {
  if (!elementRef?.current) return;

  const {
    stagger = 0.12,
    duration = 0.6
  } = options;

  const element = elementRef.current;
  const words = element.innerText.split(" ");

  element.innerHTML = words
    .map(
      (word) =>
        `<span class="fade-word inline-block mr-2">${word}</span>`
    )
    .join("");

  const wordNodes =
    element.querySelectorAll(".fade-word");

  gsap.fromTo(
    wordNodes,
    {
      opacity: 0
    },
    {
      opacity: 1,
      stagger,
      duration,
      ease: "power2.out"
    }
  );
}

/* Gradient Pulse */
function gradientTextPulse(
  elementRef
) {
  if (!elementRef?.current) return;

  gsap.to(elementRef.current, {
    backgroundPosition:
      "200% center",
    duration: 4,
    repeat: -1,
    ease: "linear"
  });
}

/* Floating Text */
function floatText(
  elementRef
) {
  if (!elementRef?.current) return;

  gsap.to(elementRef.current, {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

export {
  splitTextReveal,
  typingText,
  fadeWords,
  gradientTextPulse,
  floatText
};

export default splitTextReveal;