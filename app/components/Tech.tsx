"use client";

import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Splitter from "../utils/Splitter";
import { technologies } from "../data/data";
import {
  reuseSectionDescriptionAnimation,
  reuseTexTsplitterFn,
} from "../utils/ReusableGSAPAnimations";
import { horizontalLoop } from "../utils/horizontalLoop";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const reversedTechnologies = [...technologies].reverse();

function Tech({}: Props) {
  // MAIN GSAP ANIMATIONS
  useGSAP(() => {
    const mainTechLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech", // Make sure this class exists on the element
        start: "top center",
        end: "bottom bottom",
        scrub: 3, // Sync the animation with scrolling smoothly,
      },
    });
    mainTechLine.set(".tech", { opacity: 1 });

    reuseTexTsplitterFn({
      timeline: mainTechLine,
      selector: ".tech-text .split-char",
      options: { stagger: -1, rotateY: 180 },
    });

    reuseSectionDescriptionAnimation({
      timeline: mainTechLine,
      selector: ".tech-description",
      options: {
        stagger: 1,
      },
    });

    mainTechLine.from(".gsap-marquee", {
      opacity: 0,
      duration: 10,
      stagger: 1,
      ease: "power3.out",
    });
  });

  //TECHNOLOGIES GSAP ANIMATONS

  useGSAP(() => {
    document.fonts.ready.then(() => {
      const firstLoopArr = gsap.utils.toArray(".tech-item");
      const secondLoopArr = gsap.utils.toArray(".tech-item-reverse");

      // Tworzenie pętli dla marquee
      const tlMarqueLoop = horizontalLoop(firstLoopArr, {
        speed: 1,
        repeat: -1,
      });
      const tlMarqueReverseLoop = horizontalLoop(secondLoopArr, {
        repeat: -1,
        reversed: true,
        speed: 1,
      });

      ScrollTrigger.observe({
        target: ".tech",
        type: "wheel, touch",
        onChangeY(self) {
          let factorOne = 1.5;
          if (self.deltaY < 0) {
            factorOne *= -1; // Analogicznie, dla marqueeReverse
          }

          gsap
            .timeline({ defaults: { ease: "none" } })
            .to(tlMarqueLoop, {
              timeScale: factorOne * 2.5,
              duration: 1,
            }) // Ujemny factorOne dla odwróconego loopa
            .to(
              tlMarqueLoop,
              { timeScale: factorOne / 2.5, duration: 1 },
              "+=0.3",
            );
        },
      });

      ScrollTrigger.observe({
        target: ".tech",
        type: "wheel, touch",
        onChangeY(self) {
          let factorTwo = 1.5;
          if (self.deltaY < 0) {
            factorTwo *= -1; // Analogicznie, dla marqueeReverse
          }

          gsap
            .timeline({ defaults: { ease: "none" } })
            .to(tlMarqueReverseLoop, {
              timeScale: -factorTwo * 2.5,
              duration: 1,
            }) // Ujemny factorTwo dla odwróconego loopa
            .to(
              tlMarqueReverseLoop,
              { timeScale: -factorTwo / 2.5, duration: 1 },
              "+=0.3",
            );
        },
      });
    });
  });

  return (
    <section className="tech -z-10 py-28 text-background opacity-0 will-change-auto">
      <div className="overview-wrapper container">
        <div className="overview relative ml-auto text-right lg:w-3/5">
          <h2 className="tech-header font-mainHeaderFont text-mobile uppercase leading-none lg:text-section-header">
            <Splitter className="tech-text" text="TECH" />
          </h2>

          <p className="tech-description py-4 text-sm lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book."
          </p>

          <p className="tech-description text-sm lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book."
          </p>
        </div>
      </div>

      <div className="tech-items overflow-hidden whitespace-nowrap py-20">
        <div className="marquee gsap-marquee flex">
          {technologies.map((tech, index) => {
            return (
              <div
                key={index}
                className="tech-item flex items-center justify-center text-7xl font-extrabold uppercase will-change-transform lg:text-[10rem]"
              >
                {tech}
                <span className="tech-item-separator mx-4 h-4 w-4 bg-mainFontColor"></span>
              </div>
            );
          })}
        </div>
        <div className="marquee-reverse gsap-marquee flex">
          {reversedTechnologies.map((tech, index) => {
            return (
              <div
                key={index}
                className="tech-item-reverse flex items-center justify-center text-7xl font-extrabold uppercase lg:text-[10rem]"
              >
                {tech}
                <span className="tech-item-separator mx-4 h-4 w-4 bg-mainFontColor"></span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Tech;
