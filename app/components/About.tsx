"use client";
import React, { Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitter from "../utils/Splitter";
import Image from "next/image";
import {
  reuseSectionDescriptionAnimation,
  reuseTexTsplitterFn,
} from "../utils/ReusableGSAPAnimations";
import useMediaQuery from "@/app/utils/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const mm = gsap.matchMedia();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useGSAP(() => {
    const techElement = document.querySelector(".tech") as HTMLElement;
    const techHeight = techElement.offsetHeight;
    console.log(techHeight);
    // Pierwszy timeline
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-wrapper",
        start: () => `top+=${techHeight} bottom`,
        end: "+=250%",
        scrub: 2,
        pin: true,
        markers: true,
        invalidateOnRefresh: true, // ensures recalculation on resize
      },
    });

    master
      .to(".wrapper", {
        yPercent: -100,
        ease: "none",
      })
      .to(".about", {
        yPercent: -100,
        ease: "none",
      });

    const mainAboutLn = gsap.timeline({
      scrollTrigger: {
        trigger: ".overview_section",
        start: "top 75%",
        scrub: 2,
        end: "+=80%",
        // refreshPriority: 2, // Ensures this is refreshed after the parent trigger
      },
    });

    mainAboutLn
      .from(
        ".about_header .split-char",
        {
          x: -40,
          opacity: 0,
          duration: 2.5,
          ease: "expo.out",
          stagger: 1,
          rotateY: 180,
        },
        0,
      )
      .from(
        ".about_description",
        {
          stagger: 1,
          x: 100,
          duration: 4,
          opacity: 0,
          ease: "back.out",
        },
        "-=.3",
      );

    // New timeline for the image_wrapper inside image_section
    const imageWrapperTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".image_section", // Trigger when .image_section is in view
        start: "top 55%", // Adjust the start value as needed
        end: "center top", // End when the section leaves the viewport
        scrub: 2,
        // refreshPriority: 1, // Ensures this is refreshed after the parent trigger
      },
    });

    imageWrapperTimeline.from(".image_wrapper", {
      rotateX: 90,
      duration: 3,
      ease: "ease-in",
      opacity: 0,
    });
  });
  return (
    <section className="about panel absolute left-0 top-0 z-10 col-start-1 col-end-2 row-start-1 row-end-2 h-full w-full overflow-hidden bg-background py-20 shadow-xl will-change-transform lg:py-36">
      <div className="about_wrapper container box-border grid max-h-full grid-cols-1 place-items-center gap-10 text-blackSectionText xl:grid-cols-2">
        <div className="overview_section relative text-mobile">
          <h2 className="about_header font-mainHeaderFont uppercase leading-none tracking-wide text-mainFontColor lg:text-section-header">
            <Splitter text="About" />
          </h2>

          <p className="about_description pt-4 text-sm lg:text-xl">
            I am a frontend developer with over 3 years of commercial
            experience, specializing in building dynamic and responsive web
            applications. With a strong focus on Next.js and React, I create
            high-performance, user-friendly interfaces that are optimized for
            speed and scalability. My proficiency in TypeScript allows me to
            write clean, maintainable code, ensuring projects are efficient and
            free from runtime errors.
          </p>

          <p className="about_description py-4 text-sm lg:text-xl">
            In addition to my work with modern JavaScript frameworks, I have
            extensive experience with WordPress, enabling me to develop custom
            websites/themes and plugins tailored to client needs. I am
            passionate about creating intuitive and visually appealing digital
            experiences, always keeping the end user in mind. Throughout my
            career, I’ve worked on a range of projects, from small business
            websites to complex web applications, constantly refining my skills
            and staying up-to-date with the latest industry trends.
          </p>
          <p className="about_description text-sm lg:text-xl">
            As a developer, I thrive in collaborative environments where I can
            contribute to solving challenges and improving workflows. I enjoy
            learning new technologies and finding innovative ways to enhance web
            development processes, always aiming for the best results for both
            clients and users.
          </p>
        </div>
        <div className="image_section">
          <div className="image_wrapper relative will-change-transform">
            <Image
              src="/profile-picture.jpeg"
              alt="Description of image"
              width={400}
              height={800}
              className="block shadow-lg"
              quality={50}
            />
            <div className="pointer-events-none absolute inset-0 border-b-4 border-l-4 border-r-4 border-t-4 border-transparent">
              <div className="corner-el absolute -left-2 -top-2 -z-10 h-10 w-10 bg-white"></div>
              <div className="corner-el absolute -right-2 -top-2 -z-10 h-10 w-10 bg-white"></div>
              <div className="corner-el absolute -bottom-2 -left-2 -z-10 h-10 w-10 bg-white"></div>
              <div className="corner-el absolute -bottom-2 -right-2 -z-10 h-10 w-10 bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
