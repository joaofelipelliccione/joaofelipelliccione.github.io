import { Pool, ResultSetHeader } from 'mysql2/promise';

import { Product, ProductToRegister } from '../interfaces/Product';
import { UpdateOrderId } from '../interfaces/Order';

/* Explicação:
- Criação do ProductModel como uma classe, que apresentará o atributo connection.
- Sempre quando utilizar-se essa classe para instanciar um novo objeto, será necessário passar o pool de conexões MySQL.
*/
class ProductModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findAll(): Promise<Product[]> { // Arrow-Method findAll, que permite listagem de usuários cadastrados fora do escopo da classe (public).
    const query = 'SELECT * FROM Trybesmith.Products';

    const [data] = await this.connection.execute(query);
    const allProducts = data as Product[];

    return allProducts;
  }

  public async create(productInfo: ProductToRegister): Promise<Product> { // Arrow-Method create, que permite cadastro de novos usuários fora do escopo da classe (public).
    const { name, amount } = productInfo;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
  
    const newProduct = await this.connection.execute<ResultSetHeader>(query, [name, amount]); // A função execute retornará algo cujo tipo estenda a interface "ResultSetHeader", que apresenta o atributo insertId.

    const [dataInserted] = newProduct; // dataInserted é o objeto retornado pelo execute que, por extender a interface "ResultSetHeader", apresenta o atributo insertId.
    const { insertId } = dataInserted;
    return { id: insertId, ...productInfo };
  }

  public async updateOrderId(info: UpdateOrderId): Promise<boolean> {
    const { orderId, products } = info;
    const query = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';

    await Promise.all(products.map(async (productId) => {
      await this.connection.execute(query, [orderId, productId]);
    }));

    return true;
  }
}

export default ProductModel;