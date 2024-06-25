import React from "react";
import Link from "next/link"

export default function GoldSchemeSmallBanner() {
  return (
    <div className="flex bg-[#f7f7f7] p-4 lg:w-[90%] mt-7">
      <div>
        <span>
          <span className="text-[#e26178]">Gold 10+1 Monthly Plan </span>
          (Pay 10 Instalments, Get up to 100% Off on 11th Installment)
        </span>
      </div>
      <Link href={"/benefit"}>
        <div className="">
          <button className="w-[90%] text-center bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] p-4 pt-2 pb-2 mr-5 text-white">
            Subscribe
          </button>
        </div>
      </Link>
    </div>
  );
}
