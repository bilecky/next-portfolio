"use client";

import React, { useState, useRef, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import Splitter from "../../utils/Splitter";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCarousel from "./ProjectCarousel";
import {
  reuseSectionDescriptionAnimation,
  reuseTexTsplitterFn,
} from "../../utils/ReusableGSAPAnimations";
import { Canvas } from "@react-three/fiber";
import ThreeModel from "../3DModel/ThreeModel";
import * as THREE from "three";
import useMediaQuery from "../../hooks/useMediaQuery";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { PropagateLoader } from "react-spinners";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProjectsProps = {
  isIntroComplete: boolean;
};

const Projects = ({ isIntroComplete }: ProjectsProps) => {
  const monitorModelRef = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentProject, setCurrentProject] = useState<number>(0);

  const tWork = useTranslations("WorkSection");

  useGSAP(
    () => {
      const leftSectionArea = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects", // Make sure this class exists on the element
          start: "top 60%", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
          end: "+=40%",
          scrub: 3, // Sync the animation with scrolling smoothly
        },
      });
      leftSectionArea.set(".projects", { opacity: 1 });

      reuseTexTsplitterFn({
        timeline: leftSectionArea,
        selector: ".header-text .split-char",
        options: { stagger: 1, rotateY: 180 },
      });

      reuseSectionDescriptionAnimation({
        timeline: leftSectionArea,
        selector: ".projects-description",
      });
      // const model3dTimeline = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".projects",
      //     start: "top 20%",
      //     end: "bottom bottom",
      //     scrub: 3,
      //   },
      // });

      // leftSectionArea.from(".model3d", {
      //   opacity: 0,
      //   ease: "none",
      // });

      // textArea.from(".project_details", {
      //   opacity: 0,
      //   ease: "back.out",
      //   duration: 10,
      // });

      const mm = gsap.matchMedia();

      // Animacja dla wersji mobilnej (max-width: 767px)
      mm.add("(max-width: 767px)", () => {
        const herodissapearMobile = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero", // Sekcja, która wyzwala trigger
            start: "10% top", // Rozpocznij, gdy 10% sekcji hero dotknie górnej krawędzi
            end: "bottom 10%", // Zakończ, gdy dolna krawędź hero znajdzie się na 10% od góry
            scrub: 3, // Płynna synchronizacja ze scrollem
          },
        });

        herodissapearMobile.to(".section-left", {
          opacity: 0,
          ease: "sine.inOut",
          x: 500, // Przesunięcie w prawo o 500px
          duration: 0.5,
        });

        herodissapearMobile.to(
          ".nav-hero li",
          {
            opacity: 0,
            ease: "sine.inOut",
            duration: 0.5,
            stagger: -0.1, // Elementy znikają kolejno w odwrotnej kolejności
            x: -500, // Przesunięcie w lewo o 500px
          },
          0, // Rozpoczęcie w tym samym czasie co poprzednia animacja
        );
      });

      // Animacja dla wersji desktopowej (min-width: 768px)
      mm.add("(min-width: 768px)", () => {
        const herodissapearDesktop = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "20% top", // Inny punkt startu dla desktopu
            end: "bottom 20%", // Inny punkt zakończenia
            scrub: 2, // Szybsza reakcja na scroll w wersji desktopowej
          },
        });

        herodissapearDesktop.to(".section-left", {
          opacity: 0,
          ease: "sine.inOut",
          x: 500, // Przesunięcie w prawo o 500px
          duration: 0.5,
        });

        herodissapearDesktop.to(
          ".nav-hero li",
          {
            opacity: 0,
            ease: "sine.inOut",
            duration: 0.5,
            stagger: -0.1, // Elementy znikają kolejno w odwrotnej kolejności
            x: -500, // Przesunięcie w lewo o 500px
          },
          0, // Rozpoczęcie w tym samym czasie co poprzednia animacja
        );
      });
    },
    {
      dependencies: [tWork], // Zmiana języka spowoduje ponowne uruchomienie
      revertOnUpdate: true, // Cofnij animacje przed ponownym uruchomieniem
    },
  );

  return (
    <section
      id="projects"
      className="projects relative z-10 text-background opacity-0 md:container md:py-28 xl:flex xl:flex-row"
    >
      <div className="overview xl:w-3/5">
        <div className={clsx(isMobile && "container")}>
          <h2 className="projects-header font-mainHeaderFont text-mobile uppercase leading-none lg:text-section-header-lg xl:text-section-header-xl 2xl:text-section-header-2xl max-fold:text-fold-text">
            <Splitter
              className="header-text will-change-transform"
              text={tWork("title")}
            />
          </h2>

          <p className="projects-description pt-descriptionPadding text-sm will-change-transform lg:max-w-contentWidth lg:py-descriptionPadding lg:text-xl">
            {tWork("paragraph1")}
          </p>
        </div>
        {/* prettier ignore */}
        <div className="model3d relative h-[23rem] w-full overflow-visible md:h-[40rem] xl:h-[32rem] xs:h-[29rem]">
          <div className="absolute -top-10 z-10 h-[23rem] w-full overflow-visible sm:h-[32rem] md:h-[50rem] lg:-top-28 lg:h-[60rem] xl:-top-40 xl:h-[55rem] 2xl:-left-12 2xl:-top-52 2xl:h-[60rem] xs:h-[29rem]">
            {isIntroComplete && (
              <Suspense
                fallback={
                  <div className="absolute inset-0 z-[100] flex items-center justify-center">
                    <PropagateLoader size={20} color="#212121" />
                  </div>
                }
              >
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ThreeModel
                    ref={monitorModelRef}
                    currentProject={currentProject}
                  />
                </Canvas>
              </Suspense>
            )}
          </div>
        </div>
      </div>

      <ProjectCarousel
        monitorModelRef={monitorModelRef}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
    </section>
  );
};

export default Projects;
