const grupos = api + 'group/menu';
let listaGrupos;

async function consultaGrupos() {
    const respuesta = await consulta(grupos);
    listaGrupos = respuesta.data;
    return imprimirLista(listaGrupos);
};

function imprimirLista( data ) { //imprime los datos entregados en lista html

    data.sort(( a, b ) => a.name.localeCompare ( b.name ));
    
    for ( let i in data ) {
        const { uid, name } = data[i];
        // const actions = [`<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'  onclick='vistaModal(" ${uid} ");'>Ver</button>`]
        const rowClass = 'text-right';
        const customRow = `<td>${ [ name ].join('</td><td>') }</td>`;
        const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
        document.getElementById("lista").innerHTML += row;
    }
}

window.addEventListener('load', async() =>{
    darkModeChange();
    await consultaGrupos();
})