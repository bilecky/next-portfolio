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
        start: "top center", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
        end: "bottom bottom",
        scrub: 3, // Sync the animation with scrolling smoothly
      },
    });

    reuseTexTsplitterFn({
      timeline: mainTechLine,
      selector: ".tech-header-text",
      options: { stagger: -1 },
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

  useGSAP(
    () => {
      // Tworzenie pętli dla marquee
      const tlMarqueLoop = horizontalLoop(".tech-item", {
        speed: 1,
        repeat: -1,
        paddingRight: 10,
      });
      const tlMarqueReverseLoop = horizontalLoop(".tech-item-reverse", {
        repeat: -1,
        reversed: true,
        speed: 1,
      });

      Observer.create({
        target: window,
        type: "wheel, touchmove",
        onChangeY(self) {
          let factor = 1.5;
          if (self.deltaY < 0) {
            factor *= -1; // Analogicznie, dla marqueeReverse
          }

          gsap
            .timeline({ defaults: { ease: "none" } })
            .to(tlMarqueLoop, {
              timeScale: factor * 2.5,
              duration: 0.2,
            }) // Ujemny factor dla odwróconego loopa
            .to(
              tlMarqueLoop,
              { timeScale: factor / 2.5, duration: 1 },
              "+=0.3",
            );
        },
      });

      Observer.create({
        target: window,
        type: "wheel, touchmove",
        onChangeY(self) {
          let factor = 1.5;
          if (self.deltaY < 0) {
            factor *= -1; // Analogicznie, dla marqueeReverse
          }

          gsap
            .timeline({ defaults: { ease: "none" } })
            .to(tlMarqueReverseLoop, {
              timeScale: -factor * 2.5,
              duration: 0.2,
            }) // Ujemny factor dla odwróconego loopa
            .to(
              tlMarqueReverseLoop,
              { timeScale: -factor / 2.5, duration: 1 },
              "+=0.3",
            );
        },
      });
    },
    {
      scope: ".tech",
    },
  );

  return (
    <section className="tech py-28 text-background">
      <div className="overview-wrapper container mb-16">
        <div className="overview text-mobile ml-auto text-right lg:w-3/5">
          <h2 className="tech-header lg:text-section-header uppercase">
            <Splitter className="tech-header-text" text="TECH" />
          </h2>

          <p className="tech-description text-sm lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book."
          </p>

          <p className="tech-description pt-4 text-sm lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book."
          </p>
        </div>
      </div>

      <div className="tech-items overflow-hidden whitespace-nowrap">
        <div className="marquee gsap-marquee flex">
          {technologies.map((tech, index) => {
            return (
              <div
                key={index}
                className="tech-item flex items-center justify-center text-7xl font-extrabold uppercase lg:text-[9rem]"
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
