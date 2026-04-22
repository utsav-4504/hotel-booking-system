import { useEffect } from "react";
import gsap from "../utils/gsapConfig";

/*
Usage Example:

import { useRef } from "react";
import useGSAPReveal from "../hooks/useGSAPReveal";

const sectionRef = useRef(null);

useGSAPReveal(sectionRef);

<div ref={sectionRef}>
  <div className="reveal-item">Item 1</div>
  <div className="reveal-item">Item 2</div>
</div>
*/

function useGSAPReveal(
  containerRef,
  options = {}
) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const {
      selector = ".reveal-item",
      y = 60,
      x = 0,
      opacity = 0,
      stagger = 0.12,
      duration = 0.8,
      delay = 0,
      ease = "power3.out",
      start = "top 85%",
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
        delay,
        ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, options]);
}

export default useGSAPReveal;