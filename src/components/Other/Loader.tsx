"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex bg-black bg-opacity-50 h-full text-white text-5xl items-center justify-center">
      Loading...
    </div>
  );
};

export default Loader;
