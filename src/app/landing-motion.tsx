"use client";

import { useEffect } from "react";

export function LandingMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-purple-landing]");
    if (!root) return;

    root.setAttribute("data-motion-ready", "true");

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.setAttribute("data-visible", "true"));
    }

    const observer = reduceMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              (entry.target as HTMLElement).setAttribute("data-visible", "true");
              observer?.unobserve(entry.target);
            });
          },
          { threshold: 0.14, rootMargin: "0px 0px -8%" },
        );

    revealItems.forEach((item) => observer?.observe(item));
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <div className="landing-pointer-light" aria-hidden="true" />;
}
