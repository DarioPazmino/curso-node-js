// asincrono en paralelo
// ES modules permite usar await en el cuerpo del archivo - top level await
import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('Primer text: ', text)
  console.log('Segundo texto: ', secondText)
})