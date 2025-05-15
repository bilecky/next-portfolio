"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Splitter from "../utils/Splitter";
import gsap from "gsap";
import { reuseHeaderLineAnimation } from "../utils/ReusableGSAPAnimations";
import { useTranslations } from "next-intl";
import { useLenis } from "lenis/react";
import { blockScroll } from "../utils/helperFunctions";
import { useTheme } from "@/context/ThemeProvider";
import Loader from "./common/Loader";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  const t = useTranslations("Hero");

  const lenis = useLenis();

  const { theme } = useTheme();

  const heroRef = useRef<HTMLElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const [blockInitialScroll, setBlockInitialScroll] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

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
    gsap.set([".header", heroRef.current, ".app-loader"], {
      opacity: 1,
    });

    const sessionFirstIntro = sessionStorage.getItem("introComplete");

    if (sessionFirstIntro) {
      setIsIntroComplete(true);
      setBlockInitialScroll(false);
      timelineRef.current?.progress(1).kill();
      gsap.to(
        {},
        {
          onStart: reuseHeaderLineAnimation,
        },
      );
      gsap.set(blackOverlayRef.current, { y: "0%" });
      gsap.set(".app-loader", { opacity: 0, xPercent: 0 });

      return;
    }

    const introTl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsIntroComplete(true);
        setBlockInitialScroll(false);
        sessionStorage.setItem("introComplete", "true");
      },
    });

    introTl
      .to(".app-loader", {
        opacity: 0,
        duration: 1,
        ease: "back.inOut(1)",
        xPercent: 100,
      })
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
      .from(".main-header", { opacity: 0, y: 20, duration: 0.3 }, "-=0.75")
      .from(".subheader", { opacity: 0, y: 20, duration: 0.3 }, "-=0.5")
      .from(
        ".description",
        { opacity: 0, y: 20, duration: 0.3, stagger: 0.2 },
        "-=0.25",
      )
      .from(".logo", { opacity: 0, y: -50, duration: 0.3 }, "-=0.05")
      .from(
        ".white-line",
        {
          scaleX: 0,
          duration: 0.4,
        },
        "-=0.05",
      )
      .from(
        ".header-nav li",
        {
          opacity: 0,
          y: -50,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.05",
      )
      .to(
        {},
        {
          onStart: reuseHeaderLineAnimation,
        },
      );

    timelineRef.current = introTl;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoadingComplete = () => {
    timelineRef.current?.play();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      });
    }
  }, [lenis]);

  useGSAP(
    () => {
      const bgColor = theme === "dark" ? "#222222" : "#FBFCF8";
      const endColor = theme === "dark" ? "#FBFCF8" : "#a6aba5";
      const bgArea = gsap.timeline({
        scrollTrigger: {
          id: "bgScrollTrigger",
          trigger: heroRef.current,
          start: "bottom bottom",
          end: "+=100%",
          scrub: 2,
        },
      });

      if (!isIntroComplete) return;

      bgArea.fromTo(
        [".main", ".black-overlay"],
        { backgroundColor: bgColor },
        { backgroundColor: endColor, overwrite: "auto", ease: "power3.inOut" },
      );
    },

    { dependencies: [theme, isIntroComplete], revertOnUpdate: true },
  );

  return (
    <>
      <Loader onFinish={handleLoadingComplete} />
      <section
        ref={heroRef}
        className="hero container flex h-auto w-full flex-col py-40 font-mainFont text-background opacity-0 md:h-screen md:flex-row-reverse md:items-center md:py-20 xl:items-end ultra-tall-screen:items-center landscape-short:h-auto dark:text-mainFontColor"
      >
        {isMounted && theme === "light" && (
          <div className="white-overlay opacity-1 absolute inset-0 z-0 h-screen w-full bg-background dark:bg-secondBackground"></div>
        )}

        <div
          ref={blackOverlayRef}
          className="black-overlay absolute left-0 top-0 h-screen w-full translate-y-[-100%] transform-gpu bg-secondBackground will-change-transform dark:bg-background"
        ></div>
        {/* ABOUT SECTION */}
        <div className="section-left relative z-0 block md:hidden md:text-right lg:w-[30%] xl:block xl:pb-6">
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
          <nav className="relative z-0 flex font-mainHeaderFont text-6xl font-[400] tracking-wide sm:text-[6rem] md:text-[7.5rem] lg:text-[8.5rem] xl:text-[9rem] 2xl:text-[10.5rem] max-fold:text-fold-text landscape-short:text-[6rem]">
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
    </>
  );
};

export default Hero;
