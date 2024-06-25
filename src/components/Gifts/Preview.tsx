import React from "react";
import Image from "next/image";

interface PreviewProps {
  recipientName: string;
  recipientEmail: string;
  recipientMobile: string;
  confirmEmail: string;
  message: string;
  senderName: string;
  amount: number;
  occasion: string;
  selectedTemplateUrl: string | null;
}

const Preview: React.FC<PreviewProps> = ({
  recipientName,
  recipientEmail,
  recipientMobile,
  confirmEmail,
  message,
  senderName,
  amount,
  occasion,
  selectedTemplateUrl,
}) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="my-4 flex justify-between bg-pink-100 rounded-lg shadow-md overflow-hidden md:w-[700px] w-full">
          <div className="flex flex-col md:flex-row md:items-center items-start w-full">
            <div className="bg-blue-950 p-4 flex justify-center items-center w-full">
              <div className="text-white text-4xl">
                {selectedTemplateUrl ? (
                  <Image
                    width={400}
                    height={300}
                    className="w-full h-[250px] object-fill object-center"
                    src={selectedTemplateUrl}
                    alt="Selected Template"
                  />
                ) : (
                  <Image
                    width={400}
                    height={300}
                    className="w-full h-[250px] object-fill object-center"
                    src="/images/other/GemStone1.png"
                    alt="Default Image"
                  />
                )}
                <div className="bg-blue-100 text-center p-2">
                  <p className="text-lg text-black font-semibold">
                    {occasion || "Occasion"}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-red-500 text-sm">FOR</p>
              <p className="text-lg font-semibold">{recipientName}</p>
              <p className="text-sm">{recipientEmail}</p>
              <p className="text-sm">{recipientMobile}</p>
              <p className="text-red-500 text-sm mt-4">Worth</p>
              <p className="text-lg font-semibold text-red-500">₹ {amount}</p>
              <p className="text-red-500 text-sm mt-4">MESSAGE</p>
              <p className="text-sm italic">"{message}"</p>
              <p className="text-red-500 text-sm mt-4">FROM</p>
              <p className="text-lg font-semibold">{senderName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
