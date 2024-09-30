"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import gsap from "gsap";
import clsx from "clsx";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
import useMediaQuery from "@/app/utils/hooks/useMediaQuery";

const AnimatedLink = ({ href, children, className }: AnimatedLinkProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClick = () => {
    const runAnimation = () => {
      const tl = gsap.timeline();
      tl.to(
        ".overview",
        {
          duration: 0.5,
          x: "-100%",
          opacity: 0,
        },
        0, // start at the same time
      )
        .to(
          ".carousel",
          {
            duration: 0.5,
            x: "100%",
            ease: "power2.inOut",
            opacity: 0,
          },
          0, // start at the same time
        )
        .to({}, { onStart: () => router.push(href) });
    };

    if (isMobile) {
      setTimeout(() => {
        runAnimation();
      }, 650);
    } else {
      runAnimation();
    }
  };

  return (
    <div className={clsx("cursor-pointer", className)} onClick={handleClick}>
      {children}
    </div>
  );
};

export default AnimatedLink;
