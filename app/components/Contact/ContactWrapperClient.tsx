"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useMediaQuery from "@/app/utils/hooks/useMediaQuery";

interface ContactWrapperProps {
  children: React.ReactNode;
}

const ContactWrapperClient = ({ children }: ContactWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const techElement = document.querySelector(".tech") as HTMLElement;
    const techHeight = techElement.offsetHeight;

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-wrapper",
        start: () => `top+=${techHeight} bottom`,
        end: "+=250%",
        scrub: 2,
        pin: true,
        invalidateOnRefresh: true,
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
                  console.log("AUTO");

                  gsap.to(".footer", {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut",
                  });
                } else {
                  gsap.to(".footer", {
                    opacity: 0,
                    duration: 0.15,
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
      className="contact panel z-5 relative left-0 top-0 col-start-1 col-end-2 row-start-2 row-end-2 h-screen w-full bg-secondBackground"
    >
      {children}
    </section>
  );
};

export default ContactWrapperClient;