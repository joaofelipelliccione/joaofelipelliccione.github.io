import OrdersModel from '../database/models/Orders';
import ProductsModel from '../database/models/Products';
import { OrderToRegister } from '../interfaces/Order';

const findAll = async () => {
  const allOrdersArr = await OrdersModel.findAll({
    include: [
      {
        model: ProductsModel,
        as: 'products',
        attributes: ['productId'],
      },
    ],
  });

  return allOrdersArr;
};

const create = async ({ userId, products }: OrderToRegister): Promise<OrderToRegister> => {
  const newOrder = await OrdersModel.create({ userId });

  Promise.all(products.map(async (product) => {
    await ProductsModel.update(
      { orderId: newOrder.orderId },
      { where: { productId: product } },
    );
  }));

  return {
    userId,
    products,
  };
};

export default {
  create,
  findAll,
};
