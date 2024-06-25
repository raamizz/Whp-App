"use client";
import React, { useRef, useEffect, FormEvent } from "react";

interface Props {
  handleCouponCheck: () => void;
  onClose: () => void;
  couponCode: (e: any) => void;
}
const CouponsModal: React.FC<Props> = ({
  handleCouponCheck,
  onClose,
  couponCode,
}) => {
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleFormSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCouponCheck();
    onClose();
  };
  const handleCouponChange = (e: any) => {
    couponCode(e.target.value);
  };

  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };
  return (
    <div
      id="container"
      className="backdrop fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleOnClose}
    >
      <div className="loading-container flex justify-center items-center h-full">
        <div className="bg-white p-2">
          <form onSubmit={handleFormSumbit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#e26178]">
                Enter Coupon Code:
              </label>
              <input
                type="text"
                ref={inputRef}
                onChange={(e) => handleCouponChange(e)}
                placeholder="Enter coupon code"
                className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <button className="px-3 py-2 bg-[#e26178] text-white rounded-2xl flex justify-center w-full">
              Check
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;
