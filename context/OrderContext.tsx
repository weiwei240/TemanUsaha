import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OrderItem } from '@/types/types';
interface OrderState {
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  paymentMethod: string;
  transactionTime: string;
  setItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  setPaymentMethod: (method: string) => void;
  setTransactionTime: (time: string) => void;
}

const OrderContext = createContext<OrderState | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [transactionTime, setTransactionTime] = useState<string>('');

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <OrderContext.Provider value={{ items, totalPrice, totalItems, paymentMethod, transactionTime, setItems, setPaymentMethod, setTransactionTime }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};