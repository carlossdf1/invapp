// ###################################################### FUNCIONES DE MODELO ###############################################################

/**
 * Función que permite agregar atravez de un objeto un nuevo producto a la bd
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-24
 */
async function addData(data, route, method) {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {

        method: method,
        headers: myHeaders,
        body: data,
        redirect: 'follow'

    };

    return new Promise((resolve, reject) => {
        fetch(api + route, requestOptions)
            .then( resp => { resolve(resp) })
            .then( result => { resolve(result) })
            .catch( error => { resolve(error) });
    });
}

/**
 * Permite agregar elemento a la BD indicandole la url, el header y los datos
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * 
 * @version 2021-05-24
 */
 function agregar(url, myHeaders, data) {

    const requestOptions = {

        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'

    };

    console.log(requestOptions);

    fetch(api + url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

/**
 * Función que rescata los datos de la api
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */
 function consulta(url) {
    return new Promise((resolve, reject) => {
        const requestOptions = { method: 'GET', redirect: 'follow' };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => { resolve(JSON.parse(JSON.stringify(data))); })
            .catch(err => console.log(err))
    });
}