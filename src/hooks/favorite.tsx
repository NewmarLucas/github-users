import { get, set } from 'idb-keyval'
import { useEffect, useState } from 'react'
import { Repo } from './users'

export interface FavoriteHook {
  favorites: Repo[]
  addFavorite: (repo: Repo) => Promise<void>
  removeFavorite: (id: string) => Promise<void>
  isFavorited: (id: string) => boolean
}

export function useFavoriteHooks(): FavoriteHook {
  const [favorites, setFavorites] = useState<Repo[]>([])

  async function addFavorite(repo: Repo) {
    const newFavorites = Array.from(new Set([...favorites, repo]))
    set('favorites', newFavorites)
    setFavorites(newFavorites)
  }

  async function removeFavorite(id: string) {
    setFavorites(state => {
      const favorites = [...state]
      const index = favorites.findIndex(storedRepo => storedRepo.id === id)
      if (index !== -1) {
        favorites.splice(index, 1)
        set('favorites', favorites)
      }
      return favorites
    })
  }

  function isFavorited(id: string) {
    const index = favorites.findIndex(storedRepo => storedRepo.id === id)
    return index !== -1
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await get('favorites');
      if (storedFavorites) {
        setFavorites(storedFavorites);
      }
    };
    fetchFavorites();
  }, [])

  return { favorites, addFavorite, removeFavorite, isFavorited }
}