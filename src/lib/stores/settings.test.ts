import { beforeEach, describe, expect, it } from 'vitest'
import { get } from 'svelte/store'
import { settings, setNotation, setValueDisplayMode, setFontScale, setDensity, resetSettings } from './settings'

const STORAGE_KEY = 'iom-settings'

beforeEach(() => {
  localStorage.clear()
  resetSettings()
})

describe('settings store — notation', () => {
  it('reads defaults when localStorage is empty', () => {
    expect(get(settings).notation).toBe('standard')
  })

  it('setNotation persists to localStorage and updates the store', () => {
    setNotation('engineering')
    expect(get(settings).notation).toBe('engineering')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.notation).toBe('engineering')
  })

  it('resetSettings snaps the store back to defaults', () => {
    setNotation('scientific')
    resetSettings()
    expect(get(settings).notation).toBe('standard')
  })

  it('falls back to defaults on malformed JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{not json}')
    resetSettings()
    expect(get(settings).notation).toBe('standard')
  })

  it('falls back to defaults on unknown notation value', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ notation: 'binary' }))
    resetSettings()
    expect(get(settings).notation).toBe('standard')
  })
})

describe('settings store — valueDisplayMode', () => {
  it('defaults to "notation"', () => {
    expect(get(settings).valueDisplayMode).toBe('notation')
  })

  it('setValueDisplayMode("raw") persists to localStorage and updates the store', () => {
    setValueDisplayMode('raw')
    expect(get(settings).valueDisplayMode).toBe('raw')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.valueDisplayMode).toBe('raw')
  })

  it('setValueDisplayMode("notation") persists to localStorage and updates the store', () => {
    setValueDisplayMode('raw')
    setValueDisplayMode('notation')
    expect(get(settings).valueDisplayMode).toBe('notation')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.valueDisplayMode).toBe('notation')
  })

  it('resetSettings snaps valueDisplayMode back to default', () => {
    setValueDisplayMode('raw')
    resetSettings()
    expect(get(settings).valueDisplayMode).toBe('notation')
  })
})

describe('settings store — fontScale', () => {
  it('defaults to "normal"', () => {
    expect(get(settings).fontScale).toBe('normal')
  })
  it('setFontScale persists and updates the store', () => {
    setFontScale('large')
    expect(get(settings).fontScale).toBe('large')
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).fontScale).toBe('large')
  })
  it('resetSettings restores fontScale to normal', () => {
    setFontScale('large')
    resetSettings()
    expect(get(settings).fontScale).toBe('normal')
  })
})

describe('settings store — density', () => {
  it('defaults to "normal"', () => {
    expect(get(settings).density).toBe('normal')
  })
  it('setDensity persists and updates the store', () => {
    setDensity('compact')
    expect(get(settings).density).toBe('compact')
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).density).toBe('compact')
  })
  it('falls back to "normal" density on unknown value', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ density: 'ultra-wide' }))
    resetSettings()
    expect(get(settings).density).toBe('normal')
  })
  it('accepts super-spacious', () => {
    setDensity('super-spacious')
    expect(get(settings).density).toBe('super-spacious')
  })
})

describe('settings store — partial-config upgrade tolerance', () => {
  it('preserves valid notation when valueDisplayMode is missing in storage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ notation: 'scientific' }))
    setNotation('scientific')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.notation).toBe('scientific')
    expect(stored.valueDisplayMode).toBe('notation')
  })

  it('preserves valid valueDisplayMode when notation is missing in storage', () => {
    setValueDisplayMode('raw')
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.notation).toBe('standard')
    expect(stored.valueDisplayMode).toBe('raw')
  })

  it('falls back to default for the bad field but keeps the good field', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ notation: 'scientific', valueDisplayMode: 'binary' })
    )
    resetSettings()
    expect(get(settings).notation).toBe('standard')
    expect(get(settings).valueDisplayMode).toBe('notation')
  })
})
