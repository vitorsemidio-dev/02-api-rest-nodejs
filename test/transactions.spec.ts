import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('transactions', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(() => {
    execSync('npm run knex:migrate:rollback')
    execSync('npm run knex:migrate:latest')
  })

  afterAll(async () => {
    await app.close()
  })

  it('should allow the user to create a new debit transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      amount: 100,
      title: 'test',
      type: 'debit',
    })
    expect(response.status).toBe(201)
  })

  it('should allow the user to create a new crediti transaction.', async () => {
    const response = await request(app.server).post('/transactions').send({
      amount: 100,
      title: 'test',
      type: 'credit',
    })
    expect(response.status).toBe(201)
  })

  it('should be able to list all transaction for the user.', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        amount: 100,
        title: 'test',
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(listTransactionsResponse.status).toBe(200)
    expect(listTransactionsResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: 'test',
          amount: 100,
          session_id: expect.any(String),
        }),
      ]),
    )
  })

  it('should be able to get a specific transaction.', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        amount: 100,
        title: 'test',
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const transactionId = listTransactionsResponse.body.data[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)

    expect(getTransactionResponse.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'test',
        amount: 100,
        session_id: expect.any(String),
      }),
    )
  })

  it('should be able to get summary.', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        amount: 100,
        title: 'test credit',
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')
    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        amount: 50,
        title: 'test debit',
        type: 'debit',
      })

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/summary`)
      .set('Cookie', cookies)

    expect(getTransactionResponse.body.data).toEqual(
      expect.objectContaining({
        amount: 50,
      }),
    )
  })
})
