function generateCoordinates() {
  const array = [];
  const letters = "ABCDEFGHIJ";
  for (let i = 0; i < letters.length; i += 1) {
    for (let n = 1; n <= 10; n += 1) {
      array.push(letters.charAt(i) + n);
    }
  }
  return array;
}
module.exports = generateCoordinates;
