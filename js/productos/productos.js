const productos = api + "product/products";
let listaProductos = "";

/**
 * Función que muestra cada linea de informacion
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaProductos() {
    const respuesta = await consulta(productos);
    listaProductos = respuesta.data;
    return listaProductos;
};

/**
 * Función que imprime los datos seleccionados, en este caso toda la lsita de productos
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function imprimir() { imprimirLista(await consultaProductos()); }

/* let myModal = document.getElementById('myModal');
let myInput = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', function() { myInput.focus() }); */