"use client";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Faqs = [
  {
    question: "Do you ship outside India?",
    answer:
      "Yes, we do! Please contact us to know if we can ship to your country",
  },
  {
    question: "How much is the shipping charge?",
    answer:
      "It varies from country to country. For further details contact us at: 1800-222-225 or whatsapp us on: +91 7304275682",
  },
  {
    question:
      "I live outside India, but I want to have the order delivered in India. Is it possible?",
    answer:
      "Yes it is possible to do that! Just change your shipping country to India get your order delivered to your loved ones in India. If you’re facing any issues, please Contact us at: 1800-222-225 or whatsapp us on: +91 7304275682",
  },
  {
    question:
      "Do I have to pay any additional custom duty charges for my order?",
    answer:
      "Yes, we do! Please contact us to know if we can ship to your country",
  },
  {
    question: "How can I return/exchange an item shipped internationally?",
    answer:
      "We are currently not accepting returns or exchanges on international orders.",
  },
  {
    question: "Can you customise a design just for me?",
    answer:
      "We are happy to help customise any design you have in mind and deliver it is to your door step.",
  },
  {
    question: "Once I’ve placed my order, how do I track?",
    answer:
      "The moment your order is cleared at customs and dispatched, we will share the tracking link with you. In case of any queries before dispatch, please Contact us at: 1800-222-225 or whatsapp us on: +91 7304275682",
  },
  {
    question: "Is COD option available for all jewellery?",
    answer: "Yes, COD is available on all jewellery.",
  },
  {
    question: "Is there any additional charge for the COD shipment?",
    answer: "No additional charges on COD.",
  },
  {
    question: "Is the EMI option available?",
    answer: "Yes, EMI option is available.",
  },
  {
    question: "Is there any additional charge for the COD shipment?",
    answer: "No additional charges on COD.",
  },
  {
    question: "How do I expedite my EMI process?",
    answer:
      "If you have all the required documents ready and down payment made within 24 hours, we can try and expedite the process. As soon as you inform us, we’ll forward your request to the Fastbanking team which will ensure that loan is approved within 4 days.",
  },
  {
    question: "Is the Try at Home service free?",
    answer:
      "Yes, there are absolutely no charges for Try at Home (Only available in Mumbai)",
  },
  {
    question: "How many products can I try?",
    answer:
      "You can select up to 5-10 products for Try at Home. If you would like to select a few more designs to try, please contact us on: 1800-222-225, and we will help you with it.",
  },
  {
    question: "How do I place an exchange order and when should I do so?",
    answer:
      "You can call us at our toll-free number 1800-222-225 or mail us at: Care@whpjewellers.in",
  },
  {
    question: "How will I get a refund for the difference in amounts?",
    answer:
      "The balance amount will be refunded to the same account from where the payment had been made. In the case of COD, the difference will be transferred to the bank details shared by you with our customer representative.",
  },
  {
    question:
      "How many days will it take for the refund to reflect in my account?",
    answer:
      "It’ll take around 7 to 10 business days for the refund amount to reflect in your account.",
  },
  {
    question:
      "It’ll take around 7 to 10 business days for the refund amount to reflect in your account.",
    answer:
      "Call us on 1800 222 225 between 9:30am to 8:00pm. Our customer representative will assist to book your order.",
  },
  {
    question: "Do I have to bear the shipping cost?",
    answer: "NO, we have free shipping in India.",
  },
  {
    question: "Is the Gold jewellery is hallmarked?",
    answer: "Yes, All gold Jewellery is BIS Hallmarked.",
  },
  {
    question: "What are the different payment options?",
    answer:
      "We Have Multiple payment options available such as credit card, debit card, net banking or cash-on-delivery.",
  },
];
const FAQs = () => {
  const [accordian, setAccordian] = useState<any>();
  const handleToggle = (number: any) => {
    setAccordian(number === accordian ? null : number);
  };
  return (
    <div>
      <div className="w-full text-center text-[40px] text-[#e26178]">
        <p>FREQUENTLY ASKED QUESTIONS</p>
      </div>
      <div className="border-b-[1px] border-[#e26178] mx-8 mb-6">
        {Faqs.map((faq: any, index: any) => (
          <div key={index} onClick={() => handleToggle(index)} className="">
            <div className="border border-[#e26178] border-b-0 p-2 cursor-pointer flex justify-between hover:bg-[#fff0f3]">
              <div>{faq.question}</div>
              <div>
                <Icon.Plus />
              </div>
            </div>
            {index === accordian && (
              <div className="border-r-[1px] border-l-[1px] border-[#e26178] p-2 hover:bg-[#ffd3db]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
