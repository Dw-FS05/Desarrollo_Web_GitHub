// Referencias al formulario y al modal
const formulario = document.forms["frmRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), { keyboard: false });
const bodyModal = document.getElementById("idBodyModal");

// Evento submit del formulario
formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Siempre prevenir el envío del formulario
    if (validarFormulario()) {
        mostrarEnModal();
    }
});

// Función de validación principal
function validarFormulario() {
    const nombre = document.getElementById("idNombre");
    const apellidos = document.getElementById("idApellidos");
    const fechaNac = document.getElementById("idFechaNac");
    const correo = document.getElementById("idCorreo");
    const password = document.getElementById("idPassword");
    const passwordRepetir = document.getElementById("idPasswordRepetir");
    const intereses = document.querySelectorAll('input[type="checkbox"]');
    const carreras = document.getElementsByName("idRdCarrera");
    const pais = document.getElementById("idCmPais");

    // a. Validar que los campos no estén vacíos
    const camposObligatorios = [nombre, apellidos, fechaNac, correo, password, passwordRepetir];
    for (let campo of camposObligatorios) {
        if (campo.value.trim() === '') {
            alert(`El campo ${campo.previousElementSibling.textContent} es obligatorio.`);
            return false;
        }
    }

    // b. Validar que la fecha de nacimiento no supere la fecha actual
    const fechaUsuario = new Date(fechaNac.value);
    if (fechaUsuario > new Date()) {
        alert('La fecha de nacimiento no puede ser mayor a la fecha actual');
        return false;
    }

    // c. Validar correo electrónico con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.value)) {
        alert('Correo electrónico inválido');
        return false;
    }

    // d. Validar que las contraseñas coincidan
    if (password.value !== passwordRepetir.value) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    // e. Verificar que se seleccione al menos un interés
    if (![...intereses].some(interes => interes.checked)) {
        alert('Debe seleccionar al menos un interés');
        return false;
    }

    // f. Verificar que el usuario seleccione una carrera
    if (![...carreras].some(carrera => carrera.checked)) {
        alert('Debe seleccionar una carrera');
        return false;
    }

    // g. Verificar que sea seleccionado un país de origen
    if (pais.value === "Seleccione una opción") {
        alert('Debe seleccionar un país de origen');
        return false;
    }

    return true;
}

// Función para mostrar la información en el modal en forma de tabla
function mostrarEnModal() {
    // Limpiar contenido previo
    bodyModal.innerHTML = '';

    // Crear tabla
    const tabla = document.createElement('table');
    tabla.className = 'table';

    // Función para añadir filas a la tabla
    function añadirFila(label, valor) {
        const fila = document.createElement('tr');
        const celda1 = document.createElement('td');
        const celda2 = document.createElement('td');
        celda1.textContent = label;
        celda2.textContent = valor;
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        tabla.appendChild(fila);
    }

    // Añadir información a la tabla
    añadirFila('Nombre', document.getElementById('idNombre').value);
    añadirFila('Apellidos', document.getElementById('idApellidos').value);
    añadirFila('Fecha de Nacimiento', document.getElementById('idFechaNac').value);
    añadirFila('Correo Electrónico', document.getElementById('idCorreo').value);
    añadirFila('Intereses', obtenerInteresesSeleccionados());
    añadirFila('Carrera', obtenerCarreraSeleccionada());
    añadirFila('País de Origen', document.getElementById('idCmPais').options[document.getElementById('idCmPais').selectedIndex].text);

    bodyModal.appendChild(tabla);

    // Mostrar el modal
    modal.show();
}

function obtenerInteresesSeleccionados() {
    const intereses = document.querySelectorAll('input[type="checkbox"]:checked');
    return [...intereses].map(interes => interes.nextElementSibling.textContent).join(', ');
}

function obtenerCarreraSeleccionada() {
    const carrera = document.querySelector('input[name="idRdCarrera"]:checked');
    return carrera ? carrera.nextElementSibling.textContent : '';
}