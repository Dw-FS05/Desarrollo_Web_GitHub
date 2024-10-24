const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;
let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        let numero = prompt("¿Que número se ha generado (intento " + intentos + ")?");

        if (numero == numeroAleatorio) {
            mensaje = `Felicidades! Has acertado el número (${numeroAleatorio}). Refresca la página para jugar de nuevo.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Lo siento, pero has excedido el número de intentos. El número era ${numeroAleatorio}. Refresca la página para jugar de nuevo.`;
        } else {
            if (numero < numeroAleatorio) {
                mensaje = `Vuelve a intentar. El número que buscas es más alto. Quedan ${numeroIntentos - intentos} intentos.`;
            } else {
                mensaje = `Vuelve a intentar. El número que buscas es más bajo. Quedan ${numeroIntentos - intentos} intentos.`;
            }
        }
        intentos++;
    } else {
        mensaje = `Has excedido el número de intentos, el número oculto era: ${numeroAleatorio}. Refresca la página para jugar de nuevo.`;
    }
    parrafo.innerHTML = mensaje;
}