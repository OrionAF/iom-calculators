/**
 * Move focus to this element on mount. Use instead of the HTML `autofocus`
 * attribute when the element is rendered inside a re-mounted block (e.g. a
 * Svelte modal that may open more than once per page lifetime), where
 * `autofocus` fires only the first time.
 */
export function focusOnMount(node: HTMLElement) {
  // Defer one frame so any pending layout (e.g. modal transition start) settles
  // before stealing focus.
  requestAnimationFrame(() => {
    if (typeof (node as HTMLInputElement).select === 'function') {
      // For <input> / <textarea>: focus AND select existing content so a stray
      // keystroke replaces, rather than appends to, any prior value.
      ;(node as HTMLInputElement).focus()
      try {
        ;(node as HTMLInputElement).select()
      } catch {
        /* noop */
      }
    } else {
      node.focus()
    }
  })
}
