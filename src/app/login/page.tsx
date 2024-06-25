"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpVerification from "../OtpVerification";
import * as Yup from "yup";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Phone number is required"),
    // .matches(/^\+[1-9]\d{1,14}$/, "Invalid phone number"),
  });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: validationSchema, 
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 400);
    },
  });
  const handlekeyPress = (e: any) => {
    if (e.key === "Enter") {
      console.log("function isexcuted", e.target.value);
      const value = e.target.value;
      setPhoneNumber(value);
      formik.handleChange("phoneNumber")(value);
    }
  };

  return (
    <>
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col justify-center ">
            <div className="flex justify-center w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <form onSubmit={formik.handleSubmit}>
                <div className="phone">
                  <h1 className="font-semibold text-center">
                    ENTER PHONE NUMBER TO LOGIN
                  </h1>
                  <PhoneInput
                    country={"in"}
                    value={formik.values.phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                      formik.handleChange("phoneNumber")(value);
                    }}
                  />
                  {/* {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    // <div className="text-red-500">
                    //   {formik.errors.phoneNumber}
                    // </div>
                  ) : null} */}
                </div>
                <div className="mt-4">
                  <OtpVerification
                    phoneNumber={phoneNumber}
                    formikValues={formik.values}
                    errorMessage={formik.errors.phoneNumber}
                    onSubmit={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    isRegisterPage={false}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
