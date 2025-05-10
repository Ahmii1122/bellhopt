import { createContext, ReactNode, useContext, useState } from "react";
import useProducts from "../hooks/useProducts";

export interface StoreContextType {
  cartitems: Record<string, number>;
  setcartitems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  addtocart: (itemId: string) => void;
  removeformcart: (itemId: string) => void;
  gettotalcartamount: () => number;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

interface StoreContextProviderProps {
  children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
  const [cartitems, setcartitems] = useState<Record<string, number>>({});
  const { products } = useProducts();

  const addtocart = (itemId: string) => {
    setcartitems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeformcart = (itemId: string) => {
    setcartitems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const gettotalcartamount = () => {
    let totalamount = 0;
    for (const item in cartitems) {
      if (cartitems[item] > 0) {
        const iteminfo = products?.find(
          (product) => String(product.id) === item
        );
        if (iteminfo) {
          totalamount += iteminfo.price * cartitems[item];
        }
      }
    }
    return totalamount;
  };

  const contextValue: StoreContextType = {
    cartitems,
    setcartitems,
    addtocart,
    removeformcart,
    gettotalcartamount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      "useStoreContext must be used within a StoreContextProvider"
    );
  }
  return context;
};
