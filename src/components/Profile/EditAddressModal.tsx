import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import * as Icon from "@phosphor-icons/react";
import { graphqlbaseUrl } from "@/utils/constants";

interface Props {
  closeModal: any;
  singleAddress: any;
}
const EditAddressModal: React.FC<Props> = ({ closeModal, singleAddress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const validationSchema = Yup.object().shape({
    pincode: Yup.string().required("Pincode is required"),
    full_address: Yup.string().required("Full address is required"),
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
      console.log("Submitting form with values:", values);
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

      const EDIT_CUSTOMER_ADDRESS = gql`
        mutation AddCustomerAddresses(
          $customerAddresses: [AddCustomerAddressesInput!]!
        ) {
          AddCustomerAddresses(customerAddresses: $customerAddresses) {
            message
          }
        }
      `;
      const { data } = await client.mutate({
        mutation: EDIT_CUSTOMER_ADDRESS,
        variables: {
          customerAddresses: [
            {
              address_type: values.address_type,
              full_address: values.full_address,
              country: values.country,
              state: values.state,
              city: values.city,
              pincode: values.pincode,
              landmark: values.landmark, // include landmark if necessary
            },
          ],
        },
        context: {
          headers: getAuthHeaders(),
        },
        fetchPolicy: "no-cache",
      });
      closeModal();
      formik.resetForm();

      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error posting form data:", error);
      setFormError(
        "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };

  const formik = useFormik({
    initialValues: {
      pincode: singleAddress?.pincode || "",
      full_address: singleAddress?.full_address || "",
      country: singleAddress?.country || "",
      state: singleAddress?.state || "",
      city: singleAddress?.city || "",
      landmark: singleAddress?.landmark || "",
      address_type: singleAddress?.address_type || "home",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 sm:p-8 flex flex-col justify-between z-50 rounded-xl max-w-full sm:max-w-lg mx-4 max-h-[80vh] overflow-y-auto no-scrollbar">
        <button onClick={closeModal} className="self-end">
          <Icon.X size={25} />
        </button>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Edit Address</h2>
          {formError && <div className="text-red-500 mb-4">{formError}</div>}
          <div className="mb-4">
            <div className="relative">
              <input
                id="pincode"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.pincode ? "border-red-500" : "border-gray-300"
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
            {/* {formik.errors.pincode && (
              <div className="text-red-500 mt-1">{formik.errors.pincode}</div>
            )} */}
          </div>
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
            {/* {formik.errors.full_address && (
              <div className="text-red-500 mt-1">{formik.errors.full_address}</div>
            )} */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <div className="relative">
                <input
                  id="country"
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.country ? "border-red-500" : "border-gray-300"
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
              {/* {formik.errors.country && (
                <div className="text-red-500 mt-1">{formik.errors.country}</div>
              )} */}
            </div>
            <div>
              <div className="relative">
                <input
                  id="state"
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.state ? "border-red-500" : "border-gray-300"
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
              {/* {formik.errors.state && <div className="text-red-500 mt-1">{formik.errors.state}</div>} */}
            </div>
            <div>
              <div className="relative">
                <input
                  id="city"
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                    formik.errors.city ? "border-red-500" : "border-gray-300"
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
              {/* {formik.errors.city && <div className="text-red-500 mt-1">{formik.errors.city}</div>} */}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <input
                id="landmark"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none ${
                  formik.errors.landmark ? "border-red-500" : "border-gray-300"
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
            {/* {formik.errors.landmark && (
              <div className="text-red-500 mt-1">{formik.errors.landmark}</div>
            )} */}
          </div>
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
            {/* {formik.errors.address_type && (
              <div className="text-red-500 mt-1">{formik.errors.address_type}</div>
            )} */}
          </div>
          <button
            type="submit"
            className={`my-2 px-4 py-2 text-center w-full inline-block text-white bg-rose-400 border border-transparent rounded-md hover:bg-rose-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;
