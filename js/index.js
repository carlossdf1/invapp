/**
 * Función que muestra cada linea de informacion
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

const username         = localStorage.getItem("username");

async function consultaData(){
    
    const urlProds   = ( roleName == 'admin' || group.length > 1 ) ? api +  "product/products" : api +  `product/products/?group=${ group[0].name }`;
    const respuesta  = await consulta(urlProds);
    const filtro     = respuesta.data.filter( ( item ) =>  item.group !== "Eliminados" && item.group !== "Prestamos" && item.active === true );
    localStorage.setItem("productosTotal", JSON.stringify( respuesta.data ));
    localStorage.setItem("productos", JSON.stringify( filtro ));
    const dataProdFiltered = JSON.parse( localStorage.getItem("productos"));
    const dataTotalProd    = JSON.parse( localStorage.getItem("productosTotal"));
    const productosPrestados = dataTotalProd.filter( ( item ) => item.group === "Prestamos" );
    const productosEliminados = dataTotalProd.filter( ( item ) => item.group === "Eliminados" );


    if ( username ) {

        document.querySelector('#title-index').innerHTML = `${ username } : Aqui podras ver los datos en tiempo real`;
        (roleName == 'admin') ? console.log('Feature Flags de botones en INDEX') : hiddenElements();

        document.getElementById("numeroProductos").innerHTML  = dataProdFiltered.length;
        
        if( roleName == 'admin' ) {
            document.getElementById("numeroPrestados").innerHTML  =  productosPrestados.length;
            document.getElementById("numeroEliminados").innerHTML =  productosEliminados.length; 
        
        } else {
            
            document.getElementById("numeroProductos").innerHTML  =  dataProdFiltered.length;
            document.getElementById("numeroPrestados").innerHTML  =  productosPrestados.length;
            document.getElementById("numeroEliminados").innerHTML =  productosEliminados.length; 
            
        }
    
    }

}

consultaData();

function hiddenElements() {

    dNone('btn-prestado',  false );
    dNone('btn-eliminado', false );
}