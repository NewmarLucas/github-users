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

  async function getUser(search: string, signal?: AbortSignal) {
    try {
      const params = new URLSearchParams({ search })
      const res = await axios(`/api/users?${params.toString()}`, { signal })
      const { repositories, ...userData } = res.data
      setUser(userData)
      if (repositories instanceof Array && !!repositories.length)
        setRepos(repositories)
    } catch {
      setRepos([])
      setUser({} as User)
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
      const signal = controller.signal
      getUser(search, signal)
    }, 500)

    return () => { controller.abort() }
  }, [search])

  return {
    currentTab,
    setCurrentTab,
    search,
    setSearch,
    user,
    repos,
    loading,
    getUser,
  }
}
