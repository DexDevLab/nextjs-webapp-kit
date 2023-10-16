<div align="center">

<!-- <img src="/resources/thumb.png" height='450px' width='750px' alt="Print"> -->

</div>

<h1 align="center">NextJS Webapp Kit</h1>
<p align=center><i align="center">Kit básico de uma aplicação web ajustável e configurável para atender preferências específicas</i></p>

<br>

<div align="center">

<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white" height="22" alt="NextJS"/></a> <a href="https://chakra-ui.com"><img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?logo=chakraui&logoColor=white" height="22" alt="ChakraUI"/></a> <a href="https://www.prisma.io"><img src="https://img.shields.io/badge/Prisma-3982CE?logo=Prisma&logoColor=white" height="22" alt="PrismaIO"/></a> <a href="https://www.sqlite.org/index.html"><img src="https://img.shields.io/badge/SQLite-%2307405e.svg?logo=sqlite&logoColor=white" height="22" alt="SQLite"/></a> <a href="https://www.microsoft.com/pt-br/sql-server/sql-server-2019"><img src="https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?logo=microsoft%20sql%20server&logoColor=white" height="22" alt="MSSQLServer"/></a>

<a href=""><img src="https://img.shields.io/badge/maintenance-actively--developed-brightgreen.svg" height="22" alt="Maintenance-actively-developed"/></a> <a href=""><img src="https://img.shields.io/github/last-commit/dexdevlab/nextjs-webapp-kit" height="22" alt="LastCommit"></a> <a href=""><img src="https://snyk.io/test/github/dexdevlab/nextjs-webapp-kit/badge.svg" height="22" alt="Snyk"/></a>

<a href=""><img src="https://img.shields.io/github/repo-size/dexdevlab/nextjs-webapp-kit" height="22" alt="RepoSize"/></a> <a href=""><img src="https://img.shields.io/github/languages/code-size/dexdevlab/nextjs-webapp-kit" height="22" alt="CodeSize"/></a> <a href=""><img src="https://img.shields.io/github/contributors/dexdevlab/nextjs-webapp-kit" height="22" alt="Contributors"></a>

<a href=""><img src="https://img.shields.io/github/forks/dexdevlab/nextjs-webapp-kit" height="22" alt="Fork"></a> <a href=""><img src="https://img.shields.io/github/release/dexdevlab/nextjs-webapp-kit.svg" height="22" alt="LatestRelease"></a> <a href="https://github.com/dexdevlab/nextjs-webapp-kit/blob/main/LICENSE"><img src="https://img.shields.io/github/license/dexdevlab/nextjs-webapp-kit" height="22" alt="License"></a>

|| [Conteúdo](#section-conteudo) || [Características](#section-caracteristicas) || [Stack](#section-stack) || [Documentação](#section-documentacao) || [Instruções](#section-instrucoes) ||

|| [Variáveis de Ambiente](#section-vars) || [Notas de versão](#section-changelog) || [Autores](#section-autores) || [Contato](#section-contato) || [Licença](#section-licenca) ||

</div>

<hr>

<a name="section-conteudo">

## Conteúdo

</a>

Este projeto tem como objetivo facilitar a construção de aplicações web de uso geral, com recursos comuns e simples, facilmente ajustáveis através de um arquivo de configuração ajustável.

<hr>

<a name="section-caracteristicas">

## Características

</a>

- Contém os recursos comuns mais atualizados em aplicações NextJS Backend e ReactJS + ChakraUI no Backend, além de funcionalidades de Bancos de Dados

- Quase todas as customizações podem ser realizadas de maneira simples, modificando o
arquivo de configuração do webapp

- Pode ser implantado via Docker

<hr>

<a name="section-stack">

## Stack

</a>

- **Linguagem Principal:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Linguagens de Marcação e Estilo:** [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), [SASS](https://sass-lang.com/documentation)
- **Framework Principal:** [Node.js](https://nodejs.org/en/docs/)
- **Framework estrutural:** [Next.js](https://nextjs.org/docs/getting-started)
- **Design System:** [Chakra UI](https://chakra-ui.com/docs/getting-started)
- **Biblioteca de Conexão ODBC / ORM:** [Prisma.io](https://www.prisma.io)
- **Banco de Dados:** [SQL](https://pt.wikipedia.org/wiki/SQL), [SQLite](https://www.sqlite.org/index.html)
- **Gerenciador de Dependências:** [Yarn](https://yarnpkg.com/getting-started)
- **Bibliotecas:** Para uma lista completa de bibliotecas e dependências nos mais variados escopos, conferir o arquivo [package.json](https://github.com/dexdevlav/nextjs-webapp-kit/blob/main/package.json).

<hr>

<a name="section-documentacao">

## Documentação

</a>

Documentação adicional pode ser encontrada [aqui](https://dexdevlab.github.io/nextjs-webapp-kit/).

<hr>

<a name="section-instrucoes">

## Instruções

</a>

### Utilizando o repositório como projeto

1 - Faça um git clone ou o download do repositório, da forma que preferir

```bash

git clone https://github.com/dexdevlab/nextjs-webapp-kit.git

```

2 - Instale um gerenciador de pacotes (preferencialmente yarn) utilizando um terminal no diretório raiz do repositório clonado

`yarn` ou `npm install`

3 - Execute a aplicação no terminal

`yarn dev` ou `npm run dev`

### Implantando o projeto

#### Por um repositório clonado

**Lembre-se de executar `yarn build` ANTES de criar seu container com base no repositório local.**

Para criar a imagem, utilize o `docker build` referenciando o arquivo local do [Dockerfile](https://github.com/dexdevlab/nextjs-webapp-kit/blob/main/Dockerfile):

```bash
docker build --env-file .env -f Dockerfile .
```

#### Diretamente do repositório remoto

Você pode utilizar o `docker build` referenciando diretamente o repositório:

```bash
docker build https://github.com/dexdevlab/nextjs-webapp-kit.git#main
```

Alternativamente, pode usar o comando detalhado para alterar diretamente configurações como porta e nome do repositório:

```bash
docker run -p X:3000 --env-file .env -e github='https://github.com/dexdevlab/nextjs-webapp-kit.git' -it dexdevlab/nextjs-webapp-kit
```

**Lembre-se de criar um arquivo `.env` para definir as variáveis de ambiente utilizadas na imagem, ou especificar as variáveis utilizadas uma a uma na linha de comando acima.**

Onde "X" é uma porta externa de sua escolha. Por padrão, a porta interna é 3000.
Para alterar a porta interna, altere a linha `ENV PORT` do [Dockerfile](https://github.com/dexdevlab/nextjs-webapp-kit/blob/main/Dockerfile).

Para mais informações, visite a [Documentação do Docker](https://docs.docker.com).

### Customizando a aplicação

No diretório `utils`, configure o arquivo `webappconfig.js` conforme desejar para alterar ou incluir funcionalidades. Lembre-se de modificar as informações contidas nele ANTES de realizar modificações de deployment (build, docker build etc).

<a name="section-vars">

### Variáveis de Ambiente

</a>

| Variável      | Uso   |
|---------------|-------|
|`DATABASE_URL` | Define o endereço do Servidor de BD e credenciais para acesso, de acordo com as especificações da biblioteca [Prisma.io](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-sqlserver). Essa variável funciona APENAS se definido 'SQL' como 'Database' no arquivo de configurações. | |
|`NEXTAUTH_SECRET` | Hash JWT para criptografar o token de conexão (preferencialmente um hash acima de 32 caracteres). | |
|`NEXTAUTH_URL` | Endereço externo da aplicação. (Por exemplo: `http://website.company.com`) | |
|`NEXTAUTH_URL_INTERNAL` | Endereço interno da aplicação. (Por exemplo: `http://localhost:3000`) | |

<a name="section-changelog">

## Notas de versão

</a>

### v0.0.2-231016

- Criação de componente de ícone customizado para adaptação aos Componentes nativos do ChakraUI
- Criação de componente e handlers de animação de sidebar e barra para mobile
- Ajuste e componentização de itens de menu para sidebar e navbar
- Ajuste no componente de hyperlink
- Criação de middleware para manipulação de headers CORS em aplicações backend
- Criação do serviço de API para pré-configurar rotas API
- Remoção da API de exemplo
- Criação da barra de busca e API de exemplo para buscas, com controller

### v0.0.1-230929

Commit inicial:

- Criação de componentes básicos
- Criação de ajustes customizáveis dos toasts
- Ajustes de autenticação e modelo de autenticação simples baseado em arquivo
- Criação de tela de login
- Criação da Navbar
- Criação de ajuste de temas e configuração de modo claro/escuro
- Criação de animações e transições de componentes
- Criação do README

<a name="section-autores">

## Autores

</a>

<a href="https://github.com/dexdevlab/nextjs-webapp-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dexdevlab/nextjs-webapp-kit" />
</a>

<a name="section-contato">

## Contato

</a>

Se você gostou deste projeto, dê uma <a href="https://github.com/dexdevlab/nextjs-webapp-kit" data-icon="octicon-star" aria-label="Star dexdevlab/nextjs-webapp-kit on GitHub">estrela</a>.
Para entrar em contato, me envie um <a href="mailto:dex.houshi@hotmail.com">email</a>.

<a name="section-licenca">

## Licença

</a>

Licenciado sob a [MIT License](https://github.com/dexdevlab/nextjs-webapp-kit/blob/main/LICENSE).
