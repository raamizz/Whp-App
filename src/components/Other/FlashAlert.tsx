import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface FlashAlertProps {
  message: string|any;
  duration?: number; // Duration in milliseconds (optional, default is 3000ms)
  type: "success" | "error" | "info";
}

const FlashAlert: React.FC<FlashAlertProps & { type: 'success' | 'error' |'info'}> = ({ message, type }) => {
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      if (message) {
        setShow(true);
        const timer = setTimeout(() => {
          setShow(false);
        }, 4000);
        return () => clearTimeout(timer);
      }
    }, [message]);

    const renderIcon = () => {
        switch (type) {
          case 'info':
            return <FaInfoCircle className="mr-2" />;
          case 'success':
            return <FaCheckCircle className="mr-2" />;
          case 'error':
            return <FaExclamationCircle className="mr-2" />;
          default:
            return null;
        }
      };
      return (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-2 rounded-md transition-opacity z-[10000] ${
            show ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {message && (
            <div
              className={`${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } px-2 py-1 rounded-md flex items-center`}
            >
              {renderIcon()}
              {message}
            </div>
          )}
        </div>
      );
  };
  
  
  
  
  

export default FlashAlert;