"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import clsx from "clsx";
import { sanitizePinName } from "../../utils/helperFunctions";
import { useTranslations } from "next-intl";

interface PinFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  error?: string | null;
  setError: (error: string | null) => void; // Ensure this matches your parent's signature
  loading?: boolean;
}

export const PinFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  error,
  setError,
  loading,
}: PinFormModalProps) => {
  const tPinning = useTranslations("PinSectionForm");

  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError(tPinning("EmptyInput"));
      return;
    }

    try {
      onSubmit(sanitizePinName(name)); // Await the onSubmit call
      setName(""); // Clear the input
      setError(null);
    } catch (error) {
      console.error("Error checking pin existence:", error);
    }
  };

  return (
    <Modal
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      title={tPinning("ModalLabel")}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <div className="mb-4">
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
            placeholder={tPinning("InputName")}
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
            className="hover: rounded-sm border-2 border-gray-200 bg-gray-200 px-4 py-2 text-sm font-medium text-background transition-all duration-300 hover:bg-background hover:text-mainFontColor"
          >
            {tPinning("CancelBtn")}
          </button>
          <button
            type="submit"
            className="group rounded-sm border-2 border-background bg-background px-6 py-4 leading-none text-mainFontColor transition-all duration-300 hover:bg-mainFontColor hover:text-background"
          >
            {tPinning("AddBtn")}
          </button>
        </div>
      </form>
    </Modal>
  );
};
