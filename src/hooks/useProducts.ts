import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/axios";
import { Product } from "../lib/types";
const useProducts = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => (await API.get("/products")).data.products,
  });

  return { products, productsLoading: isLoading, productsError: error };
};

export default useProducts;
