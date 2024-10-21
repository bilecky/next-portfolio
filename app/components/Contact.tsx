"use client";

import { useGSAP } from "@gsap/react";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const Contact = () => {
  return (
    <section className="contact panel relative flex h-[85vh] w-full items-start justify-start bg-red-500 py-8 will-change-transform">
      <div className="container">
        <h2 className="contact-header font-mainHeaderFont text-mobile uppercase leading-none tracking-wide text-mainFontColor lg:text-section-header">
          Contact
        </h2>
        <div className="relative h-10 w-10 bg-slate-200"> </div>
      </div>
    </section>
  );
};

export default Contact;
