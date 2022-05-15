db.resumoProdutos.insertOne({
  franquia: "McDonalds",
  totalProdutos: db.produtos.countDocuments({}),
});

db.resumoProdutos.find(
  { franquia: "McDonalds" },
  { _id: 0, franquia: 1, totalProdutos: 1 },
)
.limit(1)
.pretty();