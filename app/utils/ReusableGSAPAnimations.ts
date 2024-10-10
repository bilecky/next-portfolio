import gsap from "gsap";

type ReusableAnimationsProps = {
  timeline: gsap.core.Timeline;
  selector: string;
  options?: gsap.TweenVars;
};

export const reuseTexTsplitterFn = ({
  timeline,
  selector,
  options = {},
}: ReusableAnimationsProps) => {
  const defaultOptions = {
    x: -40,
    opacity: 0,
    delay: 0.2,
    duration: 2.5,
    ease: "expo.out",
  };
  timeline.from(selector, { ...defaultOptions, ...options });
};

export const reuseSectionDescriptionAnimation = ({
  timeline,
  selector,
  options = {},
}: ReusableAnimationsProps) => {
  const defaultOptions = { x: 100, duration: 5, opacity: 0, ease: "back.out" };

  timeline.from(selector, { ...defaultOptions, ...options });
};

export const reuseHeaderLineAnimation = () => {
  gsap.to(".pulse-line", {
    boxShadow: "0 0 13px 6px rgba(255, 255, 255, 0.6)",
    opacity: 0.8,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: "circ.out",
    repeatDelay: 0.4,
  });
};
