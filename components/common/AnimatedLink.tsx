"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import gsap from "gsap";
import clsx from "clsx";
import { useLenis } from "lenis/react";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};
import useMediaQuery from "../../hooks/useMediaQuery";

const AnimatedLink = ({
  href,
  children,
  className,
  as: Component = "div",
}: AnimatedLinkProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const lenis = useLenis();

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
        .to(
          {},
          {
            onStart: () => {
              router.push(href);
              lenis?.stop();
              lenis?.start();
            },
          },
        );
    };

    if (isMobile) {
      setTimeout(() => {
        runAnimation();
      }, 350);
    } else {
      runAnimation();
    }
  };

  return (
    <Component
      className={clsx("cursor-pointer", className)}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
};

export default AnimatedLink;
