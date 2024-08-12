/**
 * @jest-environment jsdom
 */
import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { NavigationTab } from "./index"

describe('NavigationTab Component', () => {
  it("should render correctly", () => {
    const label = 'test'
    const handleClick = jest.fn()
    const { rerender } = render(
      <NavigationTab
        label={label}
        onClick={handleClick}
        isSelected
        icon={<span data-testid='icon' />}
      />
    )
    const button = screen.getByTestId(`button-${label}`)
    expect(button).toHaveAttribute('aria-label', `Ver ${label}`)
    expect(button).toHaveAttribute('title', `Ver ${label}`)
    expect(button).toHaveClass('bg-primary text-white')

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)

    rerender(
      <NavigationTab
        label={label}
        onClick={handleClick}
        isSelected={false}
        icon={<span data-testid='icon' />}
      />
    )
    const buttonUnselected = screen.getByTestId(`button-${label}`)
    expect(buttonUnselected).toHaveClass('text-placeholder hover:bg-matte')
  })
})
