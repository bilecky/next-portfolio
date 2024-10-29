"use client";

import React, { useState } from "react";
import Pin from "./Pin";
import { createPin } from "@/app/lib/actions";
import { PinFormModal } from "@/app/utils/helpers/PinFormModal";

export interface UserPin {
  id: string;
  name: string;
  position: { x: number; y: number };
  pallette: string;
}
const PinningComponent = ({ fetchedPins }: { fetchedPins: UserPin[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [color, setColor] = useState("#000000");
  const [pins, setPins] = useState<UserPin[]>(fetchedPins);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);

    //   const ip = await getClientIP();
    //JUTRO SOBIE OGARNIJ TO POZYSKIWANIE IP ZEBY NIE BYLO SPAMU
    const newPin = {
      id: name,
      name,
      position: clickPosition!,
      pallette: color,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await createPin(newPin);
      setPins((prevPins) => [...prevPins, newPin]);
      setClickPosition(null);
      setIsModalOpen(false);
      setError(null);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Nieprawidłowy błąd"); // Set the error message from the caught
        setLoading(false); // Set loading to false if there's an error
      }
    }
  };

  return (
    <>
      <div className="user_pinning_wrapper mt-auto flex min-h-52 w-full flex-grow flex-col pt-8">
        <div
          onClick={handleClick}
          className="user_pinning magicpattern relative w-full flex-grow rounded-sm border-background"
        >
          {pins.map((pin) => (
            <Pin key={pin.id} pin={pin} />
          ))}
        </div>{" "}
      </div>

      <PinFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setClickPosition(null);
          setIsModalOpen(false);
          setError(null);
        }}
        onSubmit={handleAddPin}
        error={error}
        setError={setError}
        loading={loading}
      />
    </>
  );
};

export default PinningComponent;
