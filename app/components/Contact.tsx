"use client";

import { useGSAP } from "@gsap/react";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { RiGithubFill, RiMailLine } from "react-icons/ri";

const Contact = () => {
  return (
    <section className="contact panel z-5 relative left-0 top-0 col-start-1 col-end-2 row-start-1 row-end-2 flex h-screen w-full bg-red-500 py-20 will-change-transform lg:py-36">
      <div className="container">
        <h2 className="contact-header text-center font-mainHeaderFont text-mobile uppercase leading-none tracking-wide text-background lg:text-section-header">
          Let's connect
        </h2>

        <div className="contact_wrapper grid-cols-2 gap-20 pt-14 lg:grid">
          <div className="contact_description">
            <p className="about_description text-sm lg:text-xl">
              Whether you have a project you want to work on together or just
              want us to meet and have a chat, you are in the right place: let's
              get in touch.
            </p>
          </div>

          <div className="contact_form">
            <form method="POST" className="flex flex-col gap-12">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="contact_input border-b-2 bg-transparent px-4 py-4"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="contact_input border-b-2 bg-transparent px-4 py-4"
              />
              <textarea
                rows={5}
                name="message"
                placeholder="Message"
                className="contact_input border-b-2 bg-transparent px-4 py-4"
              ></textarea>
              <div className="btn_wrapper inline-block">
                <button
                  type="submit"
                  className="group inline-flex w-auto cursor-pointer items-center overflow-hidden rounded-sm border-2 border-background bg-background px-6 py-4 leading-none text-mainFontColor transition-all duration-300 hover:bg-mainFontColor hover:text-background"
                >
                  <span className="first_text overflow-hidden transition-all duration-300 group-hover:translate-y-[-100%] group-hover:text-mainFontColor group-hover:opacity-0">
                    submit
                  </span>
                  <span className="second_text absolute translate-y-[100%] overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-background group-hover:opacity-100">
                    submit
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
