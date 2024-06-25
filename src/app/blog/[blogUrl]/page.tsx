"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { useBlog } from "@/context/BlogContext";

interface Props {
  params: { blogUrl: string };
}

const BlogDetail: React.FC<Props> = ({ params }) => {
  const { blogUrl } = params;
  const { blogData } = useBlog();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const matchingBlog = blogData.find(
          (blog: any) => blog.blogUrl === blogUrl
        );
        if (matchingBlog) {
          setBlog(matchingBlog);
        } else {
          console.log("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogUrl) {
      fetchBlogData();
    }
  }, [blogUrl, blogData]);

  if (loading) {
    return <Loader />;
  }

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
        alt={"blog"}
        className="object-contain mb-6 w-[100%]"
        height={700}
        width={700}
      />
      <h1 className="text-xl font-semibold pb-5">{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogDetail;
