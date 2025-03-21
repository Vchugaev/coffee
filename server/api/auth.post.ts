import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const users = JSON.parse(readFileSync(resolve('./data/users.json'), 'utf-8'))

  const user = users.find(
    (u: any) => u.credentials.username === body.login && u.credentials.passphrase === body.password
  )

  if (user && user.active) {
    return { 
      success: true,
      user: {
        name: user.name,
        surname: user.surname,
        username: user.credentials.username
      }
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Неверные учетные данные'
  })
}) 