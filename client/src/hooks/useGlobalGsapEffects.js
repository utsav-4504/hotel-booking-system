import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useGlobalGsapEffects() {
  useEffect(() => {
    const revealElements = gsap.utils.toArray("[data-gsap-reveal]");
    const cardElements = gsap.utils.toArray("[data-gsap-card]");

    const ctx = gsap.context(() => {
      revealElements.forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 40
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            delay: (index % 4) * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%"
            }
          }
        );
      });

      cardElements.forEach((card) => {
        const image = card.querySelector("img");

        const onMouseMove = (event) => {
          const bounds = card.getBoundingClientRect();
          const x = event.clientX - bounds.left;
          const y = event.clientY - bounds.top;
          const rotateY = gsap.utils.mapRange(0, bounds.width, -7, 7, x);
          const rotateX = gsap.utils.mapRange(0, bounds.height, 7, -7, y);

          gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.01,
            transformPerspective: 900,
            transformOrigin: "center",
            duration: 0.35,
            ease: "power2.out"
          });

          if (image) {
            gsap.to(image, {
              scale: 1.08,
              x: gsap.utils.mapRange(0, bounds.width, -8, 8, x),
              y: gsap.utils.mapRange(0, bounds.height, -8, 8, y),
              duration: 0.45,
              ease: "power2.out"
            });
          }
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out"
          });

          if (image) {
            gsap.to(image, {
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.45,
              ease: "power3.out"
            });
          }
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);
        card._gsapMoveHandler = onMouseMove;
        card._gsapLeaveHandler = onMouseLeave;
      });
    });

    return () => {
      cardElements.forEach((card) => {
        if (card._gsapMoveHandler) {
          card.removeEventListener("mousemove", card._gsapMoveHandler);
        }
        if (card._gsapLeaveHandler) {
          card.removeEventListener("mouseleave", card._gsapLeaveHandler);
        }
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);
}

export default useGlobalGsapEffects;
