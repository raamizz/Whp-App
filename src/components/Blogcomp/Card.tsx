import React, { useState} from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { baseUrl } from "@/utils/constants";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";

const Card = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState<any>(null);

  const handleSubmit = async () => {
    event?.preventDefault();
    const response = await axios.post(`${baseUrl}/subscribe`, {
      phone: "+" + phoneNumber,
    });
    setMessage(response.data.message);
  };
  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required"),
  });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit();
        setSubmitting(false);
      }, 400);
    },
  });
  return (
    <div className="rounded-lg shadow-md p-6 mx-4 my-8 flex flex-col items-center md:flex-row md:items-start md:justify-between border bg-[#FDF6F7] ">
      <div className=" w-full">
        <h2 className="md:text-2xl text-lg font-bold mb-4">
          Always Stay in the Sparkling Loop
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and be the first to access exclusive
          jewelry insights, style tips, and dazzling updates.
        </p>
        <div className="input-block h-[52px] mt-2 relative">
          <form
            className="flex justify-center lg:justify-start"
            action="post"
            onSubmit={handleSubmit}
          >
            <div className="caption1">
              <PhoneInput
                country={"in"}
                value={formik.values.phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value);
                  formik.handleChange("phoneNumber")(value);
                }}
                inputStyle={{ width: "250px" }}
                // containerClass="custom-phone-input"
              />
            </div>

            <button
              className=" flex items-center justify-center relative ms-[-2rem] "
              type="submit"
            >
              <Icon.ArrowRight size={24} color="#e26178" />
            </button>
          </form>
        </div>
      </div>
      <div className="mt-6 md:mt-0 flex justify-center md:justify-end">
        <div className="relative">
          <span className="absolute -top-4 -left-4 text-[#E26178]">+</span>
          <span className="absolute -bottom-4 -right-4 text-[#E26178]">+</span>
          <div className="rounded-full w-28 h-28 flex items-center justify-center">
            <Image
              src="/images/blog/Vector.png"
              alt="abc"
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
            {/* <img src="/images/blog/Vector.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
