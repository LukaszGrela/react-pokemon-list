/**
 * regexr.com/6jei8
 */
const timeUnit = /^([+-]?\d+(?:\.\d+)?)(m?s)$/gi;

/**
 * Converts CSS time unit into JS time value in milliseconds
 * @param time CSS time value
 * @param defaultsTo default value to return, yields to `0`
 * @returns JavaScript time value in milliseconds
 */
export const getCSSTimeUnit = (time?: string, defaultsTo = 0): number => {
  if (!time) return defaultsTo;
  timeUnit.lastIndex = 0;
  if (timeUnit.test(time)) {
    timeUnit.lastIndex = 0;
    const [, value, unit] = timeUnit.exec(time)!;
    let ms = parseFloat(value);
    if (unit.toLowerCase() === 's') {
      ms *= 1000;
    }
    return ms;
  }

  return defaultsTo;
};
