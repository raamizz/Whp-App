"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const ContactInfo = () => {
  return (
    <div className="absolute top-[100px] w-[250px] left-[70px] p-7 rounded-xl bg-surface box-shadow-small bg-white">
      <p className="text-xl font-semibold">Get in Touch with us</p>
      <p className="mt-3">
        Connect with us and we will assist you with all your needs
      </p>
      <p className="font-semibold mt-5">Contact us on :(10:30AM -7:30PM)</p>

      <Link
        href="tel:+91 1800-222-225"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mt-1 flex">
          <span className="mr-2">
            <Icon.Phone size={24}/>
            {/* <Image
              src="/images/icons/phone.png"
              alt="phone_image"
              width={22}
              height={22}
            /> */}
          </span>
          <span>1800-222-225</span>
        </div>
      </Link>
      <Link
        href="https://mail.google.com/mail/?view=cm&fs=1&to=care@whpjewellers.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mt-1 flex">
          <span className="mr-2">
            <Icon.EnvelopeSimple size={24}/>
            {/* <Image
              src="/images/icons/Email.png"
              alt="Email_image"
              width={22}
              height={22}
            /> */}
          </span>
          <span>care@whpjewellers.in</span>
        </div>
      </Link>
      <div className="flex mt-4 items-center">
        <div className="mr-3">
          <Link href={"https://www.facebook.com/whpjewellers.india/"}>
            <Icon.FacebookLogo size={34} weight="light" color="#e26178" />
          </Link>
        </div>
        <div className="mr-3">
          <Link
            href={"https://www.youtube.com/channel/UCAdFm3-Ti3qSLABysgFJAzg"}
          >
            <Icon.YoutubeLogo size={34} weight="light" color="#e26178" />
          </Link>
        </div>
        <div className="mr-3">
          <Link href={"https://www.instagram.com/whpjewellers/?hl=en"}>
            <Icon.InstagramLogo size={32} weight="light" color="#e26178" />
          </Link>
        </div>
        <div className="mr-3">
          <Link href={"https://www.instagram.com/whpjewellers/?hl=en"}>
            <Icon.WhatsappLogo size={34} weight="light" color="#e26178" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
