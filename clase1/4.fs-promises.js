const fs = require('node:fs/promises'); // nativo 
const { promisify } = require('node:util') // transformar callback a promesa

// const readFilePromise = promisify(fs.readFile) --> modulos nativos que no tienen promesas, readFile si lo tiene

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('primer text', text)
  })

console.log('Hacer cosas mientras lee el archivo')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('second text', text)
  })