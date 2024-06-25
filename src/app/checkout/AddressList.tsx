import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '@/utils/constants';
import { FaCheckCircle, FaEdit, FaTimes } from 'react-icons/fa';

interface Address {
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

interface AddressListProps {
  onAddressSelect: (address: Address) => void;
  selectedAddress: Address | null;
}

const AddressList: React.FC<AddressListProps> = ({ onAddressSelect, selectedAddress }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const cookieTokenn = Cookies.get('localtoken');
        const response = await axios.get<{ customerAddress?: Address[] }>(`${baseUrl}/customer/getAddresses`, {
          headers: {
            Authorization: `Bearer ${cookieTokenn}`,
          },
        });

        if (response.data && response.data.customerAddress) {
          setAddresses(response.data.customerAddress);
        } else {
          console.error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address);
  };

  return (
    <div>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <div>
          {addresses.map((address) => (
            <div
              key={address.address_id}
              className={`border rounded-lg p-4 mb-4 flex items-center justify-between ${
                selectedAddress?.address_id === address.address_id ? 'bg-gray-200' : ''
              } cursor-pointer`}
              onClick={() => handleAddressSelect(address)}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{address.full_address.split(',')[0]}</h3>
                  {selectedAddress?.address_id === address.address_id && (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  )}
                </div>
                <p>{address.full_address.split(',').slice(1).join(', ')}</p>
                <p>{`${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}</p>
                <p>Address Type: {address.address_type}</p>
              </div>
              <div className="flex space-x-2">
                <FaEdit className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                <FaTimes className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;