//VARIABLES

//contenido carrito
const carrito = document.querySelector("#carrito");

//Todo el listado de cursos
const listadoCursos = document.querySelector("#lista-cursos");

//Donde se mostrarán los cursos añadidos
const contenedorCarrito = document.querySelector("#lista-carrito tbody");

//Vaciar el carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

//Función para registrar todos los eventListeners
cargarEventListeners();
function cargarEventListeners() {
  //clic en botón para añadir curso al carrito
  listadoCursos.addEventListener("click", agregarCurso);
}

//FUNCIONES

function agregarCurso(e) {
  e.preventDefault();
  //prevenir el event bubbling
  if (e.target.classList.contains("agregar-carrito")) {
    //subo hacia el padre para tomar el contenido de la card
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerInfoCurso(cursoSeleccionado);
  }
}

//Lee el contenido del html para extraer la info del curso

function leerInfoCurso(cursoSeleccionado) {
  //Creo objeto con el contenido del curso seleccionado

  const infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    titulo: cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector(".precio span").textContent,
    autor: cursoSeleccionado.querySelector("p").textContent,
    id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  console.log(infoCurso);
}
