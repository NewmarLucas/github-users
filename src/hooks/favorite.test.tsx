import { renderHook, act, waitFor } from '@testing-library/react'
import { get, set } from 'idb-keyval'
import { useFavoriteHooks } from './favorite'
import { mockRepo } from '__fixtures__/mockData'

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
}))

describe('useFavoriteHooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with stored favorites', async () => {
    (get as jest.Mock).mockResolvedValue([mockRepo])

    const { result } = renderHook(() => useFavoriteHooks())

    await waitFor(() => {
      expect(result.current.favorites).toEqual([mockRepo])
      expect(get).toHaveBeenCalledWith('favorites')
    })
  })

  it('should add a new favorite', async () => {
    const { result } = renderHook(() => useFavoriteHooks())

    await act(async () => {
      await result.current.addFavorite(mockRepo)
    })

    expect(result.current.favorites).toContain(mockRepo)
    expect(set).toHaveBeenCalledWith('favorites', [mockRepo])
  })

  it('should remove a favorite', async () => {
    (get as jest.Mock).mockResolvedValue([mockRepo])

    const { result } = renderHook(() => useFavoriteHooks())

    await waitFor(() => { })
    await act(async () => {
      await result.current.removeFavorite(mockRepo.id)
    })

    await waitFor(() => {
      expect(result.current.favorites).toEqual([])
      expect(set).toHaveBeenCalledWith('favorites', [])
    })
  })

  it('should check if a repo is favorited', async () => {
    (get as jest.Mock).mockResolvedValue([mockRepo])

    const { result } = renderHook(() => useFavoriteHooks())

    await waitFor(() => {
      const isFavorited = result.current.isFavorited(mockRepo.id)
      expect(isFavorited).toBe(true)
    })
  })
})
