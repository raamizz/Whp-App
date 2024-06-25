"use client"
import React, { useState, useEffect, useRef } from "react";
import { baseUrl, contactForm } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FlashAlert from "@/components/Other/FlashAlert";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

interface Props {
  title: string
  closeModal: () => void;
}
const BookExchangeModal: React.FC<Props> = ({ title, closeModal }) => {
  const inputRef = useRef<any>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "success" | "info">("success");
  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };
  const handleChange = (e: any) => {
    // Handle regular input change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })
  const handleOnClose = (e: any) => {
    if (e.target.id === "container") {
      closeModal();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("formdata", formData.email);
    try {
      setIsLoading(true);
      const client = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        cache: new InMemoryCache(),
      });

      const STORE_CUSTOMER_QUERY = gql`
        mutation StoreCustomerQueries($customerQueries: [CustomerQueriesInput!]!) {
          StoreCustomerQueries(customerQueries: $customerQueries) {
            message
          }
        }
      `;

      const { data } = await client.mutate({
        mutation: STORE_CUSTOMER_QUERY,
        variables: {
          customerQueries: [
            {
              name: formData.name,
              email: formData.email,
              number: phone,
              message: formData.message,
            },
          ],
        },
      })

      console.log(data,"Dataaa");

      // const response = await axios.post(`${baseUrl}${contactForm}`, {
      //   name: formData.name,
      //   email: formData.email,
      //   number: phone,
      //   message: formData.message,
      // });
      setMessage("Your Request Has Been Submitted. We Will Contact You Soon");
      setType("success");
    } catch (error) {
      setMessage("Error in Booking Appointment");
      setType("error");
    } finally {
      setIsLoading(false);


    }
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setPhone("+91");
      closeModal()
    }, 2000);
  };
  if (isLoading) {
    return (
      <div className="backdrop fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="loading-container flex justify-center items-center h-full">
          <Image
            src="/dummy/loader.gif"
            alt={"loader"}
            height={50}
            width={50}
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm z-50 flex justify-center items-center"
      id="container"
      onClick={handleOnClose}
    >
      <div className="max-w-md w-[65%] max-sm:w-[70%] bg-white p-6 rounded-md shadow-md">
        <div className="float-right cursor-pointer" onClick={() => closeModal()}><Icon.X size={25} /></div>
        <h2 className="text-xl font-semibold mb-4 text-[#e26178]">
          {title}
        </h2>

        <form onSubmit={handleSubmit} ref={inputRef}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              defaultValue={""}

              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              defaultValue={""}
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>

            <PhoneInput
              country={"in"}
              value={phone}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
                boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)", // shadow-sm
                borderColor: "#d1d5db", // border-gray-300
                borderRadius: "0.375rem", // rounded-md
                fontSize: "0.875rem", // sm:text-sm
              }}
              containerStyle={{
                width: "100%",
              }}
              buttonStyle={{
                borderColor: "#d1d5db", // border-gray-300 for the dropdown button
              }}
            // containerClass="custom-phone-input"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message:
            </label>
            <input
              type="text"
              defaultValue={""}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-2 focus:ring-[#e26178] focus:border-[#e26178] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#e26178] hover:bg-[#e26178] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        {/* 
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <p className="text-center">Your Request Has Been Submitted</p>
              <p className="text-center">We Will Contact You Soon</p>
            </div>
          </div>
        )} */}
      </div>
      {message && <FlashAlert message={message} type={type} />}
    </div>
  );
};

export default BookExchangeModal;
