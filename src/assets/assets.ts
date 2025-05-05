import img1 from "../assets/strawberry.png";
import img2 from "../assets/apple.png";
import img3 from "../assets/orange.png";
import img4 from "../assets/lemon.png";
import img5 from "../assets/tomato.png";
import img6 from "../assets/pomegranate.png";
import img7 from "../assets/potato.png";
import img8 from "../assets/onion.png";
import o2 from "../assets/o2.png";
import o3 from "../assets/o3.png";
import o4 from "../assets/o4.png";
import imgc1 from "../assets/Flame.png";
import imgc2 from "../assets/detergent 1.png";
import imgc3 from "../assets/Groceries Basket.png";
import imgc4 from "../assets/Wine.png";
import imgc5 from "../assets/cake.png";
import imgc6 from "../assets/Wine.png";
import imgc7 from "../assets/pets.png";

export const items = [
  {
    id: 1,
    name: "Strawberry",
    price: 1.2,
    unit: "$0.59/lb",
    stock: 50,
    image: [img1, img2, img3],
    category: "Fruits & Vegetables",
  },
  {
    id: 2,
    name: "Apple green",
    price: 2.2,
    unit: "$0.59/lb",
    stock: 10,
    image: [img2],
    category: "Fruits & Vegetables",
  },
  {
    id: 3,
    name: "Orange (each)",
    price: 1.2,
    unit: "$0.59/lb",
    stock: 30,
    image: [img3, o2, o3, o4],
    category: "Fruits & Vegetables",
  },
  {
    id: 4,
    name: "Green Lemon",
    price: 1.2,
    unit: "$0.59/lb",
    stock: 25,
    image: [img4],
    category: "Fruits & Vegetables",
  },
  {
    id: 5,
    name: "Tomatto",
    price: 1.2,
    unit: "$0.59/lb",
    stock: 35,
    image: [img5],
    category: "Fruits & Vegetables",
  },
  {
    id: 6,
    name: "Pomegranate",
    price: 1.2,
    unit: "$2.59/lb",
    stock: 15,
    image: [img6],
    category: "Fruits & Vegetables",
  },
  {
    id: 7,
    name: "Potato",
    price: 1.2,
    unit: "$0.59/lb",
    stock: 45,
    image: [img7],
    category: "Fruits & Vegetables",
  },
  {
    id: 8,
    name: "Red onions",
    price: 1.2,
    unit: "$0.59/lb",
    stock: 40,
    image: [img8],
    category: "Fruits & Vegetables",
  },
];

export const categories = [
  {
    id: 1,
    name: "Trending",
    image: imgc1,
    subcategories: ["Mobiles", "Laptops", "Cameras"],
  },
  {
    id: 2,
    name: "Packages",
    image: imgc2,
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    id: 3,
    name: "Grocery",
    image: imgc3,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    id: 4,
    name: "Alcohol",
    image: imgc4,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    id: 5,
    name: "Desert",
    image: imgc5,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    id: 6,
    name: "Beverages",
    image: imgc6,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    id: 7,
    name: "Pet Supplies",
    image: imgc7,
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
];
