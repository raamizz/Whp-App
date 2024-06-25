import React, { useState } from "react";
import PieChart from "./PieChart";
import useEnroll from "@/hooks/useEnroll";
import Link from "next/link";


interface GoldCardProps {
  setBackendMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setBackendError: React.Dispatch<React.SetStateAction<string | null>>;
  setFlashType: React.Dispatch<
    React.SetStateAction<"success" | "error" | "info">
  >;
}

const GoldCard: React.FC<GoldCardProps> = ({
  setBackendMessage,
  setBackendError,
  setFlashType,
}) => {
 const [monthlyDeposit, setMonthlyDeposit] = useState<number>(2000);
 const [error, setError] = useState<string | null>(null);
 const [inputValue, setInputValue] = useState<string>("2000");
 const numberOfMonths = 11;
 const totalAmount = monthlyDeposit * numberOfMonths;
  const redemptionAmount = totalAmount + monthlyDeposit * 0.5;


 const { handleEnroll, loading } = useEnroll(
   setBackendMessage,
   setBackendError,
   setFlashType
 );

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const value = event.target.value;
   setInputValue(value);

   const parsedValue = parseInt(value, 10);
   if (isNaN(parsedValue)) {
     setError("Invalid input. Please enter a number.");
   } else if (parsedValue < 2000) {
     setError("Minimum deposit is 2000");
   } else if (parsedValue > 50000) {
     setError("Maximum deposit is 50000");
   } else if (parsedValue % 1000 !== 0) {
     setError("Amount must be a multiple of 1000");
   } else {
     setMonthlyDeposit(parsedValue);
     setError(null);
   }
 };

  return (
    <div className="bg-[#ebe3d5] h-full rounded-xl p-4 md:p-0 relative">
      {/* {loading && (
        <div className="absolute inset-0 bg-black w-screen bg-opacity-55 backdrop-blur-sm flex justify-center items-center z-10">
          <Image src="/dummy/loader.gif" alt="loader" height={50} width={50} />
        </div>
      )} */}
      <h3 className="font-semibold text-end mr-2 pt-2 text-[#E26178]">Gold</h3>
      <h1 className="text-center text-2xl font-semibold">
        BENEFIT CALCULATOR FOR GOLD
      </h1>
      <div className="flex flex-col lg:flex-row justify-evenly gap-3 items-center mx-4">
        <div className="flex flex-col justify-between text-start mt-7 w-full md:w-auto">
          <div className="flex justify-center items-center mt-2">
            <PieChart
              totalAmount={totalAmount}
              redemptionAmount={redemptionAmount}
              monthlyDeposit={monthlyDeposit}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between px-4 md:gap-6 gap-4 mt-7 md:w-96 w-full font-medium">
          <h1 className="font-medium">
            Slide or enter monthly installment amount
          </h1>
          <div className="mb-5 md:mb-0 text-center">
            <div className="flex items-center justify-center rounded p-2 border border-gray-700 bg-white mb-2 h-10">
              <div className="flex items-center justify-start w-full">
                <span className="text-2xl md:text-3xl">₹</span>
                <input
                  type="number"
                  className="text-2xl md:text-3xl font-bold mx-2 w-32 md:w-32 text-center remove-arrows"
                  value={monthlyDeposit}
                  onChange={handleChange}
                  min="2000"
                  max="50000"
                  step="1000"
                />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <input
                type="range"
                min={1000}
                max={50000}
                step={1000}
                className="w-full"
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex justify-between">
            <div className="text-start">
              <h1>Your total payment</h1>
            </div>
            <div>
              <h1 className="">₹{totalAmount.toLocaleString("en-IN")}</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-start">
              <h1>50% Discount on 12th installment</h1>
            </div>
            <div>
              <h1>₹{(monthlyDeposit * 0.5).toLocaleString("en-IN")}</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-start w-full md:w-52">
              <h1>Buy any gold worth: (after 11th month)</h1>
            </div>
            <div>
              <h1 className="md:text-3xl text-sm text-[#E26178]">
                ₹{redemptionAmount.toLocaleString("en-IN")}
              </h1>
            </div>
          </div>
          <div className="mb-3 flex flex-col text-center">
            <div>
              <div
                className=" bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white text-center p-1 rounded-lg w-full cursor-pointer mb-2 "
                onClick={() => handleEnroll("gold", monthlyDeposit)}
              >
                {loading ? "Enrolling..." : "Enroll Now"}
              </div>
            </div>
            <div>
              <Link
                className=" text-black underline text-start text-sm rounded-xl w-full cursor-pointer "
                href={"/terms-and-condition"}
              >
                T&C apply*
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldCard;
