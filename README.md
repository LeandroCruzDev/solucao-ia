# Solução IA - Aplicação de Simulação Financeira (Em Andamento)

## Visão Geral do Projeto

Bem-vindo ao **Solução IA**, uma aplicação de simulação financeira projetada para fornecer ferramentas intuitivas para que os usuários modelem e compreendam vários cenários financeiros. Este projeto está atualmente em desenvolvimento ativo, servindo como uma vitrine para práticas modernas de desenvolvimento web e uma plataforma para explorar conceitos avançados de modelagem financeira.

## Status do Projeto

**Em Desenvolvimento Ativo**: Esta aplicação está em seus estágios iniciais. Estou ativamente construindo as funcionalidades centrais, refinando a interface do usuário e implementando integrações robustas de backend (quando aplicável). Embora funcional, espere atualizações e melhorias frequentes.

Meu foco atual inclui:

- Desenvolvimento de um formulário multi-etapas para entrada detalhada de dados financeiros.
- Implementação de cálculo em tempo real e visualização dos resultados da simulação.
- Garantia de uma experiência de usuário responsiva e acessível.

## Tecnologias Chave e Stack

Este projeto utiliza uma stack de desenvolvimento web moderna:

- **Frontend**: React (com Vite)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Roteamento**: React Router
- **Gerenciamento de Estado**: (A ser determinado/implementado, ex: React Context API, Zustand, Redux)
- **Outras Ferramentas**: ESLint, Prettier

## Funcionalidades (Planejadas e Em Andamento)

- **Formulários Financeiros Interativos**: Entrada guiada para vários parâmetros financeiros.
- **Histórico de Simulações**: Listagem salva no navegador com acesso rápido às simulações anteriores.
- **Chat dentro do histórico**: Conversa com IA usando os dados da simulação atual como contexto.
- **Resultados de Simulação Dinâmicos**: Feedback e projeção em tempo real com base na entrada do usuário.
- **Visualização de Dados**: Gráficos para ilustrar os resultados financeiros.
- **Autenticação de Usuário**: Login seguro de usuário e persistência de dados. (Futuro)
- **Integração de API**: Conexão com fontes de dados financeiros externas. (Futuro)

## Por Que Este Projeto?

Este projeto é uma iniciativa pessoal para:

- Aprofundar minha experiência em React e TypeScript construindo uma aplicação prática e orientada a dados.
- Explorar as melhores práticas em design de UI/UX para formulários complexos e apresentação de dados.
- Demonstrar minha capacidade de arquitetar e implementar uma aplicação web completa do zero.
- Enfrentar problemas desafiadores em modelagem financeira e apresentá-los de forma compreensível.

## Começando

Siga estas instruções para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20.x ou superior)
- [pnpm](https://pnpm.io/installation)

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/solucaoia.git
    cd solucaoia
    ```

    _(Substitua `seu-usuario` pelo nome de usuário correto do GitHub se for o caso.)_

2.  **Instale as dependências:**

    Execute o seguinte comando para instalar todas as dependências do projeto com `pnpm`:

    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**

    Este projeto utiliza a API do Google Gemini para fornecer insights financeiros com inteligência artificial. Para que a aplicação funcione corretamente, você precisa configurar sua chave de API.

    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione a seguinte linha ao arquivo `.env`, substituindo `SUA_CHAVE_API_AQUI` pela sua chave real do Google Gemini:

    ```
    VITE_GEMINI_API_KEY=SUA_CHAVE_API_AQUI
    ```

    > **Nota**: Você pode obter uma chave de API gratuita para o Gemini no [Google AI Studio](https://aistudio.google.com/app/apikey).

### Executando a Aplicação

Após a instalação e configuração, inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173` (ou em outra porta, se a 5173 estiver em uso).

## Conecte-se Comigo

Estou sempre aberto a discutir este projeto, oportunidades potenciais ou desenvolvimento de software em geral.

- **LinkedIn**: [Seu URL do Perfil do LinkedIn] _(Por favor, substitua pelo seu URL real do perfil do LinkedIn)_
- **GitHub**: [Seu URL do Perfil do GitHub] _(Por favor, substitua pelo seu URL real do perfil do GitHub)_

---

Este `README.md` evoluirá à medida que o projeto avança. Fique atento às atualizações!
