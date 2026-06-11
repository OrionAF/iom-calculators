export interface EffectiveCols {
  cols: number
  clamped: boolean
}

export function effectiveCols(intended: number, viewport: number): EffectiveCols {
  let cols = intended
  if (viewport < 480) cols = 1
  else if (viewport < 640) cols = Math.min(intended, 2)
  else if (viewport < 768) cols = Math.min(intended, 3)
  return { cols, clamped: cols < intended }
}

export function previewFor(
  intendedPage: number,
  intendedStat: number,
  vw: number,
): Record<string, string> {
  const p = effectiveCols(intendedPage, vw)
  const s = effectiveCols(intendedStat, vw)
  return {
    'store grids': `${p.cols} col${p.cols === 1 ? '' : 's'}${p.clamped ? ' (clamped)' : ''}`,
    'stat pairs': `${s.cols} per row${s.clamped ? ' (clamped)' : ''}`,
  }
}
