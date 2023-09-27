async function consultaProductos( update = false ) {
    if ( !localStorage.getItem("productos") || update ) {
        const respuesta = await consulta( productos );
        const filtro = respuesta.data.filter( ( item ) =>  item.group !== "Eliminados" && item.group !== "Prestamos" && item.active === true );
        localStorage.setItem("productos", JSON.stringify( filtro ));  
    } 
    return JSON.parse( localStorage.getItem("productos") );
};

async function consultaUbicacion() {
    const data = JSON.parse( localStorage.getItem("ubicaciones") );
    if ( localStorage.getItem("ubicaciones") ) return data;
    const respuesta = await consulta( ubicacion );
    localStorage.setItem("ubicaciones", JSON.stringify( respuesta.data ));
    return data;
};

async function consultaCategoria() {
    const data = JSON.parse( localStorage.getItem("categorias") );
    if ( data ) return data;
    const respuesta = await consulta(categoria);
    localStorage.setItem("categorias", JSON.stringify( respuesta.data ));
    return data;
};

async function productosPrestados() {
    const pro = JSON.parse( localStorage.getItem("productosPrestados") );
    if (pro) return printTable( pro );
    const query = await consulta( prodPrestados );
    console.log(query.data);
    localStorage.setItem( "productosPrestados", JSON.stringify( query.data ));
    printTable(query.data);
}

async function productosEliminados() {
    const products = JSON.parse( localStorage.getItem("productosEliminados") );
    if (products) return printTable(products);
    const query = await consulta(prodEliminados);
    localStorage.setItem("productosEliminados",JSON.stringify(query.data));
    printTable(query.data);
}

async function createEditProduct(id){
    const inputs = idIn.slice();
    inputs.pop();
    const valid = inputs.some( e => document.getElementById(e).value === "" ? true : false );
    if( valid === true ) return alert("COMPLETE EL FORMULARIO");
    const data = JSON.stringify({
        "name": document.formModal.nombreModal.value,
        "category": document.formModal.selectCategoriaModal.value,
        "quantity": document.formModal.cantidadModal.value,
        "price": document.formModal.precioModal.value,
        "ubication": document.formModal.selectUbicacionModal.value,
        "group": document.formModal.selectGrupoModal.value,
        "observations": document.formModal.obsModal.value,
        "user": email
    });
    const res = await addData( data, `product/${ id ?? 'new'}`, !id ? 'CREATE' : 'PUT');
    recargar(res);
}

async function deleteProduct(id) {
    const data = JSON.stringify({ "user": email });
    const res = await addData(data, "product/" + id, "POST");
    consultaProductos(true);
    recargar(res);
}