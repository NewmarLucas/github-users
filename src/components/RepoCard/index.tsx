import React from 'react'
import { Repo } from '@/hooks/users'
import { FavoriteHook } from '@/hooks/favorite'
import { dateFormat } from '@/utils/formatters'
import { SmallHeartOutline, SmallHeart } from '@/components/Icons'

interface Props {
  repo: Repo
  favoriteHooks: FavoriteHook
}

export function RepoCard({ repo, favoriteHooks }: Props) {
  const { removeFavorite, addFavorite } = favoriteHooks
  const isFavorited = favoriteHooks.isFavorited(repo.id)

  function handleFavorite() {
    if (isFavorited) {
      removeFavorite(repo.id)
    } else {
      addFavorite(repo)
    }
  }

  return (
    <article className='w-full p-4 rounded-md border relative flex flex-col'>
      <button
        onClick={handleFavorite}
        className={`${isFavorited ? 'border-primary text-primary' : 'border-none bg-matte text-placeholder'
          } absolute top-4 right-4 border h-10 w-10 shrink-0 rounded-full flex items-center justify-center`}
        aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        title={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        aria-pressed={isFavorited}
      >
        {isFavorited ? <SmallHeart /> : <SmallHeartOutline />}
      </button>
      <h2>
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className='hover:underline'>
          {repo.name}
        </a>
      </h2>
      {repo.description && (
        <p
          className='mt-2 text-placeholder text-md w-full line-clamp-3 md:w-3/4'
          title={repo.description}
        >
          {repo.description}
        </p>
      )}
      <div className='flex sm:items-center gap-x-6 max-sm:flex-col mt-2 sm:mt-4'>
        {repo.primaryLanguage && (
          <p
            className='flex gap-2 w-24 truncate items-center text-sm text-grey-neutral'
            title={repo.primaryLanguage.name}
          >
            <span
              className='h-4 w-4 shrink-0 rounded-full'
              style={{ backgroundColor: repo.primaryLanguage.color }}
            />
            {repo.primaryLanguage.name}
          </p>
        )}
        <p className='text-sm text-grey-neutral'>
          Updated on {dateFormat(repo.updatedAt)}
        </p>
      </div>
    </article>
  )
}
