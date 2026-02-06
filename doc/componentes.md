# Componentes e Design System

A estrutura de componentes segue o padrão **Atomic Design**, organizando os elementos de interface em níveis hierárquicos de complexidade.

## Estrutura de Pastas (`src/components/`)

- **atoms/**: Componentes básicos e indivisíveis (Botões, Inputs, Labels).
- **molecules/**: Grupos de átomos operando juntos (Campos de formulário com label, Cards simples).
- **organisms/**: Combinações complexas de moléculas e átomos (Formulários completos, Tabelas de dados).
- **templates/**: Estruturas de página que definem o layout do conteúdo.
- **shared/**: Componentes utilitários compartilhados.

## Componentes Principais

### Estruturais

- **Sidebar**: Barra de navegação lateral responsiva. Contém o status do usuário e links de navegação.
- **Header**: Cabeçalho superior, contém o botão de toggle do menu (mobile) e informações de contexto.

### Funcionais

- **TradingViewWidget**: Widget integrado para exibição de gráficos de criptomoedas.
- **NotificationCenter**: Central de notificações do sistema.
