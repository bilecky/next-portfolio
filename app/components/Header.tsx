"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { RiLinkedinFill, RiTwitterXFill } from "react-icons/ri";
import { gsap } from "gsap";

const Header = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Zmieniono na HTMLButtonElement

  gsap.set(menuRef.current, { height: "0px" });

  const closeMenu = () => {
    if (!menuRef.current) return;
    gsap.to(menuRef.current, {
      height: "0px",
      duration: 0.4,
      ease: "power3.out",
    });
    menuRef.current.classList.remove("visible");
  };

  const handleClick = () => {
    // Użyj GSAP do animacji
    if (!menuRef.current) return;

    const isVisible = menuRef.current.classList.contains("visible");

    if (!isVisible) {
      gsap.to(menuRef.current, {
        height: "200px",
        duration: 0.8,
        ease: "back.out(3, .7)",
      });
      menuRef.current.classList.add("visible");
    } else {
      closeMenu();
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      closeMenu();
    }
  };

  useEffect(() => {
    // Dodaj listener na kliknięcia
    document.addEventListener("mousedown", handleOutsideClick);

    // Usuń listener przy demontażu komponentu
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="header bg-white-800 container absolute left-0 right-0 z-20 flex w-full items-center justify-between py-5 text-mainFontColor opacity-0">
      <div className="logo group text-xl font-light">
        <Link
          href="/"
          className="cursor-pointer font-[family-name:var(--font-geist-mono)] transition-colors group-hover:text-gray-400"
        >
          paweł
          <span className="text-gray-400 transition-colors group-hover:text-mainFontColor">
            {"<bilski>"}
          </span>
        </Link>
      </div>

      <button
        ref={buttonRef}
        onClick={handleClick}
        className="white-line relative mx-4 w-[30%] cursor-pointer p-5"
      >
        <div className="pulse-line h-[2px] w-full bg-white"></div>
        <div
          ref={menuRef}
          className="menu-container absolute left-0 top-10 w-full rounded-lg bg-white opacity-95"
        ></div>
      </button>
      <nav className="header-nav">
        <ul className="flex space-x-6">
          <li>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-300"
            >
              <RiLinkedinFill />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-gray-300"
            >
              <RiTwitterXFill />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
