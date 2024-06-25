import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAllCategoryContext } from "@/context/AllCategoryContext";
import { useCategory } from "@/context/CategoryContex";

const Category = () => {
  const router = useRouter();
  const { categories } = useAllCategoryContext();
  const { setCustomcategory } = useCategory();

  return (
    <>
      <div className="w-full px-8 my-16 font-[500]  text-[#39161C]">
        <div className="flex flex-col items-start justify-between">
          <h1 className="font-semibold text-[1.5rem] uppercase pb-2">SHOP BY CATEGORY</h1>
          <p className="">
            Effortlessly find your perfect piece by exploring our jewellery
            categories. <br />
            From stunning necklaces to exquisite rings, our collections cater to
            every style and taste.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 items-center ">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col relative items-start justify-between "
            >
              <Link
                href={`/products?url=${category.url}`}
                onClick={() => setCustomcategory(category.url)}
              >
                <div className="effect14 cursor-pointer">
                  <Image
                    src={category.parentImg}
                    alt={category.url}
                    width={400}
                    height={400}
                  />
                </div>
              </Link>

              <div>
                <h1 className="text-xl font-semibold uppercase break-word">{category.name}</h1>
                <a className="inline-flex items-center" onClick={() => {
                  router.push(`/products?url=${category.url}`);
                  setCustomcategory(category.url);
                }}>
                  <span className="me-2 text-[#E26178] underline cursor-pointer text-sm">
                    View All
                  </span>
                  <span className="flex items-center">
                    <Image
                      src={"/images/icons/rightarrow.svg"}
                      alt="Right Arrow"
                      width={20}
                      height={20}
                    />
                  </span>
                </a>
                {/* <p className="text-sm font-medium">{category.description}</p> */}
                {/* <h3
                  className="text-red-600 underline font-bold cursor-pointer"
                  onClick={() => {
                    router.push(`/products?url=${category.url}`);
                    setCustomcategory(category.url);
                  }}
                >
                  VIEW ALL
                </h3> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
