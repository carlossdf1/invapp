const productos = api + "product/products";

let listaProductos;

async function consultaProductos() {
    let respuesta = await consulta(productos);
    listaProductos = respuesta.data;
    return listaProductos;
};

async function imprimir() {
    imprimirLista(await consultaProductos());
}

let myModal = document.getElementById('myModal')
let myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function() {
    myInput.focus()
});