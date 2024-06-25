"use client";

import React from 'react';

const Filter: React.FC = () => {
  return (
    <div className="filter bg-gray-200 p-4">
      <h3 className="text-xl font-semibold mb-2">Filter Products</h3>
      <div className="flex gap-4" style={{"flex-wrap":"wrap"}}>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Categlro 1</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 2</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 3</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 1</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 2</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 3</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 1</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 2</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 3</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 1</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 2</button>
        <button className="bg-white text-gray-800 px-4 py-2 rounded">Category 3</button>
      </div>
    </div>
  );
};

export default Filter;
