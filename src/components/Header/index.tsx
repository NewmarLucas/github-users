'use client'

import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import { User, Heart } from '@/components/Icons'
import { NavigationTab } from '@/components/NavigationTab'

enum TABS { users, favorites }

export function Header() {
  const pathname = usePathname()
  const selectedTab = useMemo(() => {
    if (pathname.includes('favoritos')) return TABS.favorites
    return TABS.users
  }, [pathname])

  const tabs = [
    {
      icon: <User />,
      label: 'Usuários',
      isSelected: selectedTab === TABS.users,
      href: '/',
    },
    {
      icon: <Heart />,
      label: 'Favoritos',
      isSelected: selectedTab === TABS.favorites,
      href: '/favoritos',
    },
  ]

  return (
    <header className='fixed w-full bottom-0 max-sm:border-t sm:border-b border-border h-16 sm:h-20 sm:top-0 sm:bottom-auto'>
      <nav className='h-full grid grid-cols-2 sm:hidden'>
        {tabs.map(tab => (
          <NavigationTab {...tab} key={tab.label} />
        ))}
      </nav>
    </header>
  )
}
