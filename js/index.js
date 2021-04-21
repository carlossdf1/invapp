consulta(productos);
setTimeout(() => { console.log("CANTIDAD DE PRODUCTOS EN LA LISTA: ", listaProductos.length) }, 1000);
setTimeout(() => { document.getElementById("numeroProductos").innerHTML = listaProductos.length }, 500);



/* let numeroProductos = listaProductos.length(); */