import gsap from "gsap";

type ReusableAnimationsProps = {
  timeline: gsap.core.Timeline;
  selector: string;
  options?: gsap.TweenVars;
  timing?: string;
};

export const reuseTexTsplitterFn = ({
  timeline,
  selector,
  options = {},
}: ReusableAnimationsProps) => {
  const defaultOptions = {
    x: -40,
    opacity: 0,
    duration: 2.5,
    ease: "expo.out",
  };
  timeline.from(selector, { ...defaultOptions, ...options });
};

export const reuseSectionDescriptionAnimation = ({
  timeline,
  selector,
  options = {},
  timing = "",
}: ReusableAnimationsProps) => {
  const defaultOptions = { x: 100, duration: 4, opacity: 0, ease: "back.out" };

  timeline.from(selector, { ...defaultOptions, ...options }, timing);
};

export const reuseHeaderLineAnimation = () => {
  gsap.to(".pulse-line", {
    filter: "drop-shadow(0px 0px 12px rgba(255, 255, 255, 1))",
    opacity: 1,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    repeatDelay: 0.1,
  });
};
