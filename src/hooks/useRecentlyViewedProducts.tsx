import { useState, useEffect } from "react";
import { ProductData, ProductType } from "@/type/ProductType";

const useRecentlyViewedProducts = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<
    ProductType[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = JSON.parse(
        localStorage.getItem("recentlyViewedProducts") || "[]"
      );
      setRecentlyViewedProducts(storedProducts);
    }
  }, []);

  const saveToRecentlyViewed = (product: ProductData | null) => {
    if (typeof window !== "undefined") {
      if (product) {
        const recentlyViewedProducts = JSON.parse(
          localStorage.getItem("recentlyViewedProducts") || "[]"
        );

        // Check if the product already exists in the local storage
        const existingProduct = recentlyViewedProducts.find(
          (p: any) => p?.productId === product?.productDetails?.productId
        );
        if (!existingProduct) {
          // If the product doesn't exist, add it to the local storage
          recentlyViewedProducts.unshift(product);

          // Limit the number of products in the local storage (e.g., 5 products)
          if (recentlyViewedProducts.length > 5) {
            recentlyViewedProducts.pop();
          }

          // localStorage..setItem('recentlyViewedProducts', JSON.stringify(recentlyViewedProducts));
          {
            typeof window !== "undefined" &&
              localStorage.setItem(
                "recentlyViewedProducts",
                JSON.stringify(recentlyViewedProducts)
              );
          }
        }
      }
    }

    const removeFromRecentlyViewed = (productId: string | number) => {
      const updatedProducts = recentlyViewedProducts.filter(
        (product) => product.productId !== productId
      );
      setRecentlyViewedProducts(updatedProducts);
      localStorage.setItem(
        "recentlyViewedProducts",
        JSON.stringify(updatedProducts)
      );
    };

    return {
      recentlyViewedProducts,
      saveToRecentlyViewed,
      removeFromRecentlyViewed,
    };
  };
};

export default useRecentlyViewedProducts;
