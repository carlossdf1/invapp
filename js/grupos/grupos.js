const grupos = api + 'product/menu';

let listaGrupos;

async function consultaGrupos() {
    let respuesta = await consulta(grupos);
    listaGrupos = respuesta.data;
    return listaGrupos;
};