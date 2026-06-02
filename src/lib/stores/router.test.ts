import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { currentRoute, navigate } from './router'

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

describe('currentRoute', () => {
  it('resolves fishing route to destination with label and kind', () => {
    let route = null
    const unsubscribe = currentRoute.subscribe(value => {
      route = value
    })
    window.location.hash = '#fishing'
    window.dispatchEvent(new Event('hashchange'))
    expect(route).not.toBeNull()
    expect(route!.hash).toBe('fishing')
    expect(route!.destination.label).toBe('Fishing')
    expect(route!.destination.kind).toBe('calculator')
    unsubscribe()
  })

  it('returns null for unknown route', () => {
    let route = null
    const unsubscribe = currentRoute.subscribe(value => {
      route = value
    })
    window.location.hash = '#unknown'
    window.dispatchEvent(new Event('hashchange'))
    expect(route).toBeNull()
    unsubscribe()
  })
})
