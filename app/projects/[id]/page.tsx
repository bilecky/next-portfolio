"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PageTransition from "@/app/utils/PageTransition";
import { projects } from "@/app/data/data";
import { useParams } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

type ProjectPageProps = {
  params: {
    id: number;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setProjectRef = (ref: HTMLDivElement | null, index: number) => {
    if (imageRefs.current) {
      imageRefs.current[index] = ref;
    }
  };

  const paramsProject = params.id;
  const imageElements = imageRefs.current;

  useGSAP(() => {
    if (!containerRef.current || !imageElements) return;

    const projectTl = gsap.timeline();

    projectTl.set(".project_details", { opacity: 1 });

    projectTl
      .from(
        ".project_details_title",
        {
          duration: 0.5,
          y: 250,
          opacity: 0,
          delay: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "+=0.1",
      )

      .from(imageElements, {
        duration: 0.5,
        opacity: 0,
        yPercent: 100,
        stagger: 0.1,
        ease: "power2.out",
      });

    imageElements.forEach((image, index) => {
      gsap.set(imageElements[index], { flex: 1 });
      const handleEnter = () => {
        gsap.to(imageElements, {
          duration: 1,
          flexGrow: (i) => (i === index ? 10 : 1),
          ease: "power2.inOut",
        });
      };

      // Funkcja obsługująca animację po opuszczeniu
      const handleLeave = () => {
        gsap.to(imageElements, {
          duration: 1,
          flexGrow: 1,
          ease: "power2.inOut",
        });
      };

      // Nasłuchiwacze na zdarzenia myszy
      image?.addEventListener("mouseenter", handleEnter);
      image?.addEventListener("mouseleave", handleLeave);

      // Nasłuchiwacze na zdarzenia dotyku
      // image?.addEventListener("click", handleEnter); // Obsługa wejścia dotykiem
      // image?.addEventListener("touchend", handleLeave); // Obsługa opuszczenia dotykiem
    });
  });
  useGSAP(() => {
    // const imagesTl = gsap.timeline();
    // imagesTl.from(imageElements, {
    //   duration: 0.5,
    //   opacity: 0,
    //   y: 100,
    //   stagger: 0.1,
    //   ease: "power2.out",
    // });
  });

  return (
    <PageTransition>
      <section className="project_details relative z-10 h-[200vh] cursor-default py-36 opacity-0">
        <h1 className="project_details_title mb-20 text-center font-[family-name:var(--font-power-grotesk)] text-6xl font-extralight uppercase text-mainFontColor md:text-[6rem] lg:text-[8rem] 2xl:text-[8rem]">
          {projects[paramsProject - 1].title}
        </h1>
        <div
          ref={containerRef}
          className="projects-screens flex h-[67vh] w-full flex-col lg:flex-row"
        >
          {projects.map((item, index) => (
            <div
              key={index}
              ref={(ref) => setProjectRef(ref, index)}
              className="image-item relative cursor-zoom-in overflow-hidden border-[4px] border-background"
              // className="image-item relative h-full cursor-zoom-in overflow-hidden border-[1px] grayscale transition-all duration-500 ease-in-out hover:grayscale-0"
            >
              <div className="item-overlay absolute inset-0 z-10 bg-background bg-opacity-20 grayscale-[80%] backdrop-blur-[2px] transition-all duration-1000 ease-in-out hover:grayscale-0 hover:backdrop-blur-0"></div>
              <Image
                src={item.image}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
