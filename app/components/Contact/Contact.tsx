import PinningComponent from "./PinningComponent";
import ContactWrapperClient from "./ContactWrapperClient";
import Form from "./Form";
import { getTranslations } from "next-intl/server";
import { FiArrowUpRight } from "react-icons/fi";

export const dynamic = "force-dynamic";

const Contact = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const timestamp = Date.now(); // dodaje aktualny timestamp
  const res = await fetch(`${API_URL}/api/pins?t=${timestamp}`, {
    cache: "no-store",
    method: "GET",
  });
  const pins = await res.json();

  const tContact = await getTranslations("ContactSection");

  return (
    <ContactWrapperClient>
      <div className="container relative py-20 lg:py-28">
        <h2 className="contact_header text-center font-mainHeaderFont text-mobile uppercase leading-none tracking-wide text-background lg:text-section-header-lg xl:text-section-header-xl 2xl:text-section-header-2xl max-fold:text-fold-text">
          {tContact("title")}
        </h2>

        <div className="contact_wrapper grid-cols-2 gap-20 py-descriptionPadding md:pb-2 md:pt-12 lg:grid">
          <div className="contact_description flex flex-col">
            <p className="about_description text-center text-sm lg:text-left lg:text-xl">
              {tContact("paragraph")}
              <a
                href="mailto:kontakt@pawelbilski.com"
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                kontakt@pawelbilski.com
              </a>
              .
            </p>

            <PinningComponent fetchedPins={pins} />
          </div>

          <div className="contact_form">
            <Form />
          </div>
        </div>

        <div className="absolute bottom-2 right-4 hidden space-x-8 social-buttons-footer-visibility:flex">
          <a
            className="group flex items-center text-lg text-gray-400 transition-all duration-300 hover:-rotate-12 hover:text-background" // Usunięto hover:-rotate-12, zmieniono transition-all na transition-colors, dodano duration, zmieniono kolor hover dla przykładu
            href="https://www.linkedin.com/in/pawel-bilski"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiArrowUpRight
              className="text-xl transition-transform duration-300 group-hover:rotate-45" // Zmieniono rotację na -45, dodano duration
            />
            <span className="px-2">Linkedin</span>
          </a>
          <a
            className="group flex items-center text-lg text-gray-400 transition-all duration-300 hover:-rotate-12 hover:text-background" // Usunięto hover:-rotate-12, zmieniono transition-all na transition-colors, dodano duration, zmieniono kolor hover dla przykładu
            href="https://github.com/bilecky"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiArrowUpRight
              className="text-xl transition-transform duration-300 group-hover:rotate-45" // Zmieniono rotację na -45, dodano duration
            />
            <span className="px-2">Github</span>
          </a>
        </div>
      </div>
    </ContactWrapperClient>
  );
};

export default Contact;
