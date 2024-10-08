import { Repo, User } from "@/hooks/users";

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  login: 'johndoe',
  avatarUrl: 'https://example.com/avatar.jpg',
  bio: 'Bio example',
};

export const mockRepo: Repo = {
  id: 'repo1',
  name: 'Repo 1',
  description: 'Description for Repo 1',
  url: 'https://github.com/johndoe/repo1',
  updatedAt: '2024-01-01T00:00:00Z',
  primaryLanguage: {
    name: 'JavaScript',
    color: '#f1e05a',
  },
};

export const mockRepoPage2: Repo = {
  id: 'repo2',
  name: 'Repo 2',
  description: 'Description for Repo 2',
  url: 'https://github.com/johndoe/repo2',
  updatedAt: '2024-01-01T00:00:00Z',
  primaryLanguage: {
    name: 'JavaScript',
    color: '#f1e05a',
  },
}
