
let datos; // Variable para almacenar los datos fuera del bloque fetch

async function traerProfesionales() {
    const response = await fetch("/staff.json");
    const data = await response.json();
    return data;
}

async function obtenerDatos() {
    const datos = await traerProfesionales();
    let contenedorProfesionales = document.getElementById("contenedorProfesionales");
    if (datos){
        let profesionales = document.getElementById("profesionales");
        profesionales.addEventListener("click", () => {
            datos.forEach((profesional) => {
                let div = document.createElement("div");
                div.className = "cards";
                div.innerHTML = `
                <img class="fotosProfesionales" src="${profesional.imagen}">
                <h2>Servicio de ${profesional.servicio}</h2>
                <p>${profesional.nombre}</p>
                <p>$${profesional.honorarios}</p>
            `;
                contenedorProfesionales.appendChild(div);
            })
            document.getElementById("sacarTurno").disabled = false;
        })
    }
}

obtenerDatos();

export {traerProfesionales};









