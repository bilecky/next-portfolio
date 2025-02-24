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
import horizontalLoop from "../utils/horizontalLoop";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const reversedTechnologies = [...technologies].reverse();

function Tech({}: Props) {
  const tStack = useTranslations("StackSection");

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

      const tlMarqueLoop = horizontalLoop(firstLoopArr, {
        speed: 1,
        repeat: -1,
      });
      const tlMarqueReverseLoop = horizontalLoop(secondLoopArr, {
        repeat: -1,
        reversed: true,
        speed: 1,
      });

      // Te tweeny są przygotowane do spowalniania animacji
      const slowDownFirst = gsap.to(tlMarqueLoop, {
        timeScale: 0.5, // docelowa prędkość po zwolnieniu
        duration: 1.5,
        ease: "power1.in", // łagodniejsze spowalnianie
        paused: true, // ważne - tween jest zatrzymany i czeka na użycie
      });

      const slowDownSecond = gsap.to(tlMarqueReverseLoop, {
        timeScale: -0.5,
        duration: 1.5,
        ease: "power1.in", // łagodniejsze spowalnianie

        paused: true,
      });

      // Główny observer do scrollowania
      const marqueeObserver = ScrollTrigger.observe({
        target: ".tech",
        type: "pointer,touch,wheel",
        wheelSpeed: 0.5,
        debounce: true,

        onChangeY(self) {
          const delta = self.deltaY;
          const factorOne = delta < 0 ? -1.2 : 1.2; // zmniejszone z 1.5
          const factorTwo = delta < 0 ? -1.2 : 1.2;

          // Natychmiast zmieniamy prędkość podczas scrollowania
          tlMarqueLoop.timeScale(factorOne * 2.5);
          tlMarqueReverseLoop.timeScale(-factorTwo * 2.5);

          // Po każdym scrollu resetujemy i uruchamiamy animację spowalniania
          slowDownFirst.invalidate().restart();
          slowDownSecond.invalidate().restart();
        },
      });

      // Observer do zatrzymywania animacji przy wyjściu z sekcji
      [".wrapper", "footer"].forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause play pause",
          onToggle: (self) => {
            if (self.isActive) {
              marqueeObserver.disable(); // Wyłączamy główny observer
            } else {
              marqueeObserver.enable(); // Włączamy główny observer
            }
          },
        });
      });
    });
  });

  return (
    <section className="tech -z-10 py-28 text-background opacity-0 will-change-transform">
      <div className="overview-wrapper container">
        <div className="overview xl:max-w-contentWidth ml-auto text-right lg:w-3/5">
          <h2 className="tech-header font-mainHeaderFont text-mobile uppercase leading-none lg:text-section-header">
            <Splitter
              className="tech-text will-change-transform"
              text={tStack("title")}
            />
          </h2>

          <p className="tech-description py-4 text-sm will-change-transform lg:text-xl">
            {tStack("paragraph1")}
          </p>

          <p className="tech-description text-sm will-change-transform lg:text-xl">
            {tStack("paragraph2")}
          </p>
        </div>
      </div>

      <div className="tech-items overflow-hidden whitespace-nowrap py-20">
        <div className="marquee gsap-marquee flex">
          {technologies.map((tech, index) => {
            return (
              <div
                key={index}
                className="tech-item flex items-center justify-center text-7xl font-extrabold uppercase will-change-transform lg:text-[11rem]"
              >
                {tech}
                <span className="tech-item-separator mx-4 h-5 w-5 bg-gray-400"></span>
              </div>
            );
          })}
        </div>
        <div className="marquee-reverse gsap-marquee flex">
          {reversedTechnologies.map((tech, index) => {
            return (
              <div
                key={index}
                className="tech-item-reverse flex items-center justify-center text-7xl font-extrabold uppercase will-change-transform lg:text-[11rem]"
              >
                {tech}
                <span className="tech-item-separator mx-4 h-5 w-5 bg-gray-400"></span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Tech;
