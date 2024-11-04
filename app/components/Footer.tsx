"use client";

import React from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import clsx from "clsx";
import { currentYear } from "../utils/helperFunctions";

function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <footer className="relative left-0 top-0">
      <div
        className={clsx(
          "footer container absolute -top-[4vh] bottom-0 left-0 right-0 z-10 h-[4vh] overflow-hidden",
          { "opacity-0": isMobile, "opacity-1": !isMobile },
        )}
      >
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
            <a href="https://github.com/krzysztofzyszkowski"> Paweł Bilski </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
