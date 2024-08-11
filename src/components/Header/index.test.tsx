/**
 * @jest-environment jsdom
 */
import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { Header } from "./index"
import { TABS } from "../../hooks/users"

describe('Header Component', () => {
  const setCurrentTab = jest.fn()
  const setSearch = jest.fn()

  const defaultProps = {
    currentTab: TABS.users,
    search: '',
    setCurrentTab,
    setSearch,
  }

  it("should render the search input and tabs correctly", () => {
    render(<Header {...defaultProps} />)
    const searchInput = screen.getAllByPlaceholderText('Buscar usuário')
    expect(searchInput).toHaveLength(2) // Um para mobile e outro para desktop
    const favoritesTab = screen.getByText('Favoritos')
    expect(favoritesTab).toBeInTheDocument()
  })

  it('should render the correct button in the desktop view based on currentTab', () => {
    const { rerender } = render(<Header {...defaultProps} currentTab={TABS.users} />)
    expect(screen.getByText('Favoritos')).toBeInTheDocument()

    rerender(<Header {...defaultProps} currentTab={TABS.favorites} />)
    expect(screen.getByText('Usuários')).toBeInTheDocument()
  })

  it('should style changes correctly button in the mobile view based on currentTab', () => {
    const { rerender } = render(<Header {...defaultProps} currentTab={TABS.users} />)
    const userTabButton = screen.getByTestId('button-Usuários')
    expect(userTabButton).toHaveClass('bg-primary')

    rerender(<Header {...defaultProps} currentTab={TABS.users} />)
    const favoritesTabButton = screen.getByTestId('button-Usuários')
    expect(favoritesTabButton).toHaveClass('bg-primary')
  })

  it("should call setCurrentTab when favorites tab is clicked", () => {
    render(<Header {...defaultProps} />)
    const favoritesTab = screen.getByText('Favoritos')
    fireEvent.click(favoritesTab)
    expect(setCurrentTab).toHaveBeenCalledWith(TABS.favorites)
  })

  it("should call setCurrentTab when users tab is clicked", () => {
    render(<Header {...defaultProps} currentTab={TABS.favorites} />)
    const usersTab = screen.getByText('Usuários')
    fireEvent.click(usersTab)
    expect(setCurrentTab).toHaveBeenCalledWith(TABS.users)
  })

  it('should call setSearch when the search input mobile changes', () => {
    render(<Header {...defaultProps} />)
    const searchInput = screen.getByTestId('search-input-mobile')
    fireEvent.change(searchInput, { target: { value: 'john' } })
    expect(setSearch).toHaveBeenCalledWith('john')
  })

  it('should call setSearch when the search input desktop changes', () => {
    render(<Header {...defaultProps} />)
    const searchInput = screen.getByTestId('search-input-desktop')
    fireEvent.change(searchInput, { target: { value: 'john' } })
    expect(setSearch).toHaveBeenCalledWith('john')
  })

  it('should render mobile header', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 667 })
    render(<Header {...defaultProps} />)
    // Verifica se as abas estão renderizadas para mobile
    const userTab = screen.getByTestId('button-Usuários')
    const favoritesTab = screen.getByTestId('button-Favoritos')

    expect(userTab).toBeInTheDocument()
    expect(favoritesTab).toBeInTheDocument()
  })

  it('should call setCurrentTab when users tab is clicked mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 667 })
    render(<Header {...defaultProps} currentTab={TABS.favorites} />)
    const userTabButton = screen.getByTestId('button-Usuários')
    const favoritesTabButton = screen.getByTestId('button-Favoritos')
    expect(favoritesTabButton).toHaveClass('bg-primary')
    fireEvent.click(userTabButton)
    expect(setCurrentTab).toHaveBeenCalledWith(TABS.users)
  })

  it('should call setCurrentTab when favorite tab is clicked mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 667 })
    render(<Header {...defaultProps} currentTab={TABS.users} />)
    const userTabButton = screen.getByTestId('button-Usuários')
    expect(userTabButton).toHaveClass('bg-primary')
    const favoritesTabButton = screen.getByTestId('button-Favoritos')
    fireEvent.click(favoritesTabButton)
    expect(setCurrentTab).toHaveBeenCalledWith(TABS.favorites)
  })
})
