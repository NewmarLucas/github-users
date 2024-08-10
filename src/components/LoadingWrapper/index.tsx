import React from 'react'

interface Props extends React.PropsWithChildren {
  isLoading: boolean
}

export function LoadingWrapper(props: Props) {
  const { isLoading, children } = props

  if (isLoading) return (
    <p>Carregando...</p>
  )

  return children
}
