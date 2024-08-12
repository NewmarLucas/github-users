import { renderHook, act, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useUsersHooks, TABS } from './users'
import { debounce } from '@/utils/debounce'
import { mockUser, mockRepo, mockRepoPage2 } from '__fixtures__/mockData'

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
      expect(mockAxios).toHaveBeenCalledWith(
        '/api/users?search=johndoe&first=20&after=',
        expect.any(Object)
      )
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
      expect(mockAxios).toHaveBeenCalledWith(
        '/api/users?search=qwerty123&first=20&after=',
        expect.any(Object)
      )
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

  it('should paginate and add more repositories when scrolling to the bottom of the page', async () => {
    mockAxios
      .mockResolvedValueOnce({
        data: {
          ...mockUser,
          pageInfo: {
            hasNextPage: true,
            endCursor: '#1234'
          },
          repositories: [mockRepo],
        }
      })
      .mockResolvedValueOnce({
        data: {
          ...mockUser,
          pageInfo: {
            hasNextPage: false,
            endCursor: null
          },
          repositories: [mockRepoPage2],
        }
      })

    const { result } = renderHook(() => useUsersHooks())

    await act(async () => {
      result.current.setSearch('johndoe')
    })

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith(
        '/api/users?search=johndoe&first=20&after=',
        expect.any(Object)
      )
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.repos).toEqual([mockRepo])
    })

    await act(async () => {
      result.current.loadMoreRepos()
    })

    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledTimes(2)
      expect(result.current.repos).toEqual([mockRepo, mockRepoPage2])
    })
  })
})
