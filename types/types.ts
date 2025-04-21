import { ImageSourcePropType } from 'react-native';

export type Product = {
  name: string;
  price: number;
  unit: string;
  sold: number;
  stock: number;
  image: ImageSourcePropType;
};

export type OrderItem = Product & {
  qty: number;
};