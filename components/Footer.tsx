"use client";

import React, { useRef } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import clsx from "clsx";
import { currentYear } from "../utils/helperFunctions";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();
  const footerRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";
  const isProjectsPage = pathname.startsWith("/projects");

  const textClasses = "text-background dark:text-secondBackground";

  // Stopka dla podstron /projects/*
  if (isProjectsPage) {
    return (
      <footer id="footer" className="relative left-0 top-0">
        <div
          ref={footerRef}
          className="footer container absolute bottom-0 left-0 right-0 z-10 h-auto overflow-hidden"
        >
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-black to-transparent dark:via-white"></div>
          <div className={clsx("text-center text-sm font-light", textClasses)}>
            <p className="py-2">
              © {currentYear} | by
              <a href="https://github.com/bilecky"> Paweł Bilski </a>
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative left-0 top-0 bg-background dark:bg-secondBackground">
      <div className="footer container absolute bottom-0 left-0 right-0 z-10 h-auto overflow-hidden">
        <div
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)",
          }}
        ></div>
        <div className="text-secondary text-center text-sm font-light">
          <p className="py-2">
            © {currentYear} | by
            <a href="https://pawelbilski.com"> Paweł Bilski </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
