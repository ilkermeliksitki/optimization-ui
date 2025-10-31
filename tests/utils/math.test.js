import { describe, it, expect } from 'vitest'
import { add } from '@/utils/math.js'

describe('add()', () => {
  it('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('handles negative numbers', () => {
    expect(add(-2, 5)).toBe(3)
  })
})

