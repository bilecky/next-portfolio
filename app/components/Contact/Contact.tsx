import { useState } from "react";
import { RiMailSendFill } from "react-icons/ri";
import { PinFormModal } from "../../utils/helpers/PinFormModal";
import { createPin, getClientIP } from "../../lib/actions";
import PinningWraper from "./PinningComponent";
import PinningComponent from "./PinningComponent";
import { fetchPins } from "@/app/lib/data";

const Contact = async () => {
  const pins = await fetchPins();

  return (
    <section className="contact panel z-5 relative left-0 top-0 col-start-1 col-end-2 row-start-1 row-end-2 flex h-screen w-full bg-secondBackground py-20 will-change-transform lg:py-28">
      <div className="container">
        <h2 className="contact_header text-center font-mainHeaderFont text-mobile uppercase leading-none tracking-wide text-background lg:text-section-header">
          Let's connect
        </h2>

        <div className="contact_wrapper grid-cols-2 gap-20 pb-2 pt-12 lg:grid">
          <div className="contact_description flex flex-col">
            <p className="about_description text-sm lg:text-xl">
              Whether you have a project you want to work on together or just
              want us to meet and have a chat, you are in the right place: let's
              get in touch. We are always looking for new and exciting projects
              and collaborations.
            </p>

            <PinningComponent fetchedPins={pins} />
          </div>

          <div className="contact_form">
            <form method="POST" className="flex flex-col gap-12">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="contact_input border-b-2 bg-transparent px-4 py-4 focus:border-b-background focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="contact_input border-b-2 bg-transparent px-4 py-4 focus:border-b-background focus:outline-none"
              />
              <textarea
                rows={5}
                name="message"
                placeholder="Message"
                className="contact_input border-b-2 bg-transparent px-4 py-4 focus:border-b-background focus:outline-none"
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
                  <RiMailSendFill className="ml-3" />
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
