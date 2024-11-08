import { RiMailSendFill } from "react-icons/ri";

import PinningComponent from "./PinningComponent";
import { fetchPins } from "@/app/lib/data";
import ContactWrapperClient from "./ContactWrapperClient";
import Form from "./Form";

const Contact = async () => {
  const pins = await fetchPins();

  return (
    <ContactWrapperClient>
      <div className="container py-20 lg:py-28">
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
            <Form />{" "}
          </div>
        </div>
      </div>
    </ContactWrapperClient>
  );
};

export default Contact;
