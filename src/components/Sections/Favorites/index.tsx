import React from 'react'
import { FavoriteHook } from '@/hooks/favorite';
import { RepoCard } from '@/components/RepoCard';

interface Props {
  favoriteHooks: FavoriteHook
}

export function Favorites({ favoriteHooks }: Props) {
  const { favorites } = favoriteHooks

  return (
    <div className='py-4 w-full h-[calc(100%-80px)] sm:h-full max-w-4xl mx-auto'>
      <div className='h-full overflow-hidden'>
        <h1 className='text-primary mb-6 text-center'>Meus favoritos</h1>
        {!!favorites?.length ? (
          <section className='flex flex-col gap-4 h-[calc(100%-55px)] overflow-y-auto pr-2'>
            {favorites.map(repo => (
              <RepoCard key={repo.id} favoriteHooks={favoriteHooks} repo={repo} />
            ))}
          </section>
        ) : (
          <p>Nenhum favorito salvo</p>
        )}
      </div>
    </div>
  )
}
