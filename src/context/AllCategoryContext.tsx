"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { baseUrl, graphqlbaseUrl } from "@/utils/constants";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

interface Category {
  id: number;
  name: string;
  url: string;
  menuImg: string;
  parentImg: string;
  parent_id: number | null;
}

interface CategoryContextType {
  categories: Category[];
}

const AllCategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

const AllCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      const GET_ALLCATEGORIES = gql`
        query GetAllParentCategory {
          getAllParentCategory {
            id
            name
            url
            menuImg
            parentImg
            parent_id
            order
          }
        }
      `;
      const { data } = await client.query({
        query: GET_ALLCATEGORIES,
      });
      setCategories(data.getAllParentCategory);
    };
    fetchCategories();
  }, []);

  return (
    <AllCategoryContext.Provider value={{ categories }}>
      {children}
    </AllCategoryContext.Provider>
  );
};

const useAllCategoryContext = () => {
  const context = useContext(AllCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

export { AllCategoryProvider, useAllCategoryContext };
