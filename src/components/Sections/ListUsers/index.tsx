import React, { useMemo } from 'react'
import Image from 'next/image';
import peopleSearch from '@/assets/images/people_search.svg'
import { NotFoundUser } from '@/components/NotFoundUser';
import { LoadingWrapper } from '@/components/LoadingWrapper';

interface Props {
  searchTerm: string
  data: any[]
  loading: boolean
}

export function ListUsers(props: Props) {
  const { searchTerm, data, loading } = props
  const foundResults = useMemo(() => {
    if (searchTerm && !loading && !data.length) return false
    return true
  }, [loading, data])

  if (!foundResults) return <NotFoundUser searchTerm={searchTerm} />

  return (
    <div className='w-full h-full'>
      <LoadingWrapper isLoading={loading}>
        {!!data.length
          ? (
            <div>
              <pre>
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          ) : (
            <div className='w-full h-full flex flex-col gap-6 sm:gap-11 py-8 px-5 sm:items-center sm:justify-center'>
              <div className='flex flex-col gap-2 sm:gap-0 sm:items-center'>
                <h1 data-testid='listUsersTitle'>Procure pelo Nome ou Nome de Usuário</h1>
                <h5>Encontre os repositórios de algum usuário digitando no campo acima</h5>
              </div>
              <Image
                className='max-sm:hidden'
                src={peopleSearch}
                alt='Pessoa segurando uma lupa simbolizando que está procurando outra pessoa'
              />
            </div>
          )}
      </LoadingWrapper>
    </div>
  )
}
