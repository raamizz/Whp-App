"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import Occasion from "@/components/Gifts/Occasion";
import Templates from "@/components/Gifts/Templates";
import Amount from "@/components/Gifts/Amount";
import Delivery from "@/components/Gifts/Delivery";
import Preview from "@/components/Gifts/Preview";
import Stepper from "./Stepper";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { baseUrl, voucher, graphqlbaseUrl } from "@/utils/constants";
import axios from "axios";

const steps = [
  "Select an Occasion",
  "Pick a Template",
  "Amount",
  "Delivery Details",
  "Preview and Pay",
];

const Gifts = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientMobile: "",
    recipientEmail: "",
    confirmEmail: "",
    message: "",
    amount: 0,
    occasion: "",
    senderName: "",
  });
  const [error, setError] = useState<string>("");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  const [isOccasionSelected, setIsOccasionSelected] = useState<boolean>(false);
  const [isTemplateSelected, setIsTemplateSelected] = useState<boolean>(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );
  const [selectedTemplateUrl, setSelectedTemplateUrl] = useState<string | null>(
    null
  );
  const [voucherData, setVoucher] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new ApolloClient({
          uri: graphqlbaseUrl,
          cache: new InMemoryCache(),
        });
        const GetAllVoucher = gql`
          query GetAllVoucher {
            getAllVoucher {
              id
              name
              thumbnailImage
              templateImage
            }
          }
        `;
        const { data } = await client.query({
          query: GetAllVoucher,
        });
        setVoucher(data.getAllVoucher);
      } catch (error) {
        console.log("Error in fetching SubBanners", error);
      }
    };
    fetchData();
  }, []);

  const handleOccasionSelect = (occasion: string, voucherId: number) => {
    setFormData((prevData: any) => ({ ...prevData, occasion }));
    setIsOccasionSelected(true);
    setSelectedOccasion(occasion);
    setSelectedTemplateId(voucherId);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isStepValid = () => {
    if (currentStep === 3) {
      const {
        recipientName,
        recipientMobile,
        recipientEmail,
        confirmEmail,
        message,
        senderName,
      } = formData;
      if (
        !recipientName ||
        !recipientMobile ||
        !recipientEmail ||
        !confirmEmail ||
        !message ||
        !senderName ||
        recipientEmail !== confirmEmail
      ) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!isStepValid()) {
      setError("Please fill in all the details correctly.");
    } else if (currentStep === 0 && !isOccasionSelected) {
      setError("Please select an occasion.");
    } else if (currentStep === 1 && !isTemplateSelected) {
      setError("Please select an Template.");
    } else {
      setError("");
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }
  };

  const handlePrevious = () => {
    setError("");
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (index: number) => {
    setError("");
    setCurrentStep(index);
  };

  const handleProceedToPay = () => {
    console.log("Proceed to Pay", formData);
  };

  const handleTemplateSelect = (templateUrl: string) => {
    setSelectedTemplateUrl(templateUrl);
    setIsTemplateSelected(true);
  };

  const handleAmountChange = (amount: number) => {
    setFormData((prevData) => ({ ...prevData, amount }));
  };

  const completedSteps = steps.slice(0, currentStep);
  const remainingSteps = steps.slice(currentStep + 1);
  const stepCount = currentStep + 1;

  return (
    <div className="md:mx-1 mx-2">
      <div className="text-center py-10 bg-[#f8a4b4]">
        <h1 className="font-medium py-2">GIFT CARDS</h1>
        <h3 className="font-semibold text-3xl italic">
          For what your loved ones Love!
        </h3>
      </div>
      <div className="flex lg:mx-32">
        <div className="lg:block hidden p-4">
          <div className="bg-red-500 h-full w-0.5"></div>
        </div>
        <div className="flex flex-col justify-between w-full mt-3">
          <div className="flex justify-between gap-1 items-end">
            <div>
              <div className="flex flex-col items-start">
                {completedSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-3 text-green-600 py-2 mb-2 "
                  >
                    <div className="font-bold">{index + 1}</div>
                    {step}
                  </div>
                ))}
                <div className="bg-[#e26178] text-white md:px-4 p-1">
                  {steps[currentStep]}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  className="text-white bg-gray-500 md:px-4 px-2 py-2"
                  onClick={handlePrevious}
                >
                  PREVIOUS
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  className="text-white bg-blue-950 md:px-4 px-2 py-2"
                  onClick={handleNext}
                >
                  NEXT
                </button>
              ) : (
                <button
                  className="text-white bg-[#e26178] md:px-4 md:py-2"
                  onClick={handleProceedToPay}
                >
                  PROCEED TO PAY
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}

          {currentStep === 0 && (
            <Occasion
              onSelectOccasion={handleOccasionSelect}
              voucherData={voucherData}
            />
          )}
          {currentStep === 1 && (
            <Templates
              selectedOccasion={selectedOccasion}
              selectedTemplateId={selectedTemplateId}
              voucherData={voucherData}
              onTemplateSelect={handleTemplateSelect}
            />
          )}
          {currentStep === 2 && <Amount onAmountChange={handleAmountChange} />}
          {currentStep === 3 && (
            <Delivery formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Preview
              recipientName={formData.recipientName}
              recipientEmail={formData.recipientEmail}
              recipientMobile={formData.recipientMobile}
              confirmEmail={formData.confirmEmail}
              message={formData.message}
              senderName={formData.senderName}
              amount={formData.amount}
              occasion={formData.occasion}
              selectedTemplateUrl={selectedTemplateUrl} // Pass selected template URL to Preview
            />
          )}

          <div className="flex items-center justify-between">
            <div className="mt-2 text-sm flex flex-col justify-start">
              {remainingSteps.map((step, index) => (
                <div
                  key={index}
                  className="py-1 px-2 font-normal cursor-pointer text-gray-400"
                  onClick={() => handleStepClick(currentStep + index + 1)}
                >
                  {step}
                </div>
              ))}
            </div>
            <h1 className="text-xs">Terms & Conditions</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
