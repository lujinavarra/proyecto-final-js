import { traerProfesionales } from "./index.js";


//traigo elementos del html y declaro variables necesarias para poder trabajar


let formulario = document.getElementById("formulario");
let nombrePaciente;
let dni;
let telefono;
let staffProfesionales;

//inserto los datos de los profesionales en el formulario

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

let turnero= [];
let profesionalSeleccionado;
let fecha;
let fechaObjeto;
let fechaFormateada;
let hora;
let paciente1;

//genero el evento del formulario para que el usuario cargue sus datos
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    nombrePaciente = document.getElementById("nombrePaciente").value;
    dni = document.getElementById("dni").value;
    telefono = document.getElementById("telefono").value;
    fecha=document.getElementById("fecha").value;
    fechaObjeto = moment(fecha);
    fechaFormateada = fechaObjeto.format("DD/MM/YYYY");
    hora=document.getElementById("hora").value;
    // profesionalSeleccionado=   modificarBuscador();
    //console.log(profesionalSeleccionado)
    profesionalSeleccionado= document.getElementById("staffProfesionales").value;
    let reglaNombrePaciente = isNaN(nombrePaciente);
    let reglaDni = Number(dni) > 0;
    let reglaTelefono = Number(telefono) > 0;
    if (reglaNombrePaciente === true && reglaDni === true && reglaTelefono === true) {
        paciente1 = new Paciente(nombrePaciente, dni, telefono);
        localStorage.setItem("paciente1", JSON.stringify(paciente1))
        agregarTurno();
        // Swal.fire({
        //     position: 'top-end',
        //     icon: 'success',
        //     title: 'Turno Agendado con éxito',
        //     showConfirmButton: false,
        //     timer: 1000
        // });
        // setTimeout(()=> {
        //     window.location.href = "/pages/servicios.html";
        // }, 1500);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sus datos no fueron cargados correctamente, por favor realice nuevamente su selección'
        })
    }
   // formulario.reset();
})

async function agregarTurno (){
    turnero = JSON.parse(localStorage.getItem("turno"))||[];
    const profesionales = await traerProfesionales();
    const profesionalElegido = profesionales.find(profesional => profesional.id === parseInt(profesionalSeleccionado));
    console.log(profesionalElegido);
    profesionalElegido.fecha = fechaFormateada;
    profesionalElegido.hora = hora;
    turnero.push(profesionalElegido);
    console.log(turnero)
    localStorage.setItem("turno", JSON.stringify(turnero));
}


// export {paciente1}