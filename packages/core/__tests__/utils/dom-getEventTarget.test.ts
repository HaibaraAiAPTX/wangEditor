import { describe, it, expect, afterEach } from 'vitest'
import { getEventTarget } from '../../src/utils/dom'

describe('getEventTarget - Shadow DOM compatible', () => {
  afterEach(() => {
    // 清理可能添加到 body 的元素
    while (document.body.lastChild) {
      if (document.body.lastChild instanceof HTMLDivElement) {
        document.body.removeChild(document.body.lastChild)
      } else {
        break
      }
    }
  })

  it('should find element by CSS selector in normal DOM', () => {
    const div = document.createElement('div')
    const button = document.createElement('button')
    button.className = 'test-btn'
    div.appendChild(button)

    const event = new MouseEvent('click', { bubbles: true })
    // Mock composedPath to return the event path
    event.composedPath = () => [button, div]

    const result = getEventTarget(event, 'button.test-btn')
    expect(result).toBe(button)
  })

  it('should find element inside Shadow DOM', () => {
    const host = document.createElement('div')
    document.body.appendChild(host)

    const shadowRoot = host.attachShadow({ mode: 'open' })
    const button = document.createElement('button')
    button.className = 'shadow-btn'
    shadowRoot.appendChild(button)

    const event = new MouseEvent('click', { bubbles: true, composed: true })
    // Mock composedPath to simulate Shadow DOM event path
    event.composedPath = () => [button, shadowRoot, host, document.body, document]

    const result = getEventTarget(event, 'button.shadow-btn')
    expect(result).toBe(button)
  })

  it('should find element with tagName selector', () => {
    const div = document.createElement('div')
    const td = document.createElement('td')
    div.appendChild(td)

    const event = new MouseEvent('mousedown', { bubbles: true })
    event.composedPath = () => [td, div]

    const result = getEventTarget(event, 'td')
    expect(result).toBe(td)
  })

  it('should support custom matcher function', () => {
    const div = document.createElement('div')
    div.dataset.test = 'value'

    const event = new MouseEvent('click', { bubbles: true })
    event.composedPath = () => [div]

    const result = getEventTarget(event, el => el.dataset.test === 'value')
    expect(result).toBe(div)
  })

  it('should support custom matcher with tagName check (table use case)', () => {
    const div = document.createElement('div')
    const th = document.createElement('th')
    div.appendChild(th)

    const event = new MouseEvent('mousedown', { bubbles: true })
    event.composedPath = () => [th, div]

    const result = getEventTarget(event, el => el.tagName === 'TH' || el.tagName === 'TD')
    expect(result).toBe(th)
  })

  it('should return null when no match found', () => {
    const div = document.createElement('div')
    const event = new MouseEvent('click', { bubbles: true })
    event.composedPath = () => [div]

    const result = getEventTarget(event, 'button')
    expect(result).toBeNull()
  })

  it('should return null when custom matcher returns false', () => {
    const div = document.createElement('div')
    const event = new MouseEvent('click', { bubbles: true })
    event.composedPath = () => [div]

    const result = getEventTarget(event, el => el.tagName === 'BUTTON')
    expect(result).toBeNull()
  })
})
