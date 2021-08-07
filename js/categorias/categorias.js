const categorias = api + 'category';
let listaCategorias;

/**
 * Función que imprime la lista de consulta de categorias
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaCategorias() {
    const respuesta  = await consulta( categorias );
    listaCategorias  = respuesta.data;
    return  listaCategorias;
};

async function imprimirCategorias() {

    const datos = await consultaCategorias()
    const td    = "</td><td>";

    for ( let i in datos ) {
        document.getElementById("lista").innerHTML +=
        '<tr scope="row"><td>'  + datos[i].name + '</td></tr>';
    }

}

/**
 * Función que imprime la tabla productos en la vista
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-11
 */

 function imprimirLista( datos ) { //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    console.log(datos);
    const td    = "</td><td>";
    let boton   = "<button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' ";
    datos.sort(( a, b ) => a.name.localeCompare ( b.name ));
    
    for ( let i in datos ) {

        const data  = datos[i];
        const com   = '"';

        document.getElementById("lista").innerHTML +=
            '<tr><td>' +
            data.name + td +
            boton + "onclick='vistaModal(" + com + data.uid + com + ");'>Ver</button>" +
            '</td></tr>';
    }

}
