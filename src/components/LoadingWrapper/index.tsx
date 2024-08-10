import React from 'react'
import Image from 'next/image'
import gitImg from '@/assets/images/git.svg'

interface Props extends React.PropsWithChildren {
  isLoading: boolean
}

export function LoadingWrapper(props: Props) {
  const { isLoading, children } = props

  if (isLoading) return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-24 h-24'>
        <Image
          src={gitImg}
          alt='Icone que indica carregamento'
          className='animate-[scale_1.3s_ease-in-out_infinite]'
        />
      </div>
    </div>
  )

  return children
}
