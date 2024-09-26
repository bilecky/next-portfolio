"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PageTransition from "@/app/utils/PageTransition";

type ProjectPageProps = {
  params: {
    title: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pageRef.current) return;
      gsap.from(pageRef.current.children, {
        duration: 0.5,
        x: 250,
        opacity: 0,
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
        className="project_details bg-secondBackground h-screen w-full"
        ref={pageRef}
      >
        <h1 className="text-8xl">Project {params.name}</h1>
        {/* Reszta zawartości strony projektu */}
      </div>
    </PageTransition>
  );
}
