'use client'

import React from 'react'
import { TABS, useUsersHooks } from '@/hooks/users'
import { useFavoriteHooks } from '@/hooks/favorite'
import { Header } from '@/components/Header'
import { ListUsers } from '@/components/Sections/ListUsers'
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
    loadMoreRepos,
  } = useUsersHooks()
  const favoriteHooks = useFavoriteHooks()

  return (
    <>
      <title>Usuários</title>
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        search={search}
        setSearch={setSearch}
      />
      <div className='px-4 pb-16 sm:pt-20 sm:pb-0 h-screen sm:overflow-hidden lg:container mx-auto'>
        <>
          {currentTab === TABS.users && (
            <ListUsers
              user={user}
              repos={repos}
              loading={loading}
              searchTerm={search}
              favoriteHooks={favoriteHooks}
              loadMoreRepos={loadMoreRepos}
            />
          )}
          {currentTab === TABS.favorites && (
            <Favorites favoriteHooks={favoriteHooks} />
          )}
        </>
      </div>
    </>
  )
}
