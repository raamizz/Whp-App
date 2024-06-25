import React from "react";
import { ArrowRight } from "@phosphor-icons/react";

interface ProceedButtonProps {
  totalPrice: any;
  isMobile: boolean;
  proceedButtonTitle: string;
  handleProceed: (useSameAsBillingAddress: boolean) => void;
  useSameAsBillingAddress: boolean;
}

const ProceedButton: React.FC<ProceedButtonProps> = ({
  totalPrice,
  isMobile,
  proceedButtonTitle,
  handleProceed,
  useSameAsBillingAddress,
}) => {
  const handleClick = () => {
    handleProceed(useSameAsBillingAddress);
  };
  if (isMobile) {
    return (
      <div className="flex fixed bottom-0 bg-white w-full p-3 z-50">
        <div>
          <p className="font-bold text-lg">
            ₹
            {Intl.NumberFormat("en-IN", {
              minimumFractionDigits: 2,
            }).format(Math.round(parseInt(totalPrice.toString())))}
          </p>
          <p className="text-[#e26178]">View Order Summary</p>
        </div>
        <div
          className="flex justify-center cursor-pointer items-center bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          <button className="text-black">{proceedButtonTitle}</button>
          <span>
            <ArrowRight style={{ marginLeft: "10px", marginRight: "10px" }} />
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col mt-3 relative">
      <button
        onClick={handleClick}
        className="flex justify-center items-center bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white font-bold py-2 px-4 rounded"
      >
        {proceedButtonTitle}
        <ArrowRight style={{ marginLeft: "10px", marginRight: "10px" }} />
      </button>
    </div>
  );
};

export default ProceedButton;
