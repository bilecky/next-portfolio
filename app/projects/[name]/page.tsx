"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PageTransition from "@/app/utils/PageTransition";

gsap.registerPlugin(useGSAP);

type ProjectPageProps = {
  params: {
    name: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pageRef.current) return;

      const projectTl = gsap.timeline();

      projectTl.set(pageRef.current, { opacity: 1 });

      projectTl.from(pageRef.current.children, {
        duration: 0.5,
        y: 250,
        opacity: 0,
        delay: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: pageRef },
  );

  console.log(params);

  return (
    <PageTransition>
      <div
        className="project_details container relative z-10 h-[200vh] overflow-hidden py-36 opacity-0"
        ref={pageRef}
      >
        <h1 className="font-[family-name:var(--font-geist-sans)] text-6xl font-extralight uppercase text-mainFontColor md:text-[6rem] lg:text-[8rem] 2xl:text-[10rem]">
          Project {params.name}
        </h1>
        {/* Reszta zawartości strony projektu */}
      </div>
    </PageTransition>
  );
}
