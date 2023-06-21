//comienzo trayendo del localstorage los turnos y el paciente cargados previamente
let paciente1LS= localStorage.getItem("paciente1");
let turneroLS= localStorage.getItem("turno");
let turnosAgendados = [];
turneroLS ? turnosAgendados=JSON.parse(turneroLS): turnosAgendados =[];//igual que en el archivo anterior, evalúo si hay turnos en el localstorage, caso contrario se inicializa en cero
let paciente1=JSON.parse(paciente1LS);

//traigo elementos del html para interaccionar con el dom
let turnosAgendadosDom = document.getElementById("turnoAgendado");
//muestro los turnos agendados, y en caso de existir muestro el resumen de pago
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
    }
}

mostrarTurnosAgendados(turnosAgendados);

//botones
//botón para eliminar un turno en particular
let botonesEliminar= document.querySelectorAll(".eliminar");
Array.from(botonesEliminar).forEach(function(boton, indice){
    boton.addEventListener("click", ()=>{
        Swal.fire({
            title: '¿Esta seguro de eliminar el turno?',
            text: "No va a poder revertir esta opción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, lo elimino'
        }).then((result) => {
            if (result.isConfirmed) {
                let indiceTurno = turnosAgendados[indice];
                turnosAgendados.splice(indice, 1);
                localStorage.setItem("turno", JSON.stringify(turnosAgendados));
                location.reload();
                mostrarTurnosAgendados(turnosAgendados);
                Swal.fire(
                    'Turno Eliminado',
                    'Su turno ha sido eliminado.',
                    'success'
                )
        }})
})
});

//función para mostrar el resumen de los turnos
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

//con esta función calculo el total a pagar
function calcularTotal(){
    let total = 0;
    turnosAgendados.forEach(turno =>{
        total += turno.honorarios;
    });
    let totalAMostrar = document.getElementById("totalTurnos");
    totalAMostrar.innerHTML=`El total a abonar es $ ${total}`;
};

//función para eliminar todos los turnos seleccionados
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
                localStorage.clear("turno");//si confirma la eliminacion vacío el local storage y el html también
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

//botón para agregar un turno más
let agregarTurno=document.getElementById("agregarTurno");
agregarTurno.addEventListener("click", ()=>{
    setTimeout(function () {
        window.location.href = "/pages/sacar-turno.html";
    }, 1000);
});

//botón para confirmar el turno
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

