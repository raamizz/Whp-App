import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"

const VideoOverlayProducts = ({ products }) => {
  const productCardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      className="absolute bottom-0 w-full flex overflow-x-auto p-4"
      style={{ zIndex: 2 }}
    >
      {Array.isArray(products)&&products.map((product, index) => (
        <Link href={`/product/default?id=${product.url}`} key={index}>
        <motion.div
          className="flex min-w-[350px] max-w-[550px] bg-white p-4 m-2 rounded-lg shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            maxHeight: "120px",
          }}
          variants={productCardVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Image
            src={product.imageDetails[0].image_path}
            alt={product?.title}
            height={22}
            width={92}
            className="object-cover rounded-md"
          />
          <div className="ml-4 flex flex-col justify-between">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.productPrice}</p>
            <p className="text-[#e26178] text-lg hover:text-indigo-800">
              View
            </p>
          </div>
        </motion.div></Link>
      ))}
    </div>
  );
};

export default VideoOverlayProducts;