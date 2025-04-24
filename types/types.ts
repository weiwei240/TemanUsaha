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
  image?: ImageSourcePropType;
  active: boolean;
  category: string;
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