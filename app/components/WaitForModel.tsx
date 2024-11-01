"use client";

import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects/Projects";
import { useState } from "react";

const WaitForModel = () => {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);

  return (
    <div className="scroll-area relative">
      <Hero setIntroComplete={setIsIntroComplete} />
      <Projects isIntroComplete={isIntroComplete} />
    </div>
  );
};

export default WaitForModel;
