"use client"
import React, { useState, useEffect } from "react";
import GoldCard from "./GoldCard";
import DiamondCard from "./DiamondCard";
import SilverCard from "./SilverCard";
import FlashAlert from "@/components/Other/FlashAlert";
import MobileBenefits from "./mobileBenefits";

const Benefit: React.FC = () => {
  const [cardArray, setCardArray] = useState<number[]>([1, 2, 3]);
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [flashType, setFlashType] = useState<"success" | "error" | "info">(
    "success"
  );

  const nextCard = (index: number): void => {
    setCardArray((prevArray) => {
      const newArray = [
        ...prevArray.slice(index),
        ...prevArray.slice(0, index),
      ];
      return newArray;
    });
  };

  const getCard = (card: number) => {
    switch (card) {
      case 1:
        return (
          <GoldCard
            setBackendMessage={setBackendMessage}
            setBackendError={setBackendError}
            setFlashType={setFlashType}
          />
        );
      case 2:
        return (
          <DiamondCard
            setBackendMessage={setBackendMessage}
            setBackendError={setBackendError}
            setFlashType={setFlashType}
          />
        );
      case 3:
        return (
          <SilverCard
            setBackendMessage={setBackendMessage}
            setBackendError={setBackendError}
            setFlashType={setFlashType}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (backendMessage || backendError) {
      const timer = setTimeout(() => {
        setBackendMessage(null);
        setBackendError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [backendMessage, backendError]);

  return (
    <>
      <div className="hidden lg:block lg:h-[600px] md:h-[900px] px-40 md:px-10">
        <div className="card-stack">
          {cardArray.map((card, index) => (
            <div
              className={`card card${index + 1} rounded-lg`}
              key={card}
              onClick={() => nextCard(index)}
            >
              {getCard(card)}
            </div>
          ))}
        </div>
      </div>
      <MobileBenefits />
      {(backendMessage || backendError) && (
        <FlashAlert message={backendMessage || backendError} type={flashType} />
      )}
    </>
  );
};

export default Benefit;
