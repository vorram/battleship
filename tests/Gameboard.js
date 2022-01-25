const generateCoordinates = require("./generateCoordinates");

class Gameboard {
  constructor() {
    this.coordinates = generateCoordinates();
    this.ships = [];
  }

  get getShips() {
    return this.ships;
  }

  placeShip(ship, coordinate) {
    const targetCoordinates = [];
    let isCorrectPlacement = true;
    const letters = "ABCDEFGHIJ";
    if (!ship.isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        targetCoordinates.push(
          coordinate.charAt(0) + (Number(coordinate.charAt(1)) + i)
        );
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        targetCoordinates.push(
          letters.charAt(letters.indexOf(coordinate.charAt(0)) + i) +
            coordinate.charAt(1)
        );
      }
    }
    targetCoordinates.forEach((c) => {
      if (this.coordinates.indexOf(c) === -1) {
        isCorrectPlacement = false;
      }
    });
    if (isCorrectPlacement) {
      ship.setCoordinates(targetCoordinates);
      this.ships.push(ship);
      targetCoordinates.forEach((c) => {
        this.coordinates.splice(this.coordinates.indexOf(c), 1);
      });
    }
  }

  receiveAttack(coordinate) {
    let outcome = "miss";
    this.ships.forEach((ship) => {
      if (ship.coordinates.indexOf(coordinate) !== -1) {
        ship.hit(coordinate);
        outcome = "hit";
        if (ship.isSunk()) {
          this.ships.splice(this.ships.indexOf(ship), 1);
          outcome = "sunk";
        }
        if (this.ships.length === 0) {
          outcome = "game over";
        }
      }
    });
    return outcome;
  }
}

module.exports = Gameboard;
