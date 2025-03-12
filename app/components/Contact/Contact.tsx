import { RiMailSendFill } from "react-icons/ri";

import PinningComponent from "./PinningComponent";
import { fetchPins } from "@/app/lib/data";
import ContactWrapperClient from "./ContactWrapperClient";
import Form from "./Form";
import { getTranslations } from "next-intl/server";

const Contact = async () => {
  const pins = await fetchPins();
  const tContact = await getTranslations("ContactSection");

  return (
    <ContactWrapperClient>
      <div className="container py-20 lg:py-28">
        <h2 className="contact_header lg:text-section-header-lg xl:text-section-header-xl 2xl:text-section-header-2xl text-center font-mainHeaderFont text-mobile uppercase leading-none tracking-wide text-background">
          {tContact("title")}
        </h2>

        <div className="contact_wrapper py-descriptionPadding grid-cols-2 gap-20 md:pb-2 md:pt-12 lg:grid">
          <div className="contact_description flex flex-col">
            <p className="about_description text-sm lg:text-xl">
              {tContact("paragraph")}
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
