import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Warrior extends Archetype {
  private _eachWarriorEnergyType: EnergyType;
  public static warriorsCount = 0;

  constructor(name: string) {
    super(name);

    this._eachWarriorEnergyType = 'stamina';
    Warrior.warriorsCount += 1;
  }

  get energyType(): EnergyType {
    return this._eachWarriorEnergyType;
  }

  static createdArchetypeInstances(): number {
    return Warrior.warriorsCount;
  }
}