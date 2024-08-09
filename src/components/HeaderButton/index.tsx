import React from 'react'

interface Props extends React.PropsWithChildren {
  onClick: () => void
  label: string
  className?: string
}

export function HeaderButton(props: Props) {
  const { children, onClick, label, className = '' } = props

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`h-full min-w-36 text-white bg-primary hover:brightness-105 px-6 py-2 text-md font-medium ${className}`}
    >
      <span className='h-full flex items-center justify-center gap-2'>
        {children}
      </span>
    </button>
  )
}
