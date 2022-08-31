const productos      = ( roleName == 'admin' || group.length > 1 ) ? api +  "product/products" : api +  `product/products/?group=${ group[0].name }`;
const prodPrestados  = ( roleName == 'admin') ? api + "product/products/?group=Prestamos"  : null;
const prodEliminados = ( roleName == 'admin') ? api + "product/products/?group=Eliminados" : null;
const ubicacion      = api + "ubication";
const categoria      = api + "category";

let myModalEliminar = new bootstrap.Modal(document.getElementById("modalEditar"));
let myModaLRestaurar = new bootstrap.Modal(document.getElementById("modalRestaurar"));
let myModal = new bootstrap.Modal(document.getElementById("modalEditar"));

let listaUbicacion = consultaUbicacion();
let listaCategoria = consultaCategoria();
//let listaProductos = consultaProductos();

let idIn = ["nombreModal", "cantidadModal", "precioModal", "selectGrupoModal", "selectUbicacionModal", "selectCategoriaModal", "obsModal"];
let idData=[ "name","category","quantity","price","ubication","group","observations","user"];
let idButton = ["botonAgregar", "botonGuardar", "botonEditar", "botonImprimir", "botonEliminar"]
    /**
     * Función que muestra cada linea de informacion
     *
     * @author Emmanuel Correa <ebcorrea[at]gmail.com>
     * @version 2021-05-06
     */

async function consultaProductos() {

    const data = JSON.parse( localStorage.getItem("productos") );

    if (data) {
    
        const filtro = data.filter( ( item ) =>  item.group !== "Eliminados" && item.group !== "Prestamos" && item.active === true );
        return filtro;
    } else {

        const respuesta = await consulta( productos );
        const filtro = respuesta.data.filter( ( item ) =>  item.group !== "Eliminados" && item.group !== "Prestamos" && item.active === true );
        localStorage.setItem("productos", JSON.stringify( filtro ));
     
        return filtro;
    }
        

};

/**
 * Función consulta los datos de ubicacion en la api
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-24
 */

async function consultaUbicacion() {

    const data = JSON.parse( localStorage.getItem("ubicaciones") );
    if ( data ) return data;
    const respuesta = await consulta(ubicacion);
    localStorage.setItem("ubicaciones", JSON.stringify( respuesta.data ));
    return data;
};

/**
 * Función que consulta los datos de categoria a api
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * 
 * @version 2021-05-24
 */

async function consultaCategoria() {

    const data = JSON.parse( localStorage.getItem("categorias") );
    if ( data ) return data;
    const respuesta = await consulta(categoria);
    localStorage.setItem("categorias", JSON.stringify( respuesta.data ));
    return data;
};

/**
 * Función que imprime los datos seleccionados, en este caso toda la lista de productos,
 * ademas de relleñar los select con datos de ubicacion, categoria y grupos
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function imprimir() {
    readGetUrl();
    selectNamesArray(await consultaUbicacion(), "selectUbicacionModal");
    selectNamesArray(await consultaGrupos(), "selectGrupoModal");
    selectNamesArray(await consultaCategoria(), "selectCategoriaModal");

}

async function paginado( paginas, limit = 10){
    const totalPages =  paginas > 32 ? 32 : paginas
    for (let index = 0; index < totalPages; index++ ) {
        document.getElementById("indice").innerHTML+= `<li class="page-item"><button class="page-link" onclick="imprimirPagina(${ index * limit })">${ index + 1}</button></li>`;
    }

}

async function imprimirPagina( index, limit = 10){
    document.getElementById("indice").innerHTML = "";
    imprimirLista( await consultaProductos(), index, limit = 10);
}

async function createProduct() {
    const inputs = idIn.slice();
    inputs.pop();
    const valid = inputs.some( e =>  ( document.getElementById(e).value === "" ) ? true : false );

    if( !valid ){
        const data = JSON.stringify({
            "name": document.formModal.nombreModal.value,
            "img": "",
            "category": document.formModal.selectCategoriaModal.value,
            "quantity": document.formModal.cantidadModal.value,
            "price": document.formModal.precioModal.value,
            "ubication": document.formModal.selectUbicacionModal.value,
            "group": document.formModal.selectGrupoModal.value,
            "observations": document.formModal.obsModal.value,
            "user": email
        });
        const resp = await addData( data, "product/new", "POST");
        recargar(resp);
    } else {
        alert("COMPLETE EL FORMULARIO");
    }

}

async function editProduct(id) {
    const inputs = idIn.slice();
    inputs.pop();
    const valid = inputs.some( e => document.getElementById(e).value === "" ? true : false );
    if( valid === false ){
        const data = JSON.stringify({
            "name": document.formModal.nombreModal.value,
            "category": document.formModal.selectCategoriaModal.value,
            "quantity": document.formModal.cantidadModal.value,
            "price": document.formModal.precioModal.value,
            "ubication": document.formModal.selectUbicacionModal.value,
            "group": document.formModal.selectGrupoModal.value,
            "observations": document.formModal.obsModal.value,
            "user": email
        });
        const res = await addData( data, "product/" + id, "PUT");
        console.log(res);
        recargar(res);
    } else {
        alert("COMPLETE EL FORMULARIO");
    }
}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

async function deleteProduct(id) {
    const data = JSON.stringify({ "user": email });
    const res = await addData( data, "product/" + id, "POST");
    recargar(res);
}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

async function deleteProduct(id) {
    const data = JSON.stringify({ "user": email });
    const res = await addData(data, "product/" + id, "POST");
    console.log(res);
    recargar(res);
}

async function productosPrestados() {
    const pro = JSON.parse( localStorage.getItem("productosPrestados") );
    if (pro) return imprimirLista( pro );
    const query = await consulta( prodPrestados );
    console.log(query.data);
    localStorage.setItem( "productosPrestados", JSON.stringify( query.data ));
    imprimirLista(query.data);
}

async function productosEliminados() {
    const products = JSON.parse( localStorage.getItem("productosEliminados") );
    if (products) return imprimirLista(products);
    const query = await consulta(prodEliminados);
    localStorage.setItem("productosEliminados",JSON.stringify(query.data));
    imprimirLista(query.data);
}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

async function imprimirLista( data, index, limit = 10 ) {
    //imprime los datos entregados en lista html
    const inversion = [];
    document.getElementById("lista").innerHTML ="";
    index == null ? index = 0 : index;
    for ( let i = index; i < index + limit; i++) {
        const { uid, name, observations, quantity, ubication, price } = data[i];
        inversion.push( price );
        const actions = [
            `<button type="button" id="btnShowRegister" onclick="vistaModal('${uid}')" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalEditar">VER</button>`,
        ]

        const rowClass  = 'text-center';
        const customRow = `<td>${ [  i + 1, name, quantity, ubication, actions ].join('</td><td>') }</td>`;
        const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
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

        document.getElementById("botonGuardar").setAttribute('onClick', 'editProduct("' + id + '");');
        document.getElementById("botonEliminarConfirmar").setAttribute('onClick', 'eliminarModalSalir("' + id + '");');
    } else {
        dNone("botonAgregar", false);
        dNone("botonGuardar", false);
        dNone("botonEditar", true);
        dNone("botonImprimir", true);
        dNone("botonEliminar", false);
        dNone("botonRestaurar",true);
        document.getElementById("botonGuardar").setAttribute('onClick', 'editProduct("' + id + '");');
        document.getElementById("botonRestaurar").setAttribute('onClick', 'restaurarModalSalir("' + id + '");');        
    }

    if ( modalProducto[0].ubication == "Prestamo" ) {
        dNone("botonRestaurar", true);
        document.getElementById("botonGuardar").setAttribute('onClick', 'editProduct("' + id + '");');
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
    imprimirLista( await consultaProductos() );
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
    if( res.ok | res === null ){
        myModal.toggle();
        localStorage.removeItem("productos");
        setTimeout(() => imprimir(), 1000);
    } else{
        alert("Error al realizar la operacion");
    }
}
