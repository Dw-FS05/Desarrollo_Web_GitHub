// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// Verificar que el id no se repita
const verificarIdUnico = (id) => {
    return !document.getElementById(id);
};

// Mostrar mensaje de advertencia
const mostrarAdvertencia = (mensaje) => {
    alert(mensaje);
};

//AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    //Validando que se haya seleccionado un elemento
    if (elemento !== "") {
        //Metodo perteneciente al modal del boostrap
        modal.show();
    } else {
        mostrarAdvertencia("Debe seleccionar el elemento que se creara");
    }
};

// Agregar un nuevo input
const newInput = function (newElemento) {
    let addElemento = newElemento === "textarea" ? document.createElement("textarea") : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(divElemento);
};


const newSelect = function () {
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(divElemento);
};

// Validar la repetición de id 
buttonAddElemento.onclick = () => {
    let idElemento = `id${nombreElemento.value}`;

    if (nombreElemento.value && tituloElemento.value) {
        if (verificarIdUnico(idElemento)) {
            let elemento = cmbElemento.value;
            if (elemento === "select") {
                newSelect();
            } else if (elemento === "radio" || elemento === "checkbox") {
                newRadioCheckbox(elemento);
            } else if (["text", "number", "date", "password", "color", "email", "textarea"].includes(elemento)) {
                newInput(elemento);
            } else {
                alert("Tipo de elemento no soportado.");
            }
        } else {
            mostrarAdvertencia("El ID ya existe");
        }
    } else {
        mostrarAdvertencia("Faltan campos por completar.");
    }
};

//Validar que los campos están completos
const validarFormulario = () => {
    let elementos = newForm.elements;
    for (let elemento of elementos) {
        if ((elemento.type === "text" || elemento.type === "email" || elemento.type === "color") && !elemento.value) {
            mostrarAdvertencia(`El campo ${elemento.id} está vacío`);
            return false;
        } else if ((elemento.type === "radio" || elemento.type === "checkbox") && !elemento.checked) {
            mostrarAdvertencia(`Debe seleccionar una opción para ${elemento.id}`);
            return false;
        } else if (elemento.nodeName === "SELECT" && elemento.selectedIndex === 0) {
            mostrarAdvertencia(`Debe seleccionar una opción en ${elemento.id}`);
            return false;
        }
    }
    alert("Todos los campos están llenos y validados.");
    return true;
};

// Evento al botón validación
const buttonValidar = document.createElement("button");
buttonValidar.textContent = "Validar formulario";
buttonValidar.className = "btn btn-success mt-3";
buttonValidar.onclick = validarFormulario;
newForm.parentNode.insertBefore(buttonValidar, newForm.nextSibling);

// Evento al botón de crear
buttonCrear.onclick = vericarTipoElemento;
