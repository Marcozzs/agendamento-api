# 📅 API de Agendamentos

Backend de uma API REST para gerenciamento de agendamentos, desenvolvida com **Node.js, TypeScript, Express, Prisma e PostgreSQL**.

Este projeto tem como objetivo fornecer uma estrutura de backend organizada para cadastro de usuários, gerenciamento de serviços e criação de agendamentos.

---

## 🚀 Tecnologias utilizadas

* **Node.js** — Ambiente de execução JavaScript no servidor.
* **TypeScript** — Tipagem estática para maior segurança e manutenção do código.
* **Express** — Framework para criação da API e gerenciamento de rotas.
* **Prisma ORM** — ORM utilizado para comunicação com o banco de dados.
* **PostgreSQL** — Banco de dados relacional.
* **Neon.tech** — Hospedagem do banco de dados PostgreSQL.
* **JWT (JSON Web Token)** — Autenticação baseada em tokens.
* **Bcrypt** — Hash seguro de senhas.
* **CORS** — Controle de requisições entre diferentes origens.
* **Dotenv** — Gerenciamento de variáveis de ambiente.
* **tsx** — Execução de arquivos TypeScript durante o desenvolvimento.

---

# ⚙️ Configuração do projeto

## 1. Inicialização do projeto

Inicialização do projeto Node.js:

```bash
npm init -y
```

### Instalação das dependências

Dependências de produção:

```bash
npm install express cors dotenv bcrypt jsonwebtoken
```

Dependências de desenvolvimento:

```bash
npm install -D typescript @types/express @types/node @types/cors @types/bcrypt @types/jsonwebtoken tsx
```

Inicialização do TypeScript:

```bash
npx tsc --init
```

---

# 🗄️ Configuração do Prisma

O **Prisma ORM** é utilizado para conectar a aplicação ao banco de dados PostgreSQL de forma tipada.

### Instalação

```bash
npm install -D prisma
npm install @prisma/client
```

Inicialização do Prisma com PostgreSQL:

```bash
npx prisma init --datasource-provider postgresql
```

Esse comando cria a pasta:

```text
prisma/
└── schema.prisma
```

Também é criado o arquivo `.env`, onde deve ser configurada a URL de conexão com o banco de dados.

Exemplo:

```env
DATABASE_URL="sua_string_de_conexao"
```

> ⚠️ O arquivo `.env` não deve ser enviado para o GitHub. Adicione-o ao `.gitignore`.

---

# 🗃️ Modelagem do banco de dados

O banco de dados utiliza três entidades principais:

* **User** — Usuários da aplicação.
* **Service** — Serviços disponíveis para agendamento.
* **Appointment** — Agendamentos realizados pelos usuários.

## Schema Prisma

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String        @id @default(uuid())
  name         String
  email        String        @unique
  passwordHash String
  role         String        @default("CLIENT")
  appointments Appointment[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Service {
  id              String        @id @default(uuid())
  name            String
  description     String?
  price           Float
  durationMinutes Int
  appointments    Appointment[]
  createdAt       DateTime      @default(now())
}

model Appointment {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  serviceId String
  service   Service  @relation(fields: [serviceId], references: [id], onDelete: Restrict)
  startTime DateTime
  endTime   DateTime
  status    String   @default("CONFIRMED")
  createdAt DateTime @default(now())
}
```

---

# 🔄 Migrações

Após configurar o `schema.prisma`, execute a migração inicial:

```bash
npx prisma migrate dev --name init
```

Para gerar os artefatos do Prisma Client:

```bash
npx prisma generate

🎯 Roteiro de Desenvolvimento (Fases & Funcionalidades)

🛠️ Fase 1 & 2: Setup, Arquitetura e Banco de Dados (Concluído)

Configuração do ambiente TypeScript, Express e Cors.
Integração e modelagem relacional via Prisma ORM com PostgreSQL (Neon.tech).
Execução das migrações iniciais e estruturação do projeto em camadas (`src/controllers`, `src/services`, `src/routes`, `src/lib`).

⚙️ Fase 3: Desenvolvimento do Backend (Em Andamento)

Passo 1: Autenticação & Cadastro de Usuários (Concluído)
- Criação da rota `POST /users` para registro de usuários.
- Implementação da criptografia de senhas utilizando o pacote `bcrypt` e sessões com `jsonwebtoken`.
- Validação de e-mails duplicados e retorno seguro de dados sem exposição de senhas.

Passo 2: Gestão de Serviços (Concluído)
- Criação completa do CRUD de serviços (`POST /services`, `GET /services`, `GET /services/:id`, `PUT /services/:id`, `DELETE /services/:id`).
- Organização do projeto em arquitetura em camadas (`Controllers`, `Services` e `Routes`).
- Integração validada e testada com sucesso no PostgreSQL hospedado na nuvem (Neon.tech).

Passo 3: Módulo de Agendamentos (Próximos Passos)
- Criação das rotas e regras de negócio para vincular usuários e serviços em datas e horários específicos.
- Implementação de validações de conflito de horário para impedir reservas simultâneas no mesmo período.
- Criação de endpoints para listagem de agendamentos por usuário e cancelamento de reservas.
- Proteção de rotas utilizando o middleware de autenticação JWT para garantir que apenas usuários logados realizem agendamentos.
