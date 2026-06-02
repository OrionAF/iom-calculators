const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function focusTrap(node: HTMLElement, active = false) {
  function getFocusable(): HTMLElement[] {
    return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!active || e.key !== 'Tab') return
    const focusable = getFocusable()
    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  node.addEventListener('keydown', handleKeydown)
  if (active) getFocusable()[0]?.focus()

  return {
    update(newActive: boolean) {
      active = newActive
      if (active) getFocusable()[0]?.focus()
    },
    destroy() {
      node.removeEventListener('keydown', handleKeydown)
    },
  }
}
