import React from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="z-10  fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border border-white p-16 rounded-lg  w-[70%] relative">
        {/* Close Button */}
        <button
          className="absolute bg-white
           top-10 right-10 text-gray-500"
          onClick={onClose}
        >
          {" "}
          <X className="w-8 h-8 stroke-indigo-900" />
        </button>
        {children} {/* Render form inside modal */}
      </div>
    </div>
  );
};

export default Modal;
