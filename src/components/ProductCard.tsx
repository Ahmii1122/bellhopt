import { Product } from "../lib/types";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaMinus } from "react-icons/fa";
import { useStore } from "../context/StoredContext";

const ProductCard = ({ item }: { item: Product }) => {
  const { addtocart, removeformcart, cartitems } = useStore();
  const count = cartitems[item.id] || 0;
  return (
    <>
      <div key={item.id} className="p-4 text-center relative ">
        <Link to={`/productdetail/${item.id}`}>
          <div className="flex justify-center items-center mb-2">
            <img
              src={item.images[0]}
              alt={item.title}
              className="object-contain size-52 mx-auto"
            />
          </div>
        </Link>

        <div className="absolute top-36 right-4 group bg-white rounded-full p-2 shadow-md">
          {count > 0 ? (
            <div className="flex items-center space-x-2">
              {count > 1 ? (
                <button
                  onClick={() => removeformcart(String(item.id))}
                  className="p-2"
                >
                  <FaMinus />
                </button>
              ) : (
                <button
                  onClick={() => removeformcart(String(item.id))}
                  className=" p-2"
                >
                  <FaTrash />
                </button>
              )}
              <span>{count}</span>
              <button
                onClick={() => addtocart(String(item.id))}
                className=" p-2"
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <button onClick={() => addtocart(String(item.id))} className="p-1">
              <span className="hidden group-hover:block transition-all duration-3000">
                Add to cart
              </span>
              <FiPlus size={25} className="group-hover:hidden" />
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
          <div className="flex justify-start items-start">{item.title}</div>
          <div className="flex justify-start items-start mb-2 text-sm text-gray-500">
            <p>({item.availabilityStatus})</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
