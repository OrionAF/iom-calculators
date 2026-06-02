const SUFFIXES = [
  '', 'K', 'M', 'B', 'T',
  'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
]

function shortNumber(n: number): string {
  if (n === 0) return '0'
  if (!isFinite(n)) return String(n)

  const sign = n < 0 ? '-' : ''
  const abs = Math.abs(n)

  if (abs < 1000) {
    return sign + parseFloat(abs.toPrecision(4)).toString()
  }

  const exp = Math.floor(Math.log10(abs))
  const idx = Math.floor(exp / 3)

  if (idx >= SUFFIXES.length) {
    return sign + abs.toExponential(2)
  }

  const divisor = 10 ** (idx * 3)
  const val = abs / divisor
  return sign + val.toFixed(2) + SUFFIXES[idx]
}

export function formatStat(n: number): string {
  return shortNumber(n)
}

export function formatGold(n: number): string {
  return shortNumber(n)
}

export function formatPercent(n: number): string {
  return n.toFixed(2) + '%'
}

export function formatMultiplier(n: number): string {
  return n.toFixed(2) + '×'
}
