/**
 * Función que muestra cada linea de informacion
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function imprimirNumeroProductos() {
    const numeroProductos = await consultaProductos();
    const numeroGrupos = await consultaGrupos();
    const numeroUsuarios = await consultaUsuarios();
    document.getElementById("numeroProductos").innerHTML = numeroProductos.length;
    document.getElementById("numeroGrupos").innerHTML = numeroGrupos.length;
    document.getElementById("numeroUsuarios").innerHTML = numeroUsuarios.length;
}

if (localStorage.getItem("username")) {

    const username = localStorage.getItem("username");
    document.querySelector('#title-index').innerHTML = `${ username } : Aqui podras ver los datos en tiempo real`;
    // localStorage.clear();
    imprimirNumeroProductos();

}