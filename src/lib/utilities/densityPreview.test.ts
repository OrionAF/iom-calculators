import { describe, it, expect } from 'vitest'
import { effectiveCols, previewFor } from './densityPreview'

describe('effectiveCols', () => {
  // Below 480px — all densities clamp to 1
  it('clamps to 1 at 320px regardless of intended', () => {
    expect(effectiveCols(4, 320)).toEqual({ cols: 1, clamped: true })
    expect(effectiveCols(3, 320)).toEqual({ cols: 1, clamped: true })
    expect(effectiveCols(2, 320)).toEqual({ cols: 1, clamped: true })
    expect(effectiveCols(1, 320)).toEqual({ cols: 1, clamped: false })
  })

  // 480–639px — clamps to 2
  it('clamps to 2 at 500px when intended > 2', () => {
    expect(effectiveCols(4, 500)).toEqual({ cols: 2, clamped: true })
    expect(effectiveCols(3, 500)).toEqual({ cols: 2, clamped: true })
    expect(effectiveCols(2, 500)).toEqual({ cols: 2, clamped: false })
    expect(effectiveCols(1, 500)).toEqual({ cols: 1, clamped: false })
  })

  // 640–767px — clamps to 3
  it('clamps to 3 at 700px when intended > 3', () => {
    expect(effectiveCols(4, 700)).toEqual({ cols: 3, clamped: true })
    expect(effectiveCols(3, 700)).toEqual({ cols: 3, clamped: false })
    expect(effectiveCols(2, 700)).toEqual({ cols: 2, clamped: false })
    expect(effectiveCols(1, 700)).toEqual({ cols: 1, clamped: false })
  })

  // >= 768px — no clamp
  it('does not clamp at 1280px', () => {
    expect(effectiveCols(4, 1280)).toEqual({ cols: 4, clamped: false })
    expect(effectiveCols(3, 1280)).toEqual({ cols: 3, clamped: false })
    expect(effectiveCols(2, 1280)).toEqual({ cols: 2, clamped: false })
    expect(effectiveCols(1, 1280)).toEqual({ cols: 1, clamped: false })
  })
})

describe('previewFor', () => {
  it('formats unclamped values without suffix', () => {
    expect(previewFor(3, 2, 1280)).toEqual({
      'store grids': '3 cols',
      'stat pairs': '2 per row',
    })
  })

  it('formats clamped values with "(clamped)" suffix', () => {
    expect(previewFor(4, 3, 320)).toEqual({
      'store grids': '1 col (clamped)',
      'stat pairs': '1 per row (clamped)',
    })
  })

  it('singularizes "col" when count is 1', () => {
    const r = previewFor(1, 1, 1280)
    expect(r['store grids']).toBe('1 col')
  })

  it('pluralizes "cols" when count > 1', () => {
    const r = previewFor(2, 1, 1280)
    expect(r['store grids']).toBe('2 cols')
  })
})
