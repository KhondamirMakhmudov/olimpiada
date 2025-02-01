import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Check if the modal has been shown before
    const hasSeenModal = localStorage.getItem("hasSeenModal");
    if (!hasSeenModal) {
      setIsOpen(true);
      localStorage.setItem("hasSeenModal", "true");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false); // Simply close the modal
  };

  // If the modal is not open, return null (render nothing)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg relative text-center"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-transparent border-none text-xl cursor-pointer"
        >
          ×
        </button>
        <Image
          src="/images/olimpiada-banner.jpg" // Replace with your image path
          alt="Example Image"
          width={700}
          height={700}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Modal;
