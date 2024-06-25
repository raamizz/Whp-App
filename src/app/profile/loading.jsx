"use client";
import React from "react";
import Image from "next/image";
const Loading = () => {
  return (
    <div className="backdrop fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="loading-container flex justify-center items-center h-full">
        <Image src="/dummy/loader.gif" alt={"loader"} height={50} width={50} />
      </div>
    </div>
  );
};

export default Loading;
