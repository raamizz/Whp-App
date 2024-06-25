import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="list-product hide-product-sold grid md:grid-cols-2 lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7">
      <div className="">
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
      <div className="">
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
      <div className="">
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
      <div className="">
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
      <div className="">
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
      <div className="">
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
      <div className="">
        <Skeleton height={300} />
        <Skeleton count={3} />
      </div>
    </div>
  );
};

export default ProductSkeleton;
