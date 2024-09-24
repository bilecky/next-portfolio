"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/data";
import gsap from "gsap";
import clsx from "clsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type projectCarouselProps = {
  selectedProject: (index: number) => void;
};

const ProjectCarousel = (props: projectCarouselProps) => {
  const { selectedProject } = props;
  const [currentProject, setCurrentProject] = useState<number>(0);
  const lineRef = React.useRef<HTMLDivElement>(null);
  const projectRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const setProjectRef = (ref: HTMLDivElement | null, index: number) => {
    if (projectRefs.current) {
      projectRefs.current[index] = ref;
    }
  };

  useGSAP(() => {
    const mainComponentAnimationsLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects", // Zainicjujemy animację, gdy element `.projects` wejdzie w viewport
        start: "top center", // Animacja rozpocznie się, gdy górna część `.projects` blabla
        end: "bottom bottom",
        scrub: 2, // Synchronizacja animacji z przewijaniem
      },
    });

    // 1. Animacja pojawienia się main-line
    mainComponentAnimationsLine.fromTo(
      ".main-line",
      { height: 0, transformOrigin: "top", opacity: 0 }, // Startowe ustawienie main-line
      { height: "100%", duration: 1.5, ease: "power3.out", opacity: 1 }, // Animacja do pełnej wysokości
    );

    // 2. Animacja item-line po main-line
    mainComponentAnimationsLine.fromTo(
      lineRef.current,
      { height: 0 }, // Startowe ustawienie item-line
      { height: projectRefs.current[currentProject]?.offsetTop || 0 }, // Animacja do pełnej wysokości item-line
      "-=0.5", // Animacja item-line rozpoczyna się pół sekundy przed zakończeniem animacji main-line
    );

    // 3. Animacja pojawiania się projektów jeden po drugim (stagger)
    mainComponentAnimationsLine.fromTo(
      projectRefs.current,
      { opacity: 0, y: 50 }, // Początkowe wartości projektów
      {
        opacity: 1,
        y: 0, // Każdy projekt wraca na swoją pozycję
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.2, // Projekty będą się pojawiać jeden po drugim z odstępem 0.2s
      },
      "-=0.3", // Rozpocznij tę animację nieco wcześniej
    );
  }, []);

  // CURRENT PROJECT HANDLER
  useGSAP(() => {
    if (!lineRef.current || !projectRefs.current[currentProject]) return;

    const currentProjectHeight =
      projectRefs.current[currentProject].clientHeight;

    lineRef.current.style.height = `${currentProjectHeight}px`;

    const lineTl = gsap.timeline();

    lineTl.to(lineRef.current, {
      duration: 0.5,
      y: projectRefs.current[currentProject]?.offsetTop || 0,
      ease: "power3.out",
    });

    selectedProject(currentProject);
  }, [currentProject]);

  const handleProjectClick = (index: number) => {
    const singleProjectTl = gsap.timeline();

    singleProjectTl
      .to(".project_details", {
        duration: 0.3,
        opacity: 0,
        x: 10,
        ease: "power2.out",
      })
      .set({}, { onComplete: () => setCurrentProject(index) })
      .to(".project_details", {
        duration: 0.3,
        opacity: 1,
        x: 0,
        ease: "power2.out",
      });
  };

  return (
    <div className="carousel w-2/5">
      <div className="relative flex h-full flex-col items-end justify-evenly font-extralight uppercase">
        <div className="main-line opacity-1 absolute h-full w-1.5 bg-mainFontColor">
          <div
            ref={lineRef}
            className="item-line absolute left-0 top-0 w-2 bg-[#444444]"
          ></div>
        </div>
        {projects.map((project, index) => (
          <div
            key={index}
            id={`project-${index}`}
            className={clsx(
              "cursor-pointer px-8 py-4 transition-colors hover:text-gray-300",
              index === currentProject && "text-gray-300",
            )}
            ref={(el) => setProjectRef(el, index)}
            onClick={() => handleProjectClick(index)}
          >
            <h3 className="text-4xl"> {project.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
