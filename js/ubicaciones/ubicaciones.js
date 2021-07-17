const ubicaciones = api + 'ubication';
let listaUbicaciones;

/**
 * Función que imprime la lista de consulta de ubicaciones
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaUbicaciones() {
    const respuesta = await consulta(ubicaciones);
    listaUbicaciones = respuesta.data;
    return listaUbicaciones;
};

async function imprimirUbicaciones() {

    const datos = await consultaUbicaciones()
    const td = "</td><td>";

    for (let i in datos) {
        document.getElementById("lista").innerHTML +=
            '<tr scope="row"><td>' + datos[i].name + '</td></tr>';
    }

}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

function imprimirLista(datos) {
    //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    const td = "</td><td>";
    let boton = "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' ";
    // datos.sort(( a, b ) => a.name.localeCompare ( b.name ));

    for (let i in datos) {

        const data = datos[i];
        const com = '"';

        document.getElementById("lista").innerHTML +=
            '<tr><td>' +
            data.name + td +
            boton + "onclick='vistaModal(" + com + data.uid + com + ");'>Ver</button>" +
            '</td></tr>';
    }

}

/**
 * 
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * 
 * @version 2021-05-26
 */

async function sendInformation() {

    const data = JSON.stringify({
        'name': 'prueba manolete',
        'user': localStorage.getItem('email')
    });
    const route = 'ubication/new';
    const result = await addData(data, route)
    console.log(result);
}