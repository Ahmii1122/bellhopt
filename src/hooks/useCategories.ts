import { useQuery } from "@tanstack/react-query";
import { API } from "../lib/axios";
import { Category } from "../lib/types";
const useCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => (await API.get("/products/categories")).data,
  });

  return { categories, categoriesLoading: isLoading, categoriesError: error };
};

export default useCategories;
