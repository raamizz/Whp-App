import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import Skeleton from "react-loading-skeleton";

interface CartItemsProps {
  cartItems: any[];
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number, quantity: number) => void;
  loading: boolean;
}

const CartItems: React.FC<CartItemsProps> = ({
  cartItems,
  handleQuantityChange,
  removeFromCart,
  loading,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredCartItems = cartItems.filter((item) => item.quantity > 0);
  return (
    <div>
      <h1 className="text-2xl">Your Shopping Bag</h1>
      <div className="list-product-main w-full mt-3 border border-b-0">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </div>
        ) : cartItems?.length < 1 ? (
          <p className="text-xl text-center font-medium text-[#e26178] animate-pulse pt-9">
            There is nothing here!
          </p>
        ) : (
          filteredCartItems?.map((product) => (
            <CartItem
              key={product?.productId}
              product={product}
              handleQuantityChange={handleQuantityChange}
              removeFromCart={removeFromCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CartItems;
