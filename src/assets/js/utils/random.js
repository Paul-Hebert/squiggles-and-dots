function random() {
  const isArray = Array.isArray(arguments[0]);

  if (isArray) {
    const targetArray = arguments[0];

    return targetArray[random(0, targetArray.length - 1, true)];
  } else {
    const min = arguments[0];
    const max = arguments[1];
    const clamp = arguments[2] || false;

    const val = Math.random() * (max - min) + min;

    return clamp ? Math.round(val) : val;
  }
}

function randomBool(chance = 0.5) {
  return Boolean(Math.random() <= chance);
}

// https://stackoverflow.com/a/4550514/7816145
function randomItemInArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Returns a random integer between two values
function randomInt(min, max) {
  return Math.round(random(min, max));
}

export { random, randomBool, randomItemInArray, randomInt };
