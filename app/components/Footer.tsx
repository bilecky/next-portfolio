"use client";

import React from "react";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import clsx from "clsx";
import { currentYear } from "../utils/helpers/helperFunctions";

function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <footer className="relative">
      <div
        className={clsx(
          "footer container absolute -top-[5vh] bottom-0 left-0 right-0 h-[5vh]",
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
          <p className="mt-2">
            © {currentYear} | by
            <a href="https://github.com/krzysztofzyszkowski"> Paweł Bilski </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
