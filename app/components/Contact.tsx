"use client";

import { useGSAP } from "@gsap/react";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const Contact = () => {
  return (
    <section className="contact panel z-5 relative left-0 top-0 col-start-1 col-end-2 row-start-1 row-end-2 flex h-full w-full items-end justify-start bg-red-500 py-12 will-change-transform">
      <div className="container">
        <h2 className="contact-header font-mainHeaderFont text-mobile uppercase leading-none tracking-wide text-mainFontColor lg:text-section-header">
          Contact
        </h2>
        <div className="relative h-10 w-10 bg-slate-200"> </div>
        <div className="relative h-10 w-10 bg-slate-200"> </div>

        <div className="relative h-10 w-10 bg-slate-200"> </div>

        <div className="relative h-10 w-10 bg-slate-200"> </div>

        <div className="relative h-10 w-10 bg-slate-200"> </div>

        <div className="relative h-10 w-10 bg-slate-200"> </div>

        <div className="relative h-10 w-10 bg-slate-200"> </div>
      </div>
    </section>
  );
};

export default Contact;
