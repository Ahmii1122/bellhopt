import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import img1 from "../../assets/pngwing 14.png";
import img2 from "../../assets/pngwing 15.png";
import img3 from "../../assets/pngwing 16.png";
import img4 from "../../assets/pngwing 17.png";
import img5 from "../../assets/pngwing 19.png";
import img6 from "../../assets/pngwing 20.png";
import img7 from "../../assets/pngwing 21.png";
import img8 from "../../assets/pngwing 22.png";
import imgc1 from "../../assets/Flame.png";
import imgc2 from "../../assets/detergent 1.png";
import imgc3 from "../../assets/Groceries Basket.png";
import imgc4 from "../../assets/Wine.png";
import imgc5 from "../../assets/cake.png";
import imgc6 from "../../assets/Wine.png";
import imgc7 from "../../assets/pets.png";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

const items = [
  {
    id: 1,
    name: "Strawberry",
    price: 1.2,
    unit: "$0.59/lb",
    image: <img src={img1} alt="" />,
  },
  {
    id: 2,
    name: "Apple green",
    price: 2.2,
    unit: "$0.59/lb",
    image: <img src={img2} alt="" />,
  },
  {
    id: 3,
    name: "Orange (each)",
    price: 1.2,
    unit: "$0.59/lb",
    image: <img src={img3} alt="" />,
  },
  {
    id: 4,
    name: "Green Lemon",
    price: 1.2,
    unit: "$0.59/lb",
    image: <img src={img4} alt="" />,
  },
  {
    id: 5,
    name: "Tomatto",
    price: 1.2,
    unit: "$0.59/lb",
    image: <img src={img5} alt="" />,
  },
  {
    id: 6,
    name: "Pomegranate",
    price: 1.2,
    unit: "$2.59/lb",
    image: <img src={img6} alt="" />,
  },
  {
    id: 7,
    name: "Potato",
    price: 1.2,
    unit: "$0.59/lb",
    image: <img src={img7} alt="" />,
  },
  {
    id: 8,
    name: "Red onions",
    price: 1.2,
    unit: "$0.59/lb",
    image: <img src={img8} alt="" />,
  },
];
const categories: Category[] = [
  {
    name: "Trending",
    image: <img src={imgc1} alt="Trending" />,
    subcategories: ["Mobiles", "Laptops", "Cameras"],
  },
  {
    name: "Packages",
    image: <img src={imgc2} alt="Packages" />,
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    name: "Grocery",
    image: <img src={imgc3} alt="Grocery" />,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    name: "Alcohol",
    image: <img src={imgc4} alt="Alcohol" />,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    name: "Desert",
    image: <img src={imgc5} alt="Desert" />,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    name: "Beverages",
    image: <img src={imgc6} alt="Beverages" />,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    name: "Pet Supplies",
    image: <img src={imgc7} alt="Pet Supplies" />,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
];

const App = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [cart, setCart] = useState({});
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const toggleSubcategories = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleAdd = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id: number) => {
    setCart((prev) => {
      const count = prev[id];
      if (count <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: count - 1 };
    });
  };

  const handleDelete = (id: number) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 max-w-[1512px] mx-auto w-full">
      <aside className="hidden md:block w-1/3 lg:w-1/4 bg-white shadow p-8 ">
        <h2 className="font-bold text-xl mb-4">Categories</h2>
        <div className="flex flex-col justify-center  ">
          <ul className="">
            {categories.map((category, index) => (
              <li key={index} className="mb-4">
                <div
                  className={`flex justify-between items-center cursor-pointer p-2 rounded-md lg:gap-[2%]`}
                  onClick={() =>
                    category.subcategories && toggleSubcategories(index)
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center justify-center gap-3 p-2 bg-gray-200 size-12 rounded-full">
                      {category.image}
                    </div>
                    <span className="text-lg font-semibold font-segoe text-nowrap">
                      {category.name}
                    </span>
                  </div>

                  {category.subcategories && (
                    <IoIosArrowDown
                      className={`transition-transform duration-300 size-6 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Subcategories */}
                {openIndex === index && category.subcategories && (
                  <ul className="pl-10 mt-2 space-y-1 text-gray-600">
                    {category.subcategories.map((sub, subIdx) => (
                      <li
                        key={subIdx}
                        className="hover:text-red-500 cursor-pointer"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>{" "}
      </aside>
      <main className="flex-1 p-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Fruits and Vegetables</h1>
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full p-2">
              <FaArrowLeft className="size-4 bg-gray-200 rounded-full" />
            </div>
            <div className="bg-gray-200 rounded-full p-2">
              <FaArrowRight className="size-4 bg-gray-200 rounded-full" />
            </div>

            <p className="pl-8 text-nowrap text-red-500 font-semibold">
              See all
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-6">
          {items.map((item) => {
            const count = cart[item.id] || 0;
            return (
              <div className="bg-white shadow p-4 rounded-lg text-center relative h-[300px] flex flex-col justify-between">
                <div className="flex justify-center items-center text-4xl mb-2">
                  {item.image}
                </div>
                <div
                  className="absolute top-36 right-4"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {count > 0 ? (
                    <div className="flex items-center space-x-2">
                      {count > 1 ? (
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                        >
                          <FaMinus />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-200 p-2 rounded hover:bg-red-300"
                        >
                          <FaTrash />
                        </button>
                      )}
                      <span>{count}</span>
                      <button
                        onClick={() => handleAdd(item.id)}
                        className="bg-green-200 p-2 rounded hover:bg-green-300"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(item.id)}
                      className="bg-white p-2 rounded-full shadow hover:bg-green-100"
                    >
                      {hoveredItem === item.id ? "Add to cart" : <FaPlus />}
                    </button>
                  )}
                </div>
                <div className="flex items-start justify-start font-semibold text-3xl">
                  <span className="text-sm mt-1 mr-0.5">$</span>
                  <span>{Math.floor(item.price)}</span>
                  <span className="text-sm mt-1">
                    .{item.price.toFixed(2).split(".")[1]}
                  </span>
                </div>

                <div className="flex justify-start items-start">
                  {item.name}
                </div>
                <div className="flex justify-start items-start mb-2 text-sm text-gray-500">
                  <p>({item.unit})</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
