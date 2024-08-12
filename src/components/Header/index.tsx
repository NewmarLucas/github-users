'use client'

import React from 'react'

import { User, Heart, HeartOutline } from '@/components/Icons'
import { NavigationTab } from '@/components/NavigationTab'
import { HeaderButton } from '../HeaderButton'
import { SearchInput } from '../SearchInput'
import { TABS } from '@/hooks/users'

interface Props {
  currentTab: TABS
  setCurrentTab: React.Dispatch<React.SetStateAction<TABS>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function Header(props: Props) {
  const { currentTab, setCurrentTab, search, setSearch } = props

  const tabs = [
    {
      icon: <User />,
      label: 'Usuários',
      isSelected: currentTab === TABS.users,
      onClick: () => setCurrentTab(TABS.users),
    },
    {
      icon: <Heart />,
      label: 'Favoritos',
      isSelected: currentTab === TABS.favorites,
      onClick: () => setCurrentTab(TABS.favorites),
    },
  ]

  return (
    <>
      <div className='sm:hidden w-full p-4 pb-0'>
        <SearchInput
          data-testid='search-input-mobile'
          aria-label='Buscar usuários do GitHub'
          placeholder='Buscar usuário'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <header className='fixed w-full z-40 bg-light bottom-0 max-sm:border-t sm:border-b h-16 sm:h-20 sm:top-0 sm:bottom-auto'>
        <div className='max-sm:hidden w-full h-full flex justify-between items-center'>
          <div className='w-full flex py-5 px-6'>
            <SearchInput
              data-testid='search-input-desktop'
              aria-label='Buscar usuários do GitHub'
              placeholder='Buscar usuário'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {currentTab === TABS.users ? (
            <HeaderButton label='Ver favoritos' onClick={() => setCurrentTab(TABS.favorites)}>
              <HeartOutline />
              Favoritos
            </HeaderButton>
          ) : (
            <HeaderButton label='Ver usuários' onClick={() => setCurrentTab(TABS.users)}>
              <User />
              Usuários
            </HeaderButton>
          )}
        </div>
        <nav className='h-full grid grid-cols-2 sm:hidden'>
          {tabs.map(tab => (
            <NavigationTab {...tab} key={tab.label} />
          ))}
        </nav>
      </header>
    </>
  )
}
