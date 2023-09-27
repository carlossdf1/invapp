const productos = ( roleName == 'admin' || group.length > 1 ) ? api +  "product/products" : api +  `product/products/?group=${ group[0].name }`;
const prodPrestados = ( roleName == 'admin') ? api + "product/products/?group=Prestamos"  : null;
const prodEliminados = ( roleName == 'admin') ? api + "product/products/?group=Eliminados" : null;
const ubicacion = api + "ubication";
const categoria = api + "category";

let myModalEliminar = new bootstrap.Modal(document.getElementById("modalEditar"));
let myModaLRestaurar = new bootstrap.Modal(document.getElementById("modalRestaurar"));
let myModal = new bootstrap.Modal(document.getElementById("modalEditar"));

let listaUbicacion = consultaUbicacion();
let listaCategoria = consultaCategoria();

let idIn = ["nombreModal", "cantidadModal", "precioModal", "selectGrupoModal", "selectUbicacionModal", "selectCategoriaModal", "obsModal"];
let idData = [ "name","category","quantity","price","ubication","group","observations","user"];
let idButton = ["botonAgregar", "botonGuardar", "botonEditar", "botonImprimir", "botonEliminar"]

/**
 * Función que imprime los datos seleccionados, en este caso toda la lista de productos,
 * ademas de relleñar los select con datos de ubicacion, categoria y grupos
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function imprimir() {
    selectNamesArray( await consultaUbicacion(), "selectUbicacionModal");
    selectNamesArray( await consultaGrupos(), "selectGrupoModal");
    selectNamesArray( await consultaCategoria(), "selectCategoriaModal");
    readGetUrl();
}

async function paginado( paginas, limit = 10){
    const totalPages =  paginas > 32 ? 32 : paginas
    for (let index = 0; index < totalPages; index++ ) {
        document.getElementById("indice").innerHTML+= `<li class="page-item"><button class="page-link" onclick="printPage(${ index * limit })">${ index + 1 }</button></li>`;
    }
}

async function printPage( index, limit = 10){
    document.getElementById("indice").innerHTML = "";
    printTable( await consultaProductos(), index, limit );
}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

async function printTable( data, index, limit = 10 ) {
    const inversion = [];
    document.getElementById("lista").innerHTML ="";
    index == null ? index = 0 : index;
    for ( let i = index; i < index + limit; i++) {
        const { uid, name, quantity, ubication, price } = data[i];
        inversion.push( price );
        const actions = [`<button type="button" id="btnShowRegister" onclick="vistaModal('${ uid }')" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalEditar">VER</button>`]
        const rowClass = 'text-center';
        const customRow = `<td>${ [  i + 1, name, quantity, ubication, actions ].join('</td><td>') }</td>`;
        const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
        document.getElementById("lista").innerHTML += row;

        i + 1 == data.length ?  i = index + limit : i + 1;
    }

    paginado( Math.ceil( data.length / limit ) );
    const gasto = inversion.reduce(( a, b ) => a + b, 0 )
    document.querySelector("#item-total").innerHTML = `Total : ${ data.length }`;
    document.querySelector("#inversion-total").innerHTML = `Inversion : $ ${ gasto }`;
}

/* ##### MODAL FUNCIONES #################### */

/**
 * Función que muestra la vista modal del producto especifico
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-07-21
 */

function vistaModal(id) {
    const valores = window.location.search;
    const urlParams = new URLSearchParams( valores );
    const estado = urlParams.get('estado');
    let listaProductos = {};

    if ( estado === "prestamo" ) listaProductos = JSON.parse( localStorage.getItem("productosPrestados") );
    if ( estado === "eliminado" ) listaProductos = JSON.parse( localStorage.getItem("productosEliminados") );
    else {
        listaProductos = JSON.parse( localStorage.getItem("productos") );
    }

    if ( document.getElementById("nombreModal").className !== "form-control-plaintext" ) bloquearModal();
    const modalProducto = listaProductos.filter( data => data.uid === id );
    if ( localStorage.getItem('darkmode') === 'true' ) document.querySelectorAll(".form-control-plaintext").forEach( e => e.classList.add("text-white") );

    let arrayProducto = [
        modalProducto[0].name,
        modalProducto[0].quantity,
        modalProducto[0].price,
        modalProducto[0].group,
        modalProducto[0].ubication,
        modalProducto[0].category,
        modalProducto[0].observations,
    ];

    let con = 0;
    idIn.forEach(element => {
        document.getElementById(element).value = elementoVacio(arrayProducto[con]);
        con++;
    });

    document.getElementById("imgModal").srcset = modalProducto[0].img != "foto" && modalProducto[0].img != "" ? modalProducto[0].img : "";
    toggleInput(idIn, true);

    if ( modalProducto[0].active === true ) {
        dNone("botonAgregar", false);
        dNone("botonGuardar", false);
        dNone("botonEditar", true);
        dNone("botonImprimir", true);
        dNone("botonEliminar", true);
        dNone("botonRestaurar", false);

        document.getElementById("botonGuardar").setAttribute('onClick', 'createEditProduct("' + id + '");');
        document.getElementById("botonEliminarConfirmar").setAttribute('onClick', 'eliminarModalSalir("' + id + '");');
    } else {
        dNone("botonAgregar", false);
        dNone("botonGuardar", false);
        dNone("botonEditar", true);
        dNone("botonImprimir", true);
        dNone("botonEliminar", false);
        dNone("botonRestaurar",true);
        document.getElementById("botonGuardar").setAttribute('onClick', 'createEditProduct("' + id + '");');
        document.getElementById("botonRestaurar").setAttribute('onClick', 'restaurarModalSalir("' + id + '");');        
    }

    if ( modalProducto[0].ubication == "Prestamo" ) {
        dNone("botonRestaurar", true);
        document.getElementById("botonGuardar").setAttribute('onClick', 'createEditProduct("' + id + '");');
        document.getElementById("botonRestaurar").setAttribute('onClick', 'restaurarModalSalir("' + id + '");');     
    }
}

/**
 * Función que desbloqea los input del modal para ingresar datos.
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-24
 */

function editarModal() {
    toggleInput( idIn, false );
    document.getElementById("imgModal").srcset = "";
    document.formModal.cantidadModal.type = "number";
    document.formModal.precioModal.type = "number";
    if ( localStorage.getItem('darkmode') === 'true' ) document.querySelectorAll(".form-control").forEach( e =>  e.classList.remove("text-white") );
    dNone("botonGuardar", true);
    dNone("botonEditar", false);
    dNone("botonImprimir", false);
    dNone("botonEliminar", false);
}

/**
 * Función que bloquea los elemetos del modal
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-24
 */

function bloquearModal() {
    toggleInput(idIn, true);
    document.formModal.cantidadModal.type = "text";
    document.formModal.precioModal.type = "text";
}

/**
 * Función que resetea los input y botones del model
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-24
 */

function agregarModal() {
    editarModal();
    idIn.forEach( e =>  document.getElementById(e).value = "" );
    dNone("botonGuardar", false);
    dNone("botonEditar", false);
    dNone("botonImprimir", false);
    dNone("botonAgregar", true);
}

/**
 * Función que muestra cada linea de informacion en un modal
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */

function obtenerModal(element) {
    idIn.forEach( e => element.document.getElementById(e).value = document.getElementById(e).value );
    return element;
}

//Modal eliminar, animacion vista y captura de datos

function eliminarModal() {
    document.getElementById("modalEditar").style = "z-index: 1040; display: block;";
}

function eliminarModalCancelar() {
    document.getElementById("modalEditar").style = "z-index: 1060; display: block;";
}

function eliminarModalSalir(id) {
    deleteProduct(id);
    document.getElementById("modalEditar").style = "z-index: 1060; display: block;";
    myModalEliminar.toggle()
}

//modal restaurar, animacion vista y captura de datos
function restaurarModal() {
    document.getElementById("modalEditar").style = "z-index: 1040; display: block;";
}

function restaurarModalCancelar() {
    document.getElementById("modalEditar").style = "z-index: 1060; display: block;";
}

function restaurarModalSalir(id) {
    document.getElementById("modalEditar").style = "z-index: 1060; display: block;";
    myModaLRestaurar.toggle()
}

async function readGetUrl(){
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    const estado = urlParams.get('estado');
    if ( estado === "prestamo" ) return productosPrestados();
    if ( estado === "eliminado" ) return productosEliminados();
    printTable( await consultaProductos() );
}

/**
 * Permite agregar un producto y recargar la lista para que sea visualizado
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-12
 */

 async function recargar(res) {
    console.log( "DATOS EN REGARGA", res );
    console.log( "RESULTADO: ", res.ok );
    if( !!res.ok | res !== null ) alert("Error al realizar la operacion");
    myModal.toggle();
    localStorage.removeItem("productos");
    setTimeout(() => imprimir(), 1000 );
}

imprimir();
darkModeChange();