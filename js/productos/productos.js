const productos = api + "product/products";
let listaProductos;

async function consultaProductos() {
    let respuesta   = await consulta( productos );
    listaProductos  = respuesta.data;
    return imprimirLista( listaProductos );
};

function imprimirLista( datos ) { //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    let td = "</td><td>";

    for (let i in datos) {
        let data = datos[i];
        document.getElementById("lista").innerHTML +=
            '<tr scope="row"><td>' +
            i + td +
            data.name + td +
            data.price + td +
            data.quantity + td +
            data.category + td +
            data.ubication + td +
            elementoVacio(data.observations) +
            '</td></tr>';
    }

}

consultaProductos();