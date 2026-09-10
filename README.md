📅 API de Agendamentos - Guia de Desenvolvimento & Infraestrutura

Este documento reúne os comandos, configurações, especificações de infraestrutura e o passo a passo do desenvolvimento do backend do sistema de agendamentos.

⚙️ Passo a Passo: Inicialização & Configuração do Backend

As etapas abaixo descrevem a preparação do ambiente do servidor e a integração com o banco de dados utilizando o Prisma ORM.

1. Criação e Configuração do Projeto

Inicialização do projeto Node.js e instalação das ferramentas de desenvolvimento para garantir tipagem estática e segurança na API:
# Inicializa o package.json
npm init -y# Instalação das dependências de produção
npm install express cors dotenv bcrypt jsonwebtoken# Instalação das dependências de desenvolvimento e compiladores
npm install -D typescript @types/express @types/node @types/cors @types/bcrypt @types/jsonwebtoken tsx# Inicializa o arquivo de configuração do TypeScript (tsconfig.json)
npx tsc --init

- **Express:** Framework minimalista para criação de rotas e APIs.
- **Cors:** Permite o compartilhamento de recursos entre diferentes origens.
- **Dotenv:** Gerenciamento seguro de variáveis de ambiente.
- **TypeScript:** Adiciona tipagem estática, reduzindo bugs e facilitando a manutenção.
- **tsx:** Executor que roda arquivos `.ts` diretamente no ambiente de desenvolvimento.
- **Bcrypt:** Criptografia segura de senhas (hash) para autenticação de usuários.
- **Jsonwebtoken:** Autenticação baseada em tokens JWT para sessões.

2. Inicialização do Prisma ORM

O Prisma foi adicionado como ORM para conectar e interagir com o PostgreSQL de forma tipada:
# Instala as dependências do Prisma
npm install -D prisma
npm install @prisma/client# Inicializa as configurações do Prisma apontando para o PostgreSQL
npx prisma init --datasource-provider postgresql

Este comando gera a pasta `/prisma` com o arquivo `schema.prisma` e cria o arquivo `.env` para armazenamento da string de conexão (DATABASE_URL).

🗄️ Modelagem de Dados & Banco na Nuvem (Neon.tech)

Modelagem Inicial do Banco (Prisma)

Abaixo está o design do esquema relacional de dados estruturado para a API de agendamentos (`prisma/schema.prisma`):

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
  role         String        @default("CLIENT") // CLIENT ou ADMIN
  appointments Appointment[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Service {
  id           String        @id @default(uuid())
  title        String
  description  String?
  price        Float
  duration     Int           // Duração em minutos
  appointments Appointment[]
  createdAt    DateTime      @default(now())
}

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

Aplicando a Modelagem no Banco de Dados

Para rodar a migração e sincronizar o esquema com o banco PostgreSQL hospedado no Neon.tech:
npx prisma migrate dev --name init

🚀 Comandos de Execução

No dia a dia, utilize os comandos abaixo na raiz do projeto:
Iniciar o servidor de desenvolvimento:
npm run dev

Gerar os artefatos de tipagem do Prisma:
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
