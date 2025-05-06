import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoredContext";
import { RiArrowGoBackLine } from "react-icons/ri";
import { TiThMenuOutline } from "react-icons/ti";
import verified from "../assets/verified.png";
import {
  FaArrowLeft,
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const ProductDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage =
    window.innerWidth <= 768 ? 4 : window.innerWidth <= 1024 ? 5 : 5;

  useEffect(() => {
    if (context) {
      const product = context.food_list.find(
        (item: { id: number }) => String(item.id) === id
      );
      if (product?.image && product.image.length > 0) {
        setSelectedImage(product.image[0]);
      }
    }
  }, [context, id]);

  if (!context) {
    return <div>Loading...</div>;
  }
  const { food_list, addtocart, cartitems, removeformcart } = context;

  const product = food_list.find(
    (item: { id: number }) => String(item.id) === id
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const filteredItems = food_list.filter(
    (item) => item.category === "Fruits & Vegetables"
  );
  const visibleItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNext = () => {
    if (startIndex + itemsPerPage < filteredItems.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <>
      <div className="hidden max-w-[1512px] mx-auto px-10 md:flex flex-row justify-start items-center gap-3 border-t-[0.5px] pt-7">
        <Link to={"/"}>
          <RiArrowGoBackLine className="flex justify-between items-center" />
        </Link>
        <p>Grocery/product detail</p>
      </div>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-11 max-w-[1512px] mx-auto">
        <div className="p-3 md:px-10 w-full md:w-[59%] pt-5">
          <div className="  border-[0.5px] flex justify-center item center flex-col ">
            {/* Large Main Image */}
            <div className="mb-4 flex justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-[460px] h-[370px] p-4 "
              />
            </div>
            {/* Thumbnail Row */}
            <div className="flex justify-center items-center mt-12 mb-9 gap-7 overflow-x-auto mb py-4 px-3">
              {product?.image.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.name}
                  className={`w-[75px] h-[67px] object-contain  cursor-pointer pb-3 ${
                    selectedImage === img
                      ? "border-b-2 border-orange-400"
                      : "border-gray-300 "
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-3  pt-5 md:w-[35%] ">
          <div className="border-[0.5px] px-7">
            <h2 className="font-segoe font-bold text-[32px] mt-7 ">
              {product.name}
            </h2>
            <div className="flex flex-row justify-between max-w-[250px] font-semibold font-segoe text-[18px] mt-6">
              <p>SKU</p>
              <p>VIP {product.name}</p>
            </div>
            <div className="flex flex-row justify-between max-w-[250px] font-semibold font-segoe text-[18px] mt-3">
              <p>Vendor</p>
              <p className="">Lorem Ipsum</p>
            </div>
            <h2 className="font-bold text-3xl font-segoe mt-12">
              Price: ${product.price}
            </h2>
            <div className="mt-11">
              {product.stock >= 40 ? (
                <div className="flex flex-row justify-start items-center gap-3">
                  <TiThMenuOutline color="green" size={20} />
                  <p>High Stock</p>
                </div>
              ) : product.stock >= 20 ? (
                <div className="flex flex-row justify-start items-center gap-3">
                  <TiThMenuOutline color="orange" size={20} />
                  <p>Medium Stock</p>
                </div>
              ) : (
                <div className="flex flex-row justify-start items-center gap-3">
                  <TiThMenuOutline color="red" size={20} />
                  <p>Low Stock</p>
                </div>
              )}
            </div>
            <button
              onClick={() => addtocart(String(product.id))}
              className="font-segoe font-bold text-xl text-white py-3 px-9 rounded-full mt-10 bg-[#EF4949]"
            >
              Add to Cart
            </button>
            <hr className="mt-9 mb-12" />
            <div className="flex flex-row gap-5 mb-10">
              <img src={verified} alt="" />
              <p className="font-crimson text-2xl font-normal text-[#009DDD]">
                100% Satisfaction Gaurantee
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 px-10 mt-16 max-w-[1512px] mx-auto">
        <div className="flex flex-row justify-between items-center">
          <p className="font-segoe font-bold text-4xl ">Related Items</p>
          <div className="flex flex-row gap-5">
            <div className="flex gap-2">
              <div
                onClick={handlePrev}
                className="bg-gray-200 rounded-full p-2"
              >
                <FaArrowLeft className="size-4 bg-gray-200 rounded-full" />
              </div>
              <div
                onClick={handleNext}
                className="bg-gray-200 rounded-full p-2"
              >
                <FaArrowRight className="size-4 bg-[#F2F3F4] rounded-full" />
              </div>

              <p className="pl-8 text-nowrap text-red-500 font-semibold">
                See all
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 overflow-hidden mb-28 ">
          {visibleItems.map((item) => {
            const count = cartitems[item.id] || 0;
            return (
              <div
                key={item.id}
                className="  p-4 roundedg text-center relative  flex flex-col justify-between"
              >
                <Link to={`/productdetail/${item.id}`}>
                  <div className="flex justify-center items-center  text-4xl mb-2">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className=" object-contain size-52"
                    />
                  </div>
                </Link>
                <div
                  className="absolute top-36 right-4"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {count > 0 ? (
                    <div className="flex items-center space-x-2">
                      {count > 1 ? (
                        <button
                          onClick={() => removeformcart(String(item.id))}
                          className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                        >
                          <FaMinus />
                        </button>
                      ) : (
                        <button
                          onClick={() => removeformcart(String(item.id))}
                          className="bg-red-200 p-2 rounded hover:bg-red-300"
                        >
                          <FaTrash />
                        </button>
                      )}
                      <span>{count}</span>
                      <button
                        onClick={() => addtocart(String(item.id))}
                        className="bg-green-200 p-2 rounded hover:bg-green-300"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addtocart(String(item.id))}
                      className="bg-white p-3 rounded-full shadow hover:bg-green-100"
                    >
                      {hoveredItem === item.id ? (
                        "Add to cart"
                      ) : (
                        <FiPlus size={25} />
                      )}
                    </button>
                  )}
                </div>
                <Link to={`/productdetail/${item.id}`}>
                  <div className="flex items-start justify-start font-semibold text-3xl">
                    <span className="text-sm mt-1 mr-0.5">$</span>
                    <span className="text-3xl">{Math.floor(item.price)}</span>
                    <span className="text-sm mt-1">
                      .{item.price.toFixed(2).split(".")[1]}
                    </span>
                  </div>

                  <div className="flex justify-start items-start ">
                    {item.name}
                  </div>
                  <div className="flex justify-start items-start mb-2 text-sm text-gray-500">
                    <p>({item.unit})</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ProductDisplay;
