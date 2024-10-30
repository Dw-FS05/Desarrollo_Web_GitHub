const containerEstudiantes = document.querySelector("#idContainerEstudiantes");
const btnPromedio = document.querySelector("#idBtnPromedio");
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    let arrayEstudiante = [];
    let totalEstudiantes = document.querySelector("#inputNumeroEstudiantes").value;
    let contador = 1;
    let estudiante, calificacion, convertir = 0;

    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);
        do {
            calificacion = prompt(`Ingrese la calificación del estudiante ${estudiante}`);
            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        arrayEstudiante[contador - 1] = [estudiante, parseFloat(calificacion).toFixed(2)];
        contador++;
    }

    let calificacionAlta = -Infinity;
    let promedio = 0;
    let poscicion = 0;
    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";

    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = indice[1];
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b>${nota}</li>`;

        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            poscicion = indice;
        }

        promedio += parseFloat(nota);
    }

    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}`;
    listado += `<br><b>Estudiante con mejor calificación:</b> ${poscicion[0]}</p>`;

    document.querySelector("#idContainerEstudiantes").innerHTML = listado;
}