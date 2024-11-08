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

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProjectsProps = {
  isIntroComplete: boolean;
};

const Projects = ({ isIntroComplete }: ProjectsProps) => {
  const monitorModelRef = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentProject, setCurrentProject] = useState<number>(1);
  const { theme } = useTheme();

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
      ["body", ".black-overlay"],
      { backgroundColor: bgColor },
      { backgroundColor: endColor, overwrite: "auto", ease: "power3.inOut" },
    );
  }, [theme]);

  useGSAP(() => {
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

    const herodissapear = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects", // Make sure this class exists on the element
        start: "top 80%", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
        end: "bottom bottom",
        scrub: 3, // Sync the animation with scrolling smoothly
      },
    });

    herodissapear.to(".section-left", {
      opacity: 0,
      ease: "power3.inOut",
      x: 500,
      duration: 0.5,
    });
    herodissapear.to(
      ".nav-hero li",
      {
        opacity: 0,
        ease: "power3.inOut",
        duration: 0.5,
        stagger: -0.1,
        x: -500,
      },
      0,
    );
  }, []);

  return (
    <section className="projects relative z-10 text-background opacity-0 md:container md:py-28 xl:flex xl:flex-row">
      <div className="overview xl:w-3/5">
        <div className={clsx(isMobile && "container")}>
          <h2 className="projects-header font-mainHeaderFont text-mobile uppercase leading-none lg:text-section-header">
            <Splitter
              className="header-text will-change-transform"
              text="Projects"
            />
          </h2>

          <p className="projects-description py-4 text-sm will-change-transform lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book." Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has
          </p>
        </div>

        <div className="model3d relative h-[50vh] w-full overflow-visible lg:h-[55vh]">
          <div className="absolute z-10 h-[50vh] w-full overflow-visible lg:h-[80vh] 2xl:-bottom-72 2xl:h-[105vh] 2xl:w-[110%]">
            {isIntroComplete && (
              <Canvas>
                <ThreeModel
                  ref={monitorModelRef}
                  currentProject={currentProject}
                />
                <AdaptiveDpr pixelated />
                <AdaptiveEvents />
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
