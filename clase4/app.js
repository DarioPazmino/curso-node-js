import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'

import { validateMovie, validatePartialMovie } from './schemas/movies.js'
import { readJSON } from './utils.js'

// todavia experimental - en el futuro será así
//import movies from './movies.json' with { type: 'json' }

// como leer un json en ESModules
// import fs from 'node:fs
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8))

// como leer un json en ESModules recomendado por ahora
const movies = readJSON('./movies.json')

const app = express()
app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'https://movies.com',
      'https://some-accepted-origin.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

    const updateMovie = {
      ...movies[movieIndex],
      ...result.data
    }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
