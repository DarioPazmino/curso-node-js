const ditto = require('./pokemon/ditto.json')
const express = require('express')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use(express.json()) // --> hace lo mismo que el código de abajo

/* app.use((req, res, next) => { // --> puede afectar a rutas --> app.use('/pokemon', (req, res, next) => {
  // console.log('mi primer middleware')
  // trackear la request a la base de datos
  // revisar si el usuario tiene cookies
  // revisar si el usuario esta loggeado

  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // solo llegan request que son POST y que tienen el header content-type: application/json
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // mutar la request y meter la informacion en el req.body
    req.body = data
    next()
  })
}) */

app.get('/pokemon/ditto', (req, res) => {
  // res.status(200).send('<h1>Mi página</h1>') --> status(200) es opcional, es default
  // res.send('<h1>Mi página</h1>') // --> reconoce el content type
  // res.json({ message: 'Hola mundo' })
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// último en ejecutarse --> use es como usar *
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
