'use client'

import React from 'react'
import { Header } from '@/components/Header'
import { ListUsers } from '@/components/Sections/ListUsers'
import { TABS, useUsersHooks } from '@/hooks/users'
import { Favorites } from '@/components/Sections/Favorites'

export default function Page() {
  const {
    currentTab,
    setCurrentTab,
    search,
    setSearch,
    data,
    loading,
  } = useUsersHooks()

  return (
    <>
      <title>Usuários</title>
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        search={search}
        setSearch={setSearch}
      />
      <main className='pb-16 sm:pt-20 sm:pb-0 h-screen'>
        {currentTab === TABS.users && (
          <ListUsers
            data={data}
            loading={loading}
            searchTerm={search}
          />
        )}
        {currentTab === TABS.favorites && <Favorites />}
      </main>
    </>
  )
}
