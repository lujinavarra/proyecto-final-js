
# Proyecto Final Curso de Javascript Coderhouse

## Centro de Salud Integral

El objetivo del sistema es que los usuarios puedan ver la oferta disponible de profesionales, y de ahí puedan hacer una elección para agendar un turno, sin necesidad de ir presencialmente al Centro.


## Deployment

Para ejecutar la aplicación se debe iniciar live server, desde Visual Studio Code. Al abrir el navegador se va a encontrar con la página principal, que da la bienvenida al usuario.
En el menú de navegación dispone de un enlace para agendar turno en forma directa, y un botón para que se desplieguen los profesionales disponibles. Luego de mostrar los profesionales que trabajan en el centro se activa un botón, que también permite redirigir a la página para agendar un turno.
En la página para agendar el turno se despliega un formulario, en donde el usuario llena sus datos, elige el profesional, la fecha y hora del turno. Luego de apretar el botón del formulario se abre otra página en la que se muestra un resumen de los turnos agendados. En ella, el usuario dispone de elementos para agendar otro turno, eliminar algún turno (o todos), en caso de haberse equivocado, o confirmar el/los turnos que haya sacado. En tal caso el usuario recibe un mensaje de que va a ser contactado para acordar el pago y otros menesteres.


## Tech Stack

El proyecto se realizó con Javascript puro, sin utilización de frameworks. Además se maquetó con un archivo externo de css, y se emplearon librerías externas, como SweetAlert y Momentjs, para lograr mayor interactividad y un buen manejo de fechas.


## Appendix

El proyecto se encuentra disponible en la siguiente dirección: 
        http://centro-de-salud.netlify.app/
## Optimizations

Este es un proyecto inicial, con posibilidades para la escalabilidad. Se dispone de una página de ingreso o logueo para el usuario, que no se trabajó ya que pueden ser funcionalidades extras para hacer crecer el proyecto. De esta forma, se pueden crear usuarios con distintos permisos y gestionar desde una sesión los diversos turnos, y poder ser utilizada, tanto por pacientes, como por administrativos, en el mismo lugar de trabajo.


## Authors

- [@lujinavarra](https://github.com/lujinavarra)

