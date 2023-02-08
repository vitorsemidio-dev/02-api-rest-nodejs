import { config } from 'dotenv'
import { z } from 'zod'

const nodeEnvSchem = z
  .enum(['development', 'test', 'production'])
  .default('production')

const nodeEnv = nodeEnvSchem.parse(process.env.NODE_ENV)

if (nodeEnv === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().regex(/^\d+$/).default('3333').transform(Number),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
