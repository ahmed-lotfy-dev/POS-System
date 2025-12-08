export {};

export type Role = "ADMIN" | "CASHIER" | "VIEWER";

declare global {
  interface Window {
    my_modal_2: HTMLDialogElement;
  }
}

export type Category = {
  id: string;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: string;
  name: string;
  code: number;
  price: number;
  image: string;
  unitId: string;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Unit = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  userId: string;
  totalAmount: number;
  orderDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AllDataResponse = {
  categories: Category[];
  products: Product[];
  units: Unit[];
  orders: Order[];
};
