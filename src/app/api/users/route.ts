import { NextRequest, NextResponse } from 'next/server'
import { graphql } from '@octokit/graphql'

interface RepositoryNode {
  node: {
    id: string;
    name: string;
    description: string;
    url: string;
    updatedAt: string;
    primaryLanguage: {
      name: string;
      color: string;
    };
  };
}

interface UserNode {
  node: {
    id: string;
    name: string;
    login: string;
    avatarUrl: string;
    bio: string;
    repositories: {
      edges: RepositoryNode[];
    };
  };
}

interface GraphQLResponse {
  search: {
    edges: UserNode[];
  };
}

const githubAccessToken = String(process.env.GITHUB_ACCESS_TOKEN)
const ghGraphql = graphql.defaults({
  headers: {
    authorization: `token ${githubAccessToken}`
  }
})

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const search = url.searchParams.get('search')
  if (!search) {
    return new Response(JSON.stringify({ success: false }), {
      status: 422
    })
  }

  const query = `
    query($search: String!) {
      search(query: $search, type: USER, first: 1) {
        edges {
          node {
            ... on User {
              id
              name
              login
              avatarUrl
              bio
              repositories(last: 100, ownerAffiliations: OWNER) {
                edges {
                  node {
                    id
                    name
                    description
                    url
                    updatedAt
                    primaryLanguage {
                      name
                      color
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const params = { 'search': search }

  try {
    const response = await ghGraphql<GraphQLResponse>(query, params)
    const user = response?.search?.edges?.filter(
      user =>
        user.node.name?.toLowerCase() === search.toLowerCase() ||
        user.node.login?.toLowerCase() === search.toLowerCase()
    )?.at(0);
    if (user) {
      const formattedResponse = {
        id: user.node.id,
        name: user.node.name,
        login: user.node.login,
        avatarUrl: user.node.avatarUrl,
        bio: user.node.bio,
        repositories: user.node.repositories?.edges?.map((repo: any) => ({ ...repo?.node })),
      }

      return new NextResponse(JSON.stringify(formattedResponse), {
        status: 200,
      })
    }
    return new NextResponse(JSON.stringify({ success: false, error: 'User not found' }), {
      status: 404,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ success: false, error: 'An error occurred' }), {
      status: 500,
    })
  }
}
