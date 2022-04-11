import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Ranger extends Archetype {
  private _eachRangerEnergyType: EnergyType;
  public static rangersCount = 0;

  constructor(name: string) {
    super(name);

    this._eachRangerEnergyType = 'stamina';
    Ranger.rangersCount += 1;
  }

  get energyType(): EnergyType {
    return this._eachRangerEnergyType;
  }

  static createdArchetypeInstances(): number {
    return Ranger.rangersCount;
  }
}