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
import { Observer } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

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
    // Tworzenie pętli dla marquee
    const tlMarqueLoop = horizontalLoop(".tech-item", {
      speed: 1,
      repeat: -1,
    });
    const tlMarqueReverseLoop = horizontalLoop(".tech-item-reverse", {
      repeat: -1,
      reversed: true,
      speed: 1,
    });

    Observer.create({
      target: window,
      type: "wheel, touch",
      onChangeY(self) {
        let factor = 1.5;
        if (self.deltaY < 0) {
          factor *= -1; // Analogicznie, dla marqueeReverse
        }

        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tlMarqueLoop, {
            timeScale: factor * 2.5,
            duration: 0.5,
          }) // Ujemny factor dla odwróconego loopa
          .to(tlMarqueLoop, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
      },
    });

    Observer.create({
      target: window,
      type: "wheel, touch",
      onChangeY(self) {
        let factor = 1.5;
        if (self.deltaY < 0) {
          factor *= -1; // Analogicznie, dla marqueeReverse
        }

        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tlMarqueReverseLoop, {
            timeScale: -factor * 2.5,
            duration: 0.5,
          }) // Ujemny factor dla odwróconego loopa
          .to(
            tlMarqueReverseLoop,
            { timeScale: -factor / 2.5, duration: 1 },
            "+=0.3",
          );
      },
    });
  });

  return (
    <section className="tech -z-10 overflow-hidden py-28 text-background opacity-0 will-change-auto">
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
                className="tech-item flex items-center justify-center text-7xl font-extrabold uppercase lg:text-[10rem]"
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
