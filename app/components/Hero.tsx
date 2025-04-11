"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Splitter from "../utils/Splitter";
import gsap from "gsap";
import { reuseHeaderLineAnimation } from "../utils/ReusableGSAPAnimations";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  setIntroComplete: (value: boolean) => void;
}
const Hero = ({ setIntroComplete }: HeroProps) => {
  const t = useTranslations("Hero");

  const heroRef = useRef<HTMLElement>(null);
  const [blockInitialScroll, setBlockInitialScroll] = useState<boolean>(true);
  useEffect(() => {
    if (blockInitialScroll && heroRef.current) {
      document.body.style.overflowY = "hidden"; // standard no-scroll implementation
      document.body.setAttribute("data-lenis-prevent", "true"); // Make sure you pass true as string
      heroRef.current.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.removeAttribute("data-lenis-prevent");
      if (heroRef.current) heroRef.current.style.pointerEvents = "auto";
    }
  }, [blockInitialScroll]);

  useGSAP(() => {
    const introTl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
        setBlockInitialScroll(false);
      },
    });

    // Animate  overlay
    // Animate overlay
    introTl
      // we're taking header section from HEADER component to be opacity like others from hero section
      .set([".hero", ".header"], { opacity: 1, duration: 1 })

      .from(".black-overlay", {
        duration: 2,
        yPercent: -100,
        ease: "power4.in",
      })
      // Animate menu items
      .from(
        "nav .split-char",
        {
          x: -100,
          rotationX: 360,
          opacity: 0,
          stagger: 0.05,
          ease: "expo.out",
          duration: 1.5,
        },
        "-=0.05",
      )
      .from(".main-header", { opacity: 0, y: 20, duration: 0.4 }, "-=0.7")
      .from(".subheader", { opacity: 0, y: 20, duration: 0.4 }, "-=0.4")
      .from(
        ".description",
        { opacity: 0, y: 20, duration: 0.4, stagger: 0.2 },
        "-=0.1",
      )
      .from(".logo", { opacity: 0, y: -50, duration: 0.3 })
      .from(".white-line", {
        scaleX: 0,
        duration: 0.4,
      })
      .from(".header-nav li", {
        opacity: 0,
        y: -50,
        duration: 0.3,
        stagger: 0.2,
        ease: "power2.out",
      })
      .to(
        {},
        {
          onStart: reuseHeaderLineAnimation,
        },
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero container flex h-auto w-full flex-col py-40 font-mainFont text-background opacity-0 md:flex-row-reverse md:items-end lg:h-screen lg:py-20 landscape-short:h-auto dark:text-mainFontColor"
    >
      <div className="white-overlay opacity-1 absolute inset-0 z-0 bg-background dark:bg-secondBackground"></div>
      <div className="black-overlay absolute inset-0 will-change-transform"></div>
      {/* ABOUT SECTION */}
      <div className="section-left relative z-0 md:text-right lg:w-[30%]">
        <h1 className="gsap-group-hero main-header mb-3 text-xl uppercase will-change-transform">
          PAWEŁ BILSKI
        </h1>
        <h2 className="gsap-group-hero subheader mb-3 text-sm font-thin will-change-transform">
          Frontend Developer | Software Engineer
        </h2>

        <p className="gsap-group-hero description text-wrap text-sm will-change-transform">
          {t("description")}
        </p>
      </div>

      {/* NAV */}
      <div className="section-right pt-10 md:flex-grow lg:pt-0">
        <nav className="max-fold:text-fold-text relative z-0 flex font-mainHeaderFont text-6xl font-[400] tracking-wide md:text-[5rem] lg:text-[8rem] 2xl:text-[10.5rem]">
          <ul className="nav nav-hero select-none space-y-2 uppercase">
            <li className="flex">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem1")}
                  />
                </div>
              </div>
            </li>
            <li className="flex items-center justify-start">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem2")}
                  />
                </div>
              </div>
            </li>

            <li className="flex items-center justify-start">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem3")}
                  />
                </div>
              </div>
            </li>

            <li className="flex items-center justify-start">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem4")}
                  />
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
