"use client"

import { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Props2{
    label:string;
    onClick():any
  }
  const Checkbox:React.FC<Props2> = ({ label }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
  
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <div
        className="flex items-center cursor-pointer mb-1"
        onClick={toggleCheckbox}
      >
        <div
          className={`w-5 h-5 border rounded-sm flex items-center justify-center mr-2 ${
            isChecked
              ? "bg-[#e26178] border border-[#e26178]"
              : "bg-white border border-[#e26178]"
          }`}
        >
          {isChecked && <Icon.Check className="w-4 h-4 text-white" weight="bold"/>}
        </div>
        <label className="text-md text-gray-900">{label}</label>
      </div>
    );
  };
  export default Checkbox;