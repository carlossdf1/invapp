

function cantidadProduct() {
    consulta(productos);
    return setTimeout(() => { document.getElementById("numeroProductos").innerHTML = listaProductos.length }, 500);
}

// function cantidadGroup() {
//     consulta(group);
//     setTimeout(() => { document.getElementById("numeroGrupos").innerHTML = listaProductos.length }, 500);
// }

// function cantidadUsers() {
//     consulta(users);
//     setTimeout(() => { document.getElementById("numeroUsuarios").innerHTML = listaProductos.length }, 500);
//}

cantidadProduct()




/* let numeroProductos = listaProductos.length(); */