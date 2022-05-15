db.produtos.updateMany(
  {
    $or: [
      { nome: "Big Mac" },
      { nome: "Quarteirão com Queijo" },
    ],
  },
  { $addToSet: { ingredientes: "bacon" } },
);

db.produtos.find({}, { _id: 0, nome: 1, ingredientes: 1 }).pretty();