"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitter from "../utils/Splitter";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const tAbout = useTranslations("AboutSection");
  const aboutRef = useRef<HTMLDivElement>(null);

  const mm = gsap.matchMedia();
  useGSAP(
    () => {
      const mainAboutLn = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,

          start: "top 70%",
          scrub: 2,
          end: "+=75%",
          // refreshPriority: 2, // Ensures this is refreshed after the parent trigger
        },
      });

      mainAboutLn
        .from(
          ".about_header .split-char",
          {
            x: -40,
            opacity: 0,
            duration: 2.5,
            ease: "expo.out",
            stagger: 1,
            rotateY: 180,
          },
          0,
        )
        .from(
          ".about_description",
          {
            stagger: 1,
            x: 100,
            duration: 4,
            opacity: 0,
            ease: "back.out",
          },
          "-=1.5",
        );

      mm.add("(min-width: 768px)", () => {
        gsap.from(".image_wrapper", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".image_section",
            start: "top 60%",
            end: "center 55%",
            scrub: 1.5,
          },
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.from(".image_wrapper", {
          y: 125,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".image_section",
            start: "top 90%",
            end: "top 1%",
            scrub: 0.5,
          },
        });
      });
    },
    {
      scope: aboutRef,
      dependencies: [tAbout], // Zmiana języka spowoduje ponowne uruchomienie
      revertOnUpdate: true, // Cofnij animacje przed ponownym uruchomieniem
    },
  );
  return (
    <section
      ref={aboutRef}
      className="about absolute left-0 right-0 top-0 z-[2] flex min-h-screen w-full items-center justify-center bg-secondBackground py-20 shadow-xl will-change-transform lg:py-36 dark:bg-background"
    >
      <div
        id="about"
        className="about_wrapper container box-border grid max-h-full grid-cols-1 place-items-center gap-10 text-background xl:grid-cols-2 dark:text-blackSectionText"
      >
        <div className="overview_section relative text-mobile">
          <h2 className="about_header font-mainHeaderFont uppercase leading-none tracking-wide text-background lg:text-section-header-lg xl:text-section-header-xl 2xl:text-section-header-2xl max-fold:text-fold-text dark:text-mainFontColor">
            <Splitter
              className="will-change-transform"
              text={tAbout("title")}
            />
          </h2>

          <p className="about_description pt-descriptionPadding text-sm will-change-transform lg:text-xl">
            {tAbout("paragraph1")}
          </p>

          <p className="about_description py-descriptionPadding text-sm will-change-transform lg:text-xl">
            {tAbout("paragraph2")}
          </p>
          <p className="about_description text-sm will-change-transform lg:text-xl">
            {tAbout("paragraph3")}
          </p>
        </div>
        <div className="image_section">
          <div className="image_wrapper relative grayscale will-change-transform">
            <Image
              src="/profile-picture.jpeg"
              alt="Description of image"
              width={400}
              height={800}
              className="block shadow-lg"
              quality={50}
            />
            <div className="pointer-events-none absolute inset-0 border-b-4 border-l-4 border-r-4 border-t-4 border-transparent">
              <div className="corner-el absolute -left-[6px] -top-[6px] -z-10 h-10 w-10 rounded-sm bg-background dark:bg-secondBackground"></div>
              <div className="corner-el absolute -right-[6px] -top-[6px] -z-10 h-10 w-10 rounded-sm bg-background dark:bg-secondBackground"></div>
              <div className="corner-el absolute -bottom-[6px] -left-[6px] -z-10 h-10 w-10 rounded-sm bg-background dark:bg-secondBackground"></div>
              <div className="corner-el absolute -bottom-[6px] -right-[6px] -z-10 h-10 w-10 rounded-sm bg-background dark:bg-secondBackground"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
