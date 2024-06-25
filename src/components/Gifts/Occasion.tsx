import React, { useState } from "react";
import Image from "next/image";

interface OccasionProps {
  onSelectOccasion: (occasion: string, voucherId: number) => void;
  voucherData: any;
}

const Occasion: React.FC<OccasionProps> = ({
  onSelectOccasion,
  voucherData,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null
  );

  const handleTemplateSelect = (occasion: string, templateId: number) => {
    setSelectedTemplateId(templateId);
    onSelectOccasion(occasion, templateId); // Pass the occasion and voucher ID
  };

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-2 mt-4 w-full">
      {voucherData?.map((voucher: any, index: number) => (
        <div
          key={index}
          onClick={() => handleTemplateSelect(voucher.name, voucher.id)}
          className={`rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer ${
            selectedTemplateId === voucher.id ? "bg-blue-200" : "bg-gray-100"
          }`}
        >
          <Image
            width={400}
            height={300}
            className="w-full h-[250px] object-fill object-center"
            src={voucher.thumbnailImage}
            alt={voucher.name}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{voucher.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Occasion;
