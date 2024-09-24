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
    x: -20,
    stagger: 1,
    opacity: 0,
    delay: 0.3,
    duration: 2,
    ease: "expo.out",
  };
  timeline.from(selector, { ...defaultOptions, ...options });
};

export const reuseSectionDescriptionAnimation = ({
  timeline,
  selector,
  options = {},
}: ReusableAnimationsProps) => {
  const defaultOptions = { y: -50, duration: 5, opacity: 0, ease: "back.out" };

  timeline.from(selector, { ...defaultOptions, ...options });
};
