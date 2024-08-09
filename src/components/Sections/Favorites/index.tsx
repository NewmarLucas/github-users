import React from 'react'
import Image from 'next/image';
import peopleSearch from '@/assets/images/people_search.svg'

export function Favorites() {

  return (
    <div className='w-full h-full flex flex-col gap-6 sm:gap-11 py-8 px-5 sm:items-center sm:justify-center'>
      <p>Nenhum favorito salvo</p>
      {/* <div className='flex flex-col gap-2 sm:gap-0 sm:items-center'>
        <h1>Procure pelo Nome ou Nome de Usuário</h1>
        <h5>Encontre os repositórios de algum usuário digitando no campo acima</h5>
      </div>
      <Image
        className='max-sm:hidden'
        src={peopleSearch}
        alt='Pessoa segurando uma lupa simbolizando que está procurando outra pessoa'
      /> */}
    </div>
  )
}
