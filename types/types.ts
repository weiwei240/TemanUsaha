import { ImageSourcePropType } from 'react-native';

// PRODUCTS

export type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  sold: number;
  stock: number;
  description?: string;
  sku?: string;
  image?: string;
  active: boolean;
  categories: string[];
}

export type Category = {
  id: string
  name: string
  image: string
  products: string[]
}


export type OrderItem = Product & {
  qty: number;
};

// TRANSACTION DATA

export type ChartData = {
  key: number;
  label: string;
  amount: number;
  color: string;
}