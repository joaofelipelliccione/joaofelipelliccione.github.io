import Race from './Race';

export default class Elf extends Race {
  private _eachElfMaxLifePoints: number;
  public static elfsCount = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);

    this._eachElfMaxLifePoints = 99;
    Elf.elfsCount += 1;
  }

  get maxLifePoints(): number {
    return this._eachElfMaxLifePoints;
  }

  static createdRacesInstances(): number {
    return Elf.elfsCount;
  }
}