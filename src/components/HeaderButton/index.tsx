import React from 'react'
import Link from 'next/link'

interface Props extends React.PropsWithChildren {
  href: string
  className?: string
}

export function HeaderButton(props: Props) {
  const { children, href, className = '' } = props

  return (
    <Link
      href={href}
      className={`h-full text-white bg-primary hover:bg-primary-dark px-6 py-2 text-md font-medium ${className}`}
    >
      <span className='h-full flex items-center gap-2'>
        {children}
      </span>
    </Link>
  )
}
