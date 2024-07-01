"use client";
import { ProductData, ProductType } from "@/type/ProductType";
import Image from "next/image";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { FaStar } from "react-icons/fa6";
import StarRating from "@/components/Other/StarRating";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl, storeReviews, graphqlbaseUrl } from "@/utils/constants";
import Cookies from "js-cookie";
import FlashAlert from "@/components/Other/FlashAlert";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
interface Props {
  product: ProductData;
}

const CustomStar: React.FC<{
  index: number;
  rating: number;
  hoverRating: number | null;
  onMouseMove: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number
  ) => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent<SVGElement, MouseEvent>, index: number) => void;
}> = ({ index, rating, hoverRating, onMouseMove, onMouseLeave, onClick }) => {
  const getFillPercentage = () => {
    let roundedRating;
    if (hoverRating !== null) {
      roundedRating = Math.round(hoverRating * 2) / 2;
      if (roundedRating >= index + 1) {
        return 100;
      } else if (roundedRating > index && roundedRating < index + 1) {
        return (roundedRating - index) * 100;
      }
    } else {
      roundedRating = Math.round(rating * 2) / 2;
      if (roundedRating >= index + 1) {
        return 100;
      } else if (roundedRating > index && roundedRating < index + 1) {
        return (roundedRating - index) * 100;
      }
    }
    return 0;
  };
  return (
    <svg
      key={index}
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="star"
      onClick={(e) => onClick(e, index)}
      onMouseMove={(e) => onMouseMove(e, index)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <defs>
        <linearGradient id={`gradient-${index}`}>
          <stop offset={`${getFillPercentage()}%`} stopColor="gold" />
          <stop offset={`${getFillPercentage()}%`} stopColor="white" />
        </linearGradient>
      </defs>
      <polygon
        points="12 2 15 8 21 8 16 12 18 18 12 14 6 18 8 12 3 8 9 8 12 2"
        fill={`url(#gradient-${index})`}
        stroke="gold"
      />
    </svg>
  );
};
const ReviewsAndRatings: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const [review, setReview] = useState<string>("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState<any>("");
  const [type, setType] = useState<any>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  let loggedIn = null;
  if (typeof window != "undefined") {
    loggedIn = localStorage.getItem("isLoggedIn");
  }
  // Function to handle file selection
  const handleImageChange = (event: any) => {
    const imageFiles = event.target.files;
    if (imageFiles) {
      const selectedImagesArray = Array.from(imageFiles).map((file: any) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...selectedImagesArray,
      ]);
    }
  };

  const handleLogIn = () => {
    router.push("/login");
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleReveiwChange = (e: any) => {
    console.log("Reveiwes Change", e.target.value);
    setReview(e.target.value);
  };
  const handleMouseMove = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const hoveredRating = index + x / width;
    setHoverRating(hoveredRating);
  };

  const handleReviews = async (e: any) => {
    e?.preventDefault();
    try {
      const cookieToken = localStorage.getItem("localtoken");
      const getAuthHeaders = () => {
        if (!cookieToken) return null;
        return {
          authorization: `Bearer ${cookieToken}`,
        };
      };

      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        headers: getAuthHeaders(),
        cache: new InMemoryCache(),
      });

      const ADD_CUSTOMER_REVIEWS = gql`
        mutation StoreProductReview($productReview: ProductReviewInput!) {
          StoreProductReview(productReview: $productReview) {
            message
            code
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: ADD_CUSTOMER_REVIEWS,
        variables: {
          productReview: {
            productId: product.productDetails.productId,
            rating: rating,
            review: review,
          },
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      if (data.StoreProductReview.code == 200) {
        setType("success");
        setMessage(data.StoreProductReview.message);
      } else {
        setType("error");
        setMessage(data.StoreProductReview.message);
      }
      setRating(0);
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "An error occurred");
      setType("error");
      console.log("Error Occurred", error);
    } finally {
      setReview("");
    }
  };

  const handleClick = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const calculatedRating = index + x / width;
    const roundedRating = Math.round(calculatedRating * 2) / 2; // Round to nearest 0.5
    setRating(roundedRating);
    console.log(`Selected rating: ${roundedRating}`);
  };

  const handleMouseEnter = (ratingValue: number) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="mt-7 mb-7">
      <div className="flex bg-[#E1DCDD29] p-2 mx-4 mb-3">
        <div
          className={`px-4 py-2 cursor-pointer text-lg ${
            activeTab === "tab1" ? "underline font-bold" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Reviews
        </div>
        <div
          className={`px-4 py-2 cursor-pointer text-lg ${
            activeTab === "tab2" ? "underline font-bold " : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          FAQs
        </div>
      </div>
      <div>
        {activeTab === "tab1" && (
          <div className="flex flex-wrap justify-between mx-4">
            <div className="lg:w-[40%] max-sm:w-[100%] max-md:w-[60%] h-[55%] ">
              {product?.productDetails?.review?.map((item: any) => (
                <div
                  className="mt-4 rounded-3xl bg-[#faf9f9] p-6"
                  key={item.id}
                >
                  <div className="flex">
                    <div className="m-2">
                      <Image
                        className="rounded-full"
                        src={item.customer?.profile_picture}
                        alt="profile_picture"
                        height={75}
                        width={75}
                      />
                    </div>
                    <div className="ml-2">
                      <p className="">{item?.customer?.fullname}</p>
                      <StarRating stars={item.rate} />
                      <p>{item.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 lg:w-[35%] max-sm:w-[100%]">
              <div className="flex justify-between items-center">
                <div className="">
                  <p>Write a Review</p>
                </div>
                <div style={{ display: "flex" }}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <CustomStar
                      key={index}
                      index={index}
                      rating={rating}
                      hoverRating={hoverRating}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={handleClick}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your text here"
                    id="name"
                    name="name"
                    className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm bg-[#E1DCDD29] h-[150px] rounded-md"
                    required
                    onChange={(e) => handleReveiwChange(e)}
                  />
                </div>
                {/* <div className="relative mt-3">
                  <input
                    placeholder="Upload Images"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm bg-[#E1DCDD29] rounded-md"
                    required
                  />
                </div> */}
                <div className="flex flex-wrap">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative mr-4 mb-4">
                      <Image
                        src={image}
                        alt={`Preview ${index}`}
                        className="max-w-xs max-h-48 rounded-md"
                        height={100}
                        width={100}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full -mt-1 -mr-1"
                      >
                        <Icon.X />
                      </button>
                    </div>
                  ))}
                </div>
                {loggedIn === "true" ? (
                  <button
                    type="submit"
                    onClick={(e) => handleReviews(e)}
                    className="w-[50%] mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d]  hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={() => handleLogIn()}
                    className="w-[50%] mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Please LogIn
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === "tab2" && <div>this is second tab</div>}
        {message && <FlashAlert message={message} type={type} />}
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
