"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  loading?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  loading,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Blokujemy scroll na body
      document.body.setAttribute("data-lenis-prevent", "true"); // Make sure you pass true as string
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
      document.body.removeAttribute("data-lenis-prevent");
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex animate-modal-overlay-open items-center justify-center bg-black/50"
    >
      <div
        ref={modalRef}
        className="relative mx-4 w-full max-w-md animate-modal-open rounded-sm bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {loading && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/[0.35]">
            <PropagateLoader size={20} color="#212121" />
          </div>
        )}
        {title && (
          <div className="border-b px-6 py-4">
            <h2 id="modal-title" className="text-lg font-semibold">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};
