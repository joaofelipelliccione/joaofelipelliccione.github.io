import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Mage extends Archetype {
  private _eachMageEnergyType: EnergyType;
  public static magesCount = 0;

  constructor(name: string) {
    super(name);

    this._eachMageEnergyType = 'mana';
    Mage.magesCount += 1;
  }

  get energyType(): EnergyType {
    return this._eachMageEnergyType;
  }

  static createdArchetypeInstances(): number {
    return Mage.magesCount;
  }
}