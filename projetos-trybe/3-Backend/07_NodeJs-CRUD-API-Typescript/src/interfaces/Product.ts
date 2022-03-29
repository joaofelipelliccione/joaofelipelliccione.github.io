export interface ProductToRegister {
  name: string;
  amount: string;
}

export interface Product extends ProductToRegister {
  id: number;
}