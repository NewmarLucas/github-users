/**
 * @jest-environment jsdom
 */
import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { RepoCard } from "./index"
import { FavoriteHook } from "@/hooks/favorite"
import { mockRepo } from "__fixtures__/mockData"

describe('RepoCard Component', () => {
  const repo = mockRepo as any

  it("should render the repo data correctly", () => {
    const favoriteHooks = { isFavorited: jest.fn(() => true) } as any as FavoriteHook
    render(<RepoCard repo={repo} favoriteHooks={favoriteHooks} />)
    const title = screen.getByTestId('repo-title')
    const description = screen.getByTestId('repo-description')
    const primaryLanguage = screen.getByTestId('repo-primary-language')
    const updatedAt = screen.getByTestId('repo-updated-at')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent(repo.name)
    expect(title).toHaveAttribute('href', repo.url)
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent(repo.description)
    expect(primaryLanguage).toBeInTheDocument()
    expect(primaryLanguage).toHaveTextContent(repo.primaryLanguage.name)
    expect(primaryLanguage).toHaveAttribute('title', repo.primaryLanguage.name)
    expect(updatedAt).toBeInTheDocument()
    expect(updatedAt).toHaveTextContent('Updated on 01 Jan 2024')
  })

  it("should call 'removeFavorite' function when the repo is favorited and click the button favorite", () => {
    const favoriteHooks = {
      isFavorited: jest.fn(() => true),
      removeFavorite: jest.fn()
    } as any as FavoriteHook
    render(<RepoCard repo={repo} favoriteHooks={favoriteHooks} />)
    const favoriteButton = screen.getByTestId('favorite-button')
    const smallHeartIcon = screen.getByTestId('small-heart')
    expect(smallHeartIcon).toBeInTheDocument()
    expect(favoriteButton).toBeInTheDocument()
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'true')
    expect(favoriteButton).toHaveAttribute('aria-label', 'Remover dos favoritos')
    expect(favoriteButton).toHaveAttribute('title', 'Remover dos favoritos')
    expect(favoriteButton).toHaveClass('border-primary text-primary')
    fireEvent.click(favoriteButton)
    expect(favoriteHooks.removeFavorite).toHaveBeenCalledWith(repo.id)
  })

  it("should call 'addFavorite' function when the repo is not favorited and click the button favorite", () => {
    const favoriteHooks = {
      isFavorited: jest.fn(() => false),
      addFavorite: jest.fn()
    } as any as FavoriteHook
    render(<RepoCard repo={repo} favoriteHooks={favoriteHooks} />)
    const favoriteButton = screen.getByTestId('favorite-button')
    const smallHeartOutIcon = screen.getByTestId('small-heart-out')
    expect(smallHeartOutIcon).toBeInTheDocument()
    expect(favoriteButton).toBeInTheDocument()
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'false')
    expect(favoriteButton).toHaveAttribute('aria-label', 'Adicionar aos favoritos')
    expect(favoriteButton).toHaveAttribute('title', 'Adicionar aos favoritos')
    expect(favoriteButton).toHaveClass('border-none bg-matte text-placeholder')
    fireEvent.click(favoriteButton)
    expect(favoriteHooks.addFavorite).toHaveBeenCalledWith(repo)
  })
})
