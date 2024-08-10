import React from 'react'
import { Repo } from '@/hooks/users';
import { FavoriteHook } from '@/hooks/favorite';
import { RepoCard } from '@/components/RepoCard';

interface Props {
  repos: Repo[]
  favoriteHooks: FavoriteHook
}

export function Favorites({ favoriteHooks, repos }: Props) {
  const { favorites } = favoriteHooks

  return (
    <div className='container h-full'>
      {!!favorites?.length ? (
        <div className='h-full overflow-hidden'>
          <h1 className='text-primary mb-6 text-center'>Meus favoritos</h1>
          <section className='flex flex-col gap-4 h-[calc(100%-55px)] overflow-y-auto'>
            {favorites.map(repo => (
              <RepoCard key={repo.id} favoriteHooks={favoriteHooks} repo={repo} />
            ))}
          </section>
        </div>
      ) : (
        <p>Nenhum favorito salvo</p>
      )}
    </div>
  )
}
