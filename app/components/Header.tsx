"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RiLinkedinFill, RiTwitterXFill } from "react-icons/ri";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.set(menuRef.current, { height: 0, opacity: 0 });
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
        height: "200px",
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

  return (
    <header className="header bg-white-800 container absolute left-0 right-0 z-20 flex w-full items-center justify-between py-5 text-mainFontColor opacity-0">
      <div className="logo group text-xl font-light">
        <Link
          href="/"
          className="cursor-pointer font-mono transition-colors group-hover:text-gray-400"
        >
          paweł
          <span className="text-gray-400 transition-colors group-hover:text-mainFontColor">
            {"<bilski>"}
          </span>
        </Link>
      </div>

      <div
        ref={menuContainerRef}
        className="white-line-container relative mx-4 w-[30%]"
      >
        <button
          aria-label="Otwórz menu"
          type="button"
          onClick={handleToggle}
          className="white-line relative block w-full cursor-pointer p-5"
        >
          <div
            style={{
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%)",
            }}
            className="pulse-line h-[3px] w-full"
          ></div>
        </button>

        <div
          ref={menuRef}
          className="menu-container absolute left-0 right-0 top-10 w-full rounded-lg bg-white"
        ></div>
      </div>
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
