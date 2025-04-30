import { useContext, useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { StoreContext } from "../../context/StoredContext";
import { categories } from "../../assets/assets";

const Display = () => {
  const store = useContext(StoreContext);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  if (!store) return null;

  const { food_list, cartitems, addtocart, removeformcart, setcartitems } =
    store;

  const toggleSubcategories = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleDelete = (id: number) => {
    setcartitems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 max-w-[1512px] mx-auto w-full">
      <aside className="hidden md:block w-1/3 lg:w-1/4 bg-white shadow p-8 ">
        <h2 className="font-bold text-xl mb-4">Categories</h2>
        <div className="flex flex-col justify-center">
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex justify-between items-center cursor-pointer p-2 rounded-md lg:gap-[2%]"
                  onClick={() =>
                    category.subcategories && toggleSubcategories(index)
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center justify-center gap-3 p-2 bg-gray-200 size-12 rounded-full">
                      <img src={category.image} alt={category.name} />
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

                {openIndex === index && category.subcategories && (
                  <ul className="pl-10 mt-2 space-y-1 text-gray-600">
                    {category.subcategories.map(
                      (sub: string, subIdx: number) => (
                        <li
                          key={subIdx}
                          className="hover:text-red-500 cursor-pointer"
                        >
                          {sub}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
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
          {food_list.map((item) => {
            const count = cartitems[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white shadow p-4 rounded-lg text-center relative h-[300px] flex flex-col justify-between"
              >
                <div className="flex justify-center items-center text-4xl mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className=" object-contain"
                  />
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
                          onClick={() => removeformcart(String(item.id))}
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
                        onClick={() => addtocart(String(item.id))}
                        className="bg-green-200 p-2 rounded hover:bg-green-300"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addtocart(String(item.id))}
                      className="bg-white p-2 rounded-full shadow hover:bg-green-100"
                    >
                      {hoveredItem === item.id ? "Add to cart" : <FaPlus />}
                    </button>
                  )}
                </div>
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
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Display;
