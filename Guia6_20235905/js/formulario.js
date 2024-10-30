// Accediendo a los elementos HTML
const inputNombre = document.getElementById('idTxtNombre');
const inputApellido = document.getElementById('idTxtApellido');
const inputFechaNacimiento = document.getElementById('idTxtFechaNacimiento');
const inputRdMasculino = document.getElementById('idRdMasculino');
const inputRdFemenino = document.getElementById('idRdFemenino');
const cmbPais = document.getElementById('idCmbPais');
const inputDireccion = document.getElementById('idTxtDireccion');
const inputNombrePais = document.getElementById('idNombrePais');
const buttonAgregarPaciente = document.getElementById('idBtnAgregar');
const buttonLimpiarPaciente = document.getElementById('idBtnLimpiar');
const buttonMostrarPaciente = document.getElementById('idBtnListar');
const buttonAgregarPais = document.getElementById('idBtnAgregarPais');
const buttonGuardarCambios = document.getElementById('idBtnGuardarCambios');
const notificacion = document.getElementById('idNotificacion');
const mensaje = document.getElementById('idMensaje');
const idTablaPacientes = document.getElementById('idTablaPacientes');
const idPacientesRegistrados = document.getElementById('idPacientesRegistrados');

// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);

// Arreglo global de pacientes
let arrayPaciente = [];
let contadorGlobalOption = cmbPais.children.length;
let indexToEdit = -1; // Variable para almacenar el índice del paciente que se va a editar

// Función para limpiar el formulario
const limpiarFormulario = () => {
    inputNombre.value = '';
    inputApellido.value = '';
    inputFechaNacimiento.value = '';
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = '';
    inputNombrePais.value = '';
    inputNombre.focus();
    indexToEdit = -1; // Reiniciar el índice al limpiar
};

// Función para agregar un paciente
const addPaciente = () => {
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const fechaNacimiento = inputFechaNacimiento.value;
    const sexo = inputRdMasculino.checked ? "Hombre" : inputRdFemenino.checked ? "Mujer" : "";
    const pais = cmbPais.value;
    const labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    const direccion = inputDireccion.value;

    if (nombre && apellido && fechaNacimiento && sexo && pais !== "0" && direccion) {
        if (indexToEdit === -1) {
            // Si no se está editando, agregar un nuevo paciente
            arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            // Si se está editando, actualizar el paciente existente
            arrayPaciente[indexToEdit] = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];
            mensaje.innerHTML = "Se han actualizado los datos del paciente";
            indexToEdit = -1; // Reiniciar el índice después de la edición
        }
        
        toast.show();
        imprimirPacientes(); // Mostrar la lista actualizada de pacientes
        limpiarFormulario(); // Limpiar el formulario después de agregar o editar
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Función para actualizar la tabla de pacientes
const imprimirFilas = () => {
    let fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => {
        fila += `
            <tr>
                <td class="text-center fw-bold">${contador}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
                <td>${element[3]}</td>
                <td>${element[4]}</td>
                <td>${element[5]}</td>
                <td>
                    <button type="button" class="btn btn-primary" onclick="editarPaciente(${index})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="eliminarPaciente(${index})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>
        `;
        contador++;
    });

    return fila;
};

const imprimirPacientes = () => {
    const table = `
        <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center" style="width: 5%">#</th>
                        <th scope="col" class="text-center" style="width: 15%">Nombre</th>
                        <th scope="col" class="text-center" style="width: 15%">Apellido</th>
                        <th scope="col" class="text-center" style="width: 10%">Fecha nacimiento</th>
                        <th scope="col" class="text-center" style="width: 10%">Sexo</th>
                        <th scope="col" class="text-center" style="width: 10%">Pais</th>
                        <th scope="col" class="text-center" style="width: 25%">Dirección</th>
                        <th scope="col" class="text-center" style="width: 10%">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${imprimirFilas()}
                </tbody>
            </table>
        </div>
    `;

    idTablaPacientes.innerHTML = table;
    idPacientesRegistrados.textContent = arrayPaciente.length;
};

// Función para editar paciente
const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    paciente[3] === "Hombre" ? (inputRdMasculino.checked = true) : (inputRdFemenino.checked = true);
    cmbPais.value = cmbPais.querySelector(`option:contains('${paciente[4]}')`).value;
    inputDireccion.value = paciente[5];

    indexToEdit = index; // Establecer el índice del paciente que se va a editar
};

// Función para eliminar paciente
const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1);
    mensaje.innerHTML = "Paciente eliminado";
    toast.show();
    imprimirPacientes();
};

// Función para agregar un nuevo país al combo box
const addPais = () => {
    const paisNew = inputNombrePais.value;
    if (paisNew) {
        const option = document.createElement("option");
        option.textContent = paisNew;
        option.value = ++contadorGlobalOption;
        cmbPais.appendChild(option);

        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
        limpiarFormulario();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = limpiarFormulario;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;

// Evento para cuando se abre el modal de nuevo país
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar función al momento de cargar la página HTML
limpiarFormulario();