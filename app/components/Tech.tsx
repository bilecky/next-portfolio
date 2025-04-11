"use client";

import React, { useEffect, useState } from "react";
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
  useGSAP(
    () => {
      const mainTechLine = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech", // Make sure this class exists on the element
          start: "top 60%",
          end: "bottom bottom",
          scrub: 3, // Sync the animation with scrolling smoothly,
          refreshPriority: 1,
        },
      });

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
    },
    {
      dependencies: [tStack], // Zmiana języka spowoduje ponowne uruchomienie
      revertOnUpdate: true, // Cofnij animacje przed ponownym uruchomieniem
    },
  );

  //USEFFECT TO TRACK WINDOW.INNERWIDTH

  //TECHNOLOGIES GSAP ANIMATONS

  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Utwórz odpowiedni kontekst matchMedia
      const mm = gsap.matchMedia();

      // Dodaj różne breakpointy
      mm.add("(min-width: 1024px)", () => {
        // Kod dla desktopa
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

        // Tweeny do spowalniania
        const slowDownFirst = gsap.to(tlMarqueLoop, {
          timeScale: 0.5,
          duration: 1.5,
          ease: "power1.in",
          paused: true,
        });

        const slowDownSecond = gsap.to(tlMarqueReverseLoop, {
          timeScale: -0.5,
          duration: 1.5,
          ease: "power1.in",
          paused: true,
        });

        // Observer
        const marqueeObserver = ScrollTrigger.observe({
          target: ".tech",
          type: "touch,wheel",
          wheelSpeed: 0.5,
          debounce: true,

          onChangeY(self) {
            const delta = self.deltaY;
            const factorOne = delta < 0 ? -1.2 : 1.2;
            const factorTwo = delta < 0 ? -1.2 : 1.2;

            tlMarqueLoop.timeScale(factorOne * 2.5);
            tlMarqueReverseLoop.timeScale(-factorTwo * 2.5);

            slowDownFirst.invalidate().restart();
            slowDownSecond.invalidate().restart();
          },
        });

        // Logika ScrollTrigger dla zatrzymywania
        [".wrapper", "footer"].forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause play pause",
            onToggle: (self) => {
              if (self.isActive) {
                marqueeObserver.disable();
              } else {
                marqueeObserver.enable();
              }
            },
          });
        });

        // Funkcja czyszcząca
        return () => {
          marqueeObserver.kill();
        };
      });

      // Konfiguracja dla urządzeń mobilnych
      mm.add("(max-width: 1023px)", () => {
        // Alternatywna implementacja dla mobilnych
        // Może być uproszczona lub inna
        const firstLoopArr = gsap.utils.toArray(".tech-item");
        const secondLoopArr = gsap.utils.toArray(".tech-item-reverse");

        // Wolniejsza prędkość dla mobilnych
        const tlMarqueLoop = horizontalLoop(firstLoopArr, {
          speed: 0.65,
          repeat: -1,
        });

        const tlMarqueReverseLoop = horizontalLoop(secondLoopArr, {
          repeat: -1,
          reversed: true,
          speed: 0.65,
        });

        // Prostsza implementacja dla mobilnych
        const marqueeObserver = ScrollTrigger.observe({
          target: ".tech",
          type: "touch",
          debounce: true,

          onChangeY(self) {
            // Prostsze zachowanie dla mobilnych
            tlMarqueLoop.timeScale(self.deltaY < 0 ? -1 : 1);
            tlMarqueReverseLoop.timeScale(self.deltaY < 0 ? 1 : -1);
          },
        });

        return () => {
          marqueeObserver.kill();
        };
      });
    });
  });

  return (
    <section
      id="stack"
      className="tech -z-10 py-28 text-background will-change-transform"
    >
      <div className="overview-wrapper container">
        <div className="overview ml-auto text-right lg:max-w-contentWidth">
          <h2 className="tech-header max-fold:text-fold-text font-mainHeaderFont text-mobile uppercase leading-none lg:text-section-header-lg xl:text-section-header-xl 2xl:text-section-header-2xl">
            <Splitter
              className="tech-text will-change-transform"
              text={tStack("title")}
            />
          </h2>

          <p className="tech-description py-descriptionPadding text-sm will-change-transform lg:text-xl">
            {tStack("paragraph1")}
          </p>

          <p className="tech-description text-sm will-change-transform lg:text-xl">
            {tStack("paragraph2")}
          </p>
        </div>
      </div>

      <div className="tech-items select-none overflow-hidden whitespace-nowrap py-20">
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
