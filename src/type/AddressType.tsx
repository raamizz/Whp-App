export interface Address {
    address_id: number;
    customer_id: number;
    address_type: string;
    full_address: string;
    country: string;
    state: string;
    city: string;
    landmark: string | null;
    pincode: number;
    created_at: string;
    updated_at: string;
  }