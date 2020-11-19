const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    listaCursos.addEventListener('click',agregarCurso)
    carrito.addEventListener('click',eliminarCurso)
    document.addEventListener('DOMContentLoaded',() => {
        articulosCarrito = JSON.parse(localStorage.getItem('producto'))
        carritoHTML();
    })

    vaciarCarrito.addEventListener('click',() => {
        articulosCarrito = [];
        limpiarHTML();
    })
}
function agregarCurso(event){
    event.preventDefault();
    if(event.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = event.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(event){
    event.preventDefault();
    if(event.target.classList.contains('borrar-curso')){
        const cursoId = event.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter( element => element.id !== cursoId)
        carritoHTML()
    }

}


function leerDatosCurso(curso) {
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }
    const exist = articulosCarrito.some( el => el.id === infoCurso.id)
    if(exist){
        //actualizamos
        const cursos = articulosCarrito.map(element => {
            if(element.id === infoCurso.id) {
                element.cantidad++;
                return element;
            }else{
                return element;
            }
        })
        articulosCarrito= [...cursos]
    }else{
        //agregamos al carrito
        //articulosCarrito.push(infoCurso)
        articulosCarrito = [... articulosCarrito , infoCurso]
    }
    carritoHTML()
}

function carritoHTML(){
    limpiarHTML()
    articulosCarrito.forEach((curso,index) => {
        const {imagen,titulo,precio ,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${imagen}" width="100"> </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
         <td>
           <a href="#" class="borrar-curso" data-id="${id}" > X
          </td>
         `
        contenedorCarrito.appendChild(row)
    })
    sincronizarStorage();
}
function sincronizarStorage(){
    localStorage.setItem('producto',JSON.stringify(articulosCarrito))
}



function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}




