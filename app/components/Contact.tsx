"use client";
import { useEffect, useState } from "react";
import { RiMailSendFill } from "react-icons/ri";
import { PinFormModal } from "../utils/helpers/PinFormModal";
import { PiPushPinFill } from "react-icons/pi";
import { sql } from "@vercel/postgres";
import { createPin } from "../lib/actions";
import { fetchPins } from "../lib/data";

export interface UserPin {
  id: string;
  name: string;
  position: { x: number; y: number };
  pallette: string;
}

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [color, setColor] = useState("#000000");
  const [pins, setPins] = useState<UserPin[]>([]);

  const [hoveredPin, setHoveredPin] = useState<UserPin | null>(null); // Ustal typ stanu

  const [error, setError] = useState<string | null>(null); // Ensure this is defined

  useEffect(() => {
    const loadPins = async () => {
      try {
        const fetchedPins = await fetchPins();
        setPins(fetchedPins);
        console.log(fetchedPins);
      } catch (error) {
        console.error("Database Error/contact-component:", error);
        throw new Error("Nieprawidlowe blad");
      }
    };
    loadPins();
  }, []);
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

    // Sprawdzamy, czy istnieje już pin w tej pozycji
    const isDuplicate = pins.some(
      (pin) =>
        Math.abs(pin.position.x - xPercent) < 4 && // Porównujemy z xPercent
        Math.abs(pin.position.y - yPercent) < 4, // Porównujemy z yPercent
    );

    if (isDuplicate) {
      return;
    }

    // Jeśli nie ma duplikatu, ustawiamy pozycję i otwieramy modal
    setClickPosition({ x: xPercent, y: yPercent });
    setIsModalOpen(true);
  };

  const handleAddPin = async (name: string) => {
    const newPin = {
      id: name,
      name,
      position: clickPosition!,
      pallette: color,
    };

    try {
      await createPin(newPin);
      setPins((prevPins) => [...prevPins, newPin]);
      setClickPosition(null);
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Nieprawidłowy błąd"); // Set the error message from the caught error
      }
    }
  };

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

            <div className="user_pinning_wrapper mt-auto flex min-h-52 w-full flex-grow flex-col pt-8">
              <div
                onClick={handleClick}
                className="user_pinning relative w-full flex-grow rounded-sm border-[1px] border-background"
              >
                {pins.map((pin) => (
                  <div
                    key={pin.id}
                    onMouseEnter={() => setHoveredPin(pin)}
                    onMouseLeave={() => setHoveredPin(null)}
                    style={{
                      position: "absolute",
                      top: `${pin.position.y}%`,
                      left: `${pin.position.x}%`,
                      transform: "translate(-25%, -50%)",
                    }}
                  >
                    <PiPushPinFill
                      className="pin text-lg md:text-xl"
                      style={{
                        color: pin.pallette,
                      }}
                    />
                    {hoveredPin === pin && (
                      <div
                        className="absolute rounded border bg-white p-1 text-xs text-black"
                        style={{
                          transform: "translate(50%, -125%)",
                        }}
                      >
                        {pin.name}{" "}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <PinFormModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleAddPin}
              position={clickPosition}
              error={error}
              setError={setError}
            />
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
