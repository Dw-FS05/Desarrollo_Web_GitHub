document.addEventListener("DOMContentLoaded", function() {
    // Accedemos al contenedor donde se mostrara los estudiantes
    const containerArreglo = document.querySelector("#idContainerArreglo");
    const containerArregloOrdenado = document.querySelector(
        "#idContainerArregloOrdenado"
    );
    // Accedemos a cada boton por medio de la API DOM
    const btnAgregar = document.querySelector("#idBtnAgregar");
    const btnOrdenar = document.querySelector("#idBtnOrdenar");
    // Agregamos el evento click a los botones, adicionalmente
    // se le asigna la funcion que realizará la operación
    btnAgregar.addEventListener("click", agregarElemento);
    btnOrdenar.addEventListener("click", ordenarElementos);

    let arreglo = new Array();

    function agregarElemento() {
        const numero = parseInt(
            document.querySelector("#inputNumero").value
        );
        // Verificando que sea un numero
        if (isNaN(numero)) {
            alert("Debe ingresar un numero válido");
        } else {
            arreglo.push(numero);
            let caja = document.createElement("div");
            caja.className = "col-md-1 colum";
            let valor = document.createElement("h3");
            valor.textContent = numero;
            caja.appendChild(valor);
            containerArreglo.insertAdjacentElement("beforeend", caja);
        }
    }

    function ordenarElementos() {
        console.log(containerArregloOrdenado); // Verifica que el contenedor no sea null
        if (!containerArregloOrdenado) {
            console.error("El contenedor para elementos ordenados no se encontró.");
            return;
        }

        // Utilizaremos un for...of para recorrer el arreglo
        // a su vez se utilizara .sort() para ordenarlo
        for (let i of arreglo.sort((a, b) => a - b)) { // Asegúrate de ordenar numéricamente
            let caja = document.createElement("div");
            caja.className = "col-md-1 colum-green";
            let valor = document.createElement("h3");
            valor.textContent = i;
            caja.appendChild(valor);
            containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
        }
    }
});