"Use Client";
import React, { useState, useEffect, useRef } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Product from "../Product/Productgraphql";
import "rc-slider/assets/index.css";
import ReactPaginate from "react-paginate";
import MobileMainCategorySwiper from "../Home1/MobileMainCategorySwiper";
import SortBy from "../Other/SortBy";
import FilterSidebar from "./FilterSidebar";
import ProductSkeleton from "./ProductSkeleton";
import { ProductType } from "@/type/ProductType";
import { useCategory } from "@/context/CategoryContex";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const ShopBreadCrumb1 = () => {
  const [sortOption, setSortOption] = useState<boolean>(false);
  const { category, setCustomcategory } = useCategory();
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mobileFilter, setMobileFilter] = useState<boolean>(false);
  const [data, setData] = useState<ProductType[]>([]);
  const productsListRef = useRef<HTMLDivElement>(null);

  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);

  const productsPerPage = 15;
  const pagesVisited = pageNumber * productsPerPage;
  const searchParams = useSearchParams();
  const [initialOptions, setInitialOptions] = useState<any>({});

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const router = useRouter();

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const handleSortOptionChange = (option: string) => {
    setSelectedSortOption(option);
  };

  const handleFilterChange = (filteredProducts: ProductType[]) => {
    setFilteredProducts(filteredProducts);
    setIsLoading(false);
    setPageNumber(0);
  };

  const fetchData = async (combinedOptions: any) => {
    // console.log("Received filterOptions in fetchData:", combinedOptions);
    // console.log("selectedOptions:", combinedOptions);
    if (
      combinedOptions.category.length > 0 ||
      combinedOptions.priceFilter.length > 0 ||
      combinedOptions.gender.length > 0 ||
      combinedOptions.karat.length > 0 ||
      combinedOptions.metal.length > 0
    ) {
      try {
        console.log("Received filter options:", combinedOptions);
        setIsLoading(false);
        const client = new ApolloClient({
          uri: "https://seashell-app-kswll.ondigitalocean.app/",
          cache: new InMemoryCache(),
        });

        const GET_PRODUCTS = gql`
          query Products(
            $category: [CategoryArrayInput!]
            $priceFilter: [PriceArrayInput!]
            $gender: [GenderArrayInput!]
            $karat: [KaratArrayInput!]
            $metal: [MetalArrayInput!]
            $weightRange: [WeightRangeArrayInput!]
            $sortBy: String
            $sortOrder: String
          ) {
            products(
              category: $category
              priceFilter: $priceFilter
              gender: $gender
              karat: $karat
              metal: $metal
              weightRange: $weightRange
              sortBy: $sortBy
              sortOrder: $sortOrder
            ) {
              productId
              SKU
              variantId
              isParent
              title
              displayTitle
              shortDesc
              longDesc
              url
              tags
              collectionName
              shopFor
              occasion
              theme
              length
              breadth
              height
              addDate
              lastModificationDate
              productSize
              productQty
              attributeId
              preSalesProductQueries
              isReplaceable
              weightRange
              isReturnable
              isInternationalShippingAvailable
              customizationAvailability
              fastDelivery
              tryAtHome
              isActive
              grossWeight
              netWeight
              discountId
              discountCategory
              discountActive
              typeOfDiscount
              discountValue
              discountAmount
              discountPrice
              offerStartDate
              offerEndDate
              mediaId
              metalType
              metalPurity
              metalWeight
              metalRate
              makingType
              makingChargesPerGrams
              makingCharges
              gst
              additionalCost
              productPrice
              discountPrice
              rating
              imageDetails {
                image_path
                order
                alt_text
              }
              videoDetails {
                video_path
                order
                alt_text
              }
              productAttributes {
                goldDetails {
                  goldCertifiedBy
                  goldSetting
                }
                gemstoneDetails
                diamondDetails
                silverDetails {
                  poojaArticle
                  utensils
                  silverWeight
                }
              }
              stoneDetails
              diamondDetails
            }
          }
        `;
        let variables = {};
        if (combinedOptions.category[0] === "new_Arrival") {
          variables = {
            category:[{value:""}],
            priceFilter: combinedOptions.priceFilter,
            gender: combinedOptions.gender.map((gender: string) => ({
              value: gender,
            })),
            karat: combinedOptions.karat.map((karat: string) => ({
              value: karat,
            })),
            metal: combinedOptions.metal.map((metal: string) => ({
              value: metal,
            })),
            weightRange: combinedOptions.weight.map((weight: string) => ({
              value: weight,
            })),
            sortBy: "addDate",
            sortOrder: "DESC",
          };
        } else {
          variables = {
            category: combinedOptions.category.map((category: string) => ({
              value: category,
            })),
            priceFilter: combinedOptions.priceFilter,
            gender: combinedOptions.gender.map((gender: string) => ({
              value: gender,
            })),
            karat: combinedOptions.karat.map((karat: string) => ({
              value: karat,
            })),
            metal: combinedOptions.metal.map((metal: string) => ({
              value: metal,
            })),
            weightRange: combinedOptions.weight.map((weight: string) => ({
              value: weight,
            })),
          };
        }
        console.log("Variables passed for api call", variables);
        const { data } = await client.query({
          query: GET_PRODUCTS,
          variables,
        });

        if (data && data.products) {
          setFilteredProducts(data.products);
          setIsLoading(false);
        } else {
          console.error("Error: No products data received");
        }
      } catch (error) {
        console.log("Error Occurred from ShopBreadCrumb1 GraphQL", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const getCombinedOptions = (initialOptions: any, selectedOptions: any) => {
    const combinedOptions: any = {};

    // Combine category options
    combinedOptions.category = [
      ...(initialOptions.Category || []),
      ...(selectedOptions.Category || []),
    ];

    // Combine price options
    combinedOptions.priceFilter = [
      ...(initialOptions.Price || []),
      ...(selectedOptions.Price || []),
    ].map((price: string) => {
      // console.log("price ",price)
      if (price == "Less than 10K") {
        const min = parseFloat("1");
        const max = parseFloat("10000");
        return { min, max };
      } else {
        const value = formatPriceRange(price);
        const [minStr, maxStr] = value.split("to");
        // console.log("MIN", minStr);
        // console.log("MAX", maxStr);
        const min = minStr ? parseFloat(minStr.trim()) : 1;
        const max = maxStr ? parseFloat(maxStr.trim()) : null;
        return { min, max };
      }
    });

    combinedOptions.gender = [
      ...(initialOptions.Gender || []),
      ...(selectedOptions.Gender || []),
    ];

    // Combine karat options
    combinedOptions.karat = [
      ...(initialOptions.Karat || []),
      ...(selectedOptions.Karat || []),
    ];

    // Combine metal options
    combinedOptions.metal = [
      ...(initialOptions.Metal || []),
      ...(selectedOptions.Metal || []),
    ];

    combinedOptions.weight = [
      ...(initialOptions.Weight || []),
      ...(selectedOptions.Weight || []),
    ];
    return combinedOptions;
  };

  const updateURL = (options: any) => {
    const urlParts: string[] = [];
    // console.log("filterOptions", options);
    if (options.Category && options.Category.length > 0) {
      urlParts.push(`c-${options.Category.join(",")}`);
    }

    if (options.Gender && options.Gender.length > 0) {
      urlParts.push(`g-${options.Gender.join(",")}`);
    }

    if (options.Karat && options.Karat.length > 0) {
      urlParts.push(`k-${options.Karat.join(",")}`);
    }

    if (options.Price && options.Price.length > 0) {
      urlParts.push(`p-${options.Price.join("|")}`);
    }

    if (options.Metal && options.Metal.length > 0) {
      urlParts.push(`m-${options.Metal.join(",")}`);
    }
    if (options.Weight && options.Weight.length > 0) {
      urlParts.push(`w-${options.Weight.join(",")}`);
    }

    const url = `${window.location.pathname}?url=${urlParts.join("+")}`;
    router.push(url);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      // Apply price filter
      if (selectedOptions.Price && selectedOptions.Price.length > 0) {
        const minPrice = parseInt(selectedOptions.Price[0]) || 0;
        const maxPrice =
          parseInt(selectedOptions.Price[selectedOptions.Price.length - 1]) ||
          Infinity;
        filtered = filtered.filter(
          (product: any) =>
            product.discountPrice >= minPrice &&
            product.discountPrice <= maxPrice
        );
      }

      // Apply gender filter
      if (selectedOptions.Gender && selectedOptions.Gender.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Gender.includes(product.gender)
        );
      }

      // Apply karat filter
      if (selectedOptions.Karat && selectedOptions.Karat.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Karat.includes(product.karat)
        );
      }

      // Apply metal filter
      if (selectedOptions.Metal && selectedOptions.Metal.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Metal.includes(product.metal)
        );
      }

      // Apply type filter
      if (selectedOptions.Type && selectedOptions.Type.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Type.includes(product.type)
        );
      }

      if (selectedOptions.Weight && selectedOptions.Weight.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Weight.includes(product.weightRange)
        );
      }

      // Apply style filter
      if (selectedOptions.Style && selectedOptions.Style.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Style.includes(product.style)
        );
      }

      // Apply occasion filter
      if (selectedOptions.Occasion && selectedOptions.Occasion.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Occasion.includes(product.occasion)
        );
      }

      // Apply color filter
      if (selectedOptions.Color && selectedOptions.Color.length > 0) {
        filtered = filtered.filter((product: any) =>
          selectedOptions.Color.includes(product.color)
        );
      }

      setFilteredProducts(filtered);
    };
    applyFilters();
    console.log("useEffect - selectedOptions:", selectedOptions);

    const combinedOptions = getCombinedOptions(initialOptions, selectedOptions);
    // console.log("Combined Options",combinedOptions)
    fetchData(combinedOptions);
    updateURL(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const queryValue = params.get("url") || "";

    const initialOptions: any = {};

    const parts = queryValue.split(" ");
    parts.forEach((part) => {
      // Split each part by the hyphen to get the key and value
      const [key, value] = part.split("-");

      if (key === "c") {
        initialOptions.Category = value.split(",");
      }
      if (key === "g") {
        initialOptions.Gender = value.split(",");
      }
      if (key === "k") {
        initialOptions.Karat = value.split(",");
      }
      if (key === "p") {
        initialOptions.Price = value.split("|");
      }
      if (key === "m") {
        initialOptions.Metal = value.split(",");
      }
      if (key === "w") {
        initialOptions.Weight = value.split(",");
      }
    });

    setSelectedOptions(initialOptions);
    console.log("Initial selectedOptions from URL:", initialOptions);

    // fetchData(initialOptions);
  }, [searchParams]);

  // useEffect(() => {
  //   if (Object.keys(selectedOptions).length > 0) {
  //     fetchData();
  //   }
  // }, [selectedOptions]);

  // useEffect(() => {
  //   const combinedOptions = getCombinedOptions(initialOptions, selectedOptions);
  //   fetchData(combinedOptions);
  // }, [selectedOptions]);

  // useEffect(() => {
  //   fetchData(selectedOptions);
  // }, [selectedOptions]);

  // const handleOptionSelect = (option: string, category: string) => {
  //   setSelectedOptions((prevSelectedOptions: any) => {
  //     const updatedOptions = { ...prevSelectedOptions };
  //     if (updatedOptions[category]) {
  //       if (updatedOptions[category].includes(option)) {
  //         updatedOptions[category] = updatedOptions[category].filter(
  //           (selectedOption: any) => selectedOption !== option
  //         );
  //       } else {
  //         updatedOptions[category].push(option);
  //       }
  //     } else {
  //       updatedOptions[category] = [option];
  //     }
  //     console.log('updatedOptions:', updatedOptions);

  //     return updatedOptions;
  //   });
  // };

  const handleOptionSelect = (option: string, category: string) => {
    setSelectedOptions((prevSelectedOptions: any) => {
      const updatedOptions = { ...prevSelectedOptions };
      if (updatedOptions[category]) {
        const formattedOption = formatPriceRange(option);
        if (updatedOptions[category].includes(formattedOption)) {
          updatedOptions[category] = updatedOptions[category].filter(
            (selectedOption: any) => selectedOption !== formattedOption
          );
        } else {
          updatedOptions[category].push(formattedOption);
        }
      } else {
        updatedOptions[category] = [formatPriceRange(option)];
      }
      // console.log("updatedOptions:", updatedOptions);
      return updatedOptions;
    });
  };

  //  console.log("selected options",selectedOptions)
  // console.log("Selected Options", selectedOptions);
  const formatPriceRange = (price: string) => {
    if (price === "Less than 10K") {
      return "0to10000";
    } else if (price === "10Kto20K") {
      return "10000to20000";
    } else if (price === "20Kto30K") {
      return "20000to30000";
    } else if (price === "30Kto40K") {
      return "30000to40000";
    } else if (price === "40Kto50K") {
      return "40000to50000";
    } else if (price === "50000toInfinity") {
      return "50000toInfinity";
    }
    return price;
  };

  // console.log("Dataa", filteredProducts);

  // useEffect(() => {
  //   fetchData(selectedOptions);
  // }, [selectedOptions]);

  // useEffect(() => {
  //   const applyFilters = () => {
  //     let filtered = data;

  //     // Apply price filter
  //     if (selectedOptions.Price && selectedOptions.Price.length > 0) {
  //       const minPrice = parseInt(selectedOptions.Price[0]) || 0;
  //       const maxPrice =
  //         parseInt(selectedOptions.Price[selectedOptions.Price.length - 1]) ||
  //         Infinity;
  //       filtered = filtered.filter(
  //         (product: any) =>
  //           product.discountPrice >= minPrice &&
  //           product.discountPrice <= maxPrice
  //       );
  //     }

  //     // Apply gender filter
  //     if (selectedOptions.Gender && selectedOptions.Gender.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Gender.includes(product.gender)
  //       );
  //     }

  //     // Apply karat filter
  //     if (selectedOptions.Karat && selectedOptions.Karat.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Karat.includes(product.karat)
  //       );
  //     }

  //     // Apply metal filter
  //     if (selectedOptions.Metal && selectedOptions.Metal.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Metal.includes(product.metal)
  //       );
  //     }

  //     // Apply type filter
  //     if (selectedOptions.Type && selectedOptions.Type.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Type.includes(product.type)
  //       );
  //     }
  //     if (selectedOptions.Weight && selectedOptions.Weight.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Weight.includes(product.weightRange)
  //       );
  //     }

  //     // Apply style filter
  //     if (selectedOptions.Style && selectedOptions.Style.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Style.includes(product.style)
  //       );
  //     }

  //     // Apply occasion filter
  //     if (selectedOptions.Occasion && selectedOptions.Occasion.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Occasion.includes(product.occasion)
  //       );
  //     }

  //     // Apply color filter
  //     if (selectedOptions.Color && selectedOptions.Color.length > 0) {
  //       filtered = filtered.filter((product: any) =>
  //         selectedOptions.Color.includes(product.color)
  //       );
  //     }

  //     setFilteredProducts(filtered);
  //   };

  //   applyFilters();
  // }, [selectedOptions]);

  useEffect(() => {
    if (selectedSortOption === "Price-Low To High") {
      const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        const priceA: any =
          a.discountPrice !== undefined ? a.discountPrice : a.productPrice;
        const priceB: any =
          b.discountPrice !== undefined ? b.discountPrice : b.productPrice;
        return priceA - priceB;
      });
      setFilteredProducts(sortedProducts);
    } else if (selectedSortOption === "Price-High To Low") {
      const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        const priceA: any =
          a.discountPrice !== undefined ? a.discountPrice : a.productPrice;
        const priceB: any =
          b.discountPrice !== undefined ? b.discountPrice : b.productPrice;
        return priceB - priceA;
      });
      setFilteredProducts(sortedProducts);
    } else if (selectedSortOption === "Newest First") {
      const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
        const product1: any = a.addDate;
        const product2: any = b.addDate;
        return product2 - product1;
      });
      setFilteredProducts(sortedProducts);
    }
    // Add other sorting options here
  }, [selectedSortOption]);

  const removeUnderscores = (str: any) => {
    return str.replace(/c-|_/g, " "); // Replace underscores with spaces
  };

  // Modified string
  const modifiedString = removeUnderscores(category);

  return (
    <div className="shop-product breadcrumb1">
      <div className="container">
        <MobileMainCategorySwiper />
        <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8 pt-4">
          <FilterSidebar
            data={data}
            filteredProducts={filteredProducts}
            onFilterChange={(options) => setSelectedOptions(options)}
            mobileFilter={mobileFilter}
            setMobileFilter={setMobileFilter}
            selectedOptions={selectedOptions}
            handleOptionSelect={handleOptionSelect}
            productsListRef={productsListRef}
            category={category}
          />
          <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3 no-scrollbar">
            <div className="">
              <p className="text-4xl font-bold uppercase">{modifiedString}</p>
            </div>
            <div className="flex justify-between mt-5">
              <div className="lg:w-[70%] sm:w-[100%]">
                Earrings are a form of self-expression. They effortlessly
                transform an outfit, framing the face with style and grace.
                <div className="flex flex-wrap lg:hidden sm:block md:hidden">
                  {Object.entries(selectedOptions).flatMap(
                    ([category, options]) =>
                      options.map((option: string, index: number) => (
                        <div
                          key={`${category}-${index}`}
                          className="border border-[#e26178] bg-[#fcff4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
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
              </div>

              <div className="hidden lg:block relative">
                <label className="font-semibold">Sort By: </label>
                <select
                  onChange={(e) => handleSortOptionChange(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option className="bg-[#f7f7f7]" value="All">
                    All
                  </option>
                  <option className="bg-[#f7f7f7]" value="Newest First">
                    Newest First
                  </option>
                  <option className="bg-[#f7f7f7]" value="Price-Low To High">
                    Price-Low To High
                  </option>
                  <option className="bg-[#f7f7f7]" value="Price-High To Low">
                    Price-High To Low
                  </option>
                </select>
                <div className="pointer-events-none ml-3 absolute inset-y-7 bottom-0 right-0 flex items-center px-2 text-gray-700">
                  <Icon.CaretDown size={18} />
                </div>
              </div>
            </div>

            {isLoading ? (
              <ProductSkeleton />
            ) : filteredProducts.length > 0 ? (
              <div
                className="list-product hide-product-sold grid md:grid-cols-2 lg:grid-cols-3 grid-cols-2 max-sm:gap-[20px] gap-[40px] mt-7 mb-5"
                ref={productsListRef}
              >
                {filteredProducts
                  .slice(pagesVisited, pagesVisited + productsPerPage)
                  .map((item: any) => {
                    return (
                      <div key={item.productId}>
                        <Product data={item} />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <>
                {!isLoading && (
                  <div
                    className="list-product hide-product-sold sm:gap-[30px] w-full gap-[40px] mt-7 mb-5 h-[500px]"
                    ref={productsListRef}
                  >
                    {/* <p>No products found.</p> */}

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Oops! No products found.
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      We couldn't find any products matching your current
                      filters.
                    </p>
                    <div className="suggestions mb-8">
                      {/* <h3 class="text-xl font-semibold text-gray-800 mb-4">Try exploring further:</h3>
                  <ul class="space-y-2">
                    <li class="text-base text-gray-600">Adjust your filters to broaden your search</li>
                    <li class="text-base text-gray-600">Check out our popular categories</li>
                    <li class="text-base text-gray-600">Browse our latest arrivals</li>
                    <li class="text-base text-gray-600">Explore our bestsellers</li>
                  </ul> */}
                    </div>
                    <div className="cta-buttons flex justify-center space-x-4">
                      <button className="btn-clear-filters bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                        Clear Filters
                      </button>
                      <button className="btn-explore bg-[#e26178] text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300 ">
                        Explore More
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          {pageCount > 1 && (
            <div className="list-pagination flex items-center md:mt-10 mt-7 mb-4">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel="..."
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
        {/* <WhpApp /> */}
      </div>

      <div className="fixed bg-[#e26178] bottom-0 left-0 z-10 w-[100%] lg:hidden sm:block md:hidden h-[52px] ">
        <div className="flex justify-center align-middle mt-4 text-white">
          <div className="mr-5" onClick={() => setSortOption(!sortOption)}>
            SortBy
          </div>
          <div className="flex" onClick={() => setMobileFilter(!mobileFilter)}>
            <p>Filter </p>
          </div>
        </div>
      </div>
      {sortOption && (
        <SortBy
          visible={sortOption}
          onClose={() => setSortOption(false)}
          onSortOptionChange={handleSortOptionChange}
        />
      )}
    </div>
  );
};
export default ShopBreadCrumb1;
