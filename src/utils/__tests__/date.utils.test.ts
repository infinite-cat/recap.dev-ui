import { formatDuration } from '../date.utils'

describe('date.utils.ts', () => {
  describe('formatDuration', () => {
    it.each([
      [8, '8ms'],
      [256, '256ms'],
      [960000, '16m'],
      [961111, '16m 1s 111ms'],
      [11961111, '3h 19m 21s 111ms'],
      [0, '< 1ms'],
    ])('should format "%i" milliseconds to "%s"', (milliseconds, expected) => {
      expect(formatDuration(milliseconds)).toBe(expected)
    })
  })
})
