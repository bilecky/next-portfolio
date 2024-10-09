"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PageTransition from "@/app/utils/PageTransition";

gsap.registerPlugin(useGSAP);

type ProjectPageProps = {
  params: {
    id: number;
    name: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  console.log(params);
  useGSAP(
    () => {
      if (!pageRef.current) return;

      const projectTl = gsap.timeline();

      projectTl.set(pageRef.current, { opacity: 1 });

      projectTl.from(
        pageRef.current.children,
        {
          duration: 0.5,
          y: 250,
          opacity: 0,
          delay: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "+=0.1",
      );
    },
    { scope: pageRef },
  );

  return (
    <PageTransition>
      <div
        className="project_details container relative z-10 h-[200vh] overflow-hidden py-36 opacity-0"
        ref={pageRef}
      >
        <h1 className="font-[family-name:var(--font-geist-sans)] text-6xl font-extralight uppercase text-mainFontColor md:text-[6rem] lg:text-[8rem] 2xl:text-[10rem]">
          Project {}
        </h1>
        {/* Reszta zawartości strony projektu */}
      </div>
    </PageTransition>
  );
}
