import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import Sheet from "react-modal-sheet";
import { Address } from "@/type/AddressType";
import { baseUrl, addAddress } from "@/utils/constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isForBillingAddress: boolean;
  onAddressAdded: (address: Address) => void;
}

const AddAddressMobile: React.FC<Props> = ({
  isOpen,
  onClose,
  isForBillingAddress,
  onAddressAdded,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const validationSchema = Yup.object().shape({
    pincode: Yup.string().required("Pincode is required"),
    full_address: Yup.string().required("Full address is required"),
    area: Yup.string().required("Area is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    landmark: Yup.string(),
    address_type: Yup.string().required("Address type is required"),
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    setFormError("");

    try {
      const cookieToken = localStorage.getItem("localtoken");
      const response = await axios.post<{ data: any }>(
        `${baseUrl}${addAddress}`,
        {
          pincode: values.pincode,
          full_address: values.full_address,
          area: values.area,
          country: values.country,
          state: values.state,
          city: values.city,
          landmark: values.landmark,
          address_type: isForBillingAddress ? "billing" : values.address_type,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );
      console.log("Response from backend:", response.data);
      onAddressAdded(response.data.data);
      onClose();
      formik.resetForm();
    } catch (error) {
      console.error("Error posting form data:", error);
      setFormError(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      pincode: "",
      full_address: "",
      area: "",
      country: "India",
      state: "",
      city: "",
      landmark: "",
      address_type: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[0.9]} initialSnap={0}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="flex justify-between items-center px-4 py-2">
            <h2 className="text-lg font-semibold">
              {isForBillingAddress
                ? "Add Billing Address"
                : "Add Shipping Address"}
            </h2>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </Sheet.Header>
        <Sheet.Content>
          <Sheet.Scroller>
            <div className="p-4">
              {formError && (
                <div className="text-red-500 mb-4">{formError}</div>
              )}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="full_address"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                        formik.errors.full_address
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("full_address")}
                    />
                    <label
                      htmlFor="full_address"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Full Address
                    </label>
                  </div>
                  {formik.errors.full_address && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.full_address}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="pincode"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                        formik.errors.pincode
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("pincode")}
                    />
                    <label
                      htmlFor="pincode"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Pincode
                    </label>
                  </div>
                  {formik.errors.pincode && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.pincode}
                    </div>
                  )}
                </div>

                {/* <div className="mb-4">
                  <div className="relative">
                    <input
                      id="area"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                        formik.errors.area
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("area")}
                    />
                    <label
                      htmlFor="area"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Area
                    </label>
                  </div>
                  {formik.errors.area && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.area}
                    </div>
                  )}
                </div> */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="state"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                        formik.errors.state
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("state")}
                    />
                    <label
                      htmlFor="state"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      State
                    </label>
                  </div>
                  {formik.errors.state && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.state}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="city"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                        formik.errors.city
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("city")}
                    />
                    <label
                      htmlFor="city"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      City
                    </label>
                  </div>
                  {formik.errors.city && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.city}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      id="country"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                        formik.errors.country
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("country")}
                    />
                    <label
                      htmlFor="country"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Country
                    </label>
                  </div>
                  {formik.errors.country && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.country}
                    </div>
                  )}
                </div>
                {/* <div className="mb-4">
                  <div className="relative">
                    <input
                      id="landmark"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                        formik.errors.landmark
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-0 focus:border-rose-400 peer`}
                      type="text"
                      placeholder=" "
                      {...formik.getFieldProps("landmark")}
                    />
                    <label
                      htmlFor="landmark"
                      className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-rose-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Landmark (optional)
                    </label>
                  </div>
                  {formik.errors.landmark && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.landmark}
                    </div>
                  )}
                </div> */}

                <div className="mb-4">
                  <label htmlFor="address_type" className="font-medium">
                    Address Type:
                  </label>
                  <div className="mt-2 flex flex-wrap">
                    <div className="flex items-center mr-4 mb-2">
                      <input
                        type="radio"
                        id="home"
                        name="address_type"
                        value="home"
                        checked={formik.values.address_type === "home"}
                        onChange={formik.handleChange}
                        className="form-radio"
                      />
                      <label htmlFor="home" className="ml-2">
                        Home
                      </label>
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                      <input
                        type="radio"
                        id="work"
                        name="address_type"
                        value="work"
                        checked={formik.values.address_type === "work"}
                        onChange={formik.handleChange}
                        className="form-radio"
                      />
                      <label htmlFor="work" className="ml-2">
                        Work
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="other"
                        name="address_type"
                        value="other"
                        checked={formik.values.address_type === "other"}
                        onChange={formik.handleChange}
                        className="form-radio"
                      />
                      <label htmlFor="other" className="ml-2">
                        Other
                      </label>
                    </div>
                  </div>
                  {formik.errors.address_type && (
                    <div className="text-red-500 mt-1">
                      {formik.errors.address_type}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`my-2 px-4 py-2 text-center w-full inline-block text-white bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] border border-transparent rounded-md hover:bg-rose-500 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Add"}
                </button>
              </form>
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default AddAddressMobile;
