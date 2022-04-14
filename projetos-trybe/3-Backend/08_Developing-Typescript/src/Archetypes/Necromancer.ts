import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Necromancer extends Archetype {
  private _eachNecromancerEnergyType: EnergyType;
  public static necromancersCount = 0;

  constructor(name: string) {
    super(name);

    this._eachNecromancerEnergyType = 'mana';
    Necromancer.necromancersCount += 1;
  }

  get energyType(): EnergyType {
    return this._eachNecromancerEnergyType;
  }

  static createdArchetypeInstances(): number {
    return Necromancer.necromancersCount;
  }
}