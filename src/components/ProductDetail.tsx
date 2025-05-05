import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../context/StoredContext";
import { RiArrowGoBackLine } from "react-icons/ri";
import { TiThMenuOutline } from "react-icons/ti";
import verified from "../assets/verified.png";

const ProductDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState<string>("");

  if (!context) {
    return <div>Loading...</div>;
  }
  const { food_list, addtocart } = context;
  const product = food_list.find(
    (item: { id: number }) => String(item.id) === id
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  if (!selectedImage) {
    setSelectedImage(product.image[0]);
  }

  return (
    <>
      <div className="hidden px-10 md:flex flex-row justify-start items-center gap-3 border-t-[0.5px] pt-7">
        <Link to={"/"}>
          <RiArrowGoBackLine className="flex justify-between items-center" />
        </Link>
        <p>Grocery/product detail</p>
      </div>
      <div className="flex flex-col md:flex-row gap-5 lg:gap-11">
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
    </>
  );
};
export default ProductDisplay;
