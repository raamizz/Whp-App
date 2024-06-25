import React from "react";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { ModalCartProvider } from "@/context/ModalCartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { BlogProvider } from "@/context/BlogContext";
import { CompareProvider } from "@/context/CompareContext";
import { ModalSearchProvider } from "@/context/ModalSearchContext";
import { ModalQuickviewProvider } from "@/context/ModalQuickviewContext";
import { CouponCodeProvider } from "@/context/CouponContext";
import { CategoryProvider } from "@/context/CategoryContex";
import { AllCategoryProvider } from "@/context/AllCategoryContext";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BlogProvider>
      <ProductProvider>
        <UserProvider>
          <AllCategoryProvider>
            <CategoryProvider>
              <CouponCodeProvider>
                <CartProvider>
                  <ModalCartProvider>
                    <WishlistProvider>
                      <CompareProvider>
                        <ModalSearchProvider>
                          <ModalQuickviewProvider>
                            {children}
                          </ModalQuickviewProvider>
                        </ModalSearchProvider>
                      </CompareProvider>
                    </WishlistProvider>
                  </ModalCartProvider>
                </CartProvider>
              </CouponCodeProvider>
            </CategoryProvider>
          </AllCategoryProvider>
        </UserProvider>
      </ProductProvider>
    </BlogProvider>
  );
};

export default GlobalProvider;
