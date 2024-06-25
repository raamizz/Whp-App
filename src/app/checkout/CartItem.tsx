import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useCouponContext } from "@/context/CouponContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductForWishlistLoggedOut } from "@/type/ProductType";
import Skeleton from "react-loading-skeleton";
import Loader from "../blog/Loader";

interface CartItemProps {
  product: {
    productId: number;
    quantity: number;
    productPrice: string;
    discountPrice: any | string;
    discountValue: string;
    name: string;
    price: number;
    image: string;
    url: string;
  };
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number, quantity: number) => void;
}

interface ProductForWishlistLoggedIn {
  productId: number;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateCartQuantity, removeFromCart,loading } = useCart();
  const { totalDiscount, updateTotalDiscount } = useCouponContext();
  const { addToWishlist } = useWishlist();
  const { isLoggedIn } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      let discount = 0;
      updateTotalDiscount(discount);
      updateCartQuantity(product.productId, newQuantity);
    } else {
      removeFromCart(product.productId);
    }
  };

  const price = product.price * product.quantity;
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
  }).format(Math.round(parseInt(price.toString())));

  const handleRemoveFromCart = () => {
    setShowModal(true);
  };

  const handleAddToWishlist = () => {
    let discount = 0;
      updateTotalDiscount(discount);
    if (isLoggedIn) {
      const productToAdd: ProductForWishlistLoggedIn = {
        productId: product.productId,
      };
      addToWishlist(productToAdd);
    } else {
      const productToAdd: ProductForWishlistLoggedOut = {
        productId: product.productId,
        title: product.name,
        productPrice: product.productPrice,
        discountPrice: product.price,
        discountValue: product.discountValue,
        image_path: product.image,
        url: product.url,
      };
      addToWishlist(productToAdd);
    }

    removeFromCart(product.productId);
    setShowModal(false);
  };

  const handleJustRemove = () => {
    let discount = 0;
    updateTotalDiscount(discount);
    removeFromCart(product.productId);
    setShowModal(false);
  };

  return (
    <div>
      {isloading ? (
        <div className="justify-between p-4 border rounded-lg border-gray-400 flex md:flex-row lg:flex-row lg:w-full md:w-full items-center mb-4">
          <Skeleton height={100} width={100} />
          <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3 ">
            <div className="py-4">
              <Skeleton width={200} height={20} />
              <div className="flex">
                <Skeleton width={100} height={20} />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/6 flex flex-col items-center justify-center">
            <Skeleton width={100} height={20} />
            <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between md:w-[100px] flex-shrink-0 w-20">
              <Skeleton width={28} height={28} />
              <Skeleton width={28} height={28} />
              <Skeleton width={28} height={28} />
            </div>
          </div>
        </div>
      ) : (
        <div className="justify-between p-4 border-b flex md:flex-row lg:flex-row lg:w-full md:w-full items-center mb-4">
          <Image
            src={product?.image}
            width={100}
            height={200}
            alt="image"
            className=" object-cover bg-[#f7f7f7]"
            // placeholder="blur"
            // blurDataURL="/images/other/Logo.png"
          />
          <div className="flex flex-col md:flex-row lg:flex-row lg:w-2/3 ">
            <div className="py-4">
              <div className="text-title">{product.name}</div>
              <div className="flex">
                <div
                  className="text-sm max-md:text-base text-red-600 cursor-pointer hover:text-black duration-500"
                  onClick={handleRemoveFromCart}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/6 flex flex-col items-center justify-center">
            <div className="text-title text-center"> ₹{formattedPrice} </div>
            <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between md:w-[100px] flex-shrink-0 w-20">
              <Icon.Minus
                size={28}
                onClick={() => handleQuantityChange(product.quantity - 1)}
                className={`text-base max-md:text-sm text-black border p-1 hover:bg-[#e26178] hover:text-white ${
                  product.quantity === 1 ? "disabled" : ""
                }`}
              />
              <div className="text-button quantity mr-1 ml-1">
                {product.quantity}
              </div>
              <Icon.Plus
                size={28}
                onClick={() => handleQuantityChange(product.quantity + 1)}
                className="text-base max-md:text-sm border p-1 hover:bg-[#e26178] hover:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          />
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto relative">
            <div className="float-right" onClick={() => setShowModal(false)}>
              <Icon.X />
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-center">Remove Item?</h2>
              {/* <p>Do you want to add this item to your wishlist?</p> */}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                className="px-2 py-2 text-[#E26178] border border-[#E26178] rounded-xl hover:bg-[#E26178] hover:text-white"
                onClick={handleJustRemove}
              >
                Remove Item
              </button>
              <button
                className="px-2 py-2 text-[#E26178] border border-[#E26178] rounded-xl hover:bg-[#E26178] hover:text-white"
                onClick={handleAddToWishlist}
              >
                Move to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
