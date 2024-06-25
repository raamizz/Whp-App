"use client";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function MobileFilter(props: any) {
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
    <div className="fixed inset-0 bg-white z-10 h-[100vh] block lg:hidden ">
      <div className="mt-52 p-4">
        <Icon.X size={25} onClick={props.closeMobileFilter} />
        <div className="h-[650px] overflow-y-auto no-scrollbar">
          <div className="mt-5">
            <p className="heading7">Filter</p>
          </div>
          <div className="list-type mt-4">
            {props.filter.map((item: any, index: any) => (
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
                    {item.options.map((option: any, index: any) => (
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
    </div>
  );
}
