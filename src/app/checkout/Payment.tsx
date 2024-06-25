// Payment.tsx
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { CreditCard } from "@phosphor-icons/react";
import axios from "axios";
import { Address } from "@/type/AddressType";
import { useCart } from "@/context/CartContext";
import ReactLoading from "react-loading";
import Cookie from "js-cookie";
import { baseUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface PaymentProps {
  orderPlaced: boolean;
  selectedPaymentMethod: string;
  handlePaymentMethodChange: (event: ChangeEvent<HTMLInputElement>) => void;
  totalCart: number;
  onOrderComplete: (items: any) => void;
  selectedShippingAddress: Address | null;
  selectedBillingAddress: Address | null;
  handleProceed: () => void;
  mappedCartItems: any[];
  couponCode: string;
  totalDiscount: number; // Add the totalDiscount prop
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const Payment: React.FC<PaymentProps> = ({
  orderPlaced,
  selectedPaymentMethod,
  handlePaymentMethodChange,
  totalCart,
  onOrderComplete,
  selectedShippingAddress,
  selectedBillingAddress,
  handleProceed,
  mappedCartItems,
  couponCode,
  totalDiscount,
  setCartItems,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const cookieToken = Cookie.get("localtoken");
  const router = useRouter();
  const { removeFromCart } = useCart();

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay SDK loaded");
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const orderUrl = "/api/razorpay";
      const response = await axios.post(orderUrl, { amount: totalCart * 100 });
      console.log(response);
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: "rzp_test_QZVTreX3fAEZto",
        amount: amount.toString(),
        currency: currency,
        name: "WHP Jewellers",
        description: "Transaction",
        order_id: order_id,
        handler: async function (response: any) {
          try {
            setLoading(true);
            // Prepare the data to be sent to the API
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;
            const orderData = {
              paymentDetails: {
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature,
              },
              shippingAddress: selectedShippingAddress
                ? {
                    addressId: selectedShippingAddress.address_id || null,
                    addressType: selectedShippingAddress.address_type,
                    fullAddress: selectedShippingAddress.full_address,
                    country: selectedShippingAddress.country,
                    state: selectedShippingAddress.state,
                    city: selectedShippingAddress.city,
                    landmark: selectedShippingAddress.landmark,
                    pincode: selectedShippingAddress.pincode.toString(),
                  }
                : {},
              billingAddress: selectedBillingAddress
                ? {
                    addressId: selectedBillingAddress.address_id || null,
                    addressType: selectedBillingAddress.address_type,
                    fullAddress: selectedBillingAddress.full_address,
                    country: selectedBillingAddress.country,
                    state: selectedBillingAddress.state,
                    city: selectedBillingAddress.city,
                    landmark: selectedBillingAddress.landmark,
                    pincode: selectedBillingAddress.pincode.toString(),
                  }
                : {},
              productDetails: {
                products: mappedCartItems.map((item) => ({
                  productId: item.productId.toString(),
                  productAmount: item.price,
                  quantity: item.quantity.toString(),
                  productTotal: (item.price * item.quantity).toString(),
                  discountAmount: "0", // Replace with the actual discount amount if available
                  discountedTotal: (item.price * item.quantity).toString(), // Replace with the discounted total if available
                })),
                coupons: {
                  couponCode: couponCode, // Replace with the actual coupon code if available
                  discountPrice: totalDiscount, // Replace with the actual discount price if available
                },
                productTotal: totalCart.toString(),
                discountedTotal: (totalCart - totalDiscount).toString(),
                shippingCharges: "10",
              },
            };

            console.log(orderData, "orderData");

            const apiResponse = await axios.post(
              `${baseUrl}/orders`,
              orderData,
              {
                headers: {
                  Authorization: `Bearer ${cookieToken}`,
                },
              }
            );
            console.log(apiResponse.data);
            // Handle the response as needed

            // Call the onOrderComplete function after the API call is successful
            onOrderComplete(setCartItems);
          } catch (error) {
            console.error("Error placing order:", error);
          } finally {
            setLoading(false);
            router.push("/profile");
          }
        },
        prefill: {
          name: "Test Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "WHP Jewllers",
        },
        theme: {
          color: "#fb7185",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtherPaymentGateway = () => {
    // Handle other payment gateway logic
    alert("Other payment gateway selected");
    // Implement the logic for the other payment gateway here
    // Once the payment is successful, call the onOrderComplete function
  };
  const handleCodPayment = async () => {
    setLoading(true);
    try {
      try {
        setLoading(true);
        // Prepare the data to be sent to the API
        const orderData = {
          shippingAddress: selectedShippingAddress
            ? {
                addressId: selectedShippingAddress.address_id || null,
                addressType: selectedShippingAddress.address_type,
                fullAddress: selectedShippingAddress.full_address,
                country: selectedShippingAddress.country,
                state: selectedShippingAddress.state,
                city: selectedShippingAddress.city,
                landmark: selectedShippingAddress.landmark,
                pincode: selectedShippingAddress.pincode.toString(),
              }
            : {},
          billingAddress: selectedBillingAddress
            ? {
                addressId: selectedBillingAddress.address_id || null,
                addressType: selectedBillingAddress.address_type,
                fullAddress: selectedBillingAddress.full_address,
                country: selectedBillingAddress.country,
                state: selectedBillingAddress.state,
                city: selectedBillingAddress.city,
                landmark: selectedBillingAddress.landmark,
                pincode: selectedBillingAddress.pincode.toString(),
              }
            : {},
          productDetails: {
            products: mappedCartItems.map((item) => ({
              productId: item.productId.toString(),
              productAmount: item.price,
              quantity: item.quantity.toString(),
              productTotal: (item.price * item.quantity).toString(),
              discountAmount: "0", // Replace with the actual discount amount if available
              discountedTotal: (item.price * item.quantity).toString(), // Replace with the discounted total if available
            })),
            coupons: {
              couponCode: couponCode, // Replace with the actual coupon code if available
              discountPrice: totalDiscount, // Replace with the actual discount price if available
            },
            productTotal: totalCart.toString(),
            discountedTotal: (totalCart - totalDiscount).toString(),
            shippingCharges: "10",
          },
        };

        console.log(orderData, "orderData");

        const apiResponse = await axios.post(`${baseUrl}/orders`, orderData, {
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        });
        console.log(apiResponse.data);
        // Handle the response as needed

        // Call the onOrderComplete function after the API call is successful
        onOrderComplete(setCartItems);
      } catch (error) {
        console.error("Error placing order:", error);
      } finally {
        setLoading(false);
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  const handlePayment = () => {
    if (selectedPaymentMethod === "razorpay") {
      console.log("razorpay should initiate");
      handleRazorpayPayment();
    } else if (selectedPaymentMethod === "COD") {
      handleCodPayment();
    } else if (selectedPaymentMethod === "otherPaymentGateway") {
      handleOtherPaymentGateway();
    } else {
      handleProceed();
    }
  };

  // Check if totalCart is a valid number
  const isValidTotalCart = !isNaN(totalCart) && totalCart > 0;
  if (loading)
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
  return (
    <div className="flex flex-col lg:w-[50rem] md:w-[30rem] sm:w-[30rem] gap-5">
      <h1 className="text-2xl">Payment Method</h1>
      <div className="flex flex-col gap-3">
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="razorpayPayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/upi-icon.png"
              alt="upi"
              width={30}
              height={30}
              objectFit="fill"
            />
            Cash On Delivery(COD)
          </label>
          <input
            type="radio"
            id="razorpayPayment"
            name="paymentOption"
            value="COD"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "COD"}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="razorpayPayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/upi-icon.png"
              alt="upi"
              width={30}
              height={30}
              objectFit="fill"
            />
            Razorpay (UPI, Cards)
          </label>
          <input
            type="radio"
            id="razorpayPayment"
            name="paymentOption"
            value="razorpay"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "razorpay"}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="otherPaymentGateway"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <CreditCard className="text-2xl text-red-600" />
            Other Payment Gateway
          </label>
          <input
            type="radio"
            id="otherPaymentGateway"
            name="paymentOption"
            value="otherPaymentGateway"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "otherPaymentGateway"}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="paypalPayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/paypal-icon.png"
              alt="PayPal"
              width={30}
              height={30}
              objectFit="fill"
            />
            PayPal
          </label>
          <input
            type="radio"
            id="paypalPayment"
            name="paymentOption"
            value="paypal"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
        </div>
        <div className="flex items-center border border-gray-200 p-4 rounded-md justify-between">
          <label
            htmlFor="stripePayment"
            className="flex gap-2 cursor-pointer font-medium"
          >
            <Image
              src="/images/other/stripe-icon.png"
              alt="Stripe"
              width={30}
              height={30}
              objectFit="fill"
            />
            Stripe (Credit/Debit Cards)
          </label>
          <input
            type="radio"
            id="stripePayment"
            name="paymentOption"
            value="stripe"
            className="appearance-none w-5 h-5 rounded-full border-2 border-gray-400 checked:bg-red-600 checked:border-transparent focus:outline-none focus:border-red-500 cursor-pointer"
            checked={selectedPaymentMethod === "stripe"}
            onChange={handlePaymentMethodChange}
          />
        </div>
      </div>
      <h1 className="text-red-950 font-medium">AVAILABLE OFFERS</h1>
      <div>
        <div>
          -10% off on HDFC Bank Credit Card. Use{" "}
          <span className="font-bold">HDFC10</span>
          <span className="text-red-600 underline">View more Offers</span>
        </div>
        <div>
          -7% off on SBI Bank Credit Card. Use{" "}
          <span className="font-bold">SBI7</span>{" "}
          <span className="text-red-600 underline">View more Offers</span>
        </div>
      </div>
      <button
        onClick={handlePayment}
        className="bg-red-600 text-white px-4 py-2 rounded"
        disabled={
          !selectedShippingAddress ||
          !selectedBillingAddress ||
          !isValidTotalCart ||
          !selectedPaymentMethod
        }
      >
        Place Order
      </button>
    </div>
  );
};

export default Payment;
