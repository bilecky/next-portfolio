"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { gsap } from "gsap";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
};

const AnimatedLink = ({ href, children }: AnimatedLinkProps) => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isAnimating) {
      setIsAnimating(true);

      const tl = gsap.timeline();
      tl.to(
        ".overview",
        {
          duration: 1,
          x: "-100%",
          opacity: 0,
        },
        0, // start at the same time
      )
        .to(
          ".carousel",
          {
            duration: 1,
            x: "100%",
            ease: "power2.inOut",
            opacity: 0,
          },
          0, // start at the same time
        )
        .to({}, { onComplete: () => router.push(href) });
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};

export default AnimatedLink;
