import { useEffect, useState } from 'react'
import { debounce } from '@/utils/debounce'

export enum TABS { users, favorites }

export function useUsersHooks() {
  const [currentTab, setCurrentTab] = useState(TABS.users)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    debounce(() => {
      console.log(search)
      setLoading(false)
    })
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
