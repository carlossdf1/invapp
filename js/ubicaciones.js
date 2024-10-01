const ubicaciones = api + 'ubication';
let listaUbicaciones;

/**
 * Función que imprime la lista de consulta de ubicaciones
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaUbicaciones() {
    const respuesta = await consulta( ubicaciones );
    listaUbicaciones = respuesta.data;
    return imprimirLista(listaUbicaciones);
};

function imprimirLista( data ) { //imprime los datos entregados en lista html

    data.sort(( a, b ) => a.name.localeCompare ( b.name ));
    
    for ( let i in data ) {
        const { uid, name } = data[i];
        const actions = [`<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='vistaModal(" ${uid} ");'>Ver</button>`]
        const rowClass = 'text-right';
        const customRow = `<td>${ [  name ].join('</td><td>') }</td>`;
        const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
        document.getElementById("lista").innerHTML += row;
    }
}

async function sendInformation() {
    const data = JSON.stringify({
        'name': 'prueba manolete',
        'user': localStorage.getItem('email')
    });
    const route = 'ubication/new';
    const result = await addData(data, route)
    console.log(result);
}

window.addEventListener('load', async() => {
    darkModeChange();
    await consultaUbicaciones();
})
