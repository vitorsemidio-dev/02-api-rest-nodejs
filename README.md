# 💸 Fastify Transactions

Esta API foi desenvolvida para que o usuário possa gerenciar suas transações financeiras de forma simples e prática. É possível criar novas transações, visualizar um resumo da conta, listar todas as transações já ocorridas e visualizar uma transação única.

<p align="center">
  <img src="https://img.shields.io/static/v1?logo=Fastify&logoColor=000000&label=Fastify&message=Fastify&color=000000" alt="Logo Fastify" />
  <img src="https://img.shields.io/static/v1?logo=Node.js&logoColor=339933&label=Node.js&message=Node.js&color=339933" alt="Logo Node.js" />
  <img src="https://img.shields.io/static/v1?logo=SQLite&logoColor=003B57&label=SQLite&message=SQLite&color=003B57" alt="Logo SQLite" />
  <img src="https://img.shields.io/static/v1?logo=PostgreSQL&logoColor=4169E1&label=PostgreSQL&message=PostgreSQL&color=4169E1" alt="Logo PostgreSQL" />
  <img src="https://img.shields.io/static/v1?logo=Vitest&logoColor=6E9F18&label=Vitest&message=Vitest&color=6E9F18" alt="Logo Vitest" />
</p>

---

## 🧭 Como rodar o projeto

Instale as dependências

```bash
npm install
```

Crie e preencha as variáveis de ambiente no arquivo `.env`

```bash
cp .env.example .env
```

Execute as migrations

Em sistemas UNIX

```bash
npm run knex -- migrate:latest
```

No Windows

```bash
npm run knex:migrate:latest
```

Rode o projeto

```bash
npm run dev
```

---

## 🎯 Funcionalidades da aplicação

### RF

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

### RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou;

---

## 🔜 Próximas etapas

- [ ] Criar documentação API
- [ ] Botão Insomnia

---

## 🧪 Testes

Utilize o comando a seguir para executar os testes unitários

```bash
cp .env.test.example .env.test
```

```bash
npm run test:unit
```
