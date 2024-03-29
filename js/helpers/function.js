const email = localStorage.getItem('email');
const nombre = localStorage.getItem('username');
const roleId = localStorage.getItem('roleId');
const roleName = localStorage.getItem('roleName');
const menu = JSON.parse( localStorage.getItem('menu') );
const group = JSON.parse( localStorage.getItem('group'));

// ###################################################### FUNCIONES DE CONTROL ##############################################################

/**
 * Función que busca las concidencias de la busqueda y una lista de resultados
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */
function buscar(autobuscar) {

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

    // console.log(resultadoBusqueda);
    // printTable(resultadoBusqueda);
    return resultadoBusqueda

}

//####################### CONTROL DE SESION #########################################
//DETECTA SI EL USUARIO ESTA LOGUEADO Y SI NO LO ESTA LO ENVIA A LOGIN
function noLogin() {

    let urlBase = location.href.replace(origin, "");

    if (localStorage.getItem("token") === null && urlBase !== redireccionamiento() + '/view/login/login.html') {
        location.replace(origin + redireccionamiento() + '/view/login/login.html');
    } else {
        console.log("LOGEADO");
        //gotoIndex();
    }
}
//CIEERRA SESION Y BORRA LOS DATOS DE LA SESION
function closeSesion() {
    localStorage.clear();
    noLogin();
}

//################### ADMINISTRADOR ACCESO A LAS VISTAS SEGUN ROLES #################
async function urlRols() {
    let url = document.getElementById("enlaces");

    if ( roleId !== '5f5b708a0c56761a0246fda7') {

        switch ( window.location.href ) {
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
            case url.children.urlHis.children.url.href:
                gotoIndex();
                break;
        }

        url.removeChild(url.children.urlGrupos);
        url.removeChild(url.children.urlUsuarios);
        url.removeChild(url.children.urlCat);
        url.removeChild(url.children.urlUbi);
        url.removeChild(url.children.urlHis);
    }

    /* let links=["urlGrupos","urlProductos","urlUsuarios","urlCat","urlUbi","urlNosotros"]; */
}

setTimeout(() => urlRols(), 50);

//###################################################### FUNCIONES DE VISTA ################################################################

//################### ADMINISTRADOR DE MODO OBSCURO #################################
//SELECIONA EL MODO OBSCURO Y GUARDA EL ESTADO
function selectMode(){
    console.log("SELECCION DE MODO OBSCURO");
    if (document.getElementById("darkMode").checked) {
        localStorage.setItem('darkmode', true)
    } else { 
        localStorage.setItem('darkmode', false)
    }
    darkModeChange();
}
//CAMBIA A MODO OBSCURO AL CARGAR LAS PAGINAS
function darkModeChange() {
    console.log("BUSCA SI EL CAMBIO ESTA HECHO Y MANDA LA ORDEN DE MODO OBSCURO");
    console.log(localStorage.getItem('darkmode'));
    if (localStorage.getItem('darkmode')==='true') {
        darkMode();
        setTimeout(() => { document.getElementById("darkMode").checked = true }, 100);
    } else {
        lightMode();
    }
}
// RESTAURA EL MODO NORMAL O CLARO
function lightMode(){
    document.body.classList.remove("darkmode");
    document.querySelectorAll("table").forEach(element => { element.classList.remove("table-dark") });
    document.querySelectorAll(".modal-content").forEach(element => { element.classList.remove("bg-dark","text-white") });
    document.querySelectorAll(".btn-close").forEach(element => { element.classList.remove("btn-close-white") });
    document.querySelectorAll(".form-control-plaintext").forEach(element => { element.classList.remove("text-white") });
    document.querySelectorAll(".card").forEach(element => { element.classList.remove("bg-dark","text-white") });
}
//REALIZA EL CAMBIO VISUAL A MODO OBSCURO
function darkMode(){
    console.log("ACTIVA EL MODO OBSCURO");
    document.body.classList.add("darkmode");
    document.querySelectorAll("table").forEach( element => element.classList.add("table-dark") );
    document.querySelectorAll("thead").forEach( element => element.classList.add("primary-color"));
    document.querySelectorAll(".modal-content").forEach( element => element.classList.add("bg-dark","text-white") );
    document.querySelectorAll(".btn-close").forEach( element => element.classList.add("btn-close-white") );
    document.querySelectorAll(".form-control-plaintext").forEach( element => element.classList.add("text-white") );
    document.querySelectorAll(".card").forEach( element => element.classList.add("bg-dark","text-white") );
}

//################### BLOQUEA INPUTS DE TEXTO Y SELECT ##############################
function readOnly( elementId, est ) { elementId.forEach(e => document.getElementById(e).readOnly = est ); }

//################### ADMINISTRADOR DE ELEMENTOS VISIBLES ###########################
// MUESTRA O OCULTA ELEMENTOS PUNTUALMENTE
function dNone( elementId, est = false ) {
    /* resetDnone(idButton); */
    document.getElementById(elementId).className = document.getElementById(elementId).className.replace(" d-none", "");
    ( est ) ? document.getElementById(elementId).className = document.getElementById(elementId).className.replace(" d-none", "") : document.getElementById(elementId).className += " d-none";
}
//MUESTRA ELEMENTOS PUESTOS EN UN ARRAYLIST
function resetDnone( buttons ) {
    buttons.forEach( e => document.getElementById( e ).className = document.getElementById( e ).className.replace(" d-none", "") );
}

//################### ADMINISTRADOR DE VISUALIZACION DE FORMULARIOS #################
// CONVIERTE INPUTS EDITABLES A LABELS BLOQUEADOS VISUALMENTE Y VICEVERSA
function toggleInput(elemid, est) {
    const cn = est ? "form-control-plaintext" : "form-control";
    const cn2 = est ? "form-control" : "form-control-plaintext";

    elemid.forEach(element => {
        document.getElementById( element ).disabled = est;
        document.getElementById( element ).classList.remove( cn2 );
        document.getElementById( element ).classList.add( cn );
    });

}
// CONVIERTE INPUTS A LABELS VISUALMENTE 
function plainText(elemid) {
    elemid.forEach( element => document.getElementById( element ).className = "form-control-plaintext" );
}

//################### ADMINISTRADOR DE SELECTS ######################################
/**
 * Función que separa el name de los datos, crea un array y lo envia addOptions
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * 
 * @version 2021-05-24
 */
function selectNamesArray( lista, selectId ) {
    let select = [];
    for ( const i in lista ) {
        const fila = lista[i];
        select.push(fila.name);
    }
    addOptions( selectId, select );
    return select;
}
// Rutina para agregar opciones a un <select>
function addOptions( domElement, array ) {
    const select = document.getElementsByName( domElement )[0];
    for ( value in array ) {
        const option = document.createElement("option");
        option.text = array[ value ];
        select.add( option );
    }
}

//################### FUNCION DE IMPRESION EN PDF DE VISTAS #########################
/**
 * Función que permite imprimir o guardar en PDF
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */
 function imprimirElemento(id) {
    const element = document.getElementById(id);
    const ventana = window.open('', 'PRINT', 'height=400,width=600');
    const movil = navigator.userAgent.search(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|Firefox/) > -1;  // Detecta si es movil
     
    ventana.document.write('<html><head><title>' + document.title + '</title>');
    ventana.document.write("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6' crossorigin='anonymous'>");
    ventana.document.write('<script>window.blur();</script>');
    ventana.document.write('</head><body>');
    ventana.document.write( element.outerHTML );
    ventana.document.write('<script src="../../js/helpers/function.js" type="text/javascript"></script>');
    ventana.document.write('<script>lightMode();</script>');
    ventana.document.write('<script>window.onload=window.print;</script>');


    if( !movil ){ //si no es movil
        ventana.document.write('<script>window.onafterprint=window.close;</script>');
    } else { //si es movil
        ventana.document.write('<script>window.onafterprint=window.focus;</script>');
        ventana.document.write('<script>window.onfocus=window.close;</script>');
    }

    ventana.document.write('</body></html>');
    ventana.document.close();

    if ( element.id === "vistaModal" ) ventana = obtenerModal( ventana );
    ventana.focus();
    return true;
}

//######################## REDIRECCIONAMIENTO ######################################
function gotoIndex(){
    location.replace( origin + redireccionamiento() + '/index.html');
}

function redireccionamiento() {
    const url = origin === "http://127.0.0.1:5500" || origin.includes('http://192.168.1.') ? "" : "/invapp";
    return url;
}

function urlAdaptive() {
    const url = redireccionamiento();
    const urls = document.querySelectorAll('#url');

    urls.forEach( e => {
        const link = e.href.replace( origin, "" );
        e.href = url + link;
    });
}

window.onload = setTimeout(() => urlAdaptive(), 500);
window.onload = setTimeout(() => noLogin(), 0);

//#################################################### HELPERS DE DATOS ##############################################################################

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
 * Función identifica si el valor esta defenido o no, si lo esta devuelve un string vacio si no devuelve el dato
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
function elementoVacio(dato) {
    ( dato === undefined || dato === null) ? dato = "": dato;
    return dato;
}

/**
 * Función que formatea string
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @version 2021-05-06
 */
function normalizar(str) {
    if (str == null) {
        str = elementoVacio(str);
    } else {
        str = str.toString();
        str = str.toLowerCase();
        str = str.normalize("NFD").replace(/[\u0300-\u0301]/g, "");
    }
    return str;
}