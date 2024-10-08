"use client";

import React, { Suspense, useState } from "react";
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
import { Loader, OrbitControls } from "@react-three/drei";
gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const Projects = (props: Props) => {
  const [currentProject, setCurrentProject] = useState<number>(0);

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

    const textArea = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects", // Make sure this class exists on the element
        start: "top center", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
        end: "bottom bottom",
        scrub: 3, // Sync the animation with scrolling smoothly
      },
    });
    textArea.set(".projects", { opacity: 1 });

    reuseTexTsplitterFn({
      timeline: textArea,
      selector: ".header-text",
      options: { stagger: 1 },
    });

    reuseSectionDescriptionAnimation({
      timeline: textArea,
      selector: ".projects-description",
      options: {
        stagger: 1,
      },
    });

    textArea.from(".project_details", {
      opacity: 0,
      ease: "back.out",
      duration: 10,
    });

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
    <section className="projects container h-full text-background opacity-0 md:py-28 xl:flex xl:flex-row">
      <div className="overview xl:w-3/5">
        <h2 className="projects-header font-[family-name:var(--font-power-grotesk)] text-mobile uppercase leading-none lg:text-section-header">
          <Splitter className="header-text" text="Projects" />
        </h2>

        <p className="projects-description text-sm lg:text-xl">
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
        <div className="model3d h-[60vh] w-full">
          <Canvas className="h-2xl w-2xl">
            <Suspense fallback={null}>
              <ThreeModel />
            </Suspense>
            {/* <OrbitControls /> */}
          </Canvas>
          <Loader />
        </div>

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
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />
    </section>
  );
};

export default Projects;
