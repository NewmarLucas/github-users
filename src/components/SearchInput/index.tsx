import React from 'react'
import { Search } from '../Icons'

interface Props extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement
> { }

export function SearchInput(props: Props) {
  const { className = '', ...restProps } = props

  return (
    <div className="relative w-full max-w-[668px]">
      <input
        {...restProps}
        type='search'
        className={`h-full w-full py-[10px] px-4 pr-10 text-grey-dark text-md font-normal border border-border rounded-md focus:outline-0 placeholder:text-placeholder ${className}`}
      />
      <div className="absolute top-[calc((100%-24px)/2)] right-4 text-placeholder">
        <Search />
      </div>
    </div>
  )
}
