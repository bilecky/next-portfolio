"use client";

import React, { Suspense, useState, useRef } from "react";
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
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Loader,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import clsx from "clsx";
import { useTheme } from "@/app/context/ThemeProvider";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProjectsProps = {
  isIntroComplete: boolean;
};

const Projects = ({ isIntroComplete }: ProjectsProps) => {
  const monitorModelRef = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentProject, setCurrentProject] = useState<number>(0);
  const { theme } = useTheme();

  const tWork = useTranslations("WorkSection");

  useGSAP(() => {
    // const lightBgColor = "#FBFCF8";
    // const lightEndColor = "#BDFF0F";

    // const darkBgColor = "#222222";
    // const darkEndColor = "#FBFCF8";
    // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const bgColor = theme === "dark" ? "#222222" : "#FBFCF8";
    const endColor = theme === "dark" ? "#FBFCF8" : "#BDFF0F";
    ScrollTrigger.getById("bgScrollTrigger")?.kill();
    const bgArea = gsap.timeline({
      scrollTrigger: {
        id: "bgScrollTrigger",
        trigger: ".scroll-area", // Upewnij się, że ta klasa istnieje na elemencie
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    // Opóźnienie zmiany tła

    bgArea.fromTo(
      [".main", ".black-overlay"],
      { backgroundColor: bgColor },
      { backgroundColor: endColor, overwrite: "auto", ease: "power3.inOut" },
    );
  }, [theme]);

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
    <section className="projects relative z-10 text-background opacity-0 md:container md:py-28 xl:flex xl:flex-row">
      <div className="overview xl:w-3/5">
        <div className={clsx(isMobile && "container")}>
          <h2 className="max-fold:text-fold-text projects-header font-mainHeaderFont text-mobile uppercase leading-none lg:text-section-header-lg xl:text-section-header-xl 2xl:text-section-header-2xl">
            <Splitter
              className="header-text will-change-transform"
              text={tWork("title")}
            />
          </h2>

          <p className="projects-description pt-descriptionPadding text-sm will-change-transform lg:max-w-contentWidth lg:py-descriptionPadding lg:text-xl">
            {tWork("paragraph1")}
          </p>
        </div>
        {/* lg:h-[60vh] xl:h-[85vh] 2xl:-bottom-72 2xl:-left-20 2xl:h-[105vh] 2xl:w-[110%] */}
        <div className="model3d relative h-[29rem] w-full overflow-visible md:h-[40rem] xl:h-[32rem]">
          <div className="absolute -top-10 z-10 h-[29rem] w-full overflow-visible sm:h-[32rem] md:h-[50rem] lg:-top-28 lg:h-[60rem] xl:-top-40 xl:h-[55rem] 2xl:-left-12 2xl:-top-52 2xl:h-[60rem]">
            {isIntroComplete && (
              <Canvas>
                <ThreeModel
                  ref={monitorModelRef}
                  currentProject={currentProject}
                />
                <AdaptiveDpr pixelated />
                <Preload all />
              </Canvas>
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
