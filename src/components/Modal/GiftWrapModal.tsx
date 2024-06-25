"use client";
import React, {useEffect,useRef, useState } from "react";

interface Props {
  closeModal: () => void;
  handleGiftWrapData: (message: any, value: any) => void;
}

const GiftWrapModal: React.FC<Props> = ({ closeModal, handleGiftWrapData }) => {
  const inputRef=useRef<any>();
  const [formData, setFormData] = useState({
    name: "",
    wrapOption: false, // Change wrapOption to be a boolean
  });

  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      closeModal();
    }
  };
  useEffect(()=>{
    if(inputRef.current){
      inputRef.current.focus();
    }
  })
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit form logic (here you would typically make an API call or send the data to a server)
    closeModal();
    handleGiftWrapData(formData.name, formData.wrapOption);
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: "", wrapOption: false });
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-blur-sm bg-opacity-15 z-50 flex justify-center items-center"
      id="container"
      onClick={handleClose}
    >
      <div className="bg-white w-[25%] max-sm:w-[70%] p-4">
        <h2 className="text-xl font-semibold mb-4 text-[#e26178]">
          Your Gift Message
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Gift Message:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              ref={inputRef}
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wrapOption"
                name="wrapOption"
                checked={formData.wrapOption}
                onChange={handleChange}
                className="mr-3"
              />
            </div>
            <div>
              <label
                htmlFor="wrapOption"
                className="text-sm font-medium text-gray-700"
              >
                Want Your Gift to be Wrapped?
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiftWrapModal;
