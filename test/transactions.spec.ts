import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('transactions', () => {
  beforeAll(async () => {
    await app.ready()
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
})
