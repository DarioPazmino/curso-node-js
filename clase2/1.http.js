const http = require('node:http')

console.log(process.env)

const desiredPort = process.env.PORT ?? 1234

/* const processRequest = (req, res) => {
  console.log('request received', req.url)
  res.end('Hola mundo')
} */

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf8')

  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('<h1>Bienvenido a mi página de inicio!</h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('<h1>Contact</h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>404 Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
