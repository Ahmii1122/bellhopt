import { useState, useEffect, useContext } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import logo from "../assets/bellhoptlogo.png";
import { HiMenuAlt3 } from "react-icons/hi";
// import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext, StoreContextType } from "../context/StoredContext";
import useCategories from "../hooks/useCategories";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";
  const isCheckoutPage = location.pathname === "/checkout";
  const { categories, categoriesLoading } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || categories?.[0]?.slug;
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { cartitems } = useContext(StoreContext) as StoreContextType;
  const totalCartItems = Object.keys(cartitems).filter(
    (itemId) => cartitems[itemId] > 0
  ).length;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const toggleSubcategories = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  // Check screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const setActiveCategory = (category: string) => {
    setSearchParams({ category });
  };

  const gotocart = () => {
    navigate("/cart");
  };
  return (
    <nav className="max-w-[1330px] mx-auto px-4 md:px-10 md:pl-4 py-2">
      {isMobile ? (
        // Mobile View
        <div>
          <div className={`flex items-center justify-between`}>
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Logo"
              className="w-[100px] h-[60px]"
            />
            <button
              onClick={gotocart}
              className="bg-red-500 rounded-full p-2 flex items-center justify-center gap-2"
            >
              <MdShoppingCart size={29} color="white" />
              <span className="text-white text-2xl font-semibold">
                {totalCartItems}
              </span>
            </button>
          </div>

          {/* Bars + Search */}
          <div className="mt-4 flex justify-between items-center gap-2">
            {!isCartPage && !isCheckoutPage && (
              <div
                className="md:hidden flex items-center justify-center"
                onClick={toggleMenu}
              >
                <HiMenuAlt3 size={29} color="red" />
              </div>
            )}

            {!isCheckoutPage && (
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <IoIosSearch className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search products here..."
                  className="w-full rounded-full pl-10 pr-4 py-3 text-black bg-[#f7f7f7] focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </form>
            )}
          </div>

          {/* Category Overlay */}
          {menuOpen && (
            <>
              {/* The black overlay covering the whole screen (except the menu) */}
              <div
                className="fixed inset-0 bg-black bg-opacity-60 z-40"
                onClick={toggleMenu} // Close menu when clicking outside
              />

              {/* Menu stays on top of the overlay */}
              <div
                className="bg-white  inset-0 h-[180%] w-[90%] max-w-md shadow-lg absolute rounded-r-[50px] z-50"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="flex justify-between items-center p-4 px-20 mt-11 mb-5 border-b-2 border-gray-200"
                />
                <h2 className="font-segoe flex items-start justify-start text-2xl font-bold mt-5 pl-6 mb-5">
                  Categories
                </h2>
                <div className="flex flex-col items-center justify-center gap-4">
                  <ul className="space-y-2 ">
                    {categories?.map((category, index) => (
                      <li key={index}>
                        <div
                          className={`flex justify-between items-center cursor-pointer p-2 rounded-md gap-40`}
                          onClick={() => {
                            setActiveCategory(category.slug);
                            toggleMenu();
                          }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            {/* <div className="flex items-center justify-center gap-3 p-2 bg-gray-200 size-12 rounded-full">
                              {}
                            </div> */}
                            <span className="text-lg font-semibold font-segoe">
                              {category.name}
                            </span>
                          </div>

                          {/* {category && (
                            <IoIosArrowDown
                              className={`transition-transform duration-300 size-6 ${
                                openIndex === index ? "rotate-180" : ""
                              }`}
                            />
                          )} */}
                        </div>

                        {/* Subcategories */}
                        {/* {openIndex === index && category && (
                          <ul className="pl-10 mt-2 space-y-1 text-gray-600">
                            {category.map((sub, subIdx) => (
                              <li
                                key={subIdx}
                                className="hover:text-red-500 cursor-pointer"
                              >
                                {sub}
                              </li>
                            ))}
                          </ul> */}
                        {/* )} */}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
                >
                  ✕
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        // Desktop View
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Logo"
              className="hover:cursor-pointer w-[130px] h-[78px]"
            />
          </div>

          <div className="relative w-[53%] flex items-center justify-between gap-4">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IoIosSearch className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search products here..."
                className="w-full rounded-full pl-10 md:pr-[21%] lg:pr-[28%] py-4 text-black bg-[#f7f7f7] focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </form>

            <button
              onClick={gotocart}
              className="pl-4 py-2 flex items-center justify-center rounded-full gap-4 bg-red-500"
            >
              <MdShoppingCart size={29} color="white" />
              <span className="pr-[27px] text-white text-2xl font-semibold">
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// const categories: Category[] = [
//   {
//     name: "Trending",
//     image: <img src={img1} alt="Trending" />,
//     subcategories: ["Mobiles", "Laptops", "Cameras"],
//   },
//   {
//     name: "Packages",
//     image: <img src={img2} alt="Packages" />,
//     subcategories: ["Men", "Women", "Kids"],
//   },
//   {
//     name: "Grocery",
//     image: <img src={img3} alt="Grocery" />,
//     subcategories: ["Furniture", "Decor", "Appliances"],
//   },
//   {
//     name: "Alcohol",
//     image: <img src={img4} alt="Alcohol" />,
//     subcategories: ["Furniture", "Decor", "Appliances"],
//   },
//   {
//     name: "Desert",
//     image: <img src={img5} alt="Desert" />,
//     subcategories: ["Furniture", "Decor", "Appliances"],
//   },
//   {
//     name: "Beverages",
//     image: <img src={img6} alt="Beverages" />,
//     subcategories: ["Furniture", "Decor", "Appliances"],
//   },
//   {
//     name: "Pet Supplies",
//     image: <img src={img7} alt="Pet Supplies" />,
//     subcategories: ["Furniture", "Decor", "Appliances"],
//   },
// ];
