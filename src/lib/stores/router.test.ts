import { beforeEach, describe, expect, it } from 'vitest'
import { navigate } from './router'

beforeEach(() => {
  window.location.hash = ''
})

describe('navigate', () => {
  it('sets window.location.hash to #fishing', () => {
    navigate('fishing')
    expect(window.location.hash).toBe('#fishing')
  })

  it('sets window.location.hash to #unknown', () => {
    navigate('unknown')
    expect(window.location.hash).toBe('#unknown')
  })
})
