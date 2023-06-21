import { traerProfesionales } from "./index.js";
//importo la función asíncrona

//traigo elementos del html y declaro variables necesarias para poder trabajar

let formulario = document.getElementById("formulario");
let nombrePaciente;
let dni;
let telefono;
let staffProfesionales;

//inserto los datos de los profesionales en el formulario que voy a utilizar para que el usuario saque el turno

async function modificarFormulario() {
    const datos= await traerProfesionales();
    if (datos){
        staffProfesionales = document.getElementById("staffProfesionales");
        for (let i = 0; i < datos.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = datos[i].nombre;
            option.value= datos[i].id;
            staffProfesionales.appendChild(option);
    }}
}
modificarFormulario();

//declaro un objeto para carga de los pacientes
class Paciente {
    constructor(nombrePaciente, dni, telefono) {
        this.nombrePaciente = nombrePaciente;
        this.dni = dni;
        this.telefono = telefono;
    }
}
//declaro otras variables necesarias para trabajar en el evento del formulario
let turnero= [];
let profesionalSeleccionado;
let fecha;
let fechaObjeto;
let fechaFormateada;
let hora;
let paciente1;

//genero el evento del formulario para que el usuario cargue sus datos.
//En el adquiero el valor del nombre, dni, telefono del paciente, y que selecciones fecha, hora y profesional.
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    nombrePaciente = document.getElementById("nombrePaciente").value;
    dni = document.getElementById("dni").value;
    telefono = document.getElementById("telefono").value;
    fecha=document.getElementById("fecha").value;
    fechaObjeto = moment(fecha);
    fechaFormateada = fechaObjeto.format("DD/MM/YYYY");
    hora=document.getElementById("hora").value;
    profesionalSeleccionado= document.getElementById("staffProfesionales").value;
    //con las reglas valido los datos que me ingresa el usuario
    let reglaNombrePaciente = isNaN(nombrePaciente);
    let reglaDni = Number(dni) > 0;
    let reglaTelefono = Number(telefono) > 0;
    if (reglaNombrePaciente === true && reglaDni === true && reglaTelefono === true) {
        paciente1 = new Paciente(nombrePaciente, dni, telefono); //genero el objeto paciente
        localStorage.setItem("paciente1", JSON.stringify(paciente1)) //interactúo con el local storage
        agregarTurno(); //llamo a la función para agregar el turno
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Turno Agendado con éxito',
            showConfirmButton: false,
            timer: 1000
        });
        setTimeout(()=> {
            window.location.href = "/pages/servicios.html";
        }, 1500);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sus datos no fueron cargados correctamente, por favor realice nuevamente su selección'
        })
    }
    formulario.reset();
})

async function agregarTurno (){
    turnero = JSON.parse(localStorage.getItem("turno"))||[];//evalúo si en el localstorage hay algún turno almacenado, caso contrario la variable se encuentra vacía
    const profesionales = await traerProfesionales();
    const profesionalElegido = profesionales.find(profesional => profesional.id === parseInt(profesionalSeleccionado));
    profesionalElegido.fecha = fechaFormateada;
    profesionalElegido.hora = hora;
    turnero.push(profesionalElegido);
    localStorage.setItem("turno", JSON.stringify(turnero));//envío la nueva elección al localstorage
}
