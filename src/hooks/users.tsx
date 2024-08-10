import { useEffect, useState } from 'react'
import { debounce } from '@/utils/debounce'

export enum TABS { users, favorites }

export function useUsersHooks() {
  const [currentTab, setCurrentTab] = useState(TABS.users)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!search) {
      setData([])
      return
    }

    const controller = new AbortController()
    setLoading(true)
    debounce(() => {
      const signal = controller.signal
      const params = new URLSearchParams({ search })
      fetch(`/api/users?${params.toString()}`, { signal })
        .then(async res => {
          const response = await res.json()
          setData(response)
        })
        .catch(() => {
          setData([])
        })
        .finally(() => {
          setLoading(false)
        })
    }, 500)

    return () => { controller.abort() }
  }, [search])

  return {
    currentTab,
    setCurrentTab,
    search,
    setSearch,
    data,
    loading,
  }
}
