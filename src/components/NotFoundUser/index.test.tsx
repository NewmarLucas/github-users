/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, screen } from "@testing-library/react"
import { NotFoundUser } from "./index"

describe('NotFoundUser Component', () => {
  it("should render correctly and show the props 'searchTerm'", () => {
    render(<NotFoundUser searchTerm="test" />)
    const searchTerm = screen.getByTestId('search-term')
    const title = screen.getByText('Nenhum usuário encontrado')
    const paragraph = screen.getByText('Verifique se a escrita está correta ou tente novamente')
    expect(searchTerm).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
  })
})
