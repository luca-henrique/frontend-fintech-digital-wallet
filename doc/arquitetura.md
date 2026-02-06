# Arquitetura e Gerenciamento de Estado

## Contextos (State Management)

A aplicação utiliza a Context API do React para gerenciar estados globais:

1.  **AuthContext**
    - Gerencia o estado de autenticação (logado/deslogado).
    - Fornece funções de `login` e `logout`.
    - Persiste o token (simulado) no LocalStorage/Session.

2.  **WalletContext**
    - Centraliza os dados financeiros do usuário.
    - Gerencia o saldo atual.
    - Mantém a lista de transações recentes.
    - Gerencia os cartões e chaves Pix.

3.  **ThemeContext**
    - Controla o tema da aplicação (Claro/Escuro).
    - Aplica classes do TailwindCSS no elemento `html` ou `body`.
    - Persiste a preferência do usuário.

4.  **NotificationContext**
    - Sistema de feedback visual (Toasts/Notificações) para sucesso ou erro em operações.

## Serviços (API Mock)

A camada de serviços (`src/services/api.ts`) atua como uma interface para dados simulados:

- **Mock Data**: Os dados reside em `src/constants/constants.ts` para garantir consistência durante os testes e desenvolvimento.
- **Simulação de Latência**: As funções da API incluem um `delay` artificial (ex: `await delay(500)`) para simular o tempo de resposta de uma rede real, permitindo testar estados de carregamento (loading states).

## Roteamento

Utiliza `react-router-dom` com a seguinte estrutura:

- **Rotas Públicas**: Login.
- **Rotas Privadas**: Todas as rotas internas são protegidas por um wrapper condicional que verifica `isLoggedIn` do `AuthContext`.
- **Layout**: Um layout persistente com `Sidebar` e `Header` envolve as rotas privadas.
