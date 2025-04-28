import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import logo from "../assets/bellhoptlogo.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { DiVim } from "react-icons/di";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
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
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint = 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <nav className="max-w-[1330px] mx-auto px-4 py-2">
      {isMobile ? (
        // Mobile View
        <div>
          <div className={`flex items-center justify-between`}>
            <img src={logo} alt="Logo" className="w-[100px] h-[60px]" />
            <button className="bg-red-500 rounded-full p-2 flex items-center justify-center gap-2">
              <MdShoppingCart size={29} color="white" />
              <span className="text-white text-2xl font-semibold">4</span>
            </button>
          </div>

          {/* Bars + Search */}
          <div className="mt-4 flex justify-between items-center gap-2">
            <div
              className="flex items-center justify-center"
              onClick={toggleMenu}
            >
              <HiMenuAlt3 size={29} color="red" />
            </div>

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
                className="bg-white rounded-2xl inset-0 h-full w-[90%] max-w-md shadow-lg absolute rounded-r-[50px] z-50"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
              >
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
            <img src={logo} alt="Logo" className="w-[130px] h-[78px]" />
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

            <button className="pl-4 py-2 flex items-center justify-center rounded-full gap-4 bg-red-500">
              <MdShoppingCart size={29} color="white" />
              <span className="pr-[27px] text-white text-2xl font-semibold">
                4
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
