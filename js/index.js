/**
 * Función que muestra cada linea de informacion
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
 const username   = localStorage.getItem("username");
 const prod       = JSON.parse( localStorage.getItem('productos') );

 async function imprimirNumeroProductos() {

    
    const filtroProductos  = (roleName == 'admin') ? prod.filter( data => data.group !== 'Eliminados' ) : prod;
    const filtroPretados   = (roleName == 'admin') ? prod.filter( data => data.group === 'Prestamos' )  : null;
    const filtroEliminados = (roleName == 'admin') ? prod.filter( data => data.group === 'Eliminados' ) : null;
    
    document.getElementById("numeroProductos").innerHTML  = (filtroProductos  != null) ? filtroProductos.length  : 0;
    document.getElementById("numeroPrestados").innerHTML  = (filtroPretados   != null) ? filtroPretados.length   : 0;
    document.getElementById("numeroEliminados").innerHTML = (filtroEliminados != null) ? filtroEliminados.length : 0;
}

async function initState() {

    if ( username ) {

        document.querySelector('#title-index').innerHTML = `${ username } : Aqui podras ver los datos en tiempo real`;
        console.log(prod);

        if (prod == null) {

            if(roleName == 'admin') {
                const query = await consultaProductos();
                query ??  imprimirNumeroProductos();
            } else {

                console.log('Estoy dentro de este IF')
                const respuesta = await consulta( productos );
                const filtro    = respuesta.data.filter( ( item ) =>  item.group == group[0].name && item.active === true );
                console.log('=========================')
                console.log(filtro);
                localStorage.setItem("productos", JSON.stringify( filtro ));
               
                ( filtro ) ? imprimirNumeroProductos() : null;
                
                
            }
    
        } else {
            imprimirNumeroProductos();
        }
    
    }

}

initState();