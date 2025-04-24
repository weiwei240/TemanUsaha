import images from "@/constants/images";
import { Product } from "@/types/types";

export const categories = [
  {
    id: "9136594f-7a9f-4b9b-bf3f-a6c6539ff78f",
    name: 'Kitchen Appliances',
    image: images.kitchen,
    itemCount: 2,
    dateModified: '2 days ago',
  },
  {
    id: "9136594f-7a9f-4b9b-bf3f-a6c6539ff78f",
    name: 'Daily Necessities',
    image: images.daily,
    itemCount: 2,
    dateModified: '2 days ago',
  },
  {
    id: "def4c8d8-bb51-4db1-9b9b-dbbaaae6bf00",
    name: 'Uncategorized',
    image: images.daily,
    itemCount: 2,
    dateModified: '2 days ago',
  },
]

export const products: Product[] = [
  {
    id: "36e3b284-ea6d-48e5-8c60-14fdf87d6acd",
    name: "Non-Stick Pan",
    price: 90000,
    unit: "Pcs",
    sold: 90,
    stock: 20,
    description: "Pan",
    sku: "KA001",
    image: images.pan,
    active: true,
    category: "Kitchen Appliances"
  },
  {
    id: "9abd4e28-8b58-40e9-ba05-e677b4acd4c2",
    name: "Steel Knife Set",
    price: 60000,
    unit: "Pcs",
    sold: 60,
    stock: 60,
    description: "Knives",
    sku: "KA002",
    image: images.kitchen,
    active: true,
    category: "Kitchen Appliances"
  },
  {
    id: "4945dad9-1633-4e16-9cc3-580acdf1a5b6",
    name: "Cooking Oil",
    price: 9000,
    unit: "Liter",
    sold: 345,
    stock: 30,
    description: "Oil",
    sku: "DN001",
    image: images.fruit,
    active: true,
    category: "Daily Necessities"
  },
  {
    id: "c2ca3e17-5b5b-439d-8ab1-582fc689bec9",
    name: "Egg",
    price: 22000,
    unit: "Kg",
    sold: 60,
    stock: 30,
    description: "Eggs",
    sku: "DN002",
    image: images.egg,
    active: true,
    category: "Daily Necessities"
  },
];

// export const products = [
//   {
//     category: "Kitchen Appliances",
//     items: [
//       {
//         name: "Non-Stick Pan",
//         price: 90000,
//         unit: "Pcs",
//         sold: 90,
//         stock: 20,
//         image: images.pan,
//         active: true,
//       },
//       {
//         name: "Steel Knife Set",
//         price: 60000,
//         unit: "Pcs",
//         sold: 60,
//         stock: 60,
//         image: images.kitchen,
//         active: true,
//       },
//     ],
//   },
//   {
//     category: "Daily Necessities",
//     items: [
//       {
//         name: "Cooking Oil",
//         price: 9000,
//         unit: "Liter",
//         sold: 345,
//         stock: 30,
//         image: images.fruit,
//         active: true,
//       },
//       {
//         name: "Egg",
//         price: 22000,
//         unit: "Kg",
//         sold: 60,
//         stock: 30,
//         image: images.egg,
//         active: true,
//       },
//     ],
//   },
// ];

export const featured = [
  {
    name: 'Non-Stick Pan',
    image: images.pan,
    price: 90000,
    stock: 2,
    sold: 90,
  },
  {
    name: 'Egg',
    image: images.egg,
    price: 22000,
    stock: 30,
    sold: 100,
  },
  {
    name: 'Test',
    image: images.newYork,
    price: 56000,
    stock: 15,
    sold: 70,
  },
  {
    name: 'Abcde',
    image: images.avatar,
    price: 12000,
    stock: 10,
    sold: 50,
  },
]

export const transactions = [
  {
    title: 'Last Transactions',
    data: [
      {
        id: '1',
        name: 'Kendrew',
        method: 'Cash',
        date: '28 Aug 2024, 13:47 PM',
        amount: 142200,
        status: 'Ongoing',
        isExpense: false,
      },
      {
        id: '2',
        name: 'Alice',
        method: 'QRIS',
        date: '19 Aug 2024, 16:09 PM',
        amount: 32000,
        status: 'Success',
        isExpense: false,
      },
      {
        id: '3',
        name: 'Buying Printer',
        method: 'Credit: Goods & Materials',
        date: '26 Aug 2024, 10:21 AM',
        amount: 100000,
        status: 'Success',
        isExpense: true,
      },
      {
        id: '4',
        name: 'Vincent John',
        method: 'Debit Card',
        date: '19 Aug 2024, 16:09 PM',
        amount: 271800,
        status: 'Success',
        isExpense: false,
      },
      {
        id: '5',
        name: 'Kelvin T',
        method: 'QRIS',
        date: '6 Aug 2024, 12:58 PM',
        amount: 49500,
        status: 'Success',
        isExpense: false,
      },
      {
        id: '6',
        name: 'Pohan M',
        method: 'Bank Transfer',
        date: '3 Aug 2024, 09:35 AM',
        amount: 198200,
        status: 'Success',
        isExpense: false,
      },
    ],
  },
  {
    title: 'A Month Ago',
    data: [
      {
        id: '7',
        name: 'Vincent John',
        method: 'QRIS',
        date: '27 Jul 2024, 17:21 PM',
        amount: 108200,
        status: 'Success',
        isExpense: false,
      },
      {
        id: '8',
        name: 'Fuel Expense',
        method: 'Credit: Transportation & Logistics',
        date: '18 Jul 2024, 13:29 PM',
        amount: 85000,
        status: 'Success',
        isExpense: true,
      },
      {
        id: '9',
        name: 'Herman Judika',
        method: 'QRIS',
        date: '15 Jul 2024, 13:29 PM',
        amount: 115000,
        status: 'Success',
        isExpense: false,
      },
      {
        id: '10',
        name: 'Kelvin T',
        method: 'QRIS',
        date: '12 Jul 2024, 12:58 PM',
        amount: 49500,
        status: 'Success',
        isExpense: false,
      },
    ],
  },
];

export const employees = [
  {
    id: '1',
    name: 'Brock S',
    phone: '084511907710',
    role: 'Staff',
    shiftTime: '15.00 - 21.00',
    image: images.avatar,
  },
  {
    id: '2',
    name: 'Alice M',
    phone: '083244112300',
    role: 'Manager',
    shiftTime: '09.00 - 17.00',
    image: images.avatar,
  },
  {
    id: '3',
    name: 'Derek J',
    phone: '082109832451',
    role: 'Staff',
    shiftTime: '12.00 - 18.00',
    image: images.avatar,
  },
  {
    id: '4',
    name: 'Nina R',
    phone: '085678543211',
    role: 'Cashier',
    shiftTime: '14.00 - 20.00',
    image: images.avatar,
  },
  {
    id: '5',
    name: 'Leo T',
    phone: '081345672398',
    role: 'Security',
    shiftTime: '21.00 - 03.00',
    image: images.avatar,
  },
];

export const customers = [
  {
    id: '1',
    name: 'Megawanto',
    phone: '081234567890',
    totalSpending: 100_000_000,
    transactions: 28,
  },
  {
    id: '2',
    name: 'Elianna',
    phone: '081234567891',
    totalSpending: 80_000_000,
    transactions: 20,
  },
  {
    id: '3',
    name: 'Susanto',
    phone: '081234567892',
    totalSpending: 65_000_000,
    transactions: 18,
  },
  {
    id: '4',
    name: 'Adi',
    phone: '081234567893',
    totalSpending: 10_000_000,
    transactions: 6,
  },
  {
    id: '5',
    name: 'Bima',
    phone: '081234567894',
    totalSpending: 15_000_000,
    transactions: 7,
  },
  {
    id: '6',
    name: 'Anna',
    phone: '081234567895',
    totalSpending: 18_000_000,
    transactions: 8,
  },
  {
    id: '7',
    name: 'Aron',
    phone: '081234567896',
    totalSpending: 25_000_000,
    transactions: 12,
  },
  {
    id: '8',
    name: 'Cassandra',
    phone: '081234567897',
    totalSpending: 12_000_000,
    transactions: 5,
  },
];

export const dummyTransactions = [
  {
    type: 'Order',
    id: '24SEAA',
    message: 'Order #24SEAA has been paid for Rp 85.100',
    date: '21/09/2024',
    time: '18:42',
  },
  {
    type: 'Bill',
    id: '83GASW',
    message: 'Bill #83GASW has been paid for Rp 190.000',
    date: '20/09/2024',
    time: '13:21',
  },
  {
    type: 'Bill',
    id: '71KJAL',
    message: 'Bill #71KJAL has been paid for Rp 38.400',
    date: '18/09/2024',
    time: '10:06',
  },
  {
    type: 'Offer',
    id: '91PWKD',
    message: 'Offer #91PWKD has been placed',
    date: '18/09/2024',
    time: '09:30',
  },
];

export const dummySystem = [
  {
    title: "Verification Successful!",
    message:
      "Verification successful! Your account is fully active and can be used",
    date: "01/09/2024",
    time: "13:21",
  },
  {
    title: "Profile update successful!",
    message: "Profile has been updated, check your profile immediately",
    date: "01/09/2024",
    time: "13:21",
  },
  {
    title: "Bank account has been added",
    message: "Bank accounts can now be used as a transfer destination",
    date: "02/08/2024",
    time: "10:56",
  },
];