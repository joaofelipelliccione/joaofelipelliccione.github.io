export interface AllOrders {
  id: number;
  userId: number;
  products: number[];
}

export interface OrderToRegister {
  userId: number;
  products: number[];
}

export interface RegisteredOrder extends OrderToRegister {
  orderId: number;
}

export interface UpdateOrderId {
  orderId: number;
  products: number[];
}