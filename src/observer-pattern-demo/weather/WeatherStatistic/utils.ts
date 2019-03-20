export function average( numbers: number[] ): number {
  if (!numbers.length) {
    return undefined;
  }

  return numbers.reduce((a , b) => a + b , 0) / numbers.length;
}
