import Gameboard from "./Gameboard";

export default class Player {
  constructor(name, fleet) {
    this.name = name;
    this.fleet = fleet;
    this.gameboard = new Gameboard();
    this.isAI = false;
  }

  getAttacked(coordinate) {
    return this.gameboard.receiveAttack(coordinate);
  }
}
