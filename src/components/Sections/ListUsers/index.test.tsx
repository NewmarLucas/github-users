/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, screen } from "@testing-library/react"
import { ListUsers } from "./index"
import { FavoriteHook } from "@/hooks/favorite"
import { mockRepo, mockUser } from "__fixtures__/mockData"

describe('ListUsers Section Component', () => {
  const props = {
    user: mockUser,
    loading: false,
    favoriteHooks: { isFavorited: jest.fn(() => true) } as any as FavoriteHook
  }

  it("should render the list users section correctly", () => {
    const _props = { ...props, searchTerm: '', repos: [] }
    render(<ListUsers {..._props} />)
    const title = screen.getByTestId('list-users-title')
    const subtitle = screen.getByTestId('list-users-subtitle')
    const peopleImg = screen.getByTestId('people-img')
    expect(title).toHaveTextContent('Procure pelo Nome ou Nome de Usuário')
    expect(subtitle).toHaveTextContent('Encontre os repositórios de algum usuário digitando no campo acima')
    expect(peopleImg).toBeInTheDocument()
  })

  it("should render the list user repos correctly", () => {
    const _props = {
      ...props,
      searchTerm: 'johndoe',
      repos: [mockRepo]
    }
    render(<ListUsers {..._props} />)
    const title = screen.queryByTestId('list-users-title')
    const subtitle = screen.queryByTestId('list-users-subtitle')
    const peopleImg = screen.queryByTestId('people-img')
    expect(title).not.toBeInTheDocument()
    expect(subtitle).not.toBeInTheDocument()
    expect(peopleImg).not.toBeInTheDocument()

    const repositoriesTitle = screen.getByText('Repositórios')
    const favoriteRepoButton = screen.getAllByTestId('favorite-button')
    expect(repositoriesTitle).toBeInTheDocument()
    expect(favoriteRepoButton).toHaveLength(1)
  })

  it("should render not found repos when has searchTerm and not repos", () => {
    const _props = {
      ...props,
      searchTerm: 'johndoe',
      repos: []
    }
    render(<ListUsers {..._props} />)
    const searchTermNotFoundTitle = screen.getByTestId('search-term')
    expect(searchTermNotFoundTitle).toBeInTheDocument()
    expect(searchTermNotFoundTitle).toHaveTextContent('johndoe')
  })
})
