import React from "react";
import Image from "next/image";

interface OrderSummaryProductsProps {
  cartItems: any[];
  isBuyNow: boolean;

}

const OrderSummaryProducts: React.FC<OrderSummaryProductsProps> = ({
  cartItems,
  isBuyNow,

}) => {
  const displayedItems = isBuyNow ? cartItems.slice(0, 1) : cartItems;


  return (
    <div className="list-product-main w-full hidden lg:block mb-2">
      {displayedItems?.length < 1 ? (
        <p className="text-xl text-center font-medium pt-3">
          There is nothing here!
        </p>
      ) : (
        displayedItems?.map((product, index) => (
          <div
            className="border border-gray-200 flex w-full items-center mb-2"
            key={index}
          >
            <Image
              src={product.image}
              width={100}
              height={200}
              alt={product.name}
              className="rounded-lg object-cover"
            />
            <div className="p-4 flex flex-col">
              <div className="text-title">
                {product.name} X {product.quantity}
              </div>
              <div className="text-title text-start">
                ₹
                {Intl.NumberFormat("en-IN", {
                  minimumFractionDigits: 2,
                }).format(Math.round(parseInt(product.price.toString())))}
              </div>
              <h3>Estimated Delivery Date: 29/2/2024</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSummaryProducts;
