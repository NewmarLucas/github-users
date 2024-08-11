/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, screen } from "@testing-library/react"
import { LoadingWrapper } from "./index"

describe('LoadingWrapper Component', () => {
  it("should render the loading page when isLoading is true", () => {
    render(<LoadingWrapper isLoading={true}><p>test</p></LoadingWrapper>)
    const loadingImage = screen.getByTestId('loading-img')
    const paragraph = screen.queryByText('test')
    expect(loadingImage).toBeInTheDocument()
    expect(paragraph).not.toBeInTheDocument()
  })

  it('should render the children when isLoading is false', () => {
    render(<LoadingWrapper isLoading={false}><p>test</p></LoadingWrapper>)
    const loadingImage = screen.queryByTestId('loading-img')
    const paragraph = screen.getByText('test')
    expect(loadingImage).not.toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
  })
})
