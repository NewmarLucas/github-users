import React from 'react'
import Image from 'next/image'
import takenImage from '@/assets/images/taken.svg'

interface Props {
  searchTerm: string
}

export function NotFoundUser(props: Props) {
  const { searchTerm } = props

  return (
    <div className='w-full h-full flex flex-col gap-6 sm:gap-11 py-4 sm:py-8 px-5 sm:items-center sm:justify-center'>
      <div className='flex flex-col md:gap-2 sm:gap-0 items-center text-center'>
        <span className='font-poppins font-semibold text-h4 sm:text-h1 text-primary'>
          “{searchTerm}”
        </span>
        <h1 className='text-h4 sm:text-h1'>Nenhum usuário encontrado</h1>
        <p className='text-md sm:text-h5'>Verifique se a escrita está correta ou tente novamente</p>
      </div>
      <Image
        className='max-sm:hidden'
        src={takenImage}
        alt=''
        priority
        aria-hidden
      />
    </div>
  )
}
