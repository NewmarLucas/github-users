import { renderHook, act, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useUsersHooks, TABS } from './users'
import { debounce } from '@/utils/debounce'
import { mockUser, mockRepo } from '__fixtures__/mockData'

jest.mock('@/utils/debounce', () => ({
  debounce: jest.fn(fn => fn())
}))
jest.mock('axios', () => jest.fn())

const mockAxios = (axios as jest.MockedFunction<typeof axios>)

describe('useUsersHooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with the default values', () => {
    const { result } = renderHook(() => useUsersHooks())

    expect(result.current.currentTab).toBe(TABS.users)
    expect(result.current.search).toBe('')
    expect(result.current.user).toEqual({})
    expect(result.current.repos).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('should set the search and trigger the debounce function', async () => {
    mockAxios.mockResolvedValue({
      data: {
        ...mockUser,
        repositories: [mockRepo],
      }
    })
    const { result } = renderHook(() => useUsersHooks())

    await act(async () => {
      result.current.setSearch('johndoe')
    })

    expect(result.current.search).toBe('johndoe')
    expect(debounce).toHaveBeenCalledWith(expect.any(Function), 500)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
  })

  it('should fetch user and repositories', async () => {
    mockAxios.mockResolvedValue({
      data: {
        ...mockUser,
        repositories: [mockRepo],
      }
    })

    const { result } = renderHook(() => useUsersHooks())

    await act(async () => {
      result.current.getUser('johndoe')
    })

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('/api/users?search=johndoe', expect.any(Object))
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.repos).toEqual([mockRepo])
      expect(result.current.loading).toBe(false)
    })
  })

  it('should handle API errors gracefully', async () => {
    mockAxios.mockRejectedValue({})

    const { result } = renderHook(() => useUsersHooks())

    await act(async () => {
      result.current.getUser('qwerty123')
    })

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('/api/users?search=qwerty123', expect.any(Object))
      expect(result.current.user).toEqual({})
      expect(result.current.repos).toEqual([])
      expect(result.current.loading).toBe(false)
    })
  })

  it('should clear user and repos if search is empty', async () => {
    const { result } = renderHook(() => useUsersHooks())

    await act(async () => {
      result.current.setSearch('')
    })

    await waitFor(() => {
      expect(result.current.user).toEqual({})
      expect(result.current.repos).toEqual([])
    })
  })

  it('should change tabs', () => {
    const { result } = renderHook(() => useUsersHooks())

    act(() => {
      result.current.setCurrentTab(TABS.favorites)
    })

    expect(result.current.currentTab).toBe(TABS.favorites)
  })
})