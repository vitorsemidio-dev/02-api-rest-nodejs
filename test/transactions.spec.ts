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

  it('should allow the user to create a new transaction.', async () => {
    const response = await request(app.server).post('/transactions').send({
      amount: 100,
      title: 'test',
      type: 'debit',
    })
    expect(response.status).toBe(201)
  })
})
