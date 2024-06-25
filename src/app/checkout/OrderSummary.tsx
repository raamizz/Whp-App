import React from "react";
import OrderSummaryProducts from "./OrderSummaryProducts";

interface OrderSummaryProps {

  totalDiscount: number;
  totalCart: number;
  cartItems: any[];
  isBuyNow: boolean;

}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalDiscount,
  totalCart,
  cartItems,
  isBuyNow,

}) => {
  let totalPrice=totalCart-totalDiscount
  return (
    <div className="">
      <OrderSummaryProducts cartItems={cartItems} />
      <div className="bg-gray-100 p-2 ">
        <div className="">
          <div className="flex justify-between font-medium">
            <h3>Subtotal</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(totalCart.toString())))}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Discount</h3>
            <h3>
              ₹
              {Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(totalDiscount.toString())))}
            </h3>
          </div>
          <div className="flex justify-between font-medium">
            <h3>Shipping Charges</h3>
            <h3>₹0</h3>
          </div>
          <div className="flex justify-between font-bold">
            <h3 className="text-gray-800">Total Price</h3>
            <h3>₹{Intl.NumberFormat("en-IN", {
                minimumFractionDigits: 2,
              }).format(Math.round(parseInt(totalPrice.toString())))}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
