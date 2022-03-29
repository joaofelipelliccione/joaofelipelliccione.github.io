import { Pool, ResultSetHeader } from 'mysql2/promise';
import { AllOrders, OrderToRegister, RegisteredOrder } from '../interfaces/Order';

class OrderModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findAll(): Promise<AllOrders[]> {
    const query = 'SELECT o.id, o.userId, p.id AS products '
    + 'FROM Trybesmith.Orders AS o '
    + 'INNER JOIN Trybesmith.Products AS p '
    + 'ON o.id = p.orderId';

    const [data] = await this.connection.execute(query);
    const allOrders = data as AllOrders[];

    return allOrders;
  }

  public async create(orderInfo: OrderToRegister): Promise<RegisteredOrder> {
    const { userId, products } = orderInfo;
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';

    const newOrder = await this.connection.execute<ResultSetHeader>(query, [userId]);
    const [dataInserted] = newOrder;
    const { insertId } = dataInserted;

    return {
      userId,
      products,
      orderId: insertId,
    };
  }
}

export default OrderModel;