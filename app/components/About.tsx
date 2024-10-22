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

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const mm = gsap.matchMedia();

  useGSAP(() => {
    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".panel",
    //     start: "top top",
    //     pin: true,
    //     pinSpacing: false,
    //     scrub: 2.5,
    //   },
    // });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pinning-area",
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5,
      },
    });

    tl.to(".about", { yPercent: -100 });
    // ___________________________________________
    // ___________________________________________
    // ___________________________________________
  });

  useGSAP(() => {
    mm.add("(min-width: 768px)", () => {
      const mainAboutLn = gsap.timeline({
        scrollTrigger: {
          trigger: ".about", // Make sure this class exists on the element
          start: "top bottom", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi viewportu
          // inne opcje...
          scrub: 3, // Sync the animation with scrolling smoothly,
          end: "+=25%", // Animacja trwa przez 25% wysokości viewportu od momentu, gdy się rozpocznie
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
          "-=.5",
        )
        .from(
          ".image_wrapper",
          { rotateX: 90, duration: 5, ease: "ease-in", opacity: 0 },
          "-=1.5",
        );
    });

    mm.add("(max-width: 767px)", () => {
      const mainMobileAboutLn = gsap.timeline({
        scrollTrigger: {
          trigger: ".about", // Make sure this class exists on the element
          start: "top bottom", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi viewportu
          // inne opcje...
          scrub: 3, // Sync the animation with scrolling smoothly,
          end: "+=25%", // Animacja trwa przez 25% wysokości viewportu od momentu, gdy się rozpocznie
        },
      });
      mainMobileAboutLn
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
          "-=.5",
        )
        .from(
          ".image_wrapper",
          { rotateX: 90, duration: 5, ease: "ease-in", opacity: 0 },
          "-=1.5",
        );
    });
  });
  return (
    <section className="about panel absolute z-10 w-full overflow-hidden bg-background py-20 shadow-xl will-change-transform lg:py-36">
      <div className="about_wrapper text-blackSectionText container box-border grid max-h-full grid-cols-1 place-items-center gap-10 lg:grid-cols-2">
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
          <div className="image_wrapper relative">
            <Image
              src="/profile-picture.jpeg"
              alt="Description of image"
              width={400}
              height={800}
              className="block shadow-lg"
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
