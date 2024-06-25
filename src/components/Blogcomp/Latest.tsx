import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LatestProps {  
  blogData: any[];
}

const Latest: React.FC<LatestProps> = ({ blogData }) => {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-medium mb-2 uppercase">
        Discover Our latest posts
      </h1>
      <h3 className="py-2 w-[50%]">
        Where Passion Meets Precision: Explore Our Jewellery Blog for Insights
        and Inspiration on All Things Adornments.
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        {blogData.map((blog) => (
          <div key={blog.id} className="cursor-pointer">
            <Link href={`/blog/${blog.blogUrl}`} passHref>
              <div className="rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
                <Image
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover object-center"
                  src={blog.image}
                  alt={blog.title}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{blog.title}</h3>
                  <p className="text-sm mb-2">{blog.metaTitle}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block border border-[#e26178] text-[#e26178] text-xs px-2 py-1 rounded-xl">
                      {blog.categoryName}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
