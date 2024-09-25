"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import Splitter from "../utils/Splitter";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {};

const Hero = (props: Props) => {
  useGSAP(() => {
    const introTl = gsap.timeline();

    // Animate  overlay
    // Animate overlay
    introTl
      // we're taking header section from HEADER component to be opacity like others from hero section
      .set([".hero", ".header"], { opacity: 1, duration: 2 })
      .fromTo(
        ".black-overlay",
        {
          yPercent: -100,
        },
        { yPercent: 0, duration: 1, ease: "power2.inOut" },
      )
      // Animate menu items
      .from(
        "nav .split-char",
        {
          x: -100,
          opacity: 0,
          stagger: 0.05,
          ease: "expo.out",
          duration: 1,
        },
        "-=0.3",
      )
      .from(".main-header", { opacity: 0, y: 20, duration: 0.5 }, "-=0.7")
      .from(".subheader", { opacity: 0, y: 20, duration: 0.5 }, "-=0.5")
      .from(
        ".description",
        { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 },
        "-=0.3",
      )
      .from(".logo", { opacity: 0, y: -50, duration: 0.5 }, "-=0.3")
      .from(".white-line", { width: 0, duration: 0.5 })
      .from(".header-nav li", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        stagger: 0.3,
        ease: "power2.out",
        delay: 0.3,
      });
  });

  return (
    <section className="hero flex w-full flex-col py-32 font-[family-name:var(--font-geist-sans)] text-mainFontColor opacity-0 md:h-screen md:flex-row-reverse md:items-end lg:flex">
      <div className="white-overlay opacity-1 bg-secondBackground absolute left-0 top-0 z-0 h-screen w-full"></div>
      <div className="black-overlay z-1 absolute left-0 top-0 h-screen w-full bg-background"></div>
      {/* ABOUT SECTION */}
      <div className="section-left relative z-0 lg:w-[30%] lg:text-right">
        <h1 className="main-header mb-3 text-xl uppercase">PAWEŁ BILSKI</h1>
        <h2 className="subheader mb-3 text-sm font-thin">
          Front-end Developer | Software Engineer | Web Developer
        </h2>

        <p className="description text-wrap text-sm">
          Currently working full-time as a Frontend developer at Hubra Company
        </p>
      </div>

      {/* NAV */}
      <div className="section-right pt-10 md:flex-grow md:pt-0">
        <nav className="max-fold:text-5xl relative z-0 flex font-[family-name:var(--font-geist-sans)] text-6xl font-extralight md:text-[6rem] lg:text-[8rem] 2xl:text-[10rem]">
          <ul className="nav space-y-2 uppercase">
            <li className="flex">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-5 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.35rem] lg:group-hover:h-[80px] xl:group-hover:h-[100px]"></span>
                  <Splitter text="projects" />
                </div>
              </div>
            </li>

            <li className="flex items-center justify-start">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-5 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.35rem] lg:group-hover:h-[80px] xl:group-hover:h-[100px]"></span>
                  <Splitter text="About" />
                </div>
              </div>
            </li>

            <li className="flex items-center justify-start">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-5 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.35rem] lg:group-hover:h-[80px] xl:group-hover:h-[100px]"></span>
                  <Splitter text="TECH" />
                </div>
              </div>
            </li>
            <li className="flex items-center justify-start">
              <div className="splitter-wrapper group inline-block cursor-pointer transition-colors hover:text-gray-400">
                <div className="nav_item flex items-center">
                  <span className="mr-0 inline-block h-0 w-[0.2rem] bg-gray-400 transition-all duration-300 group-hover:mr-5 group-hover:h-[40px] md:group-hover:h-[55px] lg:w-[0.35rem] lg:group-hover:h-[80px] xl:group-hover:h-[100px]"></span>
                  <Splitter text="CONTACT" />
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
