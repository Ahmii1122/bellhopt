import React, { useContext } from "react";
import { StoreContext, StoreContextType } from "../context/StoredContext";
import { useNavigate } from "react-router-dom";
import edit from "../assets/edit.png";
import remove from "../assets/Delete.png";

const Cart: React.FC = () => {
  const {
    cartitems,
    food_list,
    addtocart,
    removeformcart,
    gettotalcartamount,
  } = useContext(StoreContext) as StoreContextType;

  const navigate = useNavigate();

  const subtotal = gettotalcartamount();
  // const tax = subtotal * 0.05;
  const delivery = subtotal === 0 ? 0 : 2.5;
  const total = subtotal + delivery;

  return (
    <div className="p-4 md:p-6 lg:p-10 pb-32 md:pb-10">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      <div className="flex flex-col lg:flex-row-reverse gap-6">
        <div className="hidden md:block w-full lg:w-1/3 bg-gray-50 p-6 rounded-xl shadow self-start">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
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
            onClick={() => navigate("/order")}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>

        <div className="flex-1">
          <div className="hidden md:grid grid-cols-5 text-sm font-semibold text-gray-700 border-b pb-3 gap-1 sm:gap-2">
            <p>Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center col-span-2 sm:col-span-1">Actions</p>
          </div>

          {food_list.map((item) => {
            const quantity = cartitems[String(item.id)];
            if (quantity > 0) {
              return (
                <div key={item.id} className="border-b py-4">
                  <div className="hidden md:grid grid-cols-5 items-center gap-1 sm:gap-2">
                    <div className="flex flex-col items-center gap-2 sm:gap-3 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover border-2 border-gray-200 p-1 rounded"
                      />
                      <div className="flex flex-col p-1">
                        <p className="font-medium text-xs sm:text-sm leading-tight max-w-[100px] sm:max-w-none">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-gray-500 sm:text-xs">
                          {item.unit}
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
                        className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
                      >
                        +
                      </button>
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex justify-center items-center gap-1 sm:gap-4">
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
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                    <div className="flex flex-col w-[30%]">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.unit}</p>
                    </div>
                    <div className="  ">
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => removeformcart(String(item.id))}
                          className="w-6 h-6 rounded-full bg-red-500 text-white"
                        >
                          -
                        </button>
                        <span className="text-center w-6 bg-red-300">
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
      <div className="fixed bottom-0 left-0 w-full flex flex-col gap-2 md:hidden bg-white border-t shadow-lg px-4 py-3">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-row text-sm gap-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-row text-sm">
            <span>Driver’s Fee</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between text-base font-bold mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate("/order")}
          className="mt-3 w-full bg-red-500 text-white py-2 rounded-full"
        >
          Checkout
        </button>
      </div>{" "}
    </div>
  );
};

export default Cart;
