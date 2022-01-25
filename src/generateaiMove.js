export default function generateaiMove(array) {
  const getRandomInclusive = (min, max) => {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
  };
  const move = array[getRandomInclusive(0, array.length - 1)];
  return move;
}
