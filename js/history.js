const historial = api + 'historic';

/**
 * Función que imprime la lista de consulta de historial
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaHistorial() {
    const respuesta = await consulta(historial);
    return  respuesta.data;
};

async function imprimirHistorial( index = 0, limit = 10 ) {
    const data = await consultaHistorial()
    document.getElementById("lista").innerHTML ="";
    for ( let i = index; i < index + limit; i++) {
        const { uid, userName, action, description } = data[i];
        const actions = [
            `<button type="button" id="btnShowRegister" onclick="vistaModal('${uid}')" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalEditar">VER</button>`,
        ]
        const rowClass  = 'text-right';
        const customRow = `<td>${ [ (i + 1), userName, action, description ].join('</td><td>') }</td>`;
        const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
        document.getElementById("lista").innerHTML += row;
    }

    paginado( Math.ceil( data.length / limit, limit ))
}

async function imprimirPagina( index, limit = 10 ) {
    document.getElementById("indice").innerHTML= "";
    await imprimirHistorial( index, limit );
}

async function paginado( paginas, limit = 10 ){
    
    const totalPages =  paginas > 32 ? 32 : paginas
    for (let index = 0; index < totalPages; index++ ) {
        document.getElementById("indice").innerHTML+= `<li class="page-item"><button class="page-link" onclick="imprimirPagina(${ index * limit })">${ index + 1 }</button></li>`;
    }

}

imprimirHistorial();
darkModeChange();