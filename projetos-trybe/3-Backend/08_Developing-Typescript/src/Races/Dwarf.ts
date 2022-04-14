import Race from './Race';

export default class Dwarf extends Race {
  private _eachDwarfMaxLifePoints: number;
  public static dwarfsCount = 0; // Tal atributo não poderá ser acessado em objetos instanciados pois é estático.

  // Todo objeto instanciado a partir dessa classe terá o atributo "_eachDwarfMaxLifePoints" igual à 80.
  // Sempre que um novo objeto for instanciado, o atributo estático "dwarfsCount" aumentará em uma unidade.
  constructor(name: string, dexterity: number) {
    super(name, dexterity);

    this._eachDwarfMaxLifePoints = 80;
    Dwarf.dwarfsCount += 1;
  }

  // Implementação (override) do método "maxLifePoints" (getter), que havia sido declarado na classe "pai" abstrata.
  get maxLifePoints(): number {
    return this._eachDwarfMaxLifePoints;
  }

  // Implementação (override) do método estático "createdRacesInstances", que havia sido declarado na classe "pai" abstrata.
  // Tal método não poderá ser acessado em objetos instanciados pois é estático.
  static createdRacesInstances(): number {
    return Dwarf.dwarfsCount;
  }
}