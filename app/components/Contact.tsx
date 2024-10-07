"use client";

import { useGSAP } from "@gsap/react";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Contact = () => {
  return (
    <section className="contact flex h-screen w-full items-start justify-start bg-red-500 py-28">
      <h1 className="text-6xl text-white">Contact</h1>
      <div className="relative h-10 w-10 bg-slate-200"> </div>
    </section>
  );
};

export default Contact;
