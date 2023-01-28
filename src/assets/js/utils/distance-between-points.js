export function distanceBetweenPoints(point1, point2) {
  return fastHypotenuse(point1.x - point2.x, point1.y - point2.y);
}

function fastHypotenuse(x, y) {
  return Math.sqrt(x * x + y * y);
}
