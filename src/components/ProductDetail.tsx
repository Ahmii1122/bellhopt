import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoredContext";

const ProductDisplay = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(StoreContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { food_list } = context;
  const product = food_list.find(
    (item: { id: number }) => String(item.id) === id
  );

  return (
    <div>
      <p>{product?.name}</p>
      <img className="font-black">{product?.image}</img>
    </div>
  );
};
export default ProductDisplay;
