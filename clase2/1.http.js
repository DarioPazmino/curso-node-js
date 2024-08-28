const http = require('node:http')
const fs = require('node:fs')
// console.log(process.env)

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
  } else if (req.url === '/imagen.jpg') {
    fs.readFile('./sunflower.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Interal Server Error</h1>')
      } else {
        res.statusCode = 200 // no es necesario ya que es el default
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
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
