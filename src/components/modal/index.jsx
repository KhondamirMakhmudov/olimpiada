import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import ContentLoader from "../loader/content-loader";
import SimpleLoader from "../loader/simple-loader";

const Modal = () => {
  const {
    data: banner,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.banner,
    url: URLS.banner,
  });

  console.log(banner);

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
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

  const closeModal = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      {/* Overlay with custom cursor */}
      <div className="absolute inset-0 cursor-custom"></div>

      {/* Modal (normal cursor inside) */}
      {isLoading || isFetching ? (
        <SimpleLoader />
      ) : (
        <div
          ref={modalRef}
          className="bg-white p-5 rounded-lg relative text-center max-w-lg w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl cursor-auto z-10"
        >
          <button
            onClick={closeModal}
            className="absolute -top-2 right-2 text-3xl text-gray-700 hover:text-gray-900"
          >
            ×
          </button>
          <Image
            src={get(banner, "data[0].image", "/images/banner-img.jpg")}
            loader={() =>
              get(banner, "data[0].image", "/images/banner-img.jpg")
            }
            alt="Banner"
            width={800}
            height={700}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Modal;
