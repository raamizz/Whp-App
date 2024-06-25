import React from "react";

export default function CheckPincode() {
  return (
    <div className="bg-[#f7f7f7] lg:w-[65%] p-4 mt-4">
      <p className="mb-3">Enter pincode to check delivery</p>
      <div className="flex bg-white justify-between p-2">
        <input className="outline-none" />
        <p className="underline text-[#e26178]">Change</p>
      </div>
      <ul className="mt-3">
        <li>Same day delivery available. Extra Charge- ₹99</li>
        <li>Free delivery in 2 days.</li>
      </ul>
    </div>
  );
}
