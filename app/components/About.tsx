"use client";
import React, { Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitter from "../utils/Splitter";
import Image from "next/image";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const tAbout = useTranslations("AboutSection");
  useGSAP(
    () => {
      const mainAboutLn = gsap.timeline({
        scrollTrigger: {
          trigger: ".overview_section",
          start: "top 75%",
          scrub: 2,
          end: "+=80%",
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
          "-=.3",
        );

      // New timeline for the image_wrapper inside image_section
      const imageWrapperTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".image_section", // Trigger when .image_section is in view
          start: "top 55%", // Adjust the start value as needed
          end: "center top", // End when the section leaves the viewport
          scrub: 2,
          // refreshPriority: 1, // Ensures this is refreshed after the parent trigger
        },
      });

      imageWrapperTimeline.from(".image_wrapper", {
        rotateX: 90,
        duration: 3,
        ease: "ease-in",
        opacity: 0,
      });
    },
    {
      dependencies: [tAbout], // Zmiana języka spowoduje ponowne uruchomienie
      revertOnUpdate: true, // Cofnij animacje przed ponownym uruchomieniem
    },
  );
  return (
    <section className="about panel absolute top-0 z-10 col-start-1 col-end-2 row-start-1 row-end-2 min-h-screen w-full overflow-hidden bg-secondBackground py-20 shadow-xl will-change-transform lg:py-36 dark:bg-background">
      <div className="about_wrapper container box-border grid max-h-full grid-cols-1 place-items-center gap-10 text-background xl:grid-cols-2 dark:text-blackSectionText">
        <div className="overview_section relative text-mobile">
          <h2 className="about_header font-mainHeaderFont uppercase leading-none tracking-wide text-background lg:text-section-header-lg xl:text-section-header-xl 2xl:text-section-header-2xl dark:text-mainFontColor">
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
          <div className="image_wrapper relative will-change-transform">
            <Image
              src="/profile-picture.jpeg"
              alt="Description of image"
              width={400}
              height={800}
              className="block shadow-lg"
              quality={50}
            />
            <div className="pointer-events-none absolute inset-0 border-b-4 border-l-4 border-r-4 border-t-4 border-transparent">
              <div className="corner-el absolute -left-2 -top-2 -z-10 h-10 w-10 bg-background dark:bg-secondBackground"></div>
              <div className="corner-el absolute -right-2 -top-2 -z-10 h-10 w-10 bg-background dark:bg-secondBackground"></div>
              <div className="corner-el absolute -bottom-2 -left-2 -z-10 h-10 w-10 bg-background dark:bg-secondBackground"></div>
              <div className="corner-el absolute -bottom-2 -right-2 -z-10 h-10 w-10 bg-background dark:bg-secondBackground"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
