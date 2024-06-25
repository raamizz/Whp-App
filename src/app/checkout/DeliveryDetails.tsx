import React, { useState } from 'react';
import ShippingAddressList from './ShippingAddressList';
import BillingAddressList from './BillingAddressList';
import AddAddressModal from './AddAddressModal';
import AddAddressMobile from './AddAddressMobile';
import FlashAlert from "../../components/Other/FlashAlert";
import {Address} from "@/type/AddressType"

interface DeliveryDetailsProps {
    onShippingAddressSelected: () => void;
    onBillingAddressSelected: () => void; // Keep this line
    useSameAsBillingAddress: boolean;
    setUseSameAsBillingAddress: React.Dispatch<React.SetStateAction<boolean>>;
    selectedShippingAddress: Address | null;
    setSelectedShippingAddress: React.Dispatch<React.SetStateAction<Address | null>>;
    selectedBillingAddress: Address | null;
    setSelectedBillingAddress: React.Dispatch<React.SetStateAction<Address | null>>;
  }
  
  const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
    onShippingAddressSelected,
    onBillingAddressSelected,
    useSameAsBillingAddress,
    setUseSameAsBillingAddress,
    selectedShippingAddress,
    setSelectedShippingAddress,
    selectedBillingAddress,
    setSelectedBillingAddress,
  }) => {
  //const [selectedShippingAddress, setSelectedShippingAddress] = useState<Address | null>(null);
  //const [selectedBillingAddress, setSelectedBillingAddress] = useState<Address | null>(null);
  
  const [isShippingAddressModalOpen, setIsShippingAddressModalOpen] = useState(false);
  const [isBillingAddressModalOpen, setIsBillingAddressModalOpen] = useState(false);
  const [isShippingAddressMobileOpen, setIsShippingAddressMobileOpen] = useState(false);
  const [isBillingAddressMobileOpen, setIsBillingAddressMobileOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [flashType, setFlashType] = useState<'success' | 'error'>('success');
  const [flashKey, setFlashKey] = useState(0);
  const [shippingAddressAdded, setShippingAddressAdded] = useState(false); // Add this state variable
  const [billingAddressAdded, setBillingAddressAdded] = useState(false); // Add this state variable
  const [shippingAddressSelected, setShippingAddressSelected] = useState(false);
  const [billingAddressSelected, setBillingAddressSelected] = useState(false);


  const handleShippingAddressSelect = (address: Address) => {
    if (address === null) {
      setSelectedShippingAddress(null);
      setShippingAddressSelected(false);
      if (useSameAsBillingAddress) {
        setSelectedBillingAddress(null);
        setBillingAddressSelected(false);
      }
    } else {
      setSelectedShippingAddress(address);
      setShippingAddressSelected(true);
      onShippingAddressSelected();
      if (useSameAsBillingAddress) {
        setSelectedBillingAddress(address);
        setBillingAddressSelected(true);
        onBillingAddressSelected();
      }
      setFlashMessage(`Shipping address updated`);
      setFlashKey((prevKey) => prevKey + 1);
    }
  };
  
  const handleBillingAddressSelect = (address: Address) => {
    if (address === null) {
      setSelectedBillingAddress(null);
      setBillingAddressSelected(false);
    } else {
      setSelectedBillingAddress(address);
      setBillingAddressSelected(true);
      props.onBillingAddressSelected(); // Call the prop function
      console.log('billingAddressSelected set to true');
  
      if (!useSameAsBillingAddress) {
        setFlashMessage(`Billing address updated`);
        setFlashKey((prevKey) => prevKey + 1);
      } else {
        setBillingAddressSelected(true);
      }
    }
  };

  const handleBillingAddressToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseSameAsBillingAddress(event.target.checked);
    if (event.target.checked) {
      setSelectedBillingAddress(selectedShippingAddress);
    } else {
      setSelectedBillingAddress(null);
    }
  };

  const closeShippingAddressModal = () => {
    setIsShippingAddressModalOpen(false);
  };

  const closeBillingAddressModal = () => {
    setIsBillingAddressModalOpen(false);
  };

  const closeShippingAddressMobile = () => {
    setIsShippingAddressMobileOpen(false);
  };

  const closeBillingAddressMobile = () => {
    setIsBillingAddressMobileOpen(false);
  };

  const handleAddressAdded = (isBillingAddress: boolean) => {
    if (isBillingAddress) {
      setBillingAddressAdded(prevState => !prevState);
    } else {
      setShippingAddressAdded(prevState => !prevState);
    }
  };

  const isDeliveryDetailsValid = () => {
    return shippingAddressSelected && (useSameAsBillingAddress || billingAddressSelected);
  };

  return (
    <div className="lg:w-[50rem] md:w-[30rem] sm:w-[30rem] border border-gray-300 p-8">
      <FlashAlert key={flashKey} message={flashMessage} type={flashType} />
      <ShippingAddressList
        onAddressSelect={handleShippingAddressSelect}
        selectedAddress={selectedShippingAddress}
        addressAdded={shippingAddressAdded}
        onAddressAdded={handleAddressAdded}
      />
      <h2
        className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
        onClick={() => {
          if (window.innerWidth <= 768) {
            setIsShippingAddressMobileOpen(true);
          } else {
            setIsShippingAddressModalOpen(true);
          }
        }}
      >
        + Add a New Shipping Address
      </h2>
      {isShippingAddressModalOpen && (
        <AddAddressModal
          closeModal={closeShippingAddressModal}
          isForBillingAddress={false}
          onAddressAdded={handleAddressAdded}
        />
      )}
      {isShippingAddressMobileOpen && (
        <AddAddressMobile
          isOpen={isShippingAddressMobileOpen}
          onClose={closeShippingAddressMobile}
          isForBillingAddress={false}
          onAddressAdded={handleAddressAdded}
        />
      )}

      <div className="mt-8">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useShippingAddressAsBillingAddress"
            checked={useSameAsBillingAddress}
            onChange={handleBillingAddressToggle}
            className="form-checkbox"
          />
          <label htmlFor="useShippingAddressAsBillingAddress" className="ml-2">
            Use shipping address as billing address
          </label>
        </div>
        {useSameAsBillingAddress && selectedShippingAddress && (
          <ShippingAddressList
            onAddressSelect={handleBillingAddressSelect}
            selectedAddress={selectedShippingAddress}
            readOnly
          />
        )}
        {!useSameAsBillingAddress && (
          <>
            <BillingAddressList
              onAddressSelect={handleBillingAddressSelect}
              selectedAddress={selectedBillingAddress}
              addressAdded={billingAddressAdded}
              onAddressAdded={handleAddressAdded} 
            />
            <h2
              className="hover:text-red-500 hover:underline cursor-pointer text-gray-600"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  setIsBillingAddressMobileOpen(true);
                } else {
                  setIsBillingAddressModalOpen(true);
                }
              }}
            >
              + Add a New Billing Address
            </h2>
            {isBillingAddressModalOpen && (
              <AddAddressModal
                closeModal={closeBillingAddressModal}
                isForBillingAddress={true}
                onAddressAdded={handleAddressAdded}
              />
            )}
            {isBillingAddressMobileOpen && (
              <AddAddressMobile
                isOpen={isBillingAddressMobileOpen}
                onClose={closeBillingAddressMobile}
                isForBillingAddress={true}
                onAddressAdded={handleAddressAdded}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryDetails;