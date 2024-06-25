import React, { ChangeEvent, FC, useState } from "react";

interface FormData {
  recipientName: string;
  recipientMobile: string;
  recipientEmail: string;
  confirmEmail: string;
  message: string;
  senderName: string;
}

interface DeliveryProps {
  formData: FormData;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Delivery: FC<DeliveryProps> = ({ formData, handleChange }) => {
  const [errors, setErrors] = useState<FormData>({
    recipientName: "",
    recipientMobile: "",
    recipientEmail: "",
    confirmEmail: "",
    message: "",
    senderName: "",
  });

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validate = (name: string, value: string) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      if (name === "recipientEmail" || name === "confirmEmail") {
        if (!validateEmail(value)) {
          error = "Invalid email address";
        } else if (
          name === "confirmEmail" &&
          value !== formData.recipientEmail
        ) {
          error = "Email addresses do not match";
        }
      }
      if (name === "recipientMobile" && !/^\d+$/.test(value)) {
        error = "Invalid mobile number";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  return (
    <form className="p-4 md:mx-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="recipientName" className="block text-gray-700">
            Recipient's Name
          </label>
          <input
            id="recipientName"
            name="recipientName"
            type="text"
            value={formData.recipientName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-black px-2 py-2 w-full"
          />
          {errors.recipientName && (
            <p className="text-red-500">{errors.recipientName}</p>
          )}
        </div>
        <div>
          <label htmlFor="recipientMobile" className="block text-gray-700">
            Recipient's Mobile
          </label>
          <input
            id="recipientMobile"
            name="recipientMobile"
            type="text"
            value={formData.recipientMobile}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-black px-2 py-2 w-full"
          />
          {errors.recipientMobile && (
            <p className="text-red-500">{errors.recipientMobile}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="recipientEmail" className="block text-gray-700">
            Recipient's Email
          </label>
          <input
            id="recipientEmail"
            name="recipientEmail"
            type="email"
            value={formData.recipientEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-black px-2 py-2 w-full"
          />
          {errors.recipientEmail && (
            <p className="text-red-500">{errors.recipientEmail}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmEmail" className="block text-gray-700">
            Confirm Email
          </label>
          <input
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            value={formData.confirmEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-black px-2 py-2 w-full"
          />
          {errors.confirmEmail && (
            <p className="text-red-500">{errors.confirmEmail}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-gray-700">
          Leave a Message for the Recipient
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border border-black  px-2 py-2 w-full"
          rows={4}
        ></textarea>
        {errors.message && <p className="text-red-500">{errors.message}</p>}
      </div>
      <div>
        <label htmlFor="senderName" className="block text-gray-700">
          Sender's Name
        </label>
        <input
          id="senderName"
          name="senderName"
          type="text"
          value={formData.senderName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border border-black px-2 py-2 w-full"
        />
        {errors.senderName && (
          <p className="text-red-500">{errors.senderName}</p>
        )}
      </div>
    </form>
  );
};

export default Delivery;
