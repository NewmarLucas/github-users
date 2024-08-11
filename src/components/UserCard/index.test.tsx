/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, screen } from "@testing-library/react"
import { UserCard } from "./index"

describe('UserCard Component', () => {
  const user = {
    id: '1',
    name: 'john doe',
    login: 'johndoe',
    avatarUrl: 'https://img.png',
    bio: 'Hello world!',
  }

  it("should render the user data correctly", () => {
    render(<UserCard user={user} />)
    const avatar = screen.getByTestId('user-avatar')
    const name = screen.getByTestId('user-name')
    const login = screen.getByTestId('user-login')
    const bio = screen.getByTestId('user-bio')
    expect(avatar).toHaveAttribute('alt', `Avatar do usuário ${user.login}`)
    expect(avatar).toHaveAttribute('src', user.avatarUrl)
    expect(name).toHaveTextContent(user.name)
    expect(login).toHaveTextContent(`@${user.login}`)
    expect(bio).toHaveTextContent(user.bio)
  })
})
