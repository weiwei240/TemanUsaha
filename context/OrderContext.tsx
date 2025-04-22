import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OrderItem } from '@/types/types';
interface OrderState {
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  paymentMethod: string;
  transactionTime: string;
  orderInProgress: boolean;
  discount: number;
  finalTotal: number;
  setItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  setPaymentMethod: (method: string) => void;
  setTransactionTime: (time: string) => void;
  setOrderInProgress: (inProgress: boolean) => void;
  setDiscount: (dsc: number) => void;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderState | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [transactionTime, setTransactionTime] = useState<string>('');
  const [orderInProgress, setOrderInProgress] = useState(false);
  const [discount, setDiscount] = useState(0);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const finalTotal = Math.max(0, totalPrice - discount + 5000);
  const resetOrder = () => {
    setItems([]);
    setPaymentMethod('QRIS');
    setTransactionTime('');
    setOrderInProgress(false);
    setDiscount(0);
  }

  return (
    <OrderContext.Provider value={{ items, totalPrice, totalItems, paymentMethod, transactionTime, orderInProgress, discount, finalTotal, setItems, setPaymentMethod, setTransactionTime, setOrderInProgress, setDiscount, resetOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};