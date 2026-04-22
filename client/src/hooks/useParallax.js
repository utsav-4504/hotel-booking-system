import { useEffect } from "react";
import gsap from "../utils/gsapConfig";

/*
Usage Example:

import { useRef } from "react";
import useParallax from "../hooks/useParallax";

const imageRef = useRef(null);

useParallax(imageRef, {
  y: 120
});

<img ref={imageRef} src="..." />
*/

function useParallax(
  targetRef,
  options = {}
) {
  useEffect(() => {
    if (!targetRef?.current) return;

    const {
      y = 100,
      x = 0,
      scale = 1,
      rotate = 0,
      start = "top bottom",
      end = "bottom top",
      scrub = true,
      ease = "none"
    } = options;

    const ctx = gsap.context(() => {
      gsap.to(targetRef.current, {
        y,
        x,
        scale,
        rotate,
        ease,
        scrollTrigger: {
          trigger: targetRef.current,
          start,
          end,
          scrub
        }
      });
    }, targetRef);

    return () => ctx.revert();
  }, [targetRef, options]);
}

export default useParallax;