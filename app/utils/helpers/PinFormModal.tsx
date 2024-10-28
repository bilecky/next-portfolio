"use client";

import { useState } from "react";
import { Modal } from "./Modal";

interface PinFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export const PinFormModal = ({
  isOpen,
  onClose,
  onSubmit,
}: PinFormModalProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
      onClose();
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
            className="w-full rounded-sm border-b-2 border-gray-300 bg-transparent px-4 py-4 focus:border-b-background focus:outline-none focus:ring-0"
            placeholder="Wpisz swoje imię..."
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2">
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
