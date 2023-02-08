import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const sessionId = request.cookies.sessionId

    if (!sessionId) {
      return reply.status(401).send({
        error: 'Unauthorized.',
      })
    }

    const transactions = await knex('transactions')
      .select('*')
      .where('session_id', sessionId)

    return {
      data: transactions,
    }
  })

  app.get('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions')
      .select('*')
      .where('id', id)
      .first()

    if (!transaction) {
      return reply.status(404).send({
        error: 'Transaction not found',
      })
    }

    return {
      data: transaction,
    }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return {
      data: summary,
    }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      const sevenDaysInMiliseconds = 1000 * 60 * 60 * 24 * 7

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        maxAge: sevenDaysInMiliseconds,
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
