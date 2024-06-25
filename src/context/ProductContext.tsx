"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { baseUrl, category,getProducts } from "@/utils/constants";
import instance from "@/utils/axios";
import axios from "axios";

interface ProductContextType {
  parentCategory: any;
  fetchData: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType>({
  parentCategory: [],
  fetchData: async () => {},
});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [parentCategory, setProducts] = useState<any>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}${getProducts}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }finally{
      console.log("category",parentCategory)
    }
  };

  return (
    <ProductContext.Provider value={{ parentCategory, fetchData }}>
      {children}
    </ProductContext.Provider>
  );
};