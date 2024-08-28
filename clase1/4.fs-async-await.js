// asincrono secuencial
// ES modules permite usar await en el cuerpo del archivo - top level await
const { readFile } = require('node:fs/promises');

// IIFE - Immediately Invoked Function Expression
(
  async () => {
    console.log('Leyendo el primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('primer text', text)

    console.log('---> Hacer cosas mientras lee el archivo')

    console.log('Leyendo el segundo archivo...')
    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log('segundo texto', secondText)
  }
)()