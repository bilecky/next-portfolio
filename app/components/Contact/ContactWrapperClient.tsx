"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useTranslations } from "next-intl";
import useMediaQuery from "@/app/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);
interface ContactWrapperProps {
  children: React.ReactNode;
}

const ContactWrapperClient = ({ children }: ContactWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const tContact = useTranslations("ContactSection"); // Dostosuj nazwę sekcji

  const { contextSafe } = useGSAP(
    () => {
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-wrapper",
          start: () => {
            const techElement = document.querySelector(".tech") as HTMLElement;
            const techHeight = techElement?.offsetHeight || 0;
            return `top+=${techHeight + 1} bottom`;
          },
          end: "+=250%",
          scrub: 2,
          pin: true,
          pinSpacing: true,
          preventOverlaps: true,
          // pinReparent: true,
          refreshPriority: 2,
          anticipatePin: 1,
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

              // Dodaj/usuń nasłuchiwanie zdarzeń tylko gdy zmienia się stan
              if (progress > 0.99) {
                if (contactElement.style.overflowY !== "auto") {
                  contactElement.style.overflowY = "auto";
                  // Nasłuchiwacz powinien być dodany tylko raz
                  contactElement.addEventListener("scroll", handleScroll);
                }
              } else {
                if (contactElement.style.overflowY !== "hidden") {
                  contactElement.style.overflowY = "hidden";
                  // Usunięcie nasłuchiwacza gdy nie jest potrzebny
                  contactElement.removeEventListener("scroll", handleScroll);
                }
              }
            }
          },
        });
    },
    {
      dependencies: [tContact],
      revertOnUpdate: true,
    },
  );

  // Context-safe event handler
  const handleScroll = contextSafe(() => {
    const contactElement = wrapperRef.current;
    if (contactElement) {
      const isScrolledToEnd =
        contactElement.scrollHeight - contactElement.scrollTop <=
        contactElement.clientHeight + 1;

      gsap.to(".footer", {
        opacity: isScrolledToEnd ? 1 : 0,
        duration: isScrolledToEnd ? 0.2 : 0.2,
        ease: "power1.out",
      });
    }
  });

  return (
    <section
      ref={wrapperRef}
      className="contact no-scrollbar panel z-5 relative col-start-1 col-end-2 row-start-2 row-end-2 h-screen w-full bg-thirdBackground will-change-transform dark:bg-secondBackground"
    >
      {children}
    </section>
  );
};

export default ContactWrapperClient;
