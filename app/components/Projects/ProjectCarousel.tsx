"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/data";
import gsap from "gsap";
import clsx from "clsx";
import useMediaQuery from "@/app/utils/hooks/useMediaQuery";
import AnimatedLink from "@/app/utils/AnimatedLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type projectCarouselProps = {
  selectedProject: (index: number) => void;
};

const ProjectCarousel = (props: projectCarouselProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
    if (!lineRef.current) return;

    const currentProjectHeight =
      projectRefs.current[currentProject]?.clientHeight;

    const mainComponentAnimationsLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects", // Zainicjujemy animację, gdy element `.projects` wejdzie w viewport
        start: "top center", // Animacja rozpocznie się, gdy górna część `.projects` blabla
        end: "bottom bottom",
        scrub: 3, // Synchronizacja animacji z przewijaniem
      },
    });

    mainComponentAnimationsLine.set(lineRef.current, { height: 0, opacity: 0 });

    // 1. Animacja pojawienia się main-line
    mainComponentAnimationsLine
      .fromTo(
        ".main-line",
        { height: 0, transformOrigin: "top", opacity: 0 }, // Startowe ustawienie main-line
        { height: "100%", duration: 1.5, ease: "power3.out", opacity: 1 }, // Animacja do pełnej wysokości
      )
      .to(
        lineRef.current,
        {
          height: currentProjectHeight || 0,
          duration: 1.5,
          ease: "power3.out",
          opacity: 1,
        },
        "-=0.5",
        // Animacja do pełnej wysokości item-line
        // Animacja item-line rozpoczyna się pół sekundy przed zakończeniem animacji main-line
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
      overwrite: "auto",
      y: projectRefs.current[currentProject]?.offsetTop || 0,
      ease: "power3.out",
    });

    selectedProject(currentProject);
  }, [currentProject]);

  const handleProjectClick = (index: number) => {
    const singleProjectTl = gsap.timeline();
    console.log("klik");
    singleProjectTl
      .to(".project_details", {
        duration: 0.4,
        opacity: 0,
        x: -150,
        ease: "back.out",
      })
      .set({}, { onComplete: () => setCurrentProject(index) })
      .to(".project_details", {
        duration: 0.4,
        opacity: 1,
        x: 0,
        ease: "back.out",
      });
  };

  return (
    <div className="carousel xl:w-2/5">
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
            {isMobile ? (
              <AnimatedLink
                key={`project-${index}`}
                href={`projects/${project.title}`}
              >
                <h3 className="text-right text-4xl"> {project.title}</h3>
              </AnimatedLink>
            ) : (
              <h3 className="text-right text-4xl"> {project.title}</h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
