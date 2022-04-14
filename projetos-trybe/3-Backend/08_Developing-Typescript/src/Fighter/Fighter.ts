import SimpleFighter from './SimpleFighter';
import Energy from '../Energy';

// Tendo em vista que a interface Fighter estenderá a interface SimpleFighter, a primeira apresentará todos os atributos e métodos dessa última.
// Dentro da interface Fighter, dois novos atributos (defense e energy) foram declarados.
// Dentro da interface Fighter, dois novos métodos (special e levelUp) foram declarados.
// Dentro da interface Fighter, o método attack, originalmente declarado na interface SimpleFighter, sofreu alterações (override).
interface Fighter extends SimpleFighter {
  defense: number;
  energy?: Energy; // Atributo opcional

  attack(enemy: Fighter): void;
  special(enemy: Fighter): void;
  levelUp(): void;
}

export default Fighter;