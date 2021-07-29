const email          = localStorage.getItem('email');
const roleId         = localStorage.getItem('roleId');
const roleName       = localStorage.getItem('roleName');
const group          = JSON.parse( localStorage.getItem('group'));


const api = "https://inv-api.herokuapp.com/api/";
// let res;

/**
 * corta el string busqueda en un array de palabras para comparar
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

function cortaPalabras(texto) {

    let palabras = [];
    let palabra = '';
    for (let letra = 0; letra < texto.length; letra++) {
        if (texto[letra] !== ' ') {
            palabra += texto[letra];
        } else if (palabra !== '') {
            palabras.push(palabra);
            palabra = '';
        }

        if (letra == texto.length - 1 && palabra !== '') palabras.push(palabra);
    }

    console.log(palabras);
    return palabras;
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

/**
 * Función identifica si el valor esta defenido o no, si lo esta devuelve un string vacio si no devuelve el dato
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

function elementoVacio(dato) {
    (dato === undefined) ? dato = "": dato;
    (dato === null) ? dato = "": dato;
    return dato;
}

/**
 * Función que busca las concidencias de la busqueda y una lista de resultados
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */

function buscar(autobuscar) {

    console.log("###################################");
    //console.log(listaProductos);

    console.log("BUSCANDO")
    let palabras = "";
    if (autobuscar !== undefined) {
        palabras = normalizar(autobuscar);
    } else {
        palabras = normalizar(document.getElementById("search").value);
    }

    let busqueda = cortaPalabras(palabras);
    let resultadoBusqueda = [];

    console.log(busqueda);

    if (busqueda.length >= 1) {

        document.getElementById("lista").innerHTML = "";
        const listaProductos = JSON.parse(localStorage.getItem("productos"));
        for (let i in listaProductos) {

            let data = listaProductos[i];
            let contador = 0;

            for (let b in busqueda) {

                let coincidecia = false;

                for (let x in data) {
                    let e = data[x];
                    if (e != data.uid && normalizar(e).includes(busqueda[b]) == true) coincidecia = true; //busca solo la concidencia por fila
                }

                if (coincidecia == true) contador++;
            }

            if (contador == busqueda.length) resultadoBusqueda.push(data);
        }

    } else { console.log("NO HAY DATOS") }

    console.log(resultadoBusqueda);
    imprimirLista(resultadoBusqueda);
    return resultadoBusqueda

}

/**
 * Función que permite imprimir o guardar en PDF
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */

function imprimirElemento(id) {

    let elemento = document.getElementById(id);
    let ventana = window.open('', 'PRINT', 'height=400,width=600');

    ventana.document.write('<html><head><title>' + document.title + '</title>');
    ventana.document.write("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6' crossorigin='anonymous'>");
    ventana.document.write('</head><body>');
    ventana.document.write(elemento.outerHTML);
    ventana.document.write('</body></html>');

    if (elemento.id === "vistaModal") ventana = obtenerModal(ventana);

    ventana.document.close();
    ventana.focus();
    setTimeout(() => ventana.print(), 1000);
    return true;
}

/**
 * Función que formatea string
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */

function normalizar(str) {
    /* console.log(str); */
    if (str == null) {
        str = elementoVacio(str);
    } else {
        str = str.toString();
        str = str.toLowerCase();
        str = str.normalize("NFD").replace(/[\u0300-\u0301]/g, "");

    }

    return str;
}

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
 * Función que separa el name de los datos, crea un array y lo envia addOptions
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * 
 * @version 2021-05-24
 */

function selectNamesArray(lista, selectId) {

    let select = [];

    for (let i in lista) {
        const fila = lista[i];
        select.push(fila.name);
    }

    //console.log(select);
    addOptions(selectId, select);
    return select;
}

// Rutina para agregar opciones a un <select>
function addOptions(domElement, array) {

    const select = document.getElementsByName(domElement)[0];

    for (value in array) {

        const option = document.createElement("option");
        option.text = array[value];
        select.add(option);

    }
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

function plainText(elemid) {

    elemid.forEach(element => {
        document.getElementById(element).className = "form-control-plaintext";
    });

}

function readOnly(elemid, est) {

    elemid.forEach(element => {
        document.getElementById(element).readOnly = est;
    });

}

function dNone(elemid, est) {

    /* resetDnone(idButton); */
    document.getElementById(elemid).className = document.getElementById(elemid).className.replace(" d-none", "");
    if (est == false) {
        document.getElementById(elemid).className += " d-none";
    }
    if (est == true) {
        document.getElementById(elemid).className = document.getElementById(elemid).className.replace(" d-none", "");
    }
}

function resetDnone(buttons) {
    buttons.forEach(element => {
        document.getElementById(element).className = document.getElementById(element).className.replace(" d-none", "");
    });
}

function toggleInput(elemid, est) {

    let cn = est ? "form-control-plaintext" : "form-control";

    elemid.forEach(element => {
        document.getElementById(element).disabled = est;
        document.getElementById(element).className = cn;
    });

}

function noLogin() {

    let urlBase = location.href.replace(origin, "");

    if (localStorage.getItem("token") === null && urlBase !== redireccionamiento() + '/view/login/login.html') {
        location.replace(origin + redireccionamiento() + '/view/login/login.html');
    } else {
        console.log("LOGEADO");
        //gotoIndex();
    }
}

function redireccionamiento() {

    let url = "";

    if (origin === "http://127.0.0.1:5500") {
        url = "";
    } else {
        url = "/WebStore";
    }

    return url
}

function urlAdaptive() {

    //console.log("REDIRECION INICIO");

    let url = "";
    url = redireccionamiento();

    let urls = document.querySelectorAll('#url');

    urls.forEach(element => {
        let link = element.href.replace(origin, "");
        element.href = url + link;
        //console.log(element.href);
    });

    //console.log("REDIRECION FIN");

}

function closeSesion() {
    localStorage.clear();
    noLogin();
}

//urlAdaptive();
//noLogin();
window.onload = setTimeout(() => urlAdaptive(), 500);
window.onload = setTimeout(() => noLogin(), 0);


async function urlRols() {
    let url = document.getElementById("enlaces");

    if ( roleId !== '5f5b708a0c56761a0246fda7') {

        switch ( window.location.href) {
            case url.children.urlGrupos.children.url.href:
                gotoIndex();
                break;
            case url.children.urlUsuarios.children.url.href: // foo es 0, por lo tanto se cumple la condición y se ejecutara el siguiente bloque
                gotoIndex();
                // NOTA: el "break" olvidado debería estar aquí
            case url.children.urlCat.children.url.href: // No hay sentencia "break" en el 'case 0:', por lo tanto este caso también será ejecutado
                gotoIndex();
                break; // Al encontrar un "break", no será ejecutado el 'case 2:'
            case url.children.urlUbi.children.url.href:
                gotoIndex();
                break;
        }

        url.removeChild(url.children.urlGrupos);
        url.removeChild(url.children.urlUsuarios);
        url.removeChild(url.children.urlCat);
        url.removeChild(url.children.urlUbi);
    }

    /* let links=["urlGrupos","urlProductos","urlUsuarios","urlCat","urlUbi","urlNosotros"]; */
}

function gotoIndex(){
    location.replace(origin + redireccionamiento() + '/index.html');
}

setTimeout(() => urlRols(), 50);
