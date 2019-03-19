export function average( numbers: number[] ): number {
  if(!numbers.length) {
    return null;
  }

  return numbers.reduce((a , b) => a + b , 0) / numbers.length;
}
