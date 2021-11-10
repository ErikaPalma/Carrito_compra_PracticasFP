//VARIABLES

//contenido carrito
const carrito = document.querySelector("#carrito");

//Todo el listado de cursos
const listadoCursos = document.querySelector("#lista-cursos");

//Donde se irán mostrando los cursos añadidos al carrito
const contenedorCarrito = document.querySelector("#lista-carrito tbody");

//Botón pra vaciar el carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

//OJO: pongo let porque se va a ir llenando con los artículos añadidos al carrito
let articulosCarrito = [];

cargarEventListeners();
//Función para registrar todos los eventListeners
function cargarEventListeners() {
  //Cuando se clica para añadir curso al carrito
  listadoCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);
}

//FUNCIONES

function agregarCurso(e) {
  e.preventDefault();
  //prevenir el event bubbling. Selecciona el elemento si tiene esta clase
  if (e.target.classList.contains("agregar-carrito")) {
    //subo hacia el padre para tomar el contenido de la card
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerInfoCurso(cursoSeleccionado);
  }
}

//Eliminar curso del carrito

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //Elimina ese curso del array. Trae todos menos el que estamos seleccionando
    articulosCarrito = articulosCarrito.filter(
      (cursoSeleccionado) => cursoSeleccionado.id !== cursoId
    );
    carritoHTML(); //Itera sobre el carrito y muestra su hmtl.
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

  //Comprobar si un elemento ya existe en el carrito para añadirlo o actualizar cantidad

  const existe = articulosCarrito.some(
    (cursoSeleccionado) => cursoSeleccionado.id === infoCurso.id
  );
  if (existe) {
    //Iteramos con el map
    const cursos = articulosCarrito.map((cursoSeleccionado) => {
      //Si encontramos un curso con id duplicado
      if (cursoSeleccionado.id === infoCurso.id) {
        //actualizamos la cantidad
        cursoSeleccionado.cantidad++;
        return cursoSeleccionado; //devolvemos el objeto actualizado
      } else {
        return cursoSeleccionado; //devuelve los objetos que no están duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //Añadir elementos al array de carrito
    /*Añado los artículos en una copia del array para no perder
  los artículos que voy añadiendo y le añado el objeto con la info 
  del curso seleccionado*/
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carritoHTML();
}
//Mostrar carro en html
function carritoHTML() {
  //Limpiar el html
  limpiarHTML();

  //Recorre el carrito y genera el html
  articulosCarrito.forEach((cursoSeleccionado) => {
    //El destructuring lo hice a posteriori refactorizando el código.
    //Antes de eso tenía: cursoSeleccionado.titulo,etc.
    const { imagen, titulo, precio, cantidad, id } = cursoSeleccionado;
    //Creo un tr por cada elemento en el carrito
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>
                    <img src="${imagen}" width="100">
                </td>
                <td> ${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${id}">X</a>
                </td>
                `;
    /*añade html del carrito en el tbody pero no limpia 
    los artículos que había previamente. Se van acumulando*/
    contenedorCarrito.appendChild(row);
  });
}

//Limpiar los cursos del tbody para que no se acumulen los anteriores

function limpiarHTML() {
  //forma lenta de hacerlo
  //contenedorCarrito.innerHTML = "";
  /*Mientras haya un hijo, va a estar
eliminando el primer hijo*/
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
