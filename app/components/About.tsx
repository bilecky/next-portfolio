"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitter from "../utils/Splitter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const pinnedArea = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech",
        start: "top top",
        pinSpacing: false,
        pin: true,
        scrub: 3,
      },
    });
    pinnedArea.from(".about", {
      yPercent: 50,
      duration: 1,
      ease: "power3.out",
    });

    const pinnedBottomContact = gsap.timeline({
      scrollTrigger: {
        trigger: ".pinning-area",
        end: "bottom bottom",
        scrub: true,
      },
    });

    pinnedBottomContact.from(".contact", {
      yPercent: -100,
      ease: "none",
    });
  });
  return (
    <section className="about relative z-[999] min-h-screen bg-gray-100 p-8 shadow-xl">
      <div className="about-wrapper container pb-16">
        <div className="overview relative text-mobile lg:w-3/6">
          <h2 className="about-header uppercase lg:text-section-header">
            ABOUT{" "}
          </h2>

          <p className="about-description text-sm lg:text-xl">
            <Splitter
              text="Lorem Ipsum is simply dummy text of the printing andtypesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book."
            />
          </p>

          <p className="about-description pt-4 text-sm lg:text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book."
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
