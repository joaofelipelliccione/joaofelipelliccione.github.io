import Race from './Race';

export default class Orc extends Race {
  private _eachOrcMaxLifePoints: number;
  public static orcsCount = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);

    this._eachOrcMaxLifePoints = 74;
    Orc.orcsCount += 1;
  }

  get maxLifePoints(): number {
    return this._eachOrcMaxLifePoints;
  }

  static createdRacesInstances(): number {
    return Orc.orcsCount;
  }
}