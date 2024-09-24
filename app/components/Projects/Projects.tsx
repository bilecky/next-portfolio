"use client";

import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import Splitter from "../../utils/Splitter";
import gsap from "gsap";
import { projects } from "../../data/data";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import SvgDot from "../../utils/SVGDots";
import ProjectCarousel from "./ProjectCarousel";
import {
  reuseSectionDescriptionAnimation,
  reuseTexTsplitterFn,
} from "../../utils/ReusableGSAPAnimations";
gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

const Projects = (props: Props) => {
  const [currentProject, setCurrentProject] = useState(0);
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
      { backgroundColor: "#171717" }, // Start color
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
        scrub: 2, // Sync the animation with scrolling smoothly
      },
    });

    reuseTexTsplitterFn({ timeline: textArea, selector: ".header-text" });

    reuseSectionDescriptionAnimation({
      timeline: textArea,
      selector: ".projects-description",
    });

    textArea.from(".project_details", {
      opacity: 0,
      ease: "back.out",
      duration: 10,
    });

    const herodissapear = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects", // Make sure this class exists on the element
        start: "top center", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
        end: "bottom bottom",
        scrub: 2, // Sync the animation with scrolling smoothly
      },
    });

    herodissapear.to(".section-left", {
      opacity: 0,
      ease: "expo.out",
      duration: 1,
    });
    herodissapear.to(
      ".section-right",
      {
        opacity: 0,
        ease: "expo.out",
        duration: 1,
      },
      0,
    );

    // const dotsAppears = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".projects", // Make sure this class exists on the element
    //     start: "top 80%", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi widoku
    //     end: "bottom bottom",
    //     scrub: 2, // Sync the animation with scrolling smoothly
    //   },
    // });

    // dotsAppears.from(".svg-dots", {
    //   opacity: 0,
    //   x: 200,
    //   duration: 3,
    // });
  });

  return (
    <section className="projects overflow-hidden py-28 text-background lg:flex">
      <div className="overview lg:w-3/5">
        <h2 className="projects-header lg:text-section-header uppercase">
          <Splitter className="header-text" text="Projects" />
        </h2>

        <p className="projects-description text-sm lg:text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book." Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book."
        </p>
        {/* <SvgDot className="svg-dots opacity-1 absolute right-0 top-0 hidden h-[200%] lg:block" /> */}

        <div className="project_details mt-auto max-w-full overflow-hidden rounded-lg bg-white shadow-lg">
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
      </div>

      <ProjectCarousel selectedProject={setCurrentProject} />
    </section>
  );
};

export default Projects;
