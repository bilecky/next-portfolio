"use client";

import React, { useRef } from "react";
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
import SVGDot from "../utils/SVGDots";

gsap.registerPlugin(useGSAP, ScrollTrigger, Observer);

type Props = {};

const reversedTechnologies = [...technologies].reverse();

function Tech({}: Props) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeReverseRef = useRef<HTMLDivElement>(null);

  // MAIN GSAP ANIMATIONS
  useGSAP(() => {
    const mainTechLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech", // Make sure this class exists on the element
        start: "top center", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
        end: "bottom bottom",
        scrub: 2, // Sync the animation with scrolling smoothly
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
    });
  });

  //TECHNOLOGIES GSAP ANIMATONS

  useGSAP(() => {
    const marquee = marqueeRef.current;
    const marqueeReverse = marqueeReverseRef.current;

    if (!marquee || !marqueeReverse) return;

    const loopsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech",
        start: "top center",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    loopsTl.from([marquee, marqueeReverse], {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    // Tworzenie pętli dla marquee
    const tlMarqueLoop = horizontalLoop(marquee, { speed: 0.35, repeat: -1 });
    const tlMarqueReverseLoop = horizontalLoop(marqueeReverse, {
      repeat: -1,
      reversed: true,
      speed: 0.35,
    });

    // Ustawienie początkowych wartości timeScale
    tlMarqueLoop.timeScale(1);
    tlMarqueReverseLoop.timeScale(-1); // Zawsze przeciwny kierunek

    // Observer dla marquee
    Observer.create({
      target: window,
      type: "wheel",
      onChangeY(self) {
        let factor = 2.5;
        if (self.deltaY < 0) {
          factor *= -1; // Jeśli scroll idzie w górę, zmień kierunek
        }

        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tlMarqueLoop, { timeScale: factor * 2.5, duration: 0.2 })
          .to(tlMarqueLoop, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
      },
    });

    // Oddzielny Observer dla marqueeReverse
    Observer.create({
      target: window,
      type: "wheel",
      onChangeY(self) {
        let factor = 2.5;
        if (self.deltaY < 0) {
          factor *= -1; // Analogicznie, dla marqueeReverse
        }

        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(tlMarqueReverseLoop, { timeScale: -factor * 2.5, duration: 0.2 }) // Ujemny factor dla odwróconego loopa
          .to(
            tlMarqueReverseLoop,
            { timeScale: -factor / 2.5, duration: 1 },
            "+=0.3",
          );
      },
    });
  });

  return (
    <section className="tech py-28 text-background">
      <div className="overview-wrapper container mb-16">
        <div className="overview ml-auto text-right lg:w-3/5">
          <h2 className="tech-header lg:text-section-header uppercase">
            <Splitter className="tech-header-text" text="TECH" />
          </h2>

          <p className="tech-description text-sm lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book." Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book."
          </p>
        </div>
      </div>

      <div className="tech-items overflow-hidden whitespace-nowrap">
        <div className="marquee flex" ref={marqueeRef}>
          {technologies.map((tech, index) => {
            return (
              <div
                key={index}
                className="tech-item flex items-center justify-center font-extrabold uppercase leading-none lg:text-[9rem]"
              >
                {tech}
                <span className="tech-item-separator mx-4 h-4 w-4 bg-mainFontColor"></span>
              </div>
            );
          })}
        </div>
        <div className="marquee-reverse flex" ref={marqueeReverseRef}>
          {reversedTechnologies.map((tech, index) => {
            return (
              <div
                key={index}
                className="tech-item-reverse flex items-center justify-center font-extrabold uppercase leading-none lg:text-[10rem]"
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
