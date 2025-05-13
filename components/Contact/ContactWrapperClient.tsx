"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);
interface ContactWrapperProps {
  children: React.ReactNode;
}

const ContactWrapperClient = ({ children }: ContactWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const tContact = useTranslations("ContactSection"); // Dostosuj nazwę sekcji

  useGSAP(
    () => {
      // Pin first section
      ScrollTrigger.create({
        trigger: ".stack",
        start: "bottom bottom",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(".scrolling-container .about", {
        yPercent: -100,
        ease: "none",

        scrollTrigger: {
          trigger: ".scrolling-container",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          preventOverlaps: true,
        },
      });
    },
    {
      dependencies: [tContact],
      revertOnUpdate: true,
    },
  );
  useEffect(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });
  }, [pathname]);

  // Context-safe event handler

  return (
    <section
      id="contact"
      ref={wrapperRef}
      className="contact no-scrollbar panel relative z-[1] flex min-h-full w-full items-center justify-center bg-thirdBackground will-change-transform dark:bg-secondBackground"
    >
      {children}
    </section>
  );
};

export default ContactWrapperClient;
