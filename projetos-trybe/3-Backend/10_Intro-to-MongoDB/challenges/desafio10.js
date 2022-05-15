db.produtos.find(
  {
    valoresNutricionais: {
      $elemMatch: {
        tipo: "proteínas",
        $or: [{ percentual: { $gte: 30 } }, { percentual: { $gte: 30 } }],
      },
    },
  },
  { _id: 0, nome: 1 },
)
  .pretty();