/**
 * @jest-environment jsdom
 */
import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { HeaderButton } from "./index"

describe('HeaderButton Component', () => {
  it("should render correctly", () => {
    const label = 'test'
    const handleClick = jest.fn()
    render(<HeaderButton label={label} onClick={handleClick}>Hello</HeaderButton>)
    const buttonText = screen.getByText('Hello')
    expect(buttonText).toBeInTheDocument()
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', label)
    expect(button).toHaveAttribute('aria-label', label)
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
