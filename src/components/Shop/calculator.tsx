"use client";
// Calculator.tsx
import React from 'react';

const Calculator: React.FC = () => {
  return (
    <div className="calculator bg-yellow-100 p-4">
      <h3 className="text-xl font-semibold mb-2">Price Calculator</h3>
      <div className="flex gap-2">
        <input type="number" className="border border-gray-300 px-2 py-1" placeholder="Enter amount" />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Calculate</button>
      </div>
    </div>
  );
};

export default Calculator;

