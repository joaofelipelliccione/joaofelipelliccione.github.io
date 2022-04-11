export type EnergyType = 'mana' | 'stamina'; // Type Union: Criação de um novo tipo que pode ser ou 'mana' ou 'stamina'.

interface Energy {
  type_: EnergyType; // O Atributo type_ poderá ser do tipo "mana" ou "stamina";
  amount: number;
}

export default Energy;