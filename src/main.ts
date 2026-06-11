import './app.css'
import App from './App.svelte'
import { mount } from 'svelte'

const app = mount(App, { target: document.getElementById('app')! })

// Wiki-icon cache worker (icons only — app shell stays network-fresh).
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(import.meta.env.BASE_URL + 'sw.js')
      .catch(() => { /* cache is an enhancement; ignore failures */ })
  })
}

export default app
