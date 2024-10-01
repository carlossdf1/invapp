const username = localStorage.getItem("name");
const title = document.querySelector('#title-index');
const boxNumerosProductos = document.getElementById("numeroProductos");
const boxNumerosPrestados = document.getElementById("numeroPrestados");
const boxNumerosEliminados =  document.getElementById("numeroEliminados");
const loader = document.querySelectorAll('h2');

async function consultaData() {
    title.innerHTML = `${ username } : Aqui podras ver los datos en tiempo real`;
    loader.forEach( e => e.innerHTML = showSpinnerMenu());
    // console.log(Loader);
    
    const urlProds = ( roleName == 'admin' || group.length > 1 ) ? api +  "product/products" : api + `product/products/?group=${ group[0].name }`;
    const response = await consulta( urlProds );
    const { ok, msg , data } = response;

    if (!ok) return console.error('Error:', msg);

    const filtro = data.filter( ( item ) =>  item.group !== "Eliminados" && item.group !== "Prestamos" && item.active === true );
    
    localStorage.setItem("productosTotal", JSON.stringify( data ));
    localStorage.setItem("productos", JSON.stringify( filtro ));
    
    const dataProdFiltered = filtro;
    // const dataTotalProd = JSON.parse( localStorage.getItem("productosTotal") );
    const productosPrestados = data.filter( ( item ) => item.group === "Prestamos" );
    const productosEliminados = data.filter( ( item ) => item.group === "Eliminados" );

    // if( roleName != 'admin' ) hiddenElements();
    boxNumerosProductos.innerHTML = dataProdFiltered.length;
    boxNumerosPrestados.innerHTML = productosPrestados.length;
    boxNumerosEliminados.innerHTML = productosEliminados.length | 0;

}

// function hiddenElements() {
//     dNone('btn-prestado',  false );
//     dNone('btn-eliminado', false );
// }

window.addEventListener("load", async() => {
    // darkModeChange();
    await consultaData();
})