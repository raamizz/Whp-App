import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-[100%]">
        <img
          src={"/images/banner/waman-hari-pethe-jewellers.png"}
          alt={"hero_banner_for_this_page"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="px-10 mt-5 text-justify">
        <p>
          WHP Jewellers is a one-stop- destination for all your jewellery needs.
          We offer a wide range of gold and diamond jewellery for men, women and
          children. Our collection includes rings, earrings, pendants,
          necklaces, bangles, bracelets and more. We also offer customised
          jewellery as per your requirements. Our goal is to help you find the
          perfect piece of jewellery to suit your style, budget and occasion.
        </p>
        <p className="mt-4 leading-7">
          We are committed to providing outstanding customer service, and We
          offer free shipping and 30-day return policy on all our products. So,
          shop with confidence and choose us for all your jewellery needs! Since
          2016, we have been catering to the jewellery needs of the Indian
          diaspora in India and abroad.
        </p>
        <p className="mt-4 leading-7">
          Trusted by patrons for purity and transparency, we bring only 100% BIS
          hallmarked Gold, Certified Diamonds, and Certified Colored Stones. An
          Indian acquires their first piece of gold adornment at birth and from
          there on the personal jewellery trousseau keeps building up. Be it the
          birth of a child, an engagement or a wedding or just another day at
          work, at WHP Jewellers we have crafted jewels for every moment of your
          life.{" "}
        </p>
        <p className="mt-4 leading-7">
          From Gold coins to Head-to-toe bridal trousseau, WHP Jewellers has
          been fulfilling fine jewellery needs of every budget and requirement
          since inception. Each piece is handmade with care and attention to
          detail, and undergoes several quality checks to ensure that our
          customers receive nothing less than the best. To make jewellery more
          accessible to our patrons, we also offer EMI options. Keeping in mind
          the comfort and safety of our patrons, we also provide Try at Home
          Service where our jewellery consultant brings our store at your home
          for you to try and select the jewellery of your choice without
          stepping out. You can also sell your jewellery from the comfort of
          your home now.
        </p>
        <p className="mt-4 leading-7">
          Brainchild of Dr. Aditya Pethe, www.whpjewellers.in the brand has
          stably grown and holds a noteworthy market share. <br />
        </p>
        <p className="mt-4 leading-7">
          For the fashionistas who have a distinct vision for their own
          jewellery designs, we also provide customization where our design team
          collaborates with you to bring your vision to life. You can also buy
          an authentic WHP Jewellers jewel from Our Website www.whpjewellers.in
          and marketplaces including www.nykaa.com , www.ajio.com ,
          www.amazon.com , www.flipkart.com , www.tataclicq.com and
          www.amazon.in.{" "}
        </p>
        <p className="mt-4 leading-7">
          Our free & Secured Shipping PAN India has satisfied more than 1Lac
          customers. A lifetime exchange and buyback policy is designed with
          Indian consumer’s jewellery buying needs in mind. To safeguard our
          patrons, we also provide Complimentary for one year.
        </p>
        <p className="mt-4 leading-loose">
          We offer a wide range of jewellery, from our own brand Anayra Our
          Sterling 92.5 Silver Jewellery perfect for the millennial woman. Along
          with Fine Jewellery, we also bring a wide array of silver articles
          including utensils, idols of deities and much more. And a huge
          collections of Coloured stones under the brand 9Ratna.{" "}
        </p>
        <p className="mt-4 leading-7">
          Address: 306, 3rd Floor, Man Excellenza, JN of SV Road, Opp Pawan
          Hans, Vile Parle (W), Mumbai, Maharashtra - 400056<br/> Email:
          care@whpjewellers.in <br/> Contact No.: 1800-222-225<br/>Timming: 10:30 AM to 7:30 PM
        </p>
      </div>
    </>
  );
};

export default page;
