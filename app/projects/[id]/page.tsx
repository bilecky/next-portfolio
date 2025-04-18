"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PageTransition from "@/app/components/common/PageTransition";
import { projects } from "@/app/data/data";
import Image from "next/image";
import { RiGithubFill } from "react-icons/ri";
import Splitter from "@/app/utils/Splitter";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/app/context/ThemeProvider";
import { useTranslations } from "next-intl";
import { TbWorldWww } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { RiArrowLeftWideLine, RiArrowRightWideLine } from "react-icons/ri";
import { notFound } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProjectPageProps = {
  params: {
    id: number;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const tProjectPage = useTranslations("SingleProjectPage");
  const lenis = useLenis(); // Uzyskaj instancję Lenis

  const router = useRouter();
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionTextRef = useRef<HTMLDivElement>(null);

  const setProjectRef = (ref: HTMLDivElement | null, index: number) => {
    if (imageRefs.current) {
      imageRefs.current[index] = ref;
    }
  };

  const paramsProjectId = params.id;
  const imageElements = imageRefs.current;
  const chooseThemeAndPickDescriptionColor =
    theme === "dark" ? "#FBFCF8" : "#222222";

  if (!projects[paramsProjectId - 1] || isNaN(paramsProjectId)) {
    notFound();
  }

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [paramsProjectId, lenis]);

  useGSAP((context, contextSafe) => {
    if (!containerRef.current || !imageElements || !contextSafe) return;

    // document.body.classList.add("pointer-events-none");

    const projectTl = gsap.timeline();

    projectTl.set(".project_details", { opacity: 1 });

    projectTl
      .from(".project_details_title", {
        duration: 0.5,
        y: 250,
        opacity: 0,
        delay: 1.1,
        stagger: 0.1,
        ease: "power2.out",
      })

      .from(imageElements, {
        duration: 0.5,
        opacity: 0,
        yPercent: 100,
        stagger: 0.1,
        ease: "power2.out",
      });

    const eventHandlers: {
      element: HTMLDivElement | null;
      enter: () => void;
      leave: () => void;
    }[] = [];

    imageElements.forEach((image, index) => {
      gsap.set(imageElements[index], {
        flex: 1,
        filter: "grayscale(80%) blur(2px)",
      });

      const handleEnter = contextSafe(() => {
        gsap.to(image, {
          duration: 1,
          flexGrow: 10,
          filter: "grayscale(0%) blur(0px)",
          ease: "power2.inOut",
        });
      });

      const handleLeave = contextSafe(() => {
        gsap.to(image, {
          duration: 1,
          flexGrow: 1,
          filter: "grayscale(80%) blur(2px)",
          ease: "power2.inOut",
        });
      });

      // Nasłuchiwacze na zdarzenia myszy
      image?.addEventListener("mouseenter", handleEnter);
      image?.addEventListener("mouseleave", handleLeave);

      eventHandlers.push({
        element: image,
        enter: handleEnter,
        leave: handleLeave,
      });
    });

    return () => {
      // Usuwamy WSZYSTKIE nasłuchiwacze
      eventHandlers.forEach((handler) => {
        handler.element?.removeEventListener("mouseenter", handler.enter);
        handler.element?.removeEventListener("mouseleave", handler.leave);
      });
    };
  });
  useGSAP(
    () => {
      ScrollTrigger.getById("project_description")?.kill();
      ScrollTrigger.getById("project_description_mobile")?.kill();

      const mm = gsap.matchMedia();

      // Desktop animations (no changes, just as reference)
      mm.add("(min-width: 768px)", () => {
        const descriptionTextHeight = descriptionTextRef.current?.offsetHeight;
        const whiteLine = gsap.timeline({
          scrollTrigger: {
            trigger: ".projects_screens",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
        whiteLine.from(".horizontal_line", {
          xPercent: -100,
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        });
        // -----------------------------------
        const descriptionTl = gsap.timeline({
          scrollTrigger: {
            id: "project_description",
            trigger: ".description_section__left",
            start: "top 90%",
            end: `+=${descriptionTextHeight}px`,
            scrub: 2,
          },
        });

        descriptionTl.to(".splitted_description .split-char", {
          color: chooseThemeAndPickDescriptionColor,
          stagger: 0.2,
          duration: 1.5,
          ease: "power2.inOut",
        });

        const techTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".description_section__right",
            start: "top 90%",
            end: "bottom 90%",
            scrub: 2,
          },
        });

        techTl.from(".technology_item", {
          opacity: 0,
          stagger: 2,
          duration: 2.5,
          ease: "power2.inOut",
          scale: 0,
          transformOrigin: "left center",
        });
      });

      //MOBILE

      mm.add("(max-width: 767px)", () => {
        const descriptionTextHeight = descriptionTextRef.current?.offsetHeight;

        const whiteLine = gsap.timeline({
          scrollTrigger: {
            trigger: ".projects_screens",
            start: "top center", // Start when the section is in the middle of the viewport
            end: "bottom center", // End when the section is fully in the viewport
            scrub: 2, // Slower scrub for better control
          },
        });
        whiteLine.from(".horizontal_line", {
          xPercent: -100,
          opacity: 0,
          duration: 0.8, // Slightly faster than desktop but visible
          ease: "power2.inOut",
        });
        // mobile SPLIT CHARS ------------------------------------
        const descriptionTl = gsap.timeline({
          scrollTrigger: {
            id: "project_description_mobile",

            trigger: ".description_section__left",
            start: "top 90%", // Animacja zaczyna się, gdy element ma 10% widoczności
            end: `+=${descriptionTextHeight}px`,
            scrub: 2,
          },
        });

        descriptionTl.to(".splitted_description .split-char", {
          color: chooseThemeAndPickDescriptionColor,
          stagger: 0.15, // Faster but still noticeable stagger
          duration: 1.2, // Shorter duration but visible
          ease: "power2.inOut",
        });
        // MOBILE TECHNOLOGIES
        const techTl = gsap.timeline({
          scrollTrigger: {
            trigger: "description_section__right",
            start: "top center", // Trigger closer to center for better timing
            end: "bottom bottom", // End closer to the top for visibility
            scrub: 2,
          },
        });

        techTl.from(".technology_item", {
          opacity: 0,
          stagger: 1.5, // Stagger reduced for quicker animations
          duration: 1.8, // Shortened duration to keep animations within view
          ease: "power2.inOut",
          scale: 0.9, // Smaller initial scale for better visibility
          transformOrigin: "left center",
        });
      });
    },
    {
      dependencies: [tProjectPage, theme], // Zmiana języka spowoduje ponowne uruchomienie
      revertOnUpdate: true, // Cofnij animacje przed ponownym uruchomieniem
    },
  );

  const handleProjectChange = (direction: number) => {
    const currentIndex = projects.findIndex(
      (project) => project.id === Number(paramsProjectId),
    );
    // Oblicz nowy indeks z uwzględnieniem zapętlenia
    const newIndex =
      (currentIndex + direction + projects.length) % projects.length;

    // Pobierz ID nowego projektu i przejdź do niego
    const nextProjectId = projects[newIndex].id;
    router.push(`/projects/${nextProjectId}`);
  };

  return (
    <PageTransition>
      <section className="project_details relative z-10 cursor-default py-40 opacity-0">
        <h1 className="project_details_title lg:[6rem] container mb-12 text-center font-mainHeaderFont text-[2.2rem] font-extralight uppercase text-background md:text-[5rem] lg:mb-20 xl:text-section-header-lg max-fold:text-3xl dark:text-mainFontColor">
          {tProjectPage(`projects.${paramsProjectId}.title`)}
        </h1>

        <div
          ref={containerRef}
          className="projects_screens flex h-[70vh] w-full flex-col xl:flex-row landscape:flex-row"
        >
          {projects[paramsProjectId - 1].imagesSrc.map((itemSrc, index) => (
            <div
              key={index}
              ref={(ref) => setProjectRef(ref, index)}
              className="image-item relative cursor-zoom-in overflow-hidden border-[8px] border-secondBackground dark:border-background"
              // className="image-item relative h-full cursor-zoom-in overflow-hidden border-[1px] grayscale transition-all duration-500 ease-in-out hover:grayscale-0"
            >
              {/* <div className="item_overlay absolute inset-0 z-10 bg-background bg-opacity-20 grayscale-[80%] backdrop-blur-[2px] transition-all duration-1000 ease-in-out hover:grayscale-0 hover:backdrop-blur-0"></div> */}
              <Image
                src={itemSrc}
                alt={`Image ${index + 1}`}
                fill={true}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        <div className="horizontal_line my-20 h-1 w-1/2 bg-gradient-to-r from-black to-transparent dark:from-white dark:to-transparent"></div>

        <div className="description_wrapper relative">
          <div className="navigation_buttons absolute -bottom-20 flex w-full justify-between text-3xl text-background opacity-50 md:justify-center md:gap-x-20 lg:text-4xl 2xl:top-1/2 2xl:-translate-y-1/2 2xl:justify-between 2xl:gap-x-0 2xl:text-section-header-lg 2xl:opacity-40 dark:text-gray-400">
            <button
              onClick={() => handleProjectChange(-1)}
              aria-label="Previous project"
              className="flex scale-100 transform items-center transition duration-300 hover:scale-90 hover:text-background dark:hover:text-mainFontColor"
            >
              <RiArrowLeftWideLine />
              <span className="font-mono text-lg lg:text-xl 2xl:hidden">
                {tProjectPage("previousProjectTitle")}
              </span>
            </button>
            <button
              onClick={() => handleProjectChange(1)}
              aria-label="Next project"
              className="flex scale-100 transform flex-row-reverse items-center transition duration-300 hover:scale-90 hover:text-background dark:hover:text-mainFontColor"
            >
              <RiArrowRightWideLine />
              <span className="font-mono text-lg lg:text-xl 2xl:hidden">
                {tProjectPage("nextProjectTitle")}
              </span>
            </button>
          </div>
          <div className="description container xl:max-w-screen-xl">
            <div className="description_wrapper grid gap-14 xl:grid-cols-[5fr_2fr] xl:gap-24">
              <div className="description_section__left">
                <h2 className="description_title font-mono text-2xl text-gray-500 dark:text-gray-400">
                  _{tProjectPage("description")}
                </h2>
                <p
                  ref={descriptionTextRef}
                  className="description_text pt-descriptionPadding text-SingleProjectDescriptionFont text-gray-400 lg:text-xl dark:text-gray-500"
                >
                  <Splitter
                    className="splitted_description"
                    text={tProjectPage(
                      `projects.${paramsProjectId}.description`,
                    )}
                  />
                </p>
                <div className="buttons_wrapper flex max-w-buttonsMaxWidth flex-col gap-5 pt-10 md:mx-auto lg:mx-0 lg:max-w-none lg:flex-row">
                  {projects[paramsProjectId - 1].demoLink && (
                    <div className="button_wrapper">
                      <a
                        target="_blank"
                        href={projects[paramsProjectId - 1].demoLink}
                        className="group inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm border-2 border-background border-opacity-30 bg-transparent px-6 py-4 leading-none text-background transition-all duration-300 dark:border-mainFontColor dark:text-mainFontColor"
                      >
                        <div className="text_container relative">
                          <span className="first_text block overflow-hidden transition-all duration-300 group-hover:translate-y-[-100%] group-hover:opacity-0">
                            {tProjectPage(
                              `projects.${paramsProjectId}.demoButtonTitle`,
                            )}
                          </span>
                          <span className="second_text absolute inset-0 translate-y-[100%] overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            {tProjectPage(
                              `projects.${paramsProjectId}.demoButtonTitle`,
                            )}
                          </span>
                        </div>

                        <TbWorldWww className="ml-3 text-2xl" />
                      </a>
                    </div>
                  )}

                  {projects[paramsProjectId - 1].githubLink && (
                    <div className="button_wrapper">
                      <a
                        target="_blank"
                        href={projects[paramsProjectId - 1].githubLink}
                        className="group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm border-2 border-background border-opacity-30 bg-transparent px-6 py-4 leading-none text-background transition-all duration-300 dark:border-mainFontColor dark:text-mainFontColor"
                      >
                        <div className="text_container relative">
                          <span className="first_text block overflow-hidden text-center transition-all duration-300 group-hover:translate-y-[-100%] group-hover:opacity-0">
                            {tProjectPage(
                              `projects.${paramsProjectId}.githubButtonTitle`,
                            )}
                          </span>
                          <span className="second_text absolute inset-0 flex translate-y-[100%] items-center justify-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            {tProjectPage(
                              `projects.${paramsProjectId}.githubButtonTitle`,
                            )}
                          </span>
                        </div>

                        <RiGithubFill className="ml-3 text-2xl" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="description_section__right">
                <h2 className="description_title font-mono text-2xl text-gray-500 dark:text-gray-400">
                  _tech-stack
                </h2>
                <ul className="technology_wrapper flex flex-wrap items-start gap-3 pt-descriptionPadding xl:flex-col">
                  {projects[paramsProjectId - 1].technologiesUsed.map(
                    (item, index) => (
                      <li
                        key={index + "-tech"}
                        className="technology_item description_text whitespace-nowrap rounded-3xl border-[1px] border-background border-opacity-30 px-5 py-1 text-center text-lg text-background dark:border-mainFontColor dark:text-mainFontColor"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
