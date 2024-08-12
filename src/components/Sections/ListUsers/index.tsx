import React, { useEffect, useMemo, useRef } from 'react'
import Image from 'next/image';
import peopleSearch from '@/assets/images/people_search.svg'
import { NotFoundUser } from '@/components/NotFoundUser';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { RepoCard } from '@/components/RepoCard';
import { UserCard } from '@/components/UserCard';
import { Repo, User } from '@/hooks/users';
import { FavoriteHook } from '@/hooks/favorite';

interface Props {
  searchTerm: string
  user: User
  repos: Repo[]
  loading: boolean
  favoriteHooks: FavoriteHook
  loadMoreRepos: () => void
}

export function ListUsers(props: Props) {
  const { searchTerm, user, repos, loading, favoriteHooks, loadMoreRepos } = props
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const foundResults = useMemo(() => {
    if (searchTerm && !loading && !repos?.length) return false
    return true
  }, [loading, repos])

  useEffect(() => {
    if (!repos.length) return

    const handleScroll = () => {
      const container = scrollContainerRef?.current

      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container
        if (scrollTop + clientHeight >= scrollHeight && !loading) {
          loadMoreRepos()
        }
      }
    }

    const container = scrollContainerRef?.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [loading, loadMoreRepos, repos])

  if (!foundResults) return <NotFoundUser searchTerm={searchTerm} />

  return (
    <LoadingWrapper isLoading={loading}>
      {!!repos.length ? (
        <main className='py-4 w-full h-[calc(100%-80px)] sm:h-full gap-y-4 gap-x-6 xl:gap-x-12 grid sm:grid-cols-[250px_auto] md:grid-cols-[300px_auto] xl:grid-cols-[448px_auto]'>
          <aside className='sm:max-w-[448px] shrink-0'>
            <UserCard user={user} />
          </aside>
          <div className='h-full overflow-hidden'>
            <h1 className='text-primary mb-4'>Repositórios</h1>
            <section
              ref={scrollContainerRef}
              className='flex flex-col gap-4 h-[calc(100%-47px)] overflow-y-auto pr-3'
            >
              {repos.map(repo => (
                <RepoCard key={repo.id} favoriteHooks={favoriteHooks} repo={repo} />
              ))}
            </section>
          </div>
        </main>
      ) : (
        <div className='w-full h-full flex flex-col gap-6 sm:gap-11 py-8 px-5 sm:items-center sm:justify-center'>
          <div className='flex flex-col gap-2 sm:gap-0 sm:items-center'>
            <h1 data-testid='list-users-title'>Procure pelo Nome ou Nome de Usuário</h1>
            <p className='text-h5' data-testid='list-users-subtitle'>
              Encontre os repositórios de algum usuário digitando no campo acima
            </p>
          </div>
          <Image
            className='max-sm:hidden'
            priority
            src={peopleSearch}
            data-testid='people-img'
            alt='Pessoa segurando uma lupa simbolizando que está procurando outra pessoa'
          />
        </div>
      )}
    </LoadingWrapper>
  )
}
