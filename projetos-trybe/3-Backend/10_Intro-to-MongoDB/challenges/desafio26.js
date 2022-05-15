db.produtos.updateMany(
  { valoresNutricionais: {
    $elemMatch: {
      tipo: "sódio",
      $and: [
        { percentual: { $gt: 20 } },
        { percentual: { $lt: 40 } },
      ],
    },
  } },
  { $push: {
    tags: {
      $each: ["contém sódio"],
    },
  } },
);

db.produtos.find({}, { _id: 0, nome: 1, tags: 1 }).pretty();