const historial = api + 'historic';
let listaHistorial;

/**
 * Función que imprime la lista de consulta de historial
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaHistorial() {
    const respuesta = await consulta(historial);
    listaHistorial = respuesta.data;
    return listaHistorial;
};

async function imprimirHistorial() {

    const datos = await consultaHistorial()
    const td = "</td><td>";

    for (let i in datos) {
        document.getElementById("lista").innerHTML +=
            '<tr scope="row">' 
            + td + datos[i].userName
            + td + datos[i].action
            + td + datos[i].description
            + '</tr>';
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
            data.userName + td +
            data.action + td +
            data.description + td +
            // boton + "onclick='vistaModal(" + com + data.uid + com + ");'>Ver</button>" +
            '</td></tr>';
    }

}