"use client";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import BookExchangeModal from "@/components/Other/BookExchangeModal";

const Appointment = () => {
  const [appointmentModal, setAppointmentModal] = useState<boolean>(false);

  const handleOnClose = () => {
    setAppointmentModal(false);
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 text-rose-950">
        <div className="bg-secondary2 bg-gradient-to-r from-pink-100 to-gray-100 flex items-center justify-start lg:h-full md:h-full sm:h-full lg:py-0 md:py-0 sm:py-10">
          <div className="flex flex-col sm:py-10 text-center items-start p-10 gap-3">
            <h2 className="text-3xl md:text-4xl lg:text-4xl  text-red text-left mt-5">
              Visualize Your <br className="hidden sm:inline" /> Perfect look!{" "}
            </h2>
            <div className="">
              <p className="font-medium text-red-950 text-left mb-4">
                Try Before you Buy: Experience the Elegance of Our Jewellery in the Comfort of your Home.Book an appoinment with us today!
              </p>
              <h1 className="text-red-950 text-left font-bold">
                Gold Exchange
              </h1>
              <p className="font-medium text-red-950 text-left">
                Trade your previous gold items for newer, more exquisite pieces that better suit your
                evolving style.
              </p>
            </div>
            <button
              type="button"
              className="text-white bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] focus:ring-4 focus:outline-none font-medium text-sm px-12 py-3.5 text-center mt-6 mb-20 "
              onClick={() => setAppointmentModal(true)}
            >
              Book Appointment
            </button>
            {appointmentModal && (
              <BookExchangeModal  title={"Book Your Appointment"} closeModal={handleOnClose} />
            )}
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <div className="relative w-full h-full">
            <Image
              src="/images/other/image135.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="relative w-full h-full">
            <Image
              src="/images/other/image1366.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
