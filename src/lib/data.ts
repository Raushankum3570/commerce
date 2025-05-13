import { Product } from "@/lib/types";

// Use local images instead of placeholder images
const getLocalImage = (imageName: string) => {
  return `/${imageName}`;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality over-ear headphones with noise cancellation technology.",
    price: 249.99,
    category: "electronics",
    imageUrl: getLocalImage("he.jpeg"),
    stock: 15,
  },
  {
    id: "2",
    name: "Smartphone X",
    description: "Latest smartphone with advanced camera features and long battery life.",
    price: 799.99,
    category: "electronics",
    imageUrl: getLocalImage("mobile.jpg"),
    stock: 10,
  },
  {
    id: "3",
    name: "Laptop Pro",
    description: "Powerful laptop for professionals with high-performance specs.",
    price: 1299.99,
    category: "electronics",
    imageUrl: getLocalImage("lap.jpg"),
    stock: 7,
  },
  {
    id: "4",
    name: "Smart Watch",
    description: "Fitness tracker and smartwatch with heart rate monitoring.",
    price: 199.99,
    category: "electronics",
    imageUrl: getLocalImage("he.jpeg"),
    stock: 20,
  },  {
    id: "5",
    name: "Wireless Earbuds",
    description: "Comfortable wireless earbuds with superior sound quality.",
    price: 129.99,
    category: "electronics",
    imageUrl: getLocalImage("mobile.jpg"),
    stock: 25,
  },
  {
    id: "6",
    name: "Digital Camera",
    description: "Professional digital camera with 4K video recording capability.",
    price: 549.99,
    category: "electronics",
    imageUrl: getLocalImage("he.jpeg"),
    stock: 8,
  },
  {
    id: "7",
    name: "Gaming Console",
    description: "Next-generation gaming console with immersive gameplay experience.",
    price: 499.99,
    category: "electronics",
    imageUrl: getLocalImage("lap.jpg"),
    stock: 12,
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    price: 89.99,
    category: "electronics",
    imageUrl: getLocalImage("he.jpeg"),
    stock: 30,
  },
];
