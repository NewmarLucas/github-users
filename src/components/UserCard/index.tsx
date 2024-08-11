import React from 'react'
import { User } from '@/hooks/users'

interface Props {
  user: User
}

export function UserCard({ user }: Props) {
  return (
    <div className='p-4 sm:py-10 sm:px-6 rounded-lg sm:rounded-md border flex flex-col gap-2 sm:gap-6 max-sm:divide-y'>
      <div className='flex sm:flex-col items-center gap-y-6 gap-x-2'>
        <img
          data-testid='user-avatar'
          src={user.avatarUrl}
          alt={`Avatar do usuário ${user.login}`}
          className='w-12 h-12 sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden'
        />
        <div className='flex flex-col sm:items-center'>
          <h2 data-testid='user-name' className='sm:text-h1 text-grey-neutral'>{user?.name ?? ''}</h2>
          <span data-testid='user-login' className='text-md text-grey-dark'>@{user.login}</span>
        </div>
      </div>
      <p
        data-testid='user-bio'
        className='text-sm sm:text-md text-grey-dark sm:text-center max-sm:pt-2'
      >
        {user.bio}
      </p>
    </div>
  )
}
