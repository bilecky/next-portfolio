"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/data";
import gsap from "gsap";
import clsx from "clsx";
import useMediaQuery from "@/app/utils/hooks/useMediaQuery";
import AnimatedLink from "@/app/utils/AnimatedLink";
import { Group } from "three";
import { useEffect } from "react";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

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
      gsap.delayedCall(0, () => {
        console.log("mobil");
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
    });

    mm.add("(min-width: 768px)", () => {
      console.log("desktop");
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
        "-=2", // Rozpocznij tę animację nieco wcześniej
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
    const singleProjectTl = gsap.timeline();
    // console.log("klik");

    if (!monitorModelRef.current) return;
    singleProjectTl.set(monitorModelRef.current?.rotation, {
      x: 0,
      y: 5,
      z: 0,
    });

    singleProjectTl
      .to(monitorModelRef.current.rotation, {
        y:
          index > currentProject
            ? `-=${Math.PI * 2 * 2}`
            : `+=${Math.PI * 2 * 2}`,
        duration: 1,
        ease: "power2.inOut",
      })
      .to({}, { onStart: () => setCurrentProject(index) }, "-=.7");
  };

  return (
    <div className="carousel xl:w-2/5">
      {!isMobile ? (
        <div className="relative flex h-full flex-col items-end justify-evenly font-extralight uppercase">
          <div className="main-line opacity-1 absolute h-full w-1.5 bg-gray-300">
            <div
              ref={lineRef}
              className="item-line absolute left-0 top-0 w-1.5 bg-background"
            ></div>
          </div>
          {projects.map((project, index) => (
            <div
              key={index}
              id={`project-${index}`}
              className={clsx(
                "cursor-pointer px-8 py-4 transition-colors hover:text-gray-500",
                index === currentProject && "text-gray-600",
              )}
              ref={(el) => setProjectRef(el, index)}
              onClick={() => handleProjectClick(index)}
            >
              <h3 className="text-right text-4xl"> {project.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="container-wrapper relative">
          <div
            style={{
              background:
                "linear-gradient(90deg, rgba(251,252,248,1) 0%, rgba(251,252,248,0.25) 3%, rgba(251,252,248,0) 50%, rgba(251,252,248,0.25) 97%, rgba(251,252,248,1) 100%)",
            }}
            className="overlay pointer-events-none absolute left-0 top-0 z-20 h-full w-full"
          ></div>
          <div
            ref={mobileCarouselRef}
            className="no-scrollbar relative -mt-14 flex h-full w-full items-center overflow-hidden overflow-x-auto bg-gradient-to-r from-white via-transparent to-white uppercase"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                id={`project-${index}`}
                className={clsx(
                  "mobile-item-stagger relative z-10 mx-2 h-full cursor-pointer whitespace-nowrap rounded-full border-[1px] border-background bg-secondBackground px-6 py-3 text-background transition-colors",
                  index === currentProject &&
                    "bg-gray-950 text-secondBackground",
                )}
                ref={(el) => setProjectRef(el, index)}
                onClick={() => handleProjectClick(index)}
              >
                <h3 className=""> {project.title}</h3>
              </div>
            ))}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
