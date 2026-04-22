import { useEffect } from "react";
import gsap from "../utils/gsapConfig";

/*
Usage Example:

import { useRef } from "react";
import useGSAPFade from "../hooks/useGSAPFade";

const boxRef = useRef(null);

useGSAPFade(boxRef);

<div ref={boxRef}>Hello</div>
*/

function useGSAPFade(
  targetRef,
  options = {}
) {
  useEffect(() => {
    if (!targetRef?.current) return;

    const {
      fromOpacity = 0,
      toOpacity = 1,
      y = 30,
      x = 0,
      duration = 0.8,
      delay = 0,
      ease = "power3.out",
      trigger = true,
      start = "top 85%",
      once = false
    } = options;

    const ctx = gsap.context(() => {
      const config = {
        opacity: toOpacity,
        y: 0,
        x: 0,
        duration,
        delay,
        ease
      };

      if (trigger) {
        config.scrollTrigger = {
          trigger: targetRef.current,
          start,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse"
        };
      }

      gsap.fromTo(
        targetRef.current,
        {
          opacity: fromOpacity,
          y,
          x
        },
        config
      );
    }, targetRef);

    return () => ctx.revert();
  }, [targetRef, options]);
}

export default useGSAPFade;