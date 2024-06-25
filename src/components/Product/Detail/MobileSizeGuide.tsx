import React from "react";

const MobileSizeGuide = () => {
  return (
    <div className="text-center rounded-md">
      <table className="mt-5 bg-[#f7f7f7]">
        <tr className="">
          <td className="border-r-2 border-[#F0ECED] border-b-2">Size</td>
          <td className="border-r-2 border-[#F0ECED] border-b-2 px-1">
            Diameter<p>(inch)</p>
          </td>
          <td className="border-r-2 border-[#F0ECED] border-b-2 px-1">
            Diameter<p>(cms)</p>
          </td>
          <td className="border-b-2 border-[#F0ECED] px-1">
            Circumference<p>(inch)</p>
          </td>
        </tr>
        <tr>
          <td className="border-r-2 border-[#F0ECED]">2.2</td>
          <td className="border-r-2 border-[#F0ECED] ">2.125</td>
          <td className=" border-r-2 border-[#F0ECED]">5.4</td>
          <td className="">6.67</td>
        </tr>
        <tr>
          <td className=" border-r-2 border-[#F0ECED]">2.4</td>
          <td className=" border-r-2 border-[#F0ECED]">2.25</td>
          <td className=" border-r-2 border-[#F0ECED]">5.7</td>
          <td className="">7.06</td>
        </tr>
        <tr>
          <td className="border-r-2 border-[#F0ECED]">2.6</td>
          <td className="border-r-2 border-[#F0ECED]">2.375</td>
          <td className="border-r-2 border-[#F0ECED]">6</td>
          <td className="">7.46</td>
        </tr>
        <tr>
          <td className="border-r-2 border-[#F0ECED] ">2.8</td>
          <td className=" border-r-2 border-[#F0ECED] ">2.5</td>
          <td className=" border-r-2 border-[#F0ECED] ">6.5</td>
          <td className="  rounded-b-lg">7.85</td>
        </tr>
      </table>
    </div>
  );
};

export default MobileSizeGuide;
