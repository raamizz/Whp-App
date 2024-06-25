
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphqlbaseUrl } from "@/utils/constants";

interface Blog {
  id: string;
  categoryId: string;
  title: string;
  addDate: string;
  metaTitle: string;
  keywords: string;
  blogUrl: string;
  image: string;
  content: string;
  categoryName: string;
}

interface BlogContextType {
  blogData: Blog[];
  loading: boolean;
  fetchBlogData: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const client = new ApolloClient({
        uri: graphqlbaseUrl,
        cache: new InMemoryCache(),
      });
      const GetAllBlogs = gql`
        query GetAllBlogs {
          getAllBlogs {
            id
            categoryId
            title
            addDate
            metaTitle
            keywords
            blogUrl
            image
            content
            categoryName
          }
        }
      `;
      const { data } = await client.query({
        query: GetAllBlogs,
      });
      setBlogData(data.getAllBlogs);
    } catch (error) {
      console.log("error fetching data of blog", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <BlogContext.Provider value={{ blogData, loading, fetchBlogData }}>
      {children}
    </BlogContext.Provider>
  );
};
