"use client"; // Add this line

import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductData, ProductType } from "@/type/ProductType";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

interface Props {
  product: ProductType | ProductDetails;
}

interface ProductForWishlistLoggedIn {
  productId: number;
}

interface ProductForWishlistLoggedOut {
  productId: number;
  title: string;
  productPrice: string;
  discountPrice: string;
  discountValue: string;
  image_path: string;
  url: string;
}
const Buttons: React.FC<Props> = ({ product }) => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist, getWishlist } =
    useWishlist();
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        await getWishlist();
        const isInWishlist = wishlistItems.some(
          (item) => item.productId == product.productDetails.productId
        );
        setIsProductInWishlist(isInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = (productItem: ProductData) => {
    console.log(productItem,"proddddd")
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === productItem.productDetails.productId
    );
    const currentQuantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentQuantity + 1;
    if (productAlreadyExists) {
      updateCartQuantity(
        productItem.productDetails?.productId,
        updatedQuantity
      );
    } else {
      addToCart(
        {
          ...productItem,
          quantity: 1,
          productId: productItem.productDetails.productId,
        },
        1
      );
    }
  };

  const HandleaddToWishlist = () => {
    if (isLoggedIn) {
      const productToAdd: ProductForWishlistLoggedIn = {
        productId: product.productDetails.productId,
      };
      addToWishlist(productToAdd);
      setIsProductInWishlist(true);
    } else {
      const productToAdd: ProductForWishlistLoggedOut = {
        productId: product.productDetails.productId,
        title: product.productDetails.title,
        productPrice: product.productDetails.productPrice,
        discountPrice: product.productDetails.discountPrice,
        discountValue: product.productDetails.discountValue,
        image_path: product.productDetails.imageDetails[0].image_path,

        url: product.productDetails.url,
      };
      setIsProductInWishlist(true);
      addToWishlist(productToAdd);
    }
  };

  const HandleremoveFromWishlist = () => {
    removeFromWishlist(product.productDetails.productId);
    setIsProductInWishlist(false);
  };

const handleBuyNow = () => {
  const productAlreadyExists = cartItems.find(
    (item) => item.productId === product.productDetails.productId
  );
  if (!productAlreadyExists) {
    addToCart(
      {
        productDetails: {
          ...product.productDetails,
        },
        productId: product.productDetails.productId,
      },
      1
    );
  }
  router.push(`/checkout?buyNow=${product.productDetails.productId}`);
};

  if (isLoading) {
    return (
      <div>
        <Skeleton height={70} />
      </div>
    );
  }
  return (
    <div className="flex max-sm:justify-around justify-evenly mt-[25px] ">
      <div
        className="cursor-pointer bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-white max-sm:w-[35%] w-[33%] h-[58px] max-sm:h-[45px] py-[18px] px-[32px] max-sm:px-[15px] max-sm:py-[10px] text-center"
        onClick={handleBuyNow}
      >
        Buy Now
      </div>

      <div
        className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-[#e26178]  w-[33%] max-sm:w-[35%] h-[58px] max-sm:h-full text-center cursor-pointer"
        onClick={() => handleAddToCart(product)}
      >
        <div className=" m-[2px] mb-[2px] bg-white">
          <span className="flex justify-center py-[14px] max-sm:py-[10px]">
            <span>Add to Cart</span>
            <span className="mt-1">
              <Icon.ShoppingCart />
            </span>
          </span>
        </div>
      </div>
      <div className=" flex justify-center text-[#e26178] outline outline-[#e26178] outline-1 w-[56px] h-[58px] max-sm:h-[45px] items-center cursor-pointer">
        {isProductInWishlist ? (
          <Icon.Heart
            size={32}
            color="#fa0000"
            weight="fill"
            onClick={() => HandleremoveFromWishlist()}
          />
        ) : (
          <Icon.Heart
            size={32}
            weight="thin"
            color="#e26178"
            onClick={() => HandleaddToWishlist()}
          />
        )}
      </div>
    </div>
  );
};
export default Buttons;
