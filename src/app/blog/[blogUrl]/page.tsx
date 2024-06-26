// "use client"
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Loader from "../Loader";
// import { useBlog } from "@/context/BlogContext";

// interface Props {
//   params: { blogUrl: string };
// }

// const BlogDetail: React.FC<Props> = ({ params }) => {
//   const { blogUrl } = params;
//   const { blogData } = useBlog();
//   const [blog, setBlog] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const matchingBlog = blogData.find(
//           (blog: any) => blog.blogUrl === blogUrl
//         );
//         if (matchingBlog) {
//           setBlog(matchingBlog);
//         } else {
//           console.log("Blog not found");
//         }
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (blogUrl) {
//       fetchBlogData();
//     }
//   }, [blogUrl, blogData]);

//   if (loading) {
//     return <Loader />;
//   }

//   if (!blog) {
//     return (
//       <div className="text-center text-2xl my-10">
//         Uh oh! This blog post was not found.
//       </div>
//     );
//   }

//   return (
//     <div className="mx-11">
//       <Image
//         src={blog.image}
//         alt={"blog"}
//         className="object-contain mb-6 w-[100%]"
//         height={700}
//         width={700}
//       />
//       <h1 className="text-xl font-semibold pb-5">{blog.title}</h1>
//       <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//     </div>
//   );
// };

// export default BlogDetail;import { GetStaticPaths, GetStaticProps } from 'next';
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

interface BlogPost {
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

const graphqlbaseUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'YOUR_GRAPHQL_URL_HERE';

async function fetchAllBlogs(): Promise<BlogPost[]> {
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

  try {
    const { data } = await client.query({ query: GetAllBlogs });
    return data.getAllBlogs;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const blogs = await fetchAllBlogs();
  
  return blogs.map((blog) => ({
    blogUrl: blog.blogUrl,
  }));
}

async function getBlogData(blogUrl: string): Promise<BlogPost | null> {
  const blogs = await fetchAllBlogs();
  return blogs.find((b) => b.blogUrl === blogUrl) || null;
}

export default async function BlogDetail({ params }: { params: { blogUrl: string } }) {
  const blog = await getBlogData(params.blogUrl);

  if (!blog) {
    return (
      <div className="text-center text-2xl my-10">
        Uh oh! This blog post was not found.
      </div>
    );
  }

  return (
    <div className="mx-11">
      <Image
        src={blog.image}
        alt={blog.title}
        className="object-contain mb-6 w-[100%]"
        height={700}
        width={700}
      />
      <h1 className="text-xl font-semibold pb-5">{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 60; // revalidate every 60 seconds