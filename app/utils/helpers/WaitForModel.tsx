"use client";

import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects/Projects";
import { useState } from "react";

type Props = {};

const WaitForModel = (props: Props) => {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  return (
    <>
      <Hero setIntroComplete={setIsIntroComplete} />
      <Projects isIntroComplete={isIntroComplete} />
    </>
  );
};

export default WaitForModel;
