import React from "react";
import { useSearchParams } from "next/navigation";
import Default from "@/components/Product/Detail/Default";

interface PageProps {
  params: {
    productUrl: number;
  };
}
const page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <Default productId={params.productUrl} />
    </div>
  );
};

export default page;
