import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../lib/types";
import { useRef } from "react";
import ProductCard from "./ProductCard";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Carousel = ({
  items,
  title,
  rows = 1,
  desktopColumns = 4,
  tabletColumns = 3,
  mobileColumns = 2,
  infinite = true,
}: {
  items: Product[];
  title: string;
  rows?: number;
  desktopColumns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  infinite?: boolean;
}) => {
  console.log(title + " Items", items);
  const sliderRef = useRef<Slider>(null);
  const settings: Settings = {
    dots: false,
    infinite,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: tabletColumns,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: mobileColumns,
        },
      },
    ],
    slidesToShow: desktopColumns,
    rows: rows,
  };
  return (
    <div className="max-w-[1512px] mx-auto">
      <div className="flex flex-row justify-between items-center">
        <p className="font-segoe font-bold text-4xl ">{title}</p>
        <div className="flex flex-row gap-5">
          <div className="flex gap-2">
            <div
              onClick={() => sliderRef.current?.slickPrev()}
              className="bg-gray-200 rounded-full p-2 hover-ring"
            >
              <FaArrowLeft className="size-4 bg-gray-200 rounded-full" />
            </div>
            <div
              onClick={() => sliderRef.current?.slickNext()}
              className="bg-gray-200 rounded-full p-2 hover-ring"
            >
              <FaArrowRight className="size-4 bg-[#F2F3F4] rounded-full" />
            </div>

            <Link to={`/products/?category=${items?.[0]?.category}`}>
              <p className="pl-8 text-nowrap text-red-500 font-semibold">
                See all
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Slider
        {...settings}
        ref={sliderRef}
        centerMode={false}
        variableWidth={false}
        className="items-start flex align-start"
      >
        {items.map((item) => (
          <div className="" key={item.id}>
            <ProductCard item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
