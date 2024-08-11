/**
 * @jest-environment node
 */
import { dateFormat } from './formatters'

describe('Formatters', () => {
  it('should dateFormat function format dates correctly', async () => {
    const formatted = dateFormat('2024-06-06')
    expect(formatted).toBe('06 Jun 2024')

    const formattedWithoutValue = dateFormat()
    expect(formattedWithoutValue).toBeNull()

    const formattedWithInvalidDate = dateFormat('blablabla')
    expect(formattedWithInvalidDate).toBeNull()
  })
})
