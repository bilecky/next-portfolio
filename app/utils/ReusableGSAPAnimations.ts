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
