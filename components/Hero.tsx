"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Splitter from "../utils/Splitter";
import gsap from "gsap";
import { reuseHeaderLineAnimation } from "../utils/ReusableGSAPAnimations";
import { useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { blockScroll } from "../utils/helperFunctions";
import { useTheme } from "@/context/ThemeProvider";
import clsx from "clsx";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  setIntroComplete: (value: boolean) => void;
}
const Hero = ({ setIntroComplete }: HeroProps) => {
  const t = useTranslations("Hero");

  const lenis = useLenis();

  const { theme } = useTheme();

  const heroRef = useRef<HTMLElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const [blockInitialScroll, setBlockInitialScroll] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (blockInitialScroll && heroRef.current) {
      blockScroll(true);
      heroRef.current.style.pointerEvents = "none";
    } else {
      blockScroll(false);
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

    introTl.set([".header", heroRef.current], {
      opacity: 1,
    });

    introTl
      .to(blackOverlayRef.current, {
        y: "0%",
        duration: 1.5,
        ease: "power4.inOut",
        force3D: true,
      })
      // Animate menu items
      .from(
        "nav .split-char",
        {
          x: -200,
          rotationX: 360,
          opacity: 0,
          stagger: 0.05,
          ease: "expo.out",
          duration: 1.4,
        },
        "-=0.1",
      )
      .from(".main-header", { opacity: 0, y: 20, duration: 0.4 }, "-=0.75")
      .from(".subheader", { opacity: 0, y: 20, duration: 0.4 }, "-=0.5")
      .from(
        ".description",
        { opacity: 0, y: 20, duration: 0.4, stagger: 0.2 },
        "-=0.25",
      )
      .from(".logo", { opacity: 0, y: -50, duration: 0.3 })
      .from(".white-line", {
        scaleX: 0,
        duration: 0.3,
      })
      .from(".header-nav li", {
        opacity: 0,
        y: -50,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.out",
      })
      .to(
        {},
        {
          onStart: reuseHeaderLineAnimation,
        },
      );
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero container flex h-auto w-full flex-col py-40 font-mainFont text-background opacity-0 md:h-screen md:flex-row-reverse md:items-center md:py-20 xl:items-end landscape-short:h-auto dark:text-mainFontColor"
    >
      {isMounted && theme === "light" && (
        <div className="white-overlay absolute inset-0 z-0 h-screen w-full bg-background dark:bg-secondBackground"></div>
      )}

      <div
        ref={blackOverlayRef}
        className="black-overlay absolute left-0 top-0 h-screen w-full translate-y-[-100%] transform-gpu bg-secondBackground will-change-transform dark:bg-background"
      ></div>
      {/* ABOUT SECTION */}
      <div className="section-left relative z-0 block md:hidden md:text-right lg:w-[30%] xl:block">
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
        <nav className="relative z-0 flex font-mainHeaderFont text-6xl font-[400] tracking-wide sm:text-[6rem] md:text-[7.5rem] lg:text-[8.5rem] xl:text-[9rem] 2xl:text-[10.5rem] max-fold:text-fold-text">
          <ul className="nav nav-hero select-none space-y-2 uppercase">
            <li className="flex">
              <a
                onClick={() => lenis?.scrollTo("#projects")}
                href="#projects"
                className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400"
              >
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem1")}
                  />
                </div>
              </a>
            </li>
            <li className="flex items-center justify-start">
              <a
                onClick={() => lenis?.scrollTo("#stack")}
                href="#stack"
                className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400"
              >
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem2")}
                  />
                </div>
              </a>
            </li>

            <li className="flex items-center justify-start">
              <a
                onClick={() => lenis?.scrollTo("#about")}
                href="#about"
                className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400"
              >
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem3")}
                  />
                </div>
              </a>
            </li>

            <li className="flex items-center justify-start">
              <a
                onClick={() => lenis?.scrollTo(document.body.scrollHeight)}
                href="#contact"
                className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400"
              >
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-7 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.6rem] lg:group-hover:h-[80px] xl:group-hover:h-[90px]"></span>
                  <Splitter
                    className="will-change-transform"
                    text={t("MenuItem4")}
                  />
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
