import React from 'react'
import { Repo } from '@/hooks/users'
import { dateFormat } from '@/utils/formatters'

interface Props {
  repo: Repo
}

export function RepoCard({ repo }: Props) {
  return (
    <article className='w-full p-4 rounded-md border relative flex flex-col'>
      <button className='absolute top-4 right-4 border h-10 w-10 shrink-0 rounded-full'>
        {'<3'}
      </button>
      <h2>{repo.name}</h2>
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
