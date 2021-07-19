/**
 * Función que muestra cada linea de informacion
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function imprimirNumeroProductos() {

    const productos        = JSON.parse( localStorage.getItem('productos') );
    const filtroProductos  = productos.filter( data => data.group != 'Eliminados' );
    const filtroPretados   = productos.filter( data => data.group == 'Prestamos' );
    const filtroEliminados = productos.filter( data => data.group == 'Eliminados' );
    
    document.getElementById("numeroProductos").innerHTML  = filtroProductos.length;
    document.getElementById("numeroPrestados").innerHTML  = filtroPretados.length;
    document.getElementById("numeroEliminados").innerHTML = filtroEliminados.length;
}

if (localStorage.getItem("username")) {

    const username = localStorage.getItem("username");
    document.querySelector('#title-index').innerHTML = `${ username } : Aqui podras ver los datos en tiempo real`;
    imprimirNumeroProductos();

}