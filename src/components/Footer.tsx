import React from "react";
import logo from "../assets/footerlogo.png";
import visa from "../assets/Visa.png";
import MC from "../assets/Layer_x0020_1.png";
import apple from "../assets/Apple pay.png";
import image1 from "../assets/image 1.png";
import facebook from "../assets/Group 21.png";
import linkedin from "../assets/Group 20.png";
import instagram from "../assets/Group 18.png";
import twitter from "../assets/Group 19.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 border-t max-w-[1512px] mx-auto mt-6">
      <div className="grid lg:grid-cols-2 px-8 md:px-24 gap-10 md:gap-24 pt-4 border-b-[0.5px]">
        <div>
          <img src={logo} alt="" className="" />
          <p className="font-normal text-[16px] font-crimson leading-[100%] text-[#ADADAD] mb-6">
            Our food delivery service for short-term rentals helps stock your
            fridge with fresh, locally sourced groceries before you arrive.
            Browse our selection online and enjoy the convenience of having a
            full fridge waiting for you when you arrive, so you can focus on
            enjoying your trip.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[107px] lg:gap-[20%]">
          <div>
            <p className="text-[#253D4E] font-semibold text-2xl mb-9">Links</p>
            <ul>
              {links.map((link) => {
                return (
                  <li className="font-crimson font-normal text-[18px] mb-[15px]">
                    {link.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="text-[#253D4E] font-semibold text-2xl mb-9">Help</p>
            <ul>
              {helps.map((help) => {
                return (
                  <li className="font-crimson font-normal text-[18px] mb-[15px]">
                    {help.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center px-8 md:px-24 border-b-[0.5px] border-[#A8A8A8]">
        <div>
          <p className="font-medium text-[16px] py-7 ">
            © 2023 Bellhopt LLC. All rights reserved
          </p>
        </div>
        <div className="hidden md:flex gap-3 justify-between items-center">
          <img src={visa} alt="" />
          <img src={MC} alt="" />
          <img src={apple} alt="" />
          <img src={image1} alt="" />
        </div>
        <div className="flex flex-row gap-4 mt-3 md:mt-0">
          <img src={facebook} alt="" />
          <img src={linkedin} alt="" />
          <img src={instagram} alt="" />
          <img src={twitter} alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const links = [
  { name: "Become a Partner", link: "/partner" },
  { name: "Rentals", link: "/rental" },
  { name: "My Cart", link: "/cart" },
];
const helps = [
  { name: "Contact Us", link: "/contact" },
  { name: "Privacy Policy", link: "/privacy" },
  { name: "Payments", link: "/payment" },
];
