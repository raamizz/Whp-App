"use client";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import FilterOptions from "./FilterOptions";
import { ProductType } from "@/type/ProductType";

interface Props {
  data:any
  filteredProducts: ProductType[];
  onFilterChange: (options: any) => void;
  mobileFilter: boolean;
  setMobileFilter: (arg: boolean) => void;
  selectedOptions: any;
  handleOptionSelect: (arg: string, arg2: string) => void;
  productsListRef: React.RefObject<HTMLDivElement>;
  category: string;
}

const FilterSidebar: React.FC<Props> = ({
  filteredProducts,
  onFilterChange,
  mobileFilter,
  setMobileFilter,
  selectedOptions,
  handleOptionSelect,
  productsListRef,
}) => {
  const [filterDropDown, setFilterDropDown] = useState<string>("Price");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarFixed, setIsSidebarFixed] = useState<boolean>(false);

  const handleFilterDropdown = (item: string) => {
    setFilterDropDown(item);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sidebarElement = sidebarRef.current;
      const productsListElement = productsListRef.current;

      if (sidebarElement && productsListElement) {
        const sidebarTop = sidebarElement.offsetTop;

        const sidebarBottom =
          sidebarElement.offsetTop + sidebarElement.offsetHeight;
        const productsListBottom =
          productsListElement.offsetTop + productsListElement.offsetHeight;
        const windowHeight = window.innerHeight + window.pageYOffset;
        const isAboveProductsList = windowHeight > sidebarTop;
        const isAtProductsListBottom =
          sidebarBottom >= productsListBottom &&
          windowHeight >= productsListBottom; // Check for end of products

        const isSidebarInViewport =
          isAboveProductsList && !isAtProductsListBottom;
        const isAtTop = window.pageYOffset <= sidebarTop;

        setIsSidebarFixed(isSidebarInViewport && !isAtTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productsListRef]);

  const handleMobileFilter = () => {
    setMobileFilter(false);
  };

  // useEffect(() => {
  //   let filteredArray = data.slice();
  //   Object.entries(selectedOptions).forEach(([category, selectedValues]) => {
  //     if ((selectedValues as any).length > 0) {
  //       filteredArray = filteredArray.filter((product) => {
  //         switch (category) {
  //           case "Price":
  //             return (selectedValues as any).some((option: string) => {
  //               const price = parseInt(product?.discountPrice);
  //               switch (option) {
  //                 case "Less than 10K":
  //                   return price < 10000;
  //                 case "10k to 20K":
  //                   return price >= 10000 && price < 20000;
  //                 case "20k to 30k":
  //                   return price >= 20000 && price < 30000;
  //                 case "30k and Above":
  //                   return price >= 30000;
  //                 default:
  //                   return false;
  //               }
  //             });
  //           case "Karat":
  //             return (selectedValues as any).some((option: string) =>
  //               product.metalPurity.includes(option.slice(0, -1))
  //             );
  //           case "Weight":
  //             return (selectedValues as any).some((option: string) =>
  //               product.weightRange.includes(option.slice(0, -1))
  //             );
  //           case "Gender":
  //             return (selectedValues as any).includes(product.shopFor[0]);
  //           case "Metal":
  //             return (selectedValues as any).some((option: string) =>
  //               product.metalType.includes(option.slice(0, -1))
  //             );
  //           case "Occasion":
  //             return (selectedValues as any).some((option: string) =>
  //               product.occasion.includes(option.slice(0, -1))
  //             );;
  //           default:
  //             return true;
  //         }
  //       });
  //     }
  //   });
  //   onFilterChange(filteredArray);
  // }, [selectedOptions]);
  useEffect(() => {
    onFilterChange(selectedOptions);
  }, [selectedOptions, onFilterChange]);
  console.log("Selected Options",selectedOptions);
  return (
    <>
      <div
        className={`sidebar lg:w-[300px] md:w-1/3 w-full pt-4 lg:block hidden md:block`}
        ref={sidebarRef}
      >
        <div
          className={`filter-type pb-8 border-line h-[450px] md:h-[380px] custom-scrollbar overflow-y-auto ${
            isSidebarFixed ? "fixed w-[300px]" : "relative"
          }`}
          style={{
            position: isSidebarFixed ? "fixed" : "relative",
            top: isSidebarFixed ? "120px" : "auto",
            width: isSidebarFixed ? "250px" : "250px",
          }}
        >
          <div className="heading6 border-b-2">FILTER BY</div>
          <div className="mt-5">
            <p className="heading7">Applied Filters</p>
          </div>
          <div className="flex flex-wrap">
            {Object.entries(selectedOptions).flatMap(([category, options]) =>
              options.map((option: string, index: number) => (
                <div
                  key={`${category}-${index}`}
                  className="border border-[#e26178] bg-[#fcf4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
                >
                  {option}
                  <button
                    className="ml-2 align-middle mb-1"
                    onClick={() => handleOptionSelect(option, category)}
                  >
                    <Icon.X size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="list-type mt-4">
            <FilterOptions
              handleMobileFilter={handleMobileFilter}
              filterDropDown={filterDropDown}
              handleFilterDropdown={handleFilterDropdown}
              handleOptionSelect={handleOptionSelect}
              selectedOptions={selectedOptions}
            />
          </div>
        </div>
      </div>
      {mobileFilter && (
        <div className="fixed inset-0 bg-white z-10 h-[100vh] ">
          <div className="mt-20 p-4">
            <Icon.X size={25} onClick={() => setMobileFilter(false)} />
            <div className="h-[350px] overflow-y-auto no-scrollbar">
              <div className="mt-5">
                <p className="heading7">Filter</p>
              </div>
              <div className="list-type mt-4">
                <FilterOptions
                  handleMobileFilter={handleMobileFilter}
                  filterDropDown={filterDropDown}
                  handleFilterDropdown={handleFilterDropdown}
                  handleOptionSelect={handleOptionSelect}
                  selectedOptions={selectedOptions}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
