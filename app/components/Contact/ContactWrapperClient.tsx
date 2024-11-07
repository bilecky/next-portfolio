"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
interface ContactWrapperProps {
  children: React.ReactNode;
}

const ContactWrapperClient = ({ children }: ContactWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    // only fire callbacks when the active state toggles
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    ScrollTrigger.refresh();

    const techElement = document.querySelector(".tech") as HTMLElement;
    const techHeight = techElement?.offsetHeight || 0;
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-wrapper",
        start: () => `top+=${techHeight} bottom`,
        end: "+=250%",
        scrub: 2,
        pin: true,
        pinSpacing: true, // Zostawiamy true, aby animacja działała
        preventOverlaps: true,
        pinReparent: true,
        refreshPriority: 1,
        anticipatePin: 1, // Dodanie anticipatePin, aby wygładzić początek/koniec przypinania
      },
    });
    master
      .to(".wrapper", {
        yPercent: -100,
        ease: "none",
      })
      .to(".about", {
        yPercent: -100,
        ease: "none",

        onUpdate: () => {
          const contactElement = wrapperRef.current;
          if (contactElement) {
            const progress = master.progress();

            contactElement.style.overflowY =
              progress > 0.99 ? "auto" : "hidden";
            if (contactElement.style.overflowY === "auto") {
              contactElement.addEventListener("scroll", () => {
                const isScrolledToEnd =
                  contactElement.scrollHeight - contactElement.scrollTop <=
                  contactElement.clientHeight + 1;

                if (isScrolledToEnd) {
                  gsap.to(".footer", {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.inOut",
                  });
                } else {
                  gsap.to(".footer", {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                  });
                }
              });
            }
          }
        },
      });
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="contact no-scrollbar panel z-5 bg-thirdBackground relative col-start-1 col-end-2 row-start-2 row-end-2 h-screen w-full will-change-transform dark:bg-secondBackground"
    >
      {children}
    </section>
  );
};

export default ContactWrapperClient;
