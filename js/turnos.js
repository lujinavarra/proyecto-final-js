
let paciente1LS= localStorage.getItem("paciente1");
let turneroLS= localStorage.getItem("turno");
let turnosAgendados = [];
turneroLS ? turnosAgendados=JSON.parse(turneroLS): turnosAgendados =[];
let paciente1=JSON.parse(paciente1LS);
console.log(turnosAgendados);
let turnosAgendadosDom = document.getElementById("turnoAgendado");

function mostrarTurnosAgendados(turnero){  
    turnero.forEach(item => {
        let turnoAgendado = document.createElement("div");
        turnoAgendado.className="profesionales1"
        turnoAgendado.innerHTML= `
        <img class="fotosProfesionales1" src="${item.imagen}">
        <h3>Especialidad de ${item.servicio}</h3>
        <p>${item.nombre}</p>
        <p>Honorarios a abonar: $${item.honorarios}</p>
        <p>Fecha: ${item.fecha}</p>
        <p>Hora: ${item.hora}</p>
        <button id="${item.id}" class="eliminar">Eliminar</button>
        `;
        turnosAgendadosDom.appendChild(turnoAgendado);
    });
    if (turnero.length>0){
        confirmarTurnos();
    }else{
    }
}

mostrarTurnosAgendados(turnosAgendados);

let botonesEliminar= document.querySelectorAll(".eliminar");
Array.from(botonesEliminar).forEach(function(boton, indice){
    boton.addEventListener("click", ()=>{
        let indiceTurno = turnosAgendados[indice];
        turnosAgendados.splice(indice, 1);
        localStorage.setItem("turno", JSON.stringify(turnosAgendados));
        location.reload();
        mostrarTurnosAgendados(turnosAgendados);
    })
});

function confirmarTurnos(){
    let mostrarTotal=document.getElementById("mostrarTotal");
    let confirmacion=document.createElement("div");
    confirmacion.className="confirmacion";
    confirmacion.innerHTML= `
        <div class="total">
        <p id="totalTurnos"> El total a abonar es $ </p>
        </div>
        <div class="botonesTurnos">
        <button id="eliminarTurnos">Eliminar todos los turnos</button>
        <button id="confirmarTurnos">Confirmar Turnos</button>
        <button id ="agregarTurno"> ¿Desea solicitar otro turno ? </button>
        </div> `;
    mostrarTotal.appendChild(confirmacion);
    calcularTotal();
};

function calcularTotal(){
    let total = 0;
    turnosAgendados.forEach(turno =>{
        total += turno.honorarios;
    });
    let totalAMostrar = document.getElementById("totalTurnos");
    totalAMostrar.innerHTML=`El total a abonar es $ ${total}`;
};

function eliminarTurnos(){
    let eliminarTurnos=document.getElementById("eliminarTurnos");
    eliminarTurnos.addEventListener("click", ()=>{
        Swal.fire({
            title: '¿Esta seguro de eliminar sus turnos?',
            text: "No va a poder revertir esta opción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, los elimino'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear("turno");
                turnosAgendadosDom.innerHTML = "";
                let confirmacion = document.getElementsByClassName("confirmacion");
                confirmacion.innerHTML = "";
                Swal.fire(
                    'Turnos Eliminados',
                    'Sus turnos han sido eliminados.',
                    'success'
            )
            setTimeout(()=> {
                location.reload()
            }, 1500);
            }
        })
    })
}
eliminarTurnos();

let agregarTurno=document.getElementById("agregarTurno");
agregarTurno.addEventListener("click", ()=>{
    setTimeout(function () {
        window.location.href = "/pages/sacar-turno.html";
    }, 1000);
});

let confirmarTurno=document.getElementById("confirmarTurnos");
confirmarTurno.addEventListener("click", ()=>{
    Swal.fire({
        text: `${paciente1.nombrePaciente}, nos comunicaremos contigo al ${paciente1.telefono} para más detalles sobre el pago. Muchas gracias`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
        }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear("turno");
            turnosAgendadosDom.innerHTML = "";
            let confirmacion = document.getElementsByClassName("confirmacion");
            confirmacion.innerHTML = "";
            setTimeout(()=> {
                location.reload()
            }, 500);
        }
    })
})

