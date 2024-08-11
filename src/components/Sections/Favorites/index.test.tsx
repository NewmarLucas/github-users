/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, screen } from "@testing-library/react"
import { Favorites } from "./index"
import { FavoriteHook } from "@/hooks/favorite"
import { mockRepo } from "__fixtures__/mockData"

describe('Favorites Section Component', () => {
  it("should render the favorites section correctly when has no saved favorites", () => {
    const favoriteHooks = {
      isFavorited: jest.fn(() => true),
      favorites: []
    } as any as FavoriteHook

    render(<Favorites favoriteHooks={favoriteHooks} />)
    const paragraph = screen.getByText('Nenhum favorito salvo')
    expect(paragraph).toBeInTheDocument()
  })

  it("should render the favorites section correctly", () => {
    const favoriteHooks = {
      isFavorited: jest.fn(() => true),
      favorites: [mockRepo]
    } as any as FavoriteHook
    render(<Favorites favoriteHooks={favoriteHooks} />)
    const title = screen.queryByText('Meus favoritos')
    const favoriteRepoButton = screen.getAllByTestId('favorite-button')
    expect(title).toBeInTheDocument()
    expect(favoriteRepoButton).toHaveLength(1)
  })
})
