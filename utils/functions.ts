
export const clamp = (number: number, min: number, max: number): number => {
  return Math.max(min, Math.min(number, max));
}
export const mapRange = (value: number, a: number, b: number, c: number, d: number): number => {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}
export const lerp = (a: number, b: number, n: number): number => {
  return (1 - n) * a + n * b;
}
