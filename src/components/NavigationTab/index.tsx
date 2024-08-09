import React from 'react'

interface Props {
  icon: JSX.Element
  label: string
  isSelected: boolean
  onClick: () => void
}

export function NavigationTab(props: Props) {
  const { icon, label, isSelected, onClick } = props

  return (
    <button
      onClick={onClick}
      aria-label={`Ver ${label}`}
      title={label}
      className={`${isSelected ? 'bg-primary text-white' : 'text-placeholder hover:bg-matte'
        } h-full w-full flex items-center justify-center p-4`}
    >
      {icon}
    </button>
  )
}
