interface Variation {
  color: string;
  colorCode: string;
  colorImage: string;
  image: string;
}
export interface GoldDetails {
  goldCertifiedBy: string;
  goldSetting: any; // You might want to specify the type if you have more details
}

export interface SilverDetails {
  poojaArticle: any; // Specify type if available
  utensils: any; // Specify type if available
  silverWeight: any; // Specify type if available
}

export interface ProductAttributes {
  goldDetails: GoldDetails[] | null;
  gemstoneDetails: any; // Specify type if available
  diamondDetails: any; // Specify type if available
  silverDetails: SilverDetails[] | null;
}

export interface ImageDetails {
  image_path: string|null;
  order: string;
  alt_text?: string | null|undefined;
}

export interface ProductType {
  rating: number;
  gst: any;
  makingCharges: any;
  id: any | null | undefined;
  productId: number;
  product_id: number | string;
  SKU: string;
  variantId: any; // Specify type if available
  title: string;
  displayTitle: string;
  shortDesc: string;
  longDesc: string | null;
  url: string;
  tags: string[];
  collectionName: string | null;
  shopFor: string[];
  occasion: string;
  theme: string | null;
  length: any; // Specify type if available
  breadth: any; // Specify type if available
  height: any; // Specify type if available
  weightRange: string;
  addDate: string;
  lastModificationDate: string | null;
  created_at: string;
  updated_at: string;
  sizeId: number;
  productSize: any; // Specify type if available
  productQty: number;
  attributeId: number;
  preSalesProductQueries: any; // Specify type if available
  isReplaceable: number;
  isReturnable: number;
  isInternationalShippingAvailable: number;
  customizationAvailability: number;
  fastDelivery: number;
  tryAtHome: number;
  isActive: number;
  grossWeight: any; // Specify type if available
  netWeight: any; // Specify type if available
  productAttributes: ProductAttributes;
  discountId: number;
  discountCategory: string;
  discountActive: number;
  typeOfDiscount: string;
  discountValue: string;
  discountAmount: string;
  discountPrice: string;
  offerStartDate: string;
  offerEndDate: string;
  mediaId: number;
  imageDetails: ImageDetails[];
  videoDetails: any; // Specify type if available
  materialId: number;
  metalType: string;
  metalPurity: string;
  metalWeight: string;
  makingType: string;
  makingChargesPerGrams: string;
  additionalCost: string;
  productPrice: string;
  stoneDetails: any; // Specify type if available
  diamondDetails: any; // Specify type if available
  
}
interface ProductDetails {
  productId: number;
  SKU: string;
  variantId: string;
  isParent: number;
  title: string;
  displayTitle: string;
  shortDesc: string | null;
  longDesc: string | null;
  url: string;
  tags: string[];
  collectionName: string | null;
  shopFor: string[];
  occasion: string;
  theme: string;
  length: number | null;
  breadth: number | null;
  height: number | null;
  weightRange: string;
  addDate: string;
  lastModificationDate: string | null;
  created_at: string;
  updated_at: string;
  sizeId: number | null;
  productSize: string | null;
  productQty: number;
  attributeId: number;
  preSalesProductQueries: string | null;
  isReplaceable: number;
  isReturnable: number;
  isInternationalShippingAvailable: number;
  customizationAvailability: number;
  fastDelivery: number;
  tryAtHome: number;
  isActive: number;
  grossWeight: number | null;
  netWeight: number | null;
  productAttributes: {
    goldDetails: {
      goldCertifiedBy: string;
      goldSetting: string | null;
    }[];
    gemstoneDetails: any; // Change this to specific type if available
    diamondDetails: any; // Change this to specific type if available
    silverDetails: {
      poojaArticle: string | null;
      utensils: string | null;
      silverWeight: number | null;
    }[];
  };
  discountId: number;
  discountCategory: string;
  discountActive: number;
  typeOfDiscount: string;
  discountValue: string;
  discountAmount: string;
  discountPrice: string;
  offerStartDate: string;
  offerEndDate: string;
  mediaId: number;
  imageDetails: any; // JSON string, you might want to parse it
  videoDetails: any; // Change this to specific type if available
  materialId: number;
  metalType: string;
  metalPurity: string;
  metalWeight: string;
  metalRate: string;
  makingType: string;
  makingChargesPerGrams: string;
  makingCharges: string;
  gst: string;
  additionalCost: string|any;
  productPrice: string;
  stoneDetails: any; // Change this to specific type if available
  diamondDetails: {
    diamondColor: string;
    diamondClarity: string;
    diamondQuantity: string;
    caratWeight: string;
    diamondCost: string;
  }[];
  categories: {
    catId: number;
    productId: number;
    productType: string | null;
    productSubType: string | null;
    productSubSubType: string | null;
    created_at: string;
    updated_at: string;
  }[];
  review:any;
  rating:any;
}

interface VariantOption {
  ProductUrl: string;
  VariantName: string;
}

interface Variant {
  VariantType: string;
  VariantOption: VariantOption[];
}

export interface ProductData {
  productDetails: ProductDetails;
  variants: Variant[];
}


export interface ProductForWishlistLoggedIn {
  productId: number;
}

export interface ProductForWishlistLoggedOut {
  productId: number;
  title: string;
  productPrice: string;
  discountPrice: string|number;
  discountValue: string;
  image_path: string;
  url: string;
}