"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import clsx from "clsx";
import { checkIfPinExists } from "@/app/lib/actions";

interface PinFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  position: { x: number; y: number } | null;
}

export const PinFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  position,
}: PinFormModalProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null); // Stan na błąd

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Podaj nazwe pinu.");
      return;
    }

    try {
      // Sprawdź, czy pin o tej nazwie istnieje
      const exists = await checkIfPinExists(name.trim());

      if (exists) {
        setError("Pin z taką nazwą już istnieje.");
        return; // Przerwij wysyłanie formularza, jeśli pin istnieje
      }

      // Jeśli pin nie istnieje, kontynuuj wywołanie `onSubmit`
      setError(null); // Reset błędu
      setName("");
      onSubmit(name.trim());
      onClose();
    } catch (error) {
      console.error("Error checking pin existence:", error);
      setError("Wystąpił błąd podczas sprawdzania pinu."); // Obsłuż inne błędy
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dodaj pinezkę">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-mainFontColor"
          >
            Twoje imię
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={clsx(
              "w-full rounded-sm border-b-2 px-4 py-4 focus:outline-none focus:ring-0",
              error ? "border-b-red-500" : "border-b-gray-300",
              "bg-transparent focus:border-b-background",
            )}
            placeholder="Wpisz swoje imię..."
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-3">
          <span className="error order-first mr-auto self-center text-sm text-red-500">
            {error}{" "}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm font-medium text-background transition-all duration-300 hover:bg-background hover:text-mainFontColor"
          >
            cancel
          </button>
          <button
            type="submit"
            className="group rounded-sm border-2 border-background bg-background px-6 py-4 leading-none text-mainFontColor transition-all duration-300 hover:bg-mainFontColor hover:text-background"
          >
            add
          </button>
        </div>
      </form>
    </Modal>
  );
};
