import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCategories from "../../hooks/useCategories";
import { API } from "../../lib/axios";
import { Product } from "../../lib/types";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../../components/ProductCard";

const Display = () => {
  const { categories, categoriesLoading } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || categories?.[0]?.slug;
  const { data: productscat, isLoading } = useQuery<Product[]>({
    queryKey: ["productcategory", category],
    queryFn: async () =>
      (await API.get(`/products/category/${category}`)).data.products,
  });
  const setActiveCategory = (category: string) => {
    setSearchParams({ category });
  };

  // const activeCategory =
  //   categories?.find((c) => c.slug === category) || categories?.[0];

  return (
    <div className="flex min-h-screen max-w-[1512px] mx-auto w-full">
      <aside className="hidden md:block w-1/3 lg:w-1/4 bg-white shadow p-8 ">
        <h2 className="font-bold text-xl mb-4">Categories</h2>
        <div className="flex flex-col justify-center">
          {categoriesLoading ? (
            <div className="flex flex-col gap-2">
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-7 w-full" />
                ))}
            </div>
          ) : (
            <ul className="pl-10 mt-2 space-y-5 text-gray-600">
              {categories?.map((category, subIdx) => (
                <li
                  key={subIdx}
                  className="hover:text-red-500 cursor-pointer font-semibold text-lg"
                  onClick={() => setActiveCategory(category.slug)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      <main className="p-6 w-full md:w-[75%]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <CardSkeleton key={index} />
              ))}
          </div>
        ) : (
          // <Carousel
          //   items={productscat || []}
          //   title={activeCategory?.name || "Products"}
          //   rows={1}
          //   infinite={false}
          //   desktopColumns={4}
          //   tabletColumns={3}
          //   mobileColumns={2}
          // />

          <div>
            <p className="font-bold text-4xl font-segoe mb-4  first-letter:capitalize">
              {productscat?.[0]?.category}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productscat?.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Display;
