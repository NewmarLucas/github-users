/**
 * @jest-environment jsdom
 */
import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { SearchInput } from "./index"

describe('SearchInput Component', () => {
  it("should render correctly", () => {
    const setSearch = jest.fn()
    render(
      <SearchInput
        data-testid='search-input'
        aria-label='Buscar usuários do GitHub'
        placeholder='Buscar usuário'
        onChange={e => setSearch(e.target.value)}
      />
    )
    const icon = screen.getByTestId('search-icon')
    expect(icon).toBeInTheDocument()
    const input = screen.getByTestId('search-input')
    expect(input).toHaveAttribute('placeholder', 'Buscar usuário')
    expect(input).toHaveAttribute('aria-label', 'Buscar usuários do GitHub')
    fireEvent.change(input, { target: { value: 'john' } })
    expect(setSearch).toHaveBeenCalledWith('john')
  })
})
