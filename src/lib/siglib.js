// Siglib.js
// Signature optimization library

/**
 * Returns the minimum and maximum values for the x and y axes
 * @type point {x, y}
 * @param {point[][]} data Array of points
 */
function getBounds(data) {
  let minXAxis = Infinity;
  let minYAxis = Infinity;
  let maxXAxis = -Infinity;
  let maxYAxis = -Infinity;
  for (let i = 0; i < data.length; i += 1) {
    let points = data[i];
    for (let j = 0; j < points.length; j += 1) {
      minXAxis = Math.min(minXAxis, points[j].x);
      minYAxis = Math.min(minYAxis, points[j].y);
      maxXAxis = Math.max(maxXAxis, points[j].x);
      maxYAxis = Math.max(maxYAxis, points[j].y);
    }
  }
  return {
    minXAxis,
    minYAxis,
    maxXAxis,
    maxYAxis,
  };
}

/**
 * Returns the translate value
 * @param {number} padding 
 * @param {number} value 
 */
function computeTraslate(value, padding) {
  return padding - value;
}

/**
 * @type point {x, y} point is a 2 dimensional vector
 * @param {point[][]} data 
 * @param {number} x Translate value on x axis
 * @param {number} y Translate value on y axis
 */
function translate(data, x, y) {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    let points = [];
    for (let j = 0; j < data[i].length; j += 1) {
      points.push({
        x: data[i][j].x + x,
        y: data[i][j].y + y,
      });
    }
    result.push(points);
  }
  return result;
}  

function Siglib(data, padding = 20) {
  const bounds = getBounds(data);
  const translateX = computeTraslate(bounds.minXAxis, padding);
  const translateY = computeTraslate(bounds.minYAxis, padding);
  return {
    data: translate(data, translateX, translateY),
    width: padding + bounds.maxXAxis + translateX,
    height: padding + bounds.maxYAxis + translateY,
  };
}

export default Siglib;
