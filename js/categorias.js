const categorias = api + 'category';
let listaCategorias;

async function consultaCategorias() {
    const respuesta  = await consulta( categorias );
    listaCategorias  = respuesta.data;
    return imprimirLista(listaCategorias);
};

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

 function imprimirLista( data ) { //imprime los datos entregados en lista html

    data.sort(( a, b ) => a.name.localeCompare ( b.name ));
    
    for ( let i in data ) {
        const { uid, name } = data[i];
        const actions = [`<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'  onclick='vistaModal(" ${uid} ");'>Ver</button>`]
        const rowClass = 'text-right';
        const customRow = `<td>${ [ name ].join('</td><td>') }</td>`;
        const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
        document.getElementById("lista").innerHTML += row;
    }
}

window.addEventListener('load', async() =>{
    darkModeChange();
    await consultaCategorias();
})
