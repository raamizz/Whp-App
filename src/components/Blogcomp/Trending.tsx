import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TrendingProps {
  blogData: any[];
}

const Trending: React.FC<TrendingProps> = ({ blogData }) => {
  const trendingBlogs = blogData.slice(-3);

  return (
    <div className="mx-auto px-4">
      <h1 className="text-3xl font-medium mb-4">Trending</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {trendingBlogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.blogUrl}`} passHref>
            <div className="h-full rounded-lg shadow-md overflow-hidden cursor-pointer ">
              <Image
                width={400}
                height={300}
                className="w-full h-[300px] object-cover object-center"
                src={blog.image}
                alt={blog.title}
              />
              <div className="p-4 flex flex-col justify-between h-max">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-sm mb-2">{blog.metaTitle}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-block border border-pink-500 text-pink-500 text-xs px-2 py-1 rounded-xl">
                    {blog.categoryName}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
