/**
 * @jest-environment jsdom
 */
import React, { useRef, useEffect } from "react"
import { render, screen } from "@testing-library/react"
import { ListUsers } from "./index"
import { FavoriteHook } from "@/hooks/favorite"
import { mockRepo, mockUser } from "__fixtures__/mockData"

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  return {
    ...originReact,
    useRef: jest.fn(),
  };
});
const mockUseRef = useRef as jest.MockedFunction<typeof useRef>

describe('ListUsers Section Component', () => {
  const props = {
    user: mockUser,
    loading: false,
    favoriteHooks: { isFavorited: jest.fn(() => true) } as any as FavoriteHook,
    loadMoreRepos: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("should render the list users section correctly", () => {
    const mRef = {
      current: {
        scrollTop: 0,
        scrollHeight: 1000,
        clientHeight: 500,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    }
    const mockUseRef = jest.spyOn(React, 'useRef').mockReturnValue(mRef)
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
    const mRef = { current: {} }
    mockUseRef.mockReturnValueOnce(mRef)
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
    const mRef = {
      current: {
        scrollTop: 0,
        scrollHeight: 1000,
        clientHeight: 500,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    }
    const mockUseRef = jest.spyOn(React, 'useRef').mockReturnValue(mRef)
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

  it('should attach and detach the scroll event listener', () => {
    const mRef = { current: {} }
    let addEventListenerSpy!: jest.SpyInstance;
    let removeEventListenerSpy!: jest.SpyInstance;
    Object.defineProperty(mRef, 'current', {
      get() {
        return this._current;
      },
      set(current) {
        if (current) {
          addEventListenerSpy = jest.spyOn(current, 'addEventListener');
          removeEventListenerSpy = jest.spyOn(current, 'removeEventListener');
        }

        this._current = current;
      },
    });
    mockUseRef.mockReturnValueOnce(mRef);
    const _props = {
      ...props,
      searchTerm: 'johndoe',
      repos: [mockRepo]
    }

    const { unmount } = render(<ListUsers {..._props} />)
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('should call loadMoreRepos when scrolling to the bottom', () => {
    let mockAddEventListener!: jest.SpyInstance;
    const mRef = {
      current: {
        scrollTop: 0,
        scrollHeight: 1000,
        clientHeight: 500,
      }
    }
    Object.defineProperty(mRef, 'current', {
      get() {
        return this._current;
      },
      set(current) {
        if (current) {
          mockAddEventListener = jest.spyOn(current, 'addEventListener');
        }

        this._current = current;
      },
    });
    mockUseRef.mockReturnValueOnce(mRef)
    const _props = {
      ...props,
      searchTerm: 'johndoe',
      repos: [mockRepo]
    }
    render(<ListUsers {..._props} />)

    mRef.current.scrollTop = 500
    const scrollHandler = mockAddEventListener.mock.calls[0][1]
    scrollHandler()

    expect(props.loadMoreRepos).toHaveBeenCalledTimes(1)
  })
})
