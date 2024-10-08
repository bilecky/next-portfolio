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
import { Loader } from "@react-three/drei";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import useMediaQuery from "@/app/utils/hooks/useMediaQuery";
import AnimatedLink from "@/app/utils/AnimatedLink";
import { projects } from "@/app/data/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const Projects = (props: Props) => {
  const [currentProject, setCurrentProject] = useState<number>(0);
  const monitorModelRef = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useGSAP(() => {
    const bgArea = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-area", // Make sure this class exists on the element
        start: "top top", // Start when the section is fully visible at the top
        end: "bottom bottom", // End when the section is out of view
        scrub: 2, // Sync the animation with scrolling smoothly
      },
    });

    // Smooth background color change

    bgArea.fromTo(
      ["body", ".black-overlay"],
      { backgroundColor: "#222222" }, // Start color
      {
        backgroundColor: "#B1B1B1", // End color
        overwrite: "auto",

        ease: "power3.inOut", // Smooth transition for background color
      },
    );

    const leftSectionArea = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects", // Make sure this class exists on the element
        start: "top center", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
        end: "bottom bottom",
        scrub: 3, // Sync the animation with scrolling smoothly
      },
    });
    leftSectionArea.set(".projects", { opacity: 1 });

    reuseTexTsplitterFn({
      timeline: leftSectionArea,
      selector: ".header-text",
      options: { stagger: 1 },
    });

    reuseSectionDescriptionAnimation({
      timeline: leftSectionArea,
      selector: ".projects-description",
      options: {
        stagger: 1,
      },
    });
    leftSectionArea.from(".model3d", {
      opacity: 0,
      ease: "back.out",
      duration: 10,
    });

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
  });

  return (
    <section className="projects container relative h-full text-background opacity-0 md:py-28 xl:flex xl:flex-row">
      <div className="overview xl:w-3/5">
        <h2 className="projects-header font-[family-name:var(--font-power-grotesk)] text-mobile uppercase leading-none lg:text-section-header">
          <Splitter className="header-text" text="Projects" />
        </h2>

        <p className="projects-description py-4 text-sm lg:text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book." Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. Lorem Ipsum has
        </p>
        {/* <p className="projects-description py-4 text-sm lg:text-xl">
          been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book."
        </p> */}
        {!isMobile && (
          <div ref={ref} className="model3d relative h-[55vh] w-full">
            {inView && (
              <div className="absolute -bottom-24 h-[75vh] w-full overflow-hidden">
                <Suspense fallback={null}>
                  <Canvas>
                    <ThreeModel
                      ref={monitorModelRef}
                      currentProject={currentProject}
                    />
                  </Canvas>
                </Suspense>
                <Loader />
              </div>
            )}
          </div>
        )}

        {/* <AnimatedLink href={`/projects/${projects[currentProject].title}`}>
          <div className="project_details mt-auto hidden max-w-full overflow-hidden rounded-lg bg-white shadow-lg xl:block">
            <img
              className="h-48 w-full object-cover"
              src={projects[currentProject].image}
              alt="Project image"
            />
            <div className="p-6">
              <p className="text-base text-gray-700">
                {projects[currentProject].description}
              </p>
            </div>
          </div>
        </AnimatedLink> */}
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
