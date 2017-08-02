/**
 * Rounds a decimal by multiplying it by a factor, rounding it, and then dividing it by that same factor
 * @param n number to round
 * @param factor to use 100 = scale of 2, 100000 = scale of 5
 */
export function roundFloat(n: number, factor: number): number {
  return Math.round(n * factor) / factor;
}
