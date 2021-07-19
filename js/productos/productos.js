const productos = api + "product/products";
const ubicacion = api + "ubication";
const categoria = api + "category";

const email = localStorage.getItem('email');

let myModal = new bootstrap.Modal(document.getElementById("modalEditar"));

let listaProductos;
let listaUbicacion = consultaUbicacion();
let listaCategoria = consultaCategoria();
let listProdDelete;
let listProPrestad;

let idIn = ["nombreModal", "cantidadModal", "precioModal", "selectGrupoModal", "selectUbicacionModal", "selectCategoriaModal", "obsModal"];
let idButton = ["botonAgregar", "botonGuardar", "botonEditar", "botonImprimir", "botonEliminar"]
    /**
     * Función que muestra cada linea de informacion
     *
     * @author Emmanuel Correa <ebcorrea[at]gmail.com>
     * @version 2021-05-06
     */

async function consultaProductos() {
    const respuesta = await consulta(productos);
    listaProductos = respuesta.data;
    localStorage.setItem("productos", JSON.stringify(listaProductos));
    const data = JSON.parse( localStorage.getItem("productos") );
    return data;
};

/**
 * Función consulta los datos de ubicacion en la api
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * 
 * @version 2021-05-24
 */

async function consultaUbicacion() {
    const respuesta = await consulta(ubicacion);
    listaUbicacion = respuesta.data;
    return listaUbicacion;
};

/**
 * Función que consulta los datos de categoria a api
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * 
 * @version 2021-05-24
 */

async function consultaCategoria() {
    const respuesta = await consulta(categoria);
    listaCategoria = respuesta.data;
    return listaCategoria;
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
    imprimirLista(await consultaProductos());
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

function imprimirLista( datos, eliminados = false, prestados = false ) {
    //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    const td = "</td><td>";
    let boton = "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalEditar' ";
    const inversion = [];
    let filtro;
    if ( eliminados ) filtro = datos.filter( ( item ) =>  item.group === "Eliminados" );
    if ( prestados )  filtro = datos.filter( ( item ) =>  item.group !== "Prestamos" );
    if ( !eliminados && !prestados ) filtro = datos.filter( ( item ) =>  item.group !== "Eliminados" && item.group !== "Prestamos" && item.active === true );

    for (let i in filtro ) {

        const data = filtro[i];
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
    document.querySelector("#item-total").innerHTML = `Total : ${ filtro.length }`;
    document.querySelector("#inversion-total").innerHTML = `Inversion : $ ${ gasto }`;

}

/* ##### MODAL FUNCIONES #################### */

/**
 * Función que muestra la vista modal del producto especifico
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-24
 */

function vistaModal(id) {

    if (document.getElementById("nombreModal").className !== "form-control-plaintext") bloquearModal();
    const modalProducto = listaProductos.filter(listaProductos => listaProductos.uid === id);

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