db.produtos.find(
  { valoresNutricionais: { $elemMatch: { unidadeMedida: "kcal", quantidade: { $lt: 500 } } } },
  { _id: 0, nome: 1 },
)
  .pretty();