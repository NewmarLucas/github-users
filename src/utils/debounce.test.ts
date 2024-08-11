/**
 * @jest-environment node
 */
import { debounce } from './debounce'

jest.useFakeTimers()

describe('debounce', () => {
  let mockFunction: jest.Mock

  beforeEach(() => {
    mockFunction = jest.fn()
  })

  it('should call the function after the specified time', () => {
    debounce(() => { mockFunction() }, 300)

    jest.advanceTimersByTime(299)
    expect(mockFunction).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer if called again before time elapses', () => {
    // the default time is 300ms
    debounce(() => { mockFunction() })
    jest.advanceTimersByTime(200)
    debounce(() => { mockFunction() })

    jest.advanceTimersByTime(299)
    expect(mockFunction).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })

  it('should call the function with the correct arguments', () => {
    const args = [1, 2, 3]
    debounce(() => { mockFunction(...args) }, 300)

    jest.advanceTimersByTime(300)
    expect(mockFunction).toHaveBeenCalledWith(...args)
  })
})
