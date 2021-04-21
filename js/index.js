async function imprimirNumeroProductos() {
    let numeroProductos = await consultaProductos();
    let numeroGrupos = await consultaGrupos();
    let numeroUsuarios = await consultaUsuarios();
    document.getElementById("numeroProductos").innerHTML = numeroProductos.length;
    document.getElementById("numeroGrupos").innerHTML = numeroGrupos.length;
    document.getElementById("numeroUsuarios").innerHTML = numeroUsuarios.length;
}

imprimirNumeroProductos();