
import React from "react";
import Image from "next/image";
const ProfileImage = () => {
  return (
      <div>
        {" "}
        <Image
          className="rounded-full cursor-pointer h-20 w-20 ml-9 "
          src={"/images/collection/check.png"}
          alt="Profile Pics"
          width={40}
          height={40}
        />
      </div>
  );
};
export default ProfileImage;
