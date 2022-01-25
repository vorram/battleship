class Ship {
  constructor(length) {
    this.length = length;
    this.isVertical = false;
  }

  setCoordinates(array) {
    this.coordinates = array;
  }

  get getCoordinates() {
    return this.coordinates;
  }

  rotate() {
    if (this.isVertical) {
      this.isVertical = false;
    }
    this.isVertical = true;
  }

  hit(coordinate) {
    for (let i = 0; i < this.coordinates.length; i += 1) {
      if (this.coordinates[i] === coordinate) {
        this.coordinates.splice(i, 1);
        break;
      }
    }
  }

  isSunk() {
    if (this.coordinates.length === 0) {
      return true;
    }
    return false;
  }
}
module.exports = Ship;
