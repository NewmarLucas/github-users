import React from 'react'
import Link from 'next/link'

interface Props {
  icon: JSX.Element
  label: string
  isSelected: boolean
  href: string
}

export function NavigationTab(props: Props) {
  const { icon, label, isSelected, href } = props

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`${isSelected ? 'bg-primary text-white' : 'text-placeholder hover:bg-matte'
        } h-full w-full flex items-center justify-center p-4`}
    >
      {icon}
    </Link>
  )
}
