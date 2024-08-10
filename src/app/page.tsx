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
    user,
    repos,
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
      <div className='pb-16 sm:pt-20 sm:pb-0 h-screen sm:overflow-hidden lg:container mx-auto'>
        <div className='w-full h-full p-4'>
          {currentTab === TABS.users && (
            <ListUsers
              user={user}
              repos={repos}
              loading={loading}
              searchTerm={search}
            />
          )}
          {currentTab === TABS.favorites && <Favorites />}
        </div>
      </div>
    </>
  )
}
