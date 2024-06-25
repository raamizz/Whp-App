"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the setter function
type SetCategoryType = (category: string | any) => void;
type SetCategoryType2 = (newState: string | any) => void;

// Creating a context for setting a string state
interface ContextType {
  setCustomcategory: SetCategoryType2;
  category: string | any;
}

const CategoryContext = createContext<ContextType | undefined>(undefined);

// Custom hook to use the set string state context
export const useCategory = (): ContextType => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useSetState must be used within a SetStateProvider");
  }
  return context;
};

// Define props for SetStateProvider
type CategoryProviderProps = {
  children: ReactNode;
};

// Provider component to wrap around components that need to set state
export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [category, setCategory] = useState<string | any>("");

  const setCustomcategory: SetCategoryType = (newState) => {
    if (typeof window != "undefined") {
      localStorage.setItem("category", newState);
    }
    setCategory(newState);
  };

  const value: ContextType = {
    setCustomcategory,
    category,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
