# Barber Shop Management System

Sistema completo para gerenciamento de barbearias, permitindo agendamentos, gestão de clientes, serviços e muito mais.

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **[Next.js 15](https://nextjs.org/)**: Framework React com renderização híbrida
- **[React 19](https://react.dev/)**: Biblioteca para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado de JavaScript
- **[TailwindCSS](https://tailwindcss.com/)**: Framework CSS utilitário
- **[Drizzle ORM](https://orm.drizzle.team/)**: ORM para bancos de dados SQL
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional
- **[React Query](https://tanstack.com/query)**: Biblioteca para gerenciamento de estado de dados
- **[Radix UI](https://www.radix-ui.com/)**: Biblioteca de componentes primitivos acessíveis
- **[Zod](https://zod.dev/)**: Biblioteca de validação de esquemas
- **[React Hook Form](https://react-hook-form.com/)**: Biblioteca para gerenciamento de formulários
- **[Mercado Pago](https://www.mercadopago.com.br/)**: Integração para pagamentos
- **[Resend](https://resend.com/)**: Serviço para envio de emails
- **[UploadThing](https://uploadthing.com/)**: Serviço para upload de arquivos
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para animações
- **[PNPM](https://pnpm.io/)**: Gerenciador de pacotes eficiente

## 📁 Estrutura do Projeto

```
src/
├── app/                   # Páginas e rotas da aplicação
│   ├── (public)/          # Rotas públicas
│   ├── (private)/         # Rotas privadas (autenticadas)
│   └── api/               # Rotas de API
├── components/            # Componentes React reutilizáveis
│   └── ui/                # Componentes de UI básicos
├── db/                    # Configuração e esquemas do banco de dados
├── enum/                  # Enumerações e constantes
├── hooks/                 # React hooks personalizados
├── lib/                   # Funções utilitárias e configuração de bibliotecas
├── server/                # Lógica do servidor e API routes
├── templates/             # Templates de email
└── utils/                 # Funções utilitárias gerais
```

## 🏗️ Arquitetura

O projeto segue a arquitetura do Next.js App Router com um sistema híbrido de renderização:

- **Server Components**: Para componentes que não precisam de interatividade do cliente
- **Client Components**: Para componentes com interatividade e estado
- **API Routes**: Para endpoints de API
- **Route Handlers**: Para manipulação de rotas específicas

A aplicação utiliza autenticação com `better-auth` e possui um sistema de controle de acesso baseado em perfis de usuário.

O banco de dados PostgreSQL é acessado através do Drizzle ORM, que fornece uma API type-safe para consultas e migrações.

## 🔧 Configuração e Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure as variáveis de ambiente em um arquivo `.env.local`
4. Execute as migrações do banco de dados:
   ```bash
   pnpm db:migrate
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## 🐳 Docker

O projeto inclui um arquivo `docker-compose.yaml` para facilitar o desenvolvimento com containers:

```bash
docker-compose up -d
```

## 📊 Funcionalidades

- Agendamento de serviços
- Gestão de clientes
- Controle de estoque
- Relatórios financeiros
- Perfis de barbearias
- Integração de pagamentos
- Sistema de notificações
- Dashboard administrativo
- Perfis de usuários (admin, barbeiro, cliente)

## 🧪 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Construir para produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Linting do código
pnpm lint

# Gerenciar banco de dados
pnpm db:generate   # Gerar migrations
pnpm db:migrate    # Executar migrations
pnpm db:push       # Aplicar schema
pnpm db:studio     # Interface visual para DB
```
