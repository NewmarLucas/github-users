# GitHub User Search App

Este projeto é uma aplicação Next.js que permite pesquisar usuários do GitHub, visualizar seus repositórios e salvar repositórios como favoritos. A aplicação utiliza GraphQL para buscar os dados necessários e IndexedDB para persistir os favoritos no navegador. 

## Funcionalidades

- **Pesquisa de Usuários**: Pesquise por usuários do GitHub utilizando um campo de busca. Os dados são buscados via GraphQL e retornam informações como nome, login, avatar, bio e repositórios.
  
- **Favoritos**: Salve repositórios como favoritos. Os favoritos são persistidos no IndexedDB, permitindo que eles sejam mantidos mesmo após recarregar a página.

- **Navegação por Abas**: A aplicação possui uma aba de favoritos onde você pode visualizar todos os repositórios que marcou como favoritos.

- **API Route**: A aplicação utiliza uma API route para buscar dados do GitHub, protegendo a chave de acesso ao GitHub.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor e criação de rotas.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **GraphQL**: Usado para consultar os dados do GitHub e retornar apenas as informações necessárias.
- **IndexedDB**: Banco de dados local utilizado para persistir os dados de favoritos.
- **Yarn**: Gerenciador de pacotes utilizado no projeto.
- **TypeScript**: Linguagem de programação utilizada para adicionar tipagem ao JavaScript.
- **Jest**: Framework de testes JavaScript utilizado nos testes unitários dos principais componentes e funcionalidades.

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Yarn

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/NewmarLucas/github-users.git
   cd github-users
   ```

2. **Instale as dependências:**

   ```bash
   yarn install
   ```

3. **Configuração do Ambiente:**

   Crie um arquivo `.env` na raiz do projeto e adicione a sua chave de acesso ao GitHub (você pode duplicar o arquivo `.env.example` e tirar o `.example`):

   ```
   GITHUB_ACCESS_TOKEN='your_github_access_token'
   ```

   Substitua `your_github_access_token` pela sua chave pessoal do GitHub. Isso é necessário para fazer as requisições à API do GitHub.

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   yarn dev
   ```

5. **Acesse a aplicação:**

   Abra o navegador e acesse `http://localhost:3000`.

## Estrutura do Projeto

- **/components**: Contém os componentes reutilizáveis da aplicação, como o campo de busca, botões, e ícones.
- **/hooks**: Contém hooks personalizados utilizados para gerenciar o estado da aplicação.
- **/app**: Contém as páginas da aplicação e as rotas da API.
- **/utils**: Contém funções utilitárias, como debounce e formatadores.
- **/public**: Contém arquivos estáticos.

## Testes

Os testes foram escritos utilizando Jest e React Testing Library. Para rodar os testes, utilize o comando:

```bash
yarn test
```

## Considerações Finais

Este projeto foi criado para demonstrar como construir uma aplicação Next.js que integra com a API do GitHub e utiliza persistência de dados no navegador. Ele inclui uma estrutura de código limpa e organizada, bem como testes para garantir a funcionalidade do código.

---

Você pode ajustar conforme necessário para melhor refletir seu projeto e suas preferências.