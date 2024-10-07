import React from "react";
import Link from "next/link";
import { RiLinkedinFill, RiTwitterXFill } from "react-icons/ri";

const Header = () => {
  return (
    <header className="header bg-white-800 container absolute left-0 right-0 z-20 flex w-full items-center justify-between overflow-hidden py-5 text-mainFontColor opacity-0">
      <div className="logo group cursor-pointer text-xl font-light">
        <Link
          href="/"
          className="font-[family-name:var(--font-geist-mono)] transition-colors group-hover:text-gray-400"
        >
          paweł
          <span className="text-gray-400 transition-colors group-hover:text-mainFontColor">
            {"<bilski>"}
          </span>
        </Link>
      </div>

      <div className="white-line mx-4 h-[1px] w-[33%] bg-mainFontColor" />

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
