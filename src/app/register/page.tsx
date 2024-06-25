"use client";
import React, { useState } from "react";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpVerification from "../OtpVerification";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Required"),
      lastName: Yup.string()
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
       setSubmitted(true);
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const handlePhoneChange = (value: string) => {
   const formattedPhoneNumber = value.startsWith("+") ? value : `+${value}`;
   setPhoneNumber(formattedPhoneNumber);
   formik.setFieldValue("phoneNumber", formattedPhoneNumber);
  };

  return (
    <>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">WHP Signup</div>

              <form className="md:mt-7 mt-4">
                <div className="firstname ">
                  <label htmlFor="firstName" className="font-medium">
                    First Name
                  </label>
                  <input
                    className="border border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    placeholder="FirstName"
                    id="firstName"
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    disabled={submitted}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="lastname mt-5">
                  <label htmlFor="lastName" className="font-medium">
                    Last Name
                  </label>
                  <input
                    className="border border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    placeholder="LastName"
                    id="lastName"
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    disabled={submitted}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500">{formik.errors.lastName}</div>
                  ) : null}
                </div>
                <div className="Email mt-5">
                  <label htmlFor="email" className="font-medium">
                    Email Address
                  </label>
                  <input
                    className="border border-gray-300 px-4 pt-3 pb-3 w-full rounded-lg"
                    placeholder="Email"
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    disabled={submitted}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mt-5">
                  <label htmlFor="email" className="font-medium">
                    Phone Number
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    containerClass="border h-full w-full rounded-lg"
                    inputStyle={{
                      marginTop: "1rem",
                      // backgroundColor: "#f3f4f6",
                      // border: "1px solid #e5e7eb",
                      // borderRadius: "0.375rem",
                      width: "100%",
                      height: "3rem",
                    }}
                    containerStyle={{
                      // marginTop: "1rem",
                      height: "3rem",
                      width: "100%",
                    }}
                    buttonStyle={{
                      height: "3rem",
                    }}
                    disabled={submitted}
                  />
                </div>
              </form>

              <div className="block-button md:mt-7 mt-4">
                {/* <button className="button-main">Generate Otp</button> */}
                <div className="mt-4">
                  <OtpVerification
                    phoneNumber={phoneNumber}
                    formikValues={formik.values}
                    onSubmit={formik.handleSubmit}
                    isRegisterPage={true}
                  />
                </div>
              </div>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                
                <div className="block-button md:mt-7 mt-4">
                  <Link href={"/login"} className="button-main">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
