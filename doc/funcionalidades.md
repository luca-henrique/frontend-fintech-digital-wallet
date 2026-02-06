# Funcionalidades Disponíveis

Este documento detalha as funcionalidades implementadas na aplicação Frontend Fintech Digital Wallet.

## 1. Autenticação e Segurança

- **Login Simulado**: Acesso à plataforma através de uma página de login.
- **Proteção de Rotas**: Redirecionamento automático para login se o usuário não estiver autenticado (`AuthContext`).
- **Ocultar IP**: Funcionalidade dedicada para privacidade e segurança do usuário (`/hide-ip`).

## 2. Dashboard

- **Visão Geral**: Exibição do saldo total em Reais (BRL).
- **Atalhos Rápidos**: Botões de acesso rápido para as principais operações.
- **Resumo**: Visualização simplificada das últimas atividades.

## 3. Gestão de Pix

- **Chaves Pix**: Gerenciamento de chaves Pix (`/pix-keys`). Lista chaves cadastradas (CPF, Email, Telefone, Aleatória).
- **Cartão para Pix**: Funcionalidade para realizar pagamentos Pix utilizando limite do cartão de crédito (`/card-to-pix`).

## 4. Criptomoedas

- **Carteiras Crypto**: Visualização de carteiras de criptomoedas (`/wallets`), incluindo Bitcoin e USDT.
- **Conversão de Saldo**: Compra de criptomoedas utilizando o saldo em conta (`/buy-crypto`).
- **Cotações**: Exibição de cotações em tempo real (simuladas) para Bitcoin e outros ativos.

## 5. Gestão de Cartões

- **Meus Cartões**: Visualização de cartões de crédito salvos na conta.
- **Teste de Cartão**: Página utilitária para testar interações com cartões (`/test-card`).

## 6. Histórico e Relatórios

- **Histórico de Transações**: Lista completa de todas as operações financeiras realizadas (entradas e saídas) (`/history`).

## 7. Configurações e Utilitários

- **Perfil do Usuário**: Visualização e edição de dados do perfil (`/profile`).
- **Localização**: Funcionalidade baseada em localização (`/location`).
- **Temas**: Suporte a **Light Mode** e **Dark Mode** com persistência de preferência (`ThemeContext`).
- **Menu Lateral e Header**: Navegação responsiva e interativa.
