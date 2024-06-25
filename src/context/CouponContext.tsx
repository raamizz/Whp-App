"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
interface CouponContextProps {
  totalDiscount: number | any;
  updateTotalDiscount: (discount: any) => void;
  updateDiscount: (discount: any) => void;
  // setTotalDiscount: React.Dispatch<React.SetStateAction<number>>;
}

const CouponContext = createContext<CouponContextProps | undefined>(undefined);

export const CouponCodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [resetDiscount, setResetDiscount] = useState<boolean>(false);

  const updateDiscount = (discount: any) => {
    setTotalDiscount((prevTotalDiscount) => discount);
  };
  const updateTotalDiscount = (discount: any) => {
    setTimeout(() => {
      setTotalDiscount((prevTotalDiscount) => prevTotalDiscount);
      setResetDiscount(true);
    }, 1000);
  };

  useEffect(() => {
    if (resetDiscount) {
      setTotalDiscount(0);
      setResetDiscount(false); // Reset resetDiscount back to false
    }
  }, [resetDiscount]);

  return (
    <CouponContext.Provider
      value={{ totalDiscount, updateTotalDiscount, updateDiscount }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error(
      "useCouponContext must be used within a CouponCodeProvider"
    );
  }
  return context;
};
