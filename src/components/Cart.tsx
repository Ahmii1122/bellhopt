import React, { useContext } from "react";
import { StoreContext, StoreContextType } from "../context/StoredContext";
import { useNavigate } from "react-router-dom";
import edit from "../assets/Edit.png";
import remove from "../assets/Delete.png";
import useProducts from "../hooks/useProducts";

const Cart: React.FC = () => {
  const { products } = useProducts();
  const { cartitems, addtocart, removeformcart, gettotalcartamount } =
    useContext(StoreContext) as StoreContextType;

  const navigate = useNavigate();

  const subtotal = gettotalcartamount();
  const tax = subtotal * 0.05;
  const delivery = subtotal === 0 ? 0 : 14.99;
  const total = subtotal + delivery + tax;

  return (
    <div className="p-4 md:p-6 lg:p- pb-32 md:pb-10 max-w-[1512px] mx-auto">
      <h1 className="text-2xl font-bold mb-6 px-10">My Cart</h1>
      {/* <p className="flex justify-center text-right max-w-[900px] mt-10   md:hidden lg:block  ">
        Order Summary
      </p> */}
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-6">
        <div className="hidden md:block w-full lg:w-1/3  p-6 border-[1px] border-gray-200 shadow self-start mt-8">
          <h2 className="text-lg font-semibold mb-4 ">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Platform Fee(5%)</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Driver’s Fee</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>

        <div className="flex-1 mb-6 gap-2 md:px-10">
          <div className="hidden md:grid w-full grid-cols-4 text-sm font-semibold text-gray-700 border-b pb-3 gap-1 sm:gap-2">
            <p>Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
          </div>

          {products?.map((item) => {
            const quantity = cartitems[String(item.id)];
            if (quantity > 0) {
              return (
                <div key={item.id} className="border-b py-4">
                  <div className="hidden md:grid grid-cols-4 items-center gap-1 sm:gap-2">
                    <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-3 ">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover border-2 border-gray-200 p-1 rounded"
                      />
                      <div className="flex flex-col -2">
                        <p className=" text-xl font-bold sm:text-sm text-nowrap leading-tight md:text-wrap lg:text-nowrap max-w-[100px] sm:max-w-none">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-gray-500 sm:text-xs">
                          {item.availabilityStatus}
                        </p>
                      </div>
                    </div>
                    <p className="text-center font-medium text-sm sm:text-base">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex justify-center items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => removeformcart(String(item.id))}
                        className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
                      >
                        -
                      </button>
                      <span className="bg-red-100 text-red-700 px-2 rounded font-semibold min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => addtocart(String(item.id))}
                        className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
                      >
                        +
                      </button>
                    </div>
                    <div className="col-s sm:col-span-1 flex justify-center items-center md:gap-16 sm:gap-4">
                      <button>
                        <img src={edit} alt="edit" className="w-5 h-5" />
                      </button>
                      <button onClick={() => removeformcart(String(item.id))}>
                        <img src={remove} alt="remove" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="md:hidden flex flex-row items-center justify-between gap-3 p-3 bg-white shadow rounded-lg">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded border"
                    />
                    <div className="flex flex-col w-[30%]">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.availabilityStatus}
                      </p>
                    </div>
                    <div className="  ">
                      <div className="flex items-center gap-0 mt-1">
                        <button
                          onClick={() => removeformcart(String(item.id))}
                          className="w-6 h-6 rounded-full bg-red-500 text-white"
                        >
                          -
                        </button>
                        <span className="text-center w-6 bg-red-300 ">
                          {quantity}
                        </span>
                        <button
                          onClick={() => addtocart(String(item.id))}
                          className="w-6 h-6 rounded-full bg-red-500 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      <p className="font-bold mb-1 text-black">Total</p>$
                      {(item.price * quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full flex flex-col gap-2 md:hidden mt-  bg-white border-t shadow-[0px_-15px_20px_5px_rgba(0,0,0,0.1)] px-4 py-3">
        <div className="flex flex-row justify-between gap-2 pb-4 pt-4">
          <div className="flex flex-row text-sm gap-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-row text-sm">
            <span>Driver’s Fee</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-row justify-between  border-t pt-4 pb-4 border-gray-500">
          <div className="flex flex-col justify-between text-base font-bold text-gray-500 mt-2">
            <span>Total</span>
            <span className="font-bold text-[30px] pt-2 text-black">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-3 px-5 bg-red-500 text-white py-2 rounded-full"
          >
            Checkout
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Cart;
