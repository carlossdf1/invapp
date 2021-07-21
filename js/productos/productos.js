const email          = localStorage.getItem('email');
const roleId         = localStorage.getItem('roleId');
const roleName       = localStorage.getItem('roleName');
const group          = JSON.parse( localStorage.getItem('group'));

const productos      = ( roleName == 'admin' || group.length > 1 ) ? api +  "product/products" : api +  `product/products/?group=${ group[0].name }`;
const prodPrestados  = ( roleName == 'admin') ? api + "product/products/?group=Prestamos"  : null;
const prodEliminados = ( roleName == 'admin') ? api + "product/products/?group=Eliminados" : null;
const ubicacion      = api + "ubication";
const categoria      = api + "category";

let myModal = new bootstrap.Modal(document.getElementById("modalEditar"));

let listaUbicacion = consultaUbicacion();
let listaCategoria = consultaCategoria();

let idIn = ["nombreModal", "cantidadModal", "precioModal", "selectGrupoModal", "selectUbicacionModal", "selectCategoriaModal", "obsModal"];
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
        localStorage.setItem("productos", JSON.stringify( respuesta.data ));
        const filtro = data.filter( ( item ) =>  item.group !== "Eliminados" && item.group !== "Prestamos" && item.active === true );
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

async function createProduct() {

    let data = JSON.stringify({

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

    await addData(data, "product/new", "POST");

    recargar();
}

async function editProduct(id) {

    console.log(id);
    let data = JSON.stringify({

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

    console.log(data);

    await addData(data, "product/" + id, "PUT");

    recargar();
}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

async function deleteProduct(id) {

    console.log(id);
    let data = JSON.stringify({ "user": email });

    console.log(data);

    await addData(data, "product/" + id, "POST");

    recargar();
}


/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

 async function deleteProduct(id) {

    console.log(id);
    let data = JSON.stringify({ "user": email });

    console.log(data);

    await addData(data, "product/" + id, "POST");

    recargar();
}

async function productosPrestados() {
    const data = JSON.parse( localStorage.getItem("productos") );
    if (data) {
        const filtro = data.filter( ( item ) =>  item.group === "Prestamos" && item.active === true );
        console.log(filtro);
        imprimirLista(filtro);
    } else {
       const query = await consulta(prodPrestados);
       imprimirLista(query)
    }
}

async function productosEliminados() {
    const data = JSON.parse( localStorage.getItem("productos") );
    if (data) {
        const filtro = data.filter( ( item ) =>  item.group === "Eliminados");
        console.log(filtro);
        imprimirLista(filtro);
    } else {
       const query = await consulta(prodEliminados);
       imprimirLista(query)
    }
}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

function imprimirLista( datos ) {
    //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    const td = "</td><td>";
    let boton = "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalEditar' ";
    const inversion = [];

    document.getElementById("lista").innerHTML ="";

    for (const i in datos ) {

        const data = datos[i];
        const com = '"';

        inversion.push( datos[i].price );
        document.getElementById("lista").innerHTML +=
        '<tr scope="row"><td>' 
        + i
        + td + data.name 
        // + td + data.price
        + td + data.quantity
        // + td +data.category
        + td + data.ubication
        //  + td + elementoVacio(data.observations)
        + td + boton + "onclick='vistaModal(" + com + data.uid + com + ");'>Ver</button>" +
        '</td></tr>';
    }

    const gasto = inversion.reduce(( a, b ) => a + b, 0 )
    document.querySelector("#item-total").innerHTML = `Total : ${ datos.length }`;
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

    const listaProductos = JSON.parse(localStorage.getItem("productos"));
    if (document.getElementById("nombreModal").className !== "form-control-plaintext") bloquearModal();
    const modalProducto = listaProductos.filter( data => data.uid === id );

    console.log(modalProducto);

    let arrayProducto = [
        modalProducto[0].name,
        modalProducto[0].quantity,
        modalProducto[0].price,
        modalProducto[0].group,
        modalProducto[0].ubication,
        modalProducto[0].category,
        modalProducto[0].observations
    ];

    let con = 0;
    idIn.forEach(element => {
        document.getElementById(element).value = elementoVacio(arrayProducto[con]);
        con++;
    });

    toggleInput(idIn, true);

    if (modalProducto[0].active === true) {
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
        /* dNone("botonRestaurar",true); */
    }

    if (modalProducto[0].ubication == "Prestamo") {
        dNone("botonRestaurar", true);
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

    toggleInput(idIn, false);

    document.formModal.cantidadModal.type = "number";
    document.formModal.precioModal.type = "number";

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

    idIn.forEach(element => {
        document.getElementById(element).value = "";
    });

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

function obtenerModal(ventana) {

    idIn.forEach(element => {
        ventana.document.getElementById(element).value = document.getElementById(element).value;
    });

    return ventana;
}

/**
 * Permite agregar un producto y recargar la lista para que sea visualizado
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-12
 */

function recargar() {
    localStorage.removeItem("productos");
    setTimeout(() => imprimir(), 1000);
}

function eliminarModal() {
    document.getElementById("modalEditar").style = "z-index: 1040; display: block;";
}

function eliminarModalCancelar() {
    document.getElementById("modalEditar").style = "z-index: 1060; display: block;";
}

function eliminarModalSalir(id) {
    deleteProduct(id);
    document.getElementById("modalEditar").style = "z-index: 1060; display: block;";
    myModal.toggle()
}

async function readGetUrl(){
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    const estado = urlParams.get('estado');
    console.log(urlParams.has('estado'));
    console.log(estado);

    if (estado === "prestamo") {
        productosPrestados();
    }

    if (estado === "eliminado") {
        productosEliminados();
    }

    else{
        imprimirLista(await consultaProductos());
    }

}