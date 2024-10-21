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
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech",
        start: "top top", // Animacja zacznie się, kiedy górna krawędź elementu (top) dotknie dolnej krawędzi widoku (bottom)
        pin: true,
        scrub: 2.5,
        anticipatePin: 1,
        pinSpacing: false,
      },
    });
    aboutTl.to(".about", { yPercent: -100 });
    // // ___________________________________________

    mm.add("(min-width: 768px)", () => {
      const mainAboutLn = gsap.timeline({
        scrollTrigger: {
          trigger: ".about_wrapper", // Make sure this class exists on the element
          start: "top bottom", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi viewportu
          // inne opcje...
          end: "70% center", // Koniec zakończyłoby trigger, gdy 70% sekcji byłoby widoczne.
          scrub: 3, // Sync the animation with scrolling smoothly,
          markers: true,
        },
      });
      mainAboutLn.set(".about", { opacity: 1 });

      reuseTexTsplitterFn({
        timeline: mainAboutLn,
        selector: ".about_header .split-char",
        options: { stagger: 1, rotateY: 180 },
      });

      reuseSectionDescriptionAnimation({
        timeline: mainAboutLn,
        selector: ".about_description",
        options: {
          stagger: 1,
        },
      });
      mainAboutLn
        .from(
          ".image_wrapper",
          {
            opacity: 0,
            ease: "power3.out",
            duration: 10,
            rotateX: -90,
          },
          0,
        )
        .from(
          ".corner-el",
          {
            scale: 0.8,
            ease: "ease",
            duration: 10,
            opacity: 0,
            stagger: 3,
          },
          0,
        );
    });

    mm.add("(max-width: 767px)", () => {
      const mainAboutLn = gsap.timeline({
        scrollTrigger: {
          trigger: ".about_wrapper", // Make sure this class exists on the element
          start: "top bottom", // Rozpocznij, gdy górna krawędź sekcji dotknie dolnej krawędzi viewportu
          // inne opcje...
          scrub: 3, // Sync the animation with scrolling smoothly,
          markers: true,
        },
      });
      mainAboutLn.set(".about", { opacity: 1 });

      reuseTexTsplitterFn({
        timeline: mainAboutLn,
        selector: ".about_header .split-char",
        options: { stagger: 1, rotateY: 180 },
      });

      reuseSectionDescriptionAnimation({
        timeline: mainAboutLn,
        selector: ".about_description",
        options: {
          stagger: 1,
        },
      });
      mainAboutLn
        .from(
          ".image_wrapper",
          {
            opacity: 0,
            ease: "power3.out",
            duration: 10,
            rotateX: -90,
          },
          0,
        )
        .from(
          ".corner-el",
          {
            scale: 0.8,
            ease: "ease",
            duration: 10,
            opacity: 0,
            stagger: 3,
          },
          0,
        );
    });
  });
  return (
    <section className="about absolute z-10 w-full bg-background py-20 shadow-xl will-change-transform lg:py-36">
      <div className="about_wrapper text-blackSectionText container grid grid-cols-1 place-items-center gap-10 lg:grid-cols-2">
        <div className="overview_section relative text-mobile">
          <h2 className="about_header font-mainHeaderFont uppercase leading-none tracking-wide text-mainFontColor lg:text-section-header">
            <Splitter text="About" />
          </h2>

          <p className="about_description pt-8 text-sm lg:text-xl">
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
