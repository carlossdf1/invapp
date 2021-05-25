const grupos = api + 'product/menu';
let listaGrupos;

/**
 * Función que imprime la lista de consulta de grupos
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaGrupos() {
    const respuesta   = await consulta( grupos );
    listaGrupos = respuesta.data;
    return listaGrupos;
};

/**
 * Función que imprime la lista de consulta de grupos
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

consultaGrupos();

async function imprimirGrupos() { 
    
    const datos = await consultaGrupos()
    const td    = "</td><td>";

    for ( let i in datos ) {
        document.getElementById( "lista" ).innerHTML +=
        '<tr scope="row"><td>' +
        i + td +
        datos[i].name +
        '</td></tr>';
    }
    
}