const productos = api + "product/products";
let listaProductos;

async function consultaProductos() {
    let respuesta   = await consulta( productos );
    listaProductos  = respuesta.data;
    return listaProductos;
};

async function imprimir() {
    imprimirLista(await consultaProductos());
}