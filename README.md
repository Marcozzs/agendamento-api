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
```

---

# ▶️ Executando o projeto

Após instalar as dependências e configurar o banco de dados, execute o servidor em modo de desenvolvimento:

```bash
npm run dev
```

---

# 📁 Estrutura do projeto

O backend segue uma arquitetura organizada em camadas:

```text
agendamento-api/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── lib/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### Responsabilidade das camadas

**Controllers**

Responsáveis por receber as requisições HTTP e retornar as respostas.

**Services**

Contêm as regras de negócio da aplicação.

**Routes**

Definem os endpoints disponíveis na API.

**Lib**

Contém configurações e recursos compartilhados pela aplicação.

---

# 🎯 Roadmap de desenvolvimento

## 🛠️ Fases 1 e 2 — Setup, arquitetura e banco de dados

**Status: ✅ Concluído**

* [x] Configuração do Node.js
* [x] Configuração do TypeScript
* [x] Configuração do Express
* [x] Configuração do CORS
* [x] Configuração do Prisma ORM
* [x] Integração com PostgreSQL
* [x] Configuração do banco no Neon.tech
* [x] Modelagem inicial do banco de dados
* [x] Execução das migrações
* [x] Estruturação da arquitetura em camadas
* [x] Criação das pastas `controllers`, `services`, `routes` e `lib`

---

# ⚙️ Fase 3 — Desenvolvimento do Backend

**Status: 🚧 Em andamento**

## 🔐 Passo 1 — Autenticação e cadastro de usuários

**Status: ✅ Concluído**

* [x] Criação da rota `POST /users`
* [x] Cadastro de usuários
* [x] Hash de senhas utilizando `bcrypt`
* [x] Implementação de autenticação utilizando JWT
* [x] Validação de e-mails duplicados
* [x] Retorno seguro dos dados dos usuários
* [x] Proteção das senhas no retorno da API

---

## 🛠️ Passo 2 — Gestão de serviços

**Status: ✅ Concluído**

Implementação do CRUD completo de serviços:

| Método   | Endpoint        | Descrição             |
| -------- | --------------- | --------------------- |
| `POST`   | `/services`     | Criar um serviço      |
| `GET`    | `/services`     | Listar serviços       |
| `GET`    | `/services/:id` | Buscar serviço por ID |
| `PUT`    | `/services/:id` | Atualizar serviço     |
| `DELETE` | `/services/:id` | Excluir serviço       |

Além disso:

* [x] Organização em Controllers, Services e Routes
* [x] Integração com Prisma
* [x] Integração com PostgreSQL
* [x] Testes das operações no banco hospedado no Neon.tech

---

## 📅 Passo 3 — Módulo de agendamentos

**Status: 🔜 Próximos passos**

### Funcionalidades planejadas

* [ ] Criar rotas para gerenciamento de agendamentos.
* [ ] Vincular usuários aos serviços.
* [ ] Definir data e horário dos agendamentos.
* [ ] Implementar regras de negócio para os agendamentos.
* [ ] Validar conflitos de horário.
* [ ] Impedir reservas simultâneas no mesmo período.
* [ ] Criar endpoint para listar agendamentos de um usuário.
* [ ] Criar funcionalidade de cancelamento de agendamentos.
* [ ] Proteger as rotas utilizando middleware de autenticação JWT.
* [ ] Garantir que apenas usuários autenticados possam realizar agendamentos.

---

# 🔐 Variáveis de ambiente

O projeto utiliza variáveis de ambiente para armazenar informações sensíveis.

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="sua_url_do_postgresql"
JWT_SECRET="sua_chave_secreta"
```

Nunca versione o arquivo `.env`.

No `.gitignore`:

```gitignore
node_modules/
.env
dist/
```

---

# 🧪 Status atual

O projeto encontra-se em desenvolvimento.

### Implementado

* ✅ Setup do backend
* ✅ TypeScript
* ✅ Express
* ✅ Prisma
* ✅ PostgreSQL
* ✅ Neon.tech
* ✅ Arquitetura em camadas
* ✅ Cadastro de usuários
* ✅ Hash de senhas
* ✅ Autenticação JWT
* ✅ CRUD de serviços

### Em desenvolvimento

* 🚧 Sistema de agendamentos
* 🚧 Validação de conflitos de horários
* 🚧 Cancelamento de agendamentos
* 🚧 Middleware de autenticação
* 🚧 Regras de negócio relacionadas aos horários

---

# 📌 Próximos passos

O próximo objetivo do projeto é finalizar o **módulo de agendamentos**, implementando as regras de negócio necessárias para garantir que os usuários possam realizar e gerenciar suas reservas de forma segura e consistente.

Posteriormente, novas funcionalidades poderão ser adicionadas, como:

* gerenciamento de horários disponíveis;
* diferentes níveis de acesso;
* painel administrativo;
* integração com frontend;
* testes automatizados;
* documentação da API;
* deploy do backend.


