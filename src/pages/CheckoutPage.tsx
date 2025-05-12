import { useContext, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { StoreContext, StoreContextType } from "../context/StoredContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { gettotalcartamount } = useContext(StoreContext) as StoreContextType;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [selectedTip, setSelectedTip] = useState("20%"); // default selection
  const [tipAmount, setTipAmount] = useState(0);

  const subtotal = gettotalcartamount();
  const computedTip =
    selectedTip === "10%"
      ? subtotal * 0.1
      : selectedTip === "15%"
      ? subtotal * 0.15
      : selectedTip === "20%"
      ? subtotal * 0.2
      : tipAmount; // For 'Custom'

  const tax = subtotal * 0.05;
  const delivery = 10;
  const total = subtotal + tax + delivery + computedTip;

  const handleTipSelection = (label: string) => {
    setSelectedTip(label);

    if (label === "Custom") {
      const custom = parseFloat(prompt("Enter custom tip amount:") || "");
      setTipAmount(isNaN(custom) ? 0 : custom);
    } else {
      setTipAmount(0); // Reset tipAmount if not Custom
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    new Date(0, 0, 0, i).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const handleAddEmail = () => {
    if (newEmail.trim() && !additionalEmails.includes(newEmail.trim())) {
      setAdditionalEmails((prev) => [...prev, newEmail.trim()]);
      setNewEmail("");
    }
  };

  return (
    <div className="max-w-[1512px] mx-auto border-t-[0.5px] border-gray-200 ">
      <p className="text-2xl font-bold font-segoe px-20 mt-10">Checkout</p>
      <div className="flex flex-col lg:flex-row justify-between gap-11 px-4 lg:px-10 mt-10">
        <div className="w-full lg:w-[65%]">
          <div className="border-[0.5px] border-gray-200 p-4">
            <h2 className="text-2xl font-semibold mb-2 pb-6 border-b-[0.5px] border-gray-200">
              Expected Time of Arrival
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[18px] font-medium block mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border-[0.5px] px-3 py-3 accent-red-500  bg-gray-100 mb-11"
                />
              </div>
              <div>
                <label className="text-[18px] font-medium block mb-2">
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border-[0.5px] px-3 py-[13px] bg-gray-100"
                >
                  <option value="">Select Time</option>
                  {hours.map((hr, idx) => (
                    <option key={idx} value={hr}>
                      {hr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5 p-4 border-[0.5px] border-gray-300">
            <h2 className="text-2xl font-semibold mb-4 mt-3">
              Contact Information
            </h2>
            <label className="text-sm text-gray-500 block mb-[11px]">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+123 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-[0.5px] border-gray-300 rounded px-3 py-4 mb-7"
            />
          </div>
          {/* end of contact information */}
          <div className="border-[0.5px] rounded p-4 mt-5 border-gray-300 space-y-2">
            <h2 className="text-2xl font-semibold mb-5 mt-6">
              Delivery Address{" "}
              <span className="text-sm text-gray-500">(auto fetched)</span>
            </h2>
            <p className="text-[18px] text-gray-700 flex items-center gap-2 -6 border-b-[0.5px] border-gray-300 pb-6">
              <span className="text-red-500 s">
                <CiLocationOn size={26} />
              </span>{" "}
              LH 123, Apt. 2 Zabar's, Broadway, New York, NY, USA
            </p>
            <label className="inline-flex items-center  text-[18px] gap-2 pt-4">
              <input
                type="checkbox"
                checked={addressConfirmed}
                onChange={() => setAddressConfirmed(!addressConfirmed)}
                className="h-4 w-4 accent-red-500 "
              />
              I've confirmed the above address
            </label>
          </div>
          {/* end of delivery address */}
          <div className="mt-5 p-4 border-[0.5px] border-gray-300 mb-40">
            <div className="flex justify-between border-b-[0.5px]">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 mt-3 ">
                Split total bill{" "}
                <span className="text-gray-500 text-sm">(Optional)</span>
              </h2>
              <button
                onClick={handleAddEmail}
                className="bg-gray-100 border-[0.5px]  rounded-full text-[13px] md:text-[16px] px-3 mb-[10px] hover:bg-gray-200"
              >
                + Add additional email
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter additional email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-grow border-[0.5px] rounded px-3 py-2 hidden"
              />
            </div>
            <div className="flex justify-center mb-9 mt-12 text-sm text-gray-500">
              {additionalEmails.length === 0 ? (
                <p>No additional email added yet</p>
              ) : (
                <ul className="list-disc ml-5">
                  {additionalEmails.map((email, idx) => (
                    <li key={idx}>{email}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-[700px] lg:w-[30%] border-[0.5px] border-gray-300 p-4">
          <div className="">
            <div className="flex justify-between mt-9 font-semibold mb-8">
              <span className="text-[16px]">Subtotal</span>
              <span className="text-[20px]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold mb-8">
              <span className="text-[16px]">Platform Fee (5%)</span>
              <span className="text-[20px]">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold mb-8">
              <span className="text-[16px]">Driver's Fee</span>
              <span className="text-[20px]">${delivery.toFixed(2)}</span>
            </div>
            <span className=" font-medium mb-7">Tip for Driver</span>
            <div className="my-10 max-w-full ">
              <div className="flex  bg-gray-100 rounded-full justify-between text-[16px] ">
                {["10%", "15%", "20%", "Custom"].map((label) => (
                  <button
                    key={label}
                    className={`px-6 md:px-4 py-3 rounded-full text-[14px] transition  ${
                      selectedTip === label
                        ? "bg-red-500 text-white "
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => handleTipSelection(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* {(selectedTip === "Custom" || selectedTip !== "0%") && (
                <div className="flex justify-between mb-2">
                  <span>Tip</span>
                  <span>${computedTip.toFixed(2)}</span>
                </div>
              )} */}
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-xl font-semibold font-segoe">Total</span>
              <span className="text-3xl font-bold font-segoe">
                ${total.toFixed(2)}
              </span>
            </div>
            <hr className="mt-4 mb-9" />
            <div className="p-2 mb-10">
              <p className="text-sm leading-[100%] tracking-[0%] text-gray-500">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <span className="text-black text-bold cursor-pointer">
                  privacy policy
                </span>
                .
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/thankyou")}
                className="flex align-middle justify-between items-center bg-red-500 text-white px-20 py-2 rounded-full text-xl font-semibold"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
