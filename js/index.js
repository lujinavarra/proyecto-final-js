//comienzo definiendo funciones asíncronas para traer a partir del json los datos de los profesionales

async function traerProfesionales() {
    const response = await fetch("/staff.json");
    const data = await response.json();
    return data;
}
//a partir de la función que empleo fetch la aplico en un evento para mostrar en el dom
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
            function redirigir(){
                location.href='#contenedorProfesionales'
            }
            redirigir();
        })
    }
}

obtenerDatos();
//exporto la funcion asíncrona, ya que necesito los datos de los profesionales para seguir trabajando en los otros archivos
export {traerProfesionales};









