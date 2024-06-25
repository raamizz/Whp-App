"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import StickyNav from "@/components/Header/StickyNav";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ProductData, ProductType } from "@/type/ProductType";
import { useRouter } from "next/navigation";
import Loader from "../blog/Loader";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";

const Wishlist = () => {
  const { cartItems, addToCart, updateCartQuantity } = useCart();
  const {} = useWishlist();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [type, setType] = useState<string | undefined>();
  const { wishlistItems, setWishlistItems, removeFromWishlist, getWishlist } =
    useWishlist();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const fetchedWishlistItems = await getWishlist();
        setWishlistItems(fetchedWishlistItems);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const router = useRouter();

  const uniqueProductIds = new Set<number>();

  const filteredWishlistItems = wishlistItems.filter((product) => {
    if (uniqueProductIds.has(product.productId)) {
      return false;
    } else {
      uniqueProductIds.add(product.productId);
      return true;
    }
  });

  const handleAddToCart = (product: any) => {
    const productAlreadyExists = cartItems.find(
      (item: any) => item.productId === product.productId
    );
    const currentQuantity = productAlreadyExists?.quantity ?? 0;
    const updatedQuantity = currentQuantity + 1;
    if (productAlreadyExists) {
      updateCartQuantity(product.productId, updatedQuantity);
    } else {
      const newProduct: any = {
        productDetails: {
          title: product.title,
          discountPrice: product.discountPrice,
          imageDetails: [{ image_path: product.image_path }],
          productPrice: product.productPrice,
        },
        productId: product.productId,
        quantity: 1,
      };
      addToCart(newProduct, 1);
      removeFromWishlist(product.productId);
    }
  };

  const handleBuyNow = (product: any) => {
    const productAlreadyExists = cartItems.find(
      (item) => item.productId === product.productId
    );

    if (!productAlreadyExists) {
      const newProduct: any = {
        productDetails: {
          title: product.title,
          discountPrice: product.discountPrice,
          imageDetails: [{ image_path: product.image_path }],
          productPrice: product.productPrice,
        },
        productId: product.productId,
        quantity: 1,
      };
      addToCart(newProduct, 1, true);
    }

    removeFromWishlist(product.productId);
    router.push(`/checkout?buyNow=${product.productId}`);
  };

  const handleType = (type: string) => {
    setType((prevType) => (prevType === type ? undefined : type));
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    })
      .format(value)
      .replace("₹", "₹ ");
  };

  const handleImageLoad = (productId: number) => {
    setImageLoading((prevState) => ({ ...prevState, [productId]: false }));
  };

  const handleImageError = (productId: number) => {
    setImageLoading((prevState) => ({ ...prevState, [productId]: false }));
  };

  console.log(filteredWishlistItems);

  return (
    <div className="shop-product breadcrumb1">
      <StickyNav />
      <div className="container">
        <div className="list-product-block relative">
          {isLoading ? (
            <Loader />
          ) : wishlistItems.length < 1 ? (
            <div className="text-center text-2xl my-10 text-[#e26178]">
              Your Wishlist Seems to be Empty!
            </div>
          ) : (
            <div className="list-product grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 my-10">
              {filteredWishlistItems?.map((product, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer flex justify-center"
                >
                  <div className="product-card p-4 h-[100%] w-[80%]">
                    <div className="product-image flex justify-center">
                      {isLoggedIn && imageLoading[product.productId] ? (
                        <Skeleton
                          width={300}
                          height={300}
                          className="rounded-md"
                        />
                      ) : isLoggedIn ? (
                        <div className="relative">
                          <Image
                            src={product?.image_path}
                            alt={product.title}
                            width={300}
                            height={300}
                            className="rounded-md bg-[#f7f7f7]"
                            onClick={() =>
                              router.push(
                                `/products/${product.productId}/${product.url}`
                              )
                            }
                            onLoad={() => handleImageLoad(product.productId)}
                            onError={() => handleImageError(product.productId)}
                          />
                          <div className="product-actions absolute top-2 right-2">
                            <button
                              className="heart-icon"
                              onClick={() =>
                                removeFromWishlist(product.productId)
                              }
                            >
                              <Icon.Heart
                                size={25}
                                color="#fa0000"
                                weight="fill"
                              />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <Image
                            src={product.image_path}
                            alt={product.title}
                            width={300}
                            height={300}
                            onClick={() =>
                              router.push(
                                `/products/${product.productId}/${product.url}`
                              )
                            }
                            className="rounded-md bg-[#f7f7f7]"
                            onLoad={() => handleImageLoad(product.productId)}
                            onError={() => handleImageError(product.productId)}
                          />
                          <div className="product-actions absolute top-2 right-2">
                            <button
                              className="heart-icon"
                              onClick={() =>
                                removeFromWishlist(product.productId)
                              }
                            >
                              <Icon.Heart
                                size={25}
                                color="#fa0000"
                                weight="fill"
                              />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="product-details mt-4"
                      onClick={() =>
                        router.push(
                          `/products/${product.productId}/${product.url}`
                        )
                      }
                    >
                      <h3 className="product-name text-title text-xl truncate">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="product-price flex flex-col">
                          <span className="discounted-price text-title text-lg">
                            {product.discountPrice
                              ? formatCurrency(product.discountPrice)
                              : formatCurrency(product.productPrice)}
                          </span>
                          <span className="original-price line-through text-[#beb3b3]">
                            {formatCurrency(product.productPrice)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:max-xl:flex-row flex-col flex-wrap lg:flex-row items-center gap-2 justify-between mt-3">
                      <div
                        className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-center font-semibold text-lg text-white lg:w-36 w-full p-1 rounded-md lg:max-xl:w-full"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </div>
                      <div
                        className="bg-gradient-to-r to-[#815fc8] via-[#9b5ba7] from-[#bb547d] text-center font-semibold text-lg text-white lg:w-36 w-full p-1 rounded-md lg:max-xl:w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </div>
                    </div>
                  </div>
                  {/* <div className="product-actions absolute top-2 right-2">
                    <button
                      className="heart-icon"
                      onClick={() => removeFromWishlist(product.productId)}
                    >
                      <Icon.Heart size={25} color="#fa0000" weight="fill" />
                    </button>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
