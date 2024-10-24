const parrafo= document.querySelector("#idParrafo");
console.log(parrafo);

const btnSumar= document.querySelector("#idBtnSumar");
const btnRestar= document.querySelector("#idBtnRestar");
const btnMultiplicar= document.querySelector("#idBtnMultiplicar");
const btnDividir= document.querySelector("#idBtnDividir");

btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

let resultado;

function sumar(){
    let numero1 = parseFloat(prompt("Ingrese el primer número a sumar: "));
    let numero2 = parseFloat(prompt("Ingrese el segundo número a sumar: "));
    resultado= numero1+numero2;
    parrafo.innerHTML= `El resultado de la suma es: ${numero1}+${numero2} = ${resultado}`;
}
function restar(){
    let numero1= prompt("Ingrese el primer numero a restar: ");
    let numero2= prompt("Ingrese el segundo numero a restar: ");
    resultado= numero1-numero2;
    parrafo.innerHTML= `El resultado de la resta es: ${numero1}-${numero2} = ${resultado}`;
}
function multiplicar(){
    let numero1= prompt("Ingrese el primer numero a multiplicar: ");
    let numero2= prompt("Ingrese el segundo numero a multiplicar: ");
    resultado= numero1*numero2;
    parrafo.innerHTML= `El resultado de la multiplicacion es: ${numero1}*${numero2} = ${resultado}`;
}
function dividir(){
    let numero1= prompt("Ingrese el primer numero a dividir: ");
    let numero2= prompt("Ingrese el segundo numero a dividir: ");
    let mensaje;
    if(numero2 != 0){
        resultado=  numero1/numero2;
        mensaje= `El resultado de la division es: ${numero1}/${numero2} = ${resultado}`;

    } else {
        mensaje = `El valor ${numero1}/${numero2} no se puede dividir`;
    }
    parrafo.innerHTML= mensaje;
}