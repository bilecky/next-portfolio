"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { RiLinkedinFill, RiGithubFill } from "react-icons/ri";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ToggleSwitch from "./common/ToggleSwitch";
import { LiaLanguageSolid } from "react-icons/lia";
import { PiPaintBrushDuotone } from "react-icons/pi";
import { Locale } from "@/app/i18n/config";
import { setUserLocale } from "@/app/lib/locale";
import { useTheme } from "@/app/context/ThemeProvider";
import useMediaQuery from "../hooks/useMediaQuery";

interface HeaderProps {
  locale: string;
}

const Header = ({ locale }: HeaderProps) => {
  const ismobile = useMediaQuery("(max-width: 768px)");
  const [isPending, startTransition] = useTransition();
  const [localLanguage, setLocalLanguage] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (locale === "en") {
      setLocalLanguage(true);
    } else {
      setLocalLanguage(false);
    }
  }, [locale]);

  useGSAP(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!menuContainerRef.current) return;

      if (!menuContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        gsap.to(menuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    };

    document.addEventListener("click", closeMenu);
  }, []);

  const handleToggle = () => {
    if (!menuRef.current) return;
    setIsOpen(!isOpen);

    if (!isOpen) {
      gsap.to(menuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleLanguageToggle = (languageState: boolean) => {
    const newLanguageState = (languageState ? "en" : "pl") as Locale;

    startTransition(() => {
      setUserLocale(newLanguageState);
    });
  };

  return (
    <header
      id="header"
      className="header bg-white-800 container absolute left-0 right-0 z-20 grid w-full grid-cols-3 items-center py-5 text-background opacity-0 dark:text-mainFontColor"
    >
      <div className="logo group justify-self-start text-xl font-light will-change-transform">
        <Link
          href="/"
          className="cursor-pointer font-mono transition-colors dark:group-hover:text-gray-400"
        >
          {ismobile ? "p" : "paweł"}
          <span className="text-gray-400 transition-colors dark:group-hover:text-mainFontColor">
            {ismobile ? "<b>" : "<bilski>"}
          </span>
        </Link>
      </div>

      <div
        ref={menuContainerRef}
        className="white-line-container relative mx-4 w-5/6 justify-self-center"
      >
        <button
          aria-label="Otwórz menu"
          type="button"
          onClick={handleToggle}
          className="white-line relative block h-full w-full cursor-pointer p-5"
        >
          <div className="pulse-line dark:white-header-line black-header-line h-[3px] w-full will-change-transform"></div>
        </button>

        <div
          ref={menuRef}
          className="menu-container glassmorphism absolute left-1/2 top-12 mx-2 h-0 w-[80vw] -translate-x-1/2 overflow-hidden rounded-md text-background md:left-0 md:right-0 md:top-10 md:mx-auto md:w-[80%] md:-translate-x-0"
        >
          <nav className="h-full w-full p-5">
            <ul className="dropdown-menu space-y-4">
              <li>
                <div className="lg:text-LG flex items-center justify-between">
                  <div className="flex items-center justify-center space-x-3">
                    <LiaLanguageSolid className="text-xl" />
                    <span>pl / en</span>
                  </div>
                  <div>
                    <ToggleSwitch
                      initialState={localLanguage}
                      onChange={handleLanguageToggle}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="lg:text-LG flex items-center justify-between">
                  <div className="flex items-center justify-center space-x-3">
                    <PiPaintBrushDuotone className="text-xl" />
                    <span>light / dark</span>
                  </div>
                  <div>
                    <ToggleSwitch
                      initialState={theme === "dark" ? true : false}
                      onChange={(isDark) => setTheme(isDark ? "dark" : "light")}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <nav className="header-nav justify-self-end will-change-transform">
        <ul className="flex space-x-6">
          <li>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl transition-colors hover:text-gray-400"
            >
              <RiLinkedinFill />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl transition-colors hover:text-gray-400"
            >
              <RiGithubFill />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
