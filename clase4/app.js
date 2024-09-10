import express, { json } from 'express'
import { movieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.disable('x-powered-by')
app.use(corsMiddleware())

app.use('/movies', movieRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
