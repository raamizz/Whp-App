import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">
          <span >4</span>
          <Image
            src="/images/other/ssss.png"
            alt="Ring"
            className="ring-image"
            width={300}
            height={300}
          />
          <span>4</span>
        </div>
        <p className="message">Awww... Don't cry!</p>
        <p className="sub-message">Sorry beauty, this page doesn't exist :(</p>
        <a href="/" className="home-link">
          Back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
