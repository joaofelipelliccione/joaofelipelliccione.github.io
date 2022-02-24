const connection = require('./connection');

const findAll = async () => {
  const firstPartOfQuery = 'SELECT sp.sale_id AS saleId, s.`date`, '
  + 'sp.product_id AS productId, sp.quantity ';
  const secondPartOfQuery = 'FROM StoreManager.sales_products AS sp ' 
  + 'INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id '
  + 'ORDER BY saleId ASC, productId ASC;';
  const query = firstPartOfQuery.concat(secondPartOfQuery);

  const [sales] = await connection.execute(query);

  return sales;
};

const findById = async (saleId) => {
  const firstPartOfQuery = 'SELECT s.`date`, sp.product_id AS productId, sp.quantity ';
  const secondPartOfQuery = 'FROM StoreManager.sales_products AS sp ' 
  + 'INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id '
  + 'WHERE sp.sale_id = ?;';
  const query = firstPartOfQuery.concat(secondPartOfQuery);

  const [sale] = await connection.execute(query, [saleId]);

  return sale;
};

const createSale = async () => { // Cadastra uma nova venda na tabela sales e retorna o id da respectiva.
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (CURRENT_TIMESTAMP())';
  const [newSale] = await connection.execute(query);

  return newSale.insertId;
};

const createSaleProduct = async (saleId, productId, quantity) => { // Cadastra os produtos que acabaram de ser vendidos, na tabela sales_products.
  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) '
  + 'VALUES (?, ?, ?)';
  await connection.execute(query, [saleId, productId, quantity]);

  return {
    productId,
    quantity,
  };
};

const update = async (saleId, productId, quantity) => {
  const query = 'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? '
  + 'WHERE sale_id = ?';
  await connection.execute(query, [productId, quantity, saleId]);

  return {
    productId,
    quantity,
  };
};

const remove = async (saleId) => {
  const querySales = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const querySalesProducts = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
  await connection.execute(querySales, [saleId]);
  await connection.execute(querySalesProducts, [saleId]);
};

module.exports = {
  findAll,
  findById,
  createSale,
  createSaleProduct,
  update,
  remove,
};