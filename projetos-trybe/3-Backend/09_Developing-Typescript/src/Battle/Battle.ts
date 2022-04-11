import Fighter from '../Fighter';

abstract class Battle {
  // O protected é utilizado no lugar de private.
  // Ao fazer isso, torna-se possível ler/modificar tal atributo protected, presente na classe "pai", dentro de classes "filhas".
  constructor(protected player: Fighter) { }

  // Should return 1 if player wins, -1 otherwise
  fight(): number {
    return this.player.lifePoints === -1 ? -1 : 1;
  }
}

export default Battle;
