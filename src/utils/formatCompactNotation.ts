export function formatCompactNotation(
  number: number,
  fractionDigits = 0,
): string {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(number)
}
