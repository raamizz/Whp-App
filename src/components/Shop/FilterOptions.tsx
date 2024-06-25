import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

interface Filter {
  title: string;
  options: string[];
  labels: string[];
}

const Filter: Filter[] = [
  {
    title: "Price",
    options: ["0to10000", "10000to20000", "20000to30000", "30000to30000000"],
    labels: ["Less than 10K", "10K to 20K", "20K to 30K", "30K and Above"]
  },
  {
    title: "Karat",
    options: ["14KT", "18KT", "22KT", "23KT", "24KT"],
    labels: ["14 Karat", "18 Karat", "22 Karat", "23 Karat", "24 Karat"]
  },
  {
    title: "Weight",
    options: ["0to2gms", "2to5gms", "5to10gms", "10to20gms"],
    labels: ["0-2 grams", "2-5 grams", "5-10 grams", "10-20 grams"]
  },
  {
    title: "Gender",
    options: ["Men", "Women", "Kids"],
    labels: ["Men", "Women", "Kids"]
  },
  {
    title: "Metal",
    options: ["Rose_Gold", "White_Gold", "Gold", "Diamond", "Silver"],
    labels: ["Rose Gold", "White Gold", "Gold", "Diamond", "Silver"]
  },
  {
    title: "Occasion",
    options: [
      "Birth",
      "Casual Wear",
      "Daily Indian",
      "Engagement",
      "Festive",
      "Everyday",
      "Work Wear",
      "Wedding",
      "Desk to Dinner",
      "Evening",
      "Party Wear",
    ],
    labels: [
      "Birth",
      "Casual Wear",
      "Daily Indian",
      "Engagement",
      "Festive",
      "Everyday",
      "Work Wear",
      "Wedding",
      "Desk to Dinner",
      "Evening",
      "Party Wear",
    ]
  },
];

interface Props {
  filterDropDown: string;
  handleMobileFilter: () => void;
  handleFilterDropdown: (arg: string) => void;
  handleOptionSelect: (option: string, category: string) => void;
  selectedOptions: { [key: string]: string[] };
}

const FilterOptions: React.FC<Props> = ({
  filterDropDown,
  handleMobileFilter,
  handleFilterDropdown,
  handleOptionSelect,
  selectedOptions,
}) => {
  return (
    <>
      {Filter.map((item: Filter, index: number) => (
        <div
          key={index}
          className="item cursor-pointer"
          onClick={() => handleFilterDropdown(item.title)}
        >
          <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black capitalize">
            <p className="text-lg font-semibold">{item.title}</p>

            <p className="mt-1">
              <Icon.CaretDown weight="fill" />
            </p>
          </div>
          {filterDropDown === item.title ? (
            <div>
              {item.options.map((option: string, idx: number) => (
                <div key={option} onClick={() => handleMobileFilter()}>
                  
                  <input
                    type="checkbox"
                    id={option}
                    value={option}
                    checked={selectedOptions[item.title]?.includes(option)}
                    onChange={() => handleOptionSelect(option, item.title)}
                  />
                  <label className="ml-2" htmlFor={option}>
                    {item.labels[idx]}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default FilterOptions;