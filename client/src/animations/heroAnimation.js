import gsap from "./gsapConfig";

/*
Usage:
import { useEffect, useRef } from "react";
import heroAnimation from "../utils/heroAnimation";

const sectionRef = useRef(null);

useEffect(() => {
  heroAnimation(sectionRef);
}, []);
*/

function heroAnimation(sectionRef) {
  if (!sectionRef?.current) return;

  const ctx = gsap.context(() => {
    const badge = sectionRef.current.querySelector(".hero-badge");
    const title = sectionRef.current.querySelector(".hero-title");
    const text = sectionRef.current.querySelector(".hero-text");
    const buttons = sectionRef.current.querySelector(".hero-buttons");
    const search = sectionRef.current.querySelector(".hero-search");
    const image = sectionRef.current.querySelector(".hero-image");
    const stats = sectionRef.current.querySelectorAll(".hero-stat");

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    /* Initial States */
    gsap.set(
      [badge, title, text, buttons, search, image, stats],
      {
        opacity: 0
      }
    );

    /* Timeline */
    tl.fromTo(
      badge,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    )
      .fromTo(
        title,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.2"
      )
      .fromTo(
        text,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.55"
      )
      .fromTo(
        buttons,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.45"
      )
      .fromTo(
        search,
        { y: 40, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.9 },
        "-=0.3"
      )
      .fromTo(
        image,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4 },
        "-=1.1"
      )
      .fromTo(
        stats,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6
        },
        "-=0.6"
      );

    /* Floating Effect */
    if (image) {
      gsap.to(image, {
        y: 18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    /* Parallax */
    if (image) {
      gsap.to(image, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, sectionRef);

  return () => ctx.revert();
}

export default heroAnimation;