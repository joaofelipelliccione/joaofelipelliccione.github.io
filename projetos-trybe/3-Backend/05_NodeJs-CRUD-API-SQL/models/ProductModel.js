const connection = require('./connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id ASC';
  const [products] = await connection.execute(query);

  return products;
};

const findById = async (productId) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [productId]);

  return product;
};

const findByName = async (productName) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [product] = await connection.execute(query, [productName]);

  return product;
};

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [newProduct] = await connection.execute(query, [name, quantity]);

  return {
    id: newProduct.insertId,
    name,
    quantity,
  };
};

const update = async (productId, { name, quantity }) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, productId]);

  return {
    id: productId,
    name,
    quantity,
  };
};

const remove = async (productId) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [productId]);
};

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  update,
  remove,
};