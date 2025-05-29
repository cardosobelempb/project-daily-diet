# 🍽️ API Daily Diet
- API para gerenciamento de refeições, com controle de dieta e métricas por usuário.
---
## 🚀 Tecnologias Utilizadas
- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Knex.js
- Docker
- Zod (validação de dados)
- Dotenv (variáveis de ambiente)
---
## 📦 Instalação e Configuração

- Inicialização do Projeto

```bash
npm init -y
tsc --init
npm install fastify
npm install dotenv zod
npm install --save-dev typescript tsx @types/node
npm i @fastify/cookie
```

## Build

```bash
npm i tsup -D
npm run build

env: node
build: npm intall && npm run knex -- migrate:latest &&  npm run build
start: node dist/server.js
{
  "build": "tsup src"
}
```

## 🐳 Uso com Docker

- Certifique-se de ter o Docker e o Docker Compose instalados. Para iniciar os serviços:

```bash
docker-compose up -d

```

## 🗄️ Banco de Dados com Knex
- Instalação

```bash
npm install knex pg
```

## 🗄️ Comandos Úteis
- Criar migration:

```bash
npm run knex migrate:make table-users
npm run knex migrate:make table-meals
```
- Executar migrations:

```bash
npm run knex migrate:latest
```
- Reverter última migration:

```bash
npm run knex migrate:rollback
```
- Adicione este script no seu package.json para facilitar:

```
"scripts": {
  "knex": "tsx node_modules/knex/bin/cli.js",
}
```

## 📋 Funcionalidades
- Esta aplicação possui as seguintes regras e funcionalidades:
# 👤 Usuário
[X] Criar um novo usuário.
[X] Identificar o usuário entre as requisições (autenticação).
[X] Um usuário só pode visualizar, editar e apagar as refeições que ele mesmo criou.

## 🍱 Refeições
- Registrar uma nova refeição com:

- Nome
- Descrição
- Data e hora

[X] Indicação se está ou não dentro da dieta
[X] As refeições devem estar associadas a um usuário.
[X] Editar qualquer informação de uma refeição.
[X] Apagar uma refeição.
[X] Listar todas as refeições de um usuário.
[X] Visualizar os detalhes de uma única refeição.

## 📊 Métricas
- Recuperar métricas de um usuário:
[X] Quantidade total de refeições registradas.
[X] Quantidade total de refeições dentro da dieta.
[X] Quantidade total de refeições fora da dieta.
[X] Melhor sequência de refeições dentro da dieta (em dias consecutivos ou outra regra definida).

## 📁 Estrutura Sugerida de Pastas

```
src/
├── routes/
├── controllers/
├── services/
├── database/
│   ├── migrations/
│   └── knexfile.ts
├── shared/
│   ├── config/
│   ├── schemas/
│   ├── utils/
├── env.ts
└── server.ts
```

## 🧪 Testes Vitest
```
npm i vitest -D
npm i supertest -D
npm i @types/supertest -D
```
## 🔶 Diagrama de Classes (Modelo Simplificado)

```
+----------------+
|     User       |
+----------------+
| id: UUID       |
| name: string   |
| email: string  |
| created_at: ts |
| updated_at: ts |
| deleted_at: ts |
+----------------+
        ▲
        |
        | (1:N)
        ▼
+----------------+
|     Meal       |
+----------------+
| id: UUID       |
| name: string   |
| description: string |
| is_on_diet: boolean |
| created_at: ts |
| updated_at: ts |
| deleted_at: ts |
| user_id: UUID  |
+----------------+

```
- Relacionamento: Um usuário pode ter várias refeições (1:N).

## 🌱 Seed Fake para Alimentar o Banco de Dados
```
npx knex seed:run --specific=users.ts
npx knex seed:run --specific=meals.ts

```


- Aqui está um exemplo usando o faker.js com Knex.
- 📁 seeds/users.ts



```
import type { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  const users = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    created_at: new Date().toISOString(),
    updated_at: null,
    deleted_at: null,
  }));

  await knex("users").insert(users);
}
```

- 📁 seeds/meals.ts

```
import type { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  await knex("meals").del();

  const users = await knex("users").select("id");

  const meals = [];

  for (const user of users) {
    const mealCount = faker.number.int({ min: 1, max: 5 });

    for (let i = 0; i < mealCount; i++) {
      meals.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        isOnDiet: faker.datatype.boolean(),
        created_at: new Date().toISOString(),
        updated_at: null,
        deleted_at: null,
        user_id: user.id,
      });
    }
  }

  await knex("meals").insert(meals);
}

```

## 🛠️ Em Desenvolvimento

- Este projeto está em construção. Contribuições e melhorias são bem-vindas!
