"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/data";
import gsap from "gsap";
import clsx from "clsx";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Group } from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type projectCarouselProps = {
  setCurrentProject: (index: number) => void;
  currentProject: number;
  monitorModelRef: React.MutableRefObject<Group | null>;
};

const ProjectCarousel = (props: projectCarouselProps) => {
  const { setCurrentProject, currentProject, monitorModelRef } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const lineRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const setProjectRef = (ref: HTMLDivElement | null, index: number) => {
    if (projectRefs.current) {
      projectRefs.current[index] = ref;
    }
  };

  useGSAP(() => {
    if (!lineRef.current || !projectRefs.current) return;

    const currentProjectHeight =
      projectRefs.current[currentProject]?.clientHeight;

    const mainComponentAnimationsLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects",
        start: "top 60%",
        end: "bottom bottom",
        scrub: 3,
      },
    });

    mainComponentAnimationsLine.set(lineRef.current, { height: 0, opacity: 0 });

    // 1. Animacja pojawienia się main-line
    mainComponentAnimationsLine
      .fromTo(
        ".main-line",
        { height: 0, transformOrigin: "top", opacity: 0 },
        { height: "100%", duration: 1.5, ease: "power3.out", opacity: 1 },
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
      );
    // 3. Animacja pojawiania się projektów jeden po drugim (stagger)

    const mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
      const mobilEProjectsstagger = gsap.timeline({
        scrollTrigger: {
          trigger: ".carousel",
          start: "top bottom",
          // "top" triggera dotknie "bottom" przeglądarki
          end: "+=25%",
          scrub: 3,
        },
      });
      mobilEProjectsstagger.fromTo(
        projectRefs.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scale: 1,
        },
      );
    });

    mm.add("(min-width: 768px)", () => {
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
        "-=1.65", // Rozpocznij tę animację nieco wcześniej
      );
    });
  }, []);

  // CURRENT PROJECT HANDLER
  useGSAP(() => {
    // handle center of current project on mobile
    if (projectRefs.current[currentProject] && mobileCarouselRef.current) {
      const projectCenterX =
        projectRefs.current[currentProject].offsetLeft +
        projectRefs.current[currentProject].clientWidth / 2;
      const carouselCenterX = mobileCarouselRef.current!.clientWidth / 2;
      mobileCarouselRef.current?.scrollTo({
        left: projectCenterX - carouselCenterX,
        behavior: "smooth",
      });
    }

    //  handle center of current project on desktop
    if (!lineRef.current || !projectRefs.current[currentProject]) return;

    // const currentProjectHeight =
    //   projectRefs.current[currentProject].clientHeight;

    // lineRef.current.style.height = `${currentProjectHeight}px`;

    const lineTl = gsap.timeline();

    lineTl.to(lineRef.current, {
      duration: 0.5,
      overwrite: "auto",
      y: projectRefs.current[currentProject]?.offsetTop || 0,
      ease: "power3.out",
    });
  }, [currentProject, isMobile]);

  const handleProjectClick = (index: number) => {
    const singleProjectTl = gsap.timeline({ overwrite: "auto" });

    if (!monitorModelRef.current) return;
    singleProjectTl.set(monitorModelRef.current?.rotation, {
      x: 0,
      y: 5.05,
      z: 0,
    });
    singleProjectTl
      .to(monitorModelRef.current.rotation, {
        y:
          index > currentProject
            ? `-=${Math.PI * 2 * 2}`
            : `+=${Math.PI * 2 * 2}`,
        x: 0,
        z: 0,
        duration: 1,
        ease: "power2.inOut",
      })
      .call(setCurrentProject, [index], "-=.7");
  };

  return (
    <div className="carousel md:pt-20 xl:w-2/5 xl:py-8">
      <div className="relative flex h-full w-full lg:flex-row-reverse">
        <div className="main-line absolute hidden h-full w-1.5 bg-gray-300 xl:block">
          <div
            ref={lineRef}
            className="item-line absolute left-0 top-0 w-1.5 bg-background"
          ></div>
        </div>
        <div
          ref={mobileCarouselRef}
          className="projects_container no-scrollbar relative flex h-full w-full items-center overflow-hidden overflow-x-auto lowercase xl:flex-col xl:items-end xl:justify-evenly xl:overflow-visible xl:font-extralight xl:uppercase"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              id={`project-${index}`}
              className={clsx(
                index !== currentProject && "bg-secondBackground",
                // Style mobilne
                "relative z-10 mx-2 flex cursor-pointer items-center whitespace-nowrap rounded-full border-[1px] border-transparent px-6 py-3 will-change-transform dark:border-background",
                index === currentProject && "bg-background text-mainFontColor",
                // Style desktopowe
                "xl:border-none xl:bg-transparent xl:px-8 xl:py-4 xl:hover:text-gray-500",
                index === currentProject && "xl:text-gray-600",
              )}
              ref={(el) => setProjectRef(el, index)}
              onClick={() => handleProjectClick(index)}
            >
              <h3 className="lg:text-2xl xl:text-right xl:text-4xl">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
