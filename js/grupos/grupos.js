const grupos = api + 'product/menu';
let listaGrupos;

async function consultaGrupos() {
    let respuesta   = await consulta( grupos );
    listaGrupos     = respuesta.data;
    return listaGrupos;
};

async function imprimirLista() { 
    
    const datos = await consultaGrupos()
    console.log( "DATOS RECIBIDOS" );
    let td = "</td><td>";

    for ( let i in datos ) {
        let data = datos[i];
        document.getElementById( "lista" ).innerHTML +=
        '<tr scope="row"><td>' +
        i + td +
        data.name +
        '</td></tr>';
    }
    
}