import React from 'react'
import { Header } from '../Header'

export function PageTemplate({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <main className='pb-16 sm:pt-20 sm:pb-0'>
        {children}
      </main>
    </>
  )
}
