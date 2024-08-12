/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from './route'
import { graphql } from '@octokit/graphql'

const mockSuccessResponse = {
  search: {
    edges: [
      {
        node: {
          id: '1',
          name: 'John Doe',
          login: 'johndoe',
          avatarUrl: 'https://example.com/avatar.jpg',
          bio: 'Bio example',
          repositories: {
            edges: [
              {
                node: {
                  id: 'repo1',
                  name: 'Repo 1',
                  description: 'Description for Repo 1',
                  url: 'https://github.com/johndoe/repo1',
                  updatedAt: '2024-01-01T00:00:00Z',
                  primaryLanguage: {
                    name: 'JavaScript',
                    color: '#f1e05a',
                  },
                },
              },
            ],
            pageInfo: {
              endCursor: null,
              hasNextPage: false,
            }
          },
        },
      },
    ],
  },
}

jest.mock('@octokit/graphql', () => {
  const graphqlMock = jest.fn();
  const defaultsMock = jest.fn().mockReturnValue(graphqlMock);

  return {
    graphql: {
      defaults: defaultsMock
    }
  };
});

const mockedDefaults = (graphql.defaults as jest.MockedFunction<typeof graphql.defaults>);
const mockedGraphql = (graphql.defaults as jest.MockedFunction<typeof graphql.defaults>).mock.results[0].value as jest.MockedFunction<typeof graphql>;

describe('GET /api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return user data when search parameter is provided', async () => {
    mockedDefaults.mockReturnValueOnce(mockedGraphql);
    mockedGraphql.mockResolvedValueOnce(mockSuccessResponse);

    const req = new NextRequest('http://localhost/api/users?search=johndoe')
    const res = await GET(req)

    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toEqual({
      id: '1',
      name: 'John Doe',
      login: 'johndoe',
      avatarUrl: 'https://example.com/avatar.jpg',
      bio: 'Bio example',
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
      repositories: [
        {
          id: 'repo1',
          name: 'Repo 1',
          description: 'Description for Repo 1',
          url: 'https://github.com/johndoe/repo1',
          updatedAt: '2024-01-01T00:00:00Z',
          primaryLanguage: {
            name: 'JavaScript',
            color: '#f1e05a',
          },
        },
      ],
    })
  })

  it('should return 404 when user is not found', async () => {
    mockedGraphql.mockResolvedValue({
      search: { edges: [] },
    });

    const req = new NextRequest('http://localhost/api/users?search=unknownuser')
    const res = await GET(req)

    expect(res.status).toBe(404)

    const json = await res.json()
    expect(json).toEqual({ success: false, error: 'User not found' })
  })

  it('should return 500 when request error', async () => {
    mockedGraphql.mockRejectedValue(new Error('GraphQL Error'));

    const req = new NextRequest('http://localhost/api/users?search=johndoe')
    const res = await GET(req)

    expect(res.status).toBe(500)

    const json = await res.json()
    expect(json).toEqual({ success: false, error: 'An error occurred' })
  })

  it('should return 422 when search parameter is missing', async () => {
    const req = new NextRequest('http://localhost/api/users')
    const res = await GET(req)

    expect(res.status).toBe(422)

    const json = await res.json()
    expect(json).toEqual({ success: false })
  })
})
