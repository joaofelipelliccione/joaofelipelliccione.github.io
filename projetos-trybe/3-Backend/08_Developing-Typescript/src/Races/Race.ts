export default abstract class Race {
  constructor(
    private _name: string,
    private _dexterity: number,
  ) {}

  // Métodos getters, que permitem a leitura de valores de atributos "private" através de objetos instanciados.
  get name() {
    return this._name;
  }

  get dexterity() {
    return this._dexterity;
  }
  
  // É um método "abstract" pois não será implementado no escopo dessa classe, apenas declarado.
  // Tal método será implementado no escopo das classes "filhas" da respectiva classe.
  public abstract get maxLifePoints(): number;

  // É um método estático pois só poderá ser acessado no escopo dessa classe ou de classes "filhas" da respectiva.
  // Tal método não poderá ser acessado em objetos instanciados.
  public static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }
}