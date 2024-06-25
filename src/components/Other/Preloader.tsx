import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-400"></div>
    </div>
  );
};

export default Preloader;