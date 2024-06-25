"use client"
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";


const SideBar= (props:any) => {
  const [filterDropDown, setFilterDropDown] = useState<string | null>("Price");
  const [checkedOptions, setCheckedOptions] = useState<any>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  const handleOptionSelect = (option: any) => {
    const newCheckedOptions = {
      ...checkedOptions,
      [option]: !checkedOptions[option],
    };
    setCheckedOptions(newCheckedOptions);

    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOptions: any) => selectedOptions !== option
        )
      );
    }
    props.updateSelectedOption(selectedOptions)
  };

  const handleFilterDropdown = (item: any) => {
    setFilterDropDown(item);
  };
  return (
    <div
      className={`sidebar lg:w-4/3 md:w-1/3 w-full md:pr-12 lg:block hidden`}
    >
      <div
        className={`filter-type pb-8 border-line h-[550px] no-scrollbar overflow-y-auto `}
      >
        <div className="heading6 border-b-2">FILTER BY</div>
        <div className="mt-5">
          <p className="heading7">Applied Filters</p>
        </div>

        <div className="flex flex-wrap">
          {selectedOptions.map((option: string, index: React.Key) => (
            <div
              key={index}
              className="border border-[#e26178] bg-[#fcf4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
            >
              {option}
              <button
                className="ml-2 align-middle mb-1"
                onClick={() => handleOptionSelect(option)}
              >
                <Icon.X size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="list-type mt-4">
          {props.filter.map((item:any, index:number) => (
            <div
              key={index}
              className={`item cursor-pointer`}
              onClick={() => handleFilterDropdown(item.title)}
            >
              <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black  capitalize">
                <p className="text-lg font-semibold">{item.title}</p>

                <p className="mt-1">
                  <Icon.CaretDown weight="fill" />
                </p>
              </div>
              {filterDropDown === item.title ? (
                <div>
                  {item.options.map((option:any, index:any) => (
                    <div key={option}>
                      <input
                        type="checkbox"
                        id={option}
                        checked={checkedOptions[option]}
                        onChange={() => handleOptionSelect(option)}
                      />
                      <label className="ml-2" htmlFor={option}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SideBar;
