import { useEffect, useState } from 'react'
import axios from 'axios'
import { debounce } from '@/utils/debounce'

export enum TABS { users, favorites }

export interface User {
  id: string
  name: string | null
  login: string
  avatarUrl: string
  bio: string | null
}

export interface Repo {
  id: string
  name: string
  description: string | null
  url: string
  updatedAt: string
  primaryLanguage: {
    name: string
    color: string
  } | null
}

export function useUsersHooks() {
  const [currentTab, setCurrentTab] = useState(TABS.users)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState<User>({} as User)
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [endCursor, setEndCursor] = useState<string | null>(null)

  async function getUser(search: string, first = 20, after: string | null = null, signal?: AbortSignal) {
    try {
      const params = new URLSearchParams({
        search,
        first: first.toString(),
        after: after || ''
      })
      const res = await axios(`/api/users?${params.toString()}`, { signal })
      const { repositories, pageInfo, ...userData } = res.data

      setUser(userData)
      setRepos(prevRepos => [...prevRepos, ...repositories])
      setHasNextPage(pageInfo?.hasNextPage ?? false)
      setEndCursor(pageInfo?.endCursor ?? null)
    } catch {
      setRepos([])
      setUser({} as User)
      setHasNextPage(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!search) {
      setRepos([])
      setUser({} as User)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    debounce(() => {
      setRepos([])
      getUser(search, 20, null, controller.signal)
    }, 500)

    return () => { controller.abort() }
  }, [search])

  const loadMoreRepos = () => {
    if (hasNextPage) {
      getUser(search, 20, endCursor)
    }
  }

  return {
    currentTab,
    setCurrentTab,
    search,
    setSearch,
    user,
    repos,
    loading,
    getUser,
    loadMoreRepos,
  }
}
