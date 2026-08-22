<div align="center">
  <img src="src/assets/images/logo.png" alt="X-Streamers Logo" width="150" />
  <h1>X-Streamers</h1>
  <p>Aplicação interativa para explorar e acompanhar seus streamers favoritos do Chess.com.</p>
</div>

## 🚀 Sobre o Projeto

O **X-Streamers** é uma plataforma dedicada a entusiastas do xadrez que desejam acompanhar a atividade de seus streamers favoritos. A aplicação consome a API pública do Chess.com para fornecer dados em tempo real sobre status, perfil e plataformas de transmissão dos jogadores.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Frontend**: [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Roteamento**: [React Router](https://reactrouter.com/)
- **Estilização**: Vanilla CSS (com abordagem mobile-first)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Gerenciamento de Código**: ESLint & Prettier

## ✨ Funcionalidades

- **Dashboard Principal**: Lista todos os streamers, com filtros para exibir apenas aqueles online ou offline.
- **Busca Avançada**: Permite encontrar qualquer jogador do Chess.com pelo seu *username*, exibindo um perfil detalhado.
- **Perfil Completo**: Exibe informações como avatar, status, seguidores, plataformas de transmissão, links para Twitch e Chess.com.
- **Modo Dark/Light**: Alternância de tema com preferência automática baseada no sistema do usuário.
- **Responsividade**: Layout otimizado para dispositivos móveis, tablets e desktops (Mobile-first).

## ⚙️ Como Configurar o Ambiente

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (v20+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd x-streamers
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   Abra `http://localhost:5173` (ou o endereço indicado no terminal).

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Verifica erros de sintaxe e estilo com ESLint.
- `npm run lint:fix`: Corrige erros de sintaxe e estilo com ESLint.
- `npm run format`: Formata o código com Prettier.
- `npm run format:check`: Verifica se o código está formatado com Prettier.

---
Feito com 💜 e ☕ por **[Álisson](https://github.com/romaosantosalisson)**
