import OrderModel from '../models/OrderModel';
import connection from '../models/connection';
import ProductModel from '../models/ProductModel';
import { AllOrders, OrderToRegister } from '../interfaces/Order';

const findAll = async (): Promise<AllOrders[]> => {
  const orderModel = new OrderModel(connection);
  const allOrders = await orderModel.findAll();

  return allOrders;
};

const create = async (orderInfo: OrderToRegister): Promise<OrderToRegister> => {
  const orderModel = new OrderModel(connection);
  const newOrder = await orderModel.create(orderInfo);

  const productModel = new ProductModel(connection);
  await productModel.updateOrderId({ // Necessário para atualizar a tabela de produtos, quando um novo pedido for realizado.
    orderId: newOrder.orderId,
    products: newOrder.products,
  });

  return {
    userId: newOrder.userId,
    products: newOrder.products,
  };
};

export default {
  create,
  findAll,
};