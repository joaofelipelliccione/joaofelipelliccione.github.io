import Race from './Race';

export default class Halfling extends Race {
  private _eachHalfLingMaxLifePoints: number;
  public static halflingsCount = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);

    this._eachHalfLingMaxLifePoints = 60;
    Halfling.halflingsCount += 1;
  }

  get maxLifePoints(): number {
    return this._eachHalfLingMaxLifePoints;
  }

  static createdRacesInstances(): number {
    return Halfling.halflingsCount;
  }
}