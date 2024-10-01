const email = localStorage.getItem('email');
const nombre = localStorage.getItem('username');
const roleId = localStorage.getItem('roleId');
const roleName = localStorage.getItem('roleName');
const menu = JSON.parse( localStorage.getItem('menu') );
const group = JSON.parse( localStorage.getItem('group'));


const toggleMenu = ( id, enabled = false) => enabled ? document.getElementById( id ).classList.remove('d-none') : document.getElementById( id ).classList.add("d-none");

const showBadgeBoolean = (enabled = 1) => `<span class="badge text-bg-${ enabled == 1 ? 'success' : 'danger' }">${ enabled ? 'ACTIVADO' : 'DESACTIVADO' }</span>`

const showbtnCircle = (btns) => `<div class="btn-group" role="group">${ btns }</div>`

const changeStringNull = (data, replace = '') => !!data ? data : replace;
function createPagination(totalPages, currentPage) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Limpia los botones existentes

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.onclick = () => showTablePagination(i);
    if (i === currentPage) pageButton.classList.add('active');
    paginationContainer.appendChild(pageButton);
  }
}

const showOptions = async ( select, query = api + select ) => {
    const selectElement = document.getElementById( select );
    selectElement.value = "";
    let options = JSON.parse(localStorage.getItem( select )) || [];
    
    if (!options.length) {
      const result = await consulta( !!query ? query : api + select );
      options = result.data;
      localStorage.setItem( select, JSON.stringify( options ));
    }
    // Iteramos sobre el array de opciones
    options.forEach(option => {
      const { id, name } = option;
      const optionElement = `<option value="${ id }">${ name }</option>`;
      selectElement.innerHTML += optionElement;
    });
  };
  function showMessegeAlert ( alert, message, error = false, time = 3000 ) {
    alert.classList.add(`alert-${ error ? 'danger' : 'success' }`);
    alert.classList.remove(`alert-${ error ? 'success' : 'danger' }`);
    alert.textContent = message;
    alert.style.display = 'block';
    setTimeout(() => alert.style.display = 'none', time);
  }
  function showError( divInput, divError, messageError = '', show = true ) {
    divInput.style.borderColor = show ? '#ff0000' : 'hsl(270, 3%, 87%)'
    divError.innerText = messageError;
  }
  function verifyIsFilled( input, divError ) {
    divError.style.display = input.value == '' ?  'block' : 'none';
    return input.value == '' ? false : true;
  }
  function  validateLetters( input ) {
    const regex = /[A-z]/g;
    return regex.test(input.value) ? true : false;
  }
  function validateNumber(input) {
    const regex = /^[0-9]*$/;
    return regex.test(input.value) ? true : false;
  }
  function validateAllfields( divInput, divError, fieldNumber = false ) {
    if(verifyIsFilled(divInput, divError)){
      if (fieldNumber) {
        if (validateNumber(divInput)) {
          showError(divInput, divError, '', false);
          return true;
        } 
        showError(divInput, divError, 'Solo se permiten numeros', true);
        return false;
      } else {
        if(validateLetters(divInput)) {
          showError(divInput, divError, '', false);
          return true;
        }
        showError(divInput, divError, 'Solo se permiten letras', true);
        return false;
      }
    } else {
      showError(divInput, divError, 'Este campo es obligatorio');
      return false;
    }
  }

  const showTitlesTable = () => {
    let titles = '';
    for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
    tableTitles.innerHTML = `<tr>${ titles }</tr>`;
  }
  async function consulta( url ) {
    try {
      const response = await fetch(url).catch((error)=>{ console.log('Hubo un error: ', error )});
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
//####################### CONTROL DE SESION #########################################
//DETECTA SI EL USUARIO ESTA LOGUEADO Y SI NO LO ESTA LO ENVIA A LOGIN
function noLogin() {
    const url = location.href.replace(origin, "");
    const redirect = redireccionamiento() + '/view/login/login.html';
    if(localStorage.getItem("token") === null && url !== redirect)  return location.replace(origin + redirect)
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
}
//###################################################### FUNCIONES DE VISTA ################################################################

//################### ADMINISTRADOR DE MODO OBSCURO #################################
//SELECIONA EL MODO OBSCURO Y GUARDA EL ESTADO
function selectMode(){
    localStorage.setItem('darkmode', document.getElementById("darkMode").checked ? true : false)
    darkModeChange();
}
//CAMBIA A MODO OBSCURO AL CARGAR LAS PAGINAS
function darkModeChange() {
    console.log("BUSCA SI EL CAMBIO ESTA HECHO Y MANDA LA ORDEN DE MODO OBSCURO");
    console.log(localStorage.getItem('darkmode'));
    if (localStorage.getItem('darkmode') !== 'true') return  lightMode();
    darkMode();
    setTimeout(() => { document.getElementById("darkMode").checked = true }, 100);
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


//################### ADMINISTRADOR DE VISUALIZACION DE FORMULARIOS #################
// CONVIERTE INPUTS EDITABLES A LABELS BLOQUEADOS VISUALMENTE Y VICEVERSA
function toggleInput(elemid, est) {
    elemid.forEach(element => {
        document.getElementById( element ).disabled = est;
        document.getElementById( element ).classList.remove( est ? "form-control" : "form-control-plaintext" );
        document.getElementById( element ).classList.add( est ? "form-control-plaintext" : "form-control" );
    });
}
// CONVIERTE INPUTS A LABELS VISUALMENTE 
function plainText(elemid) {
   return elemid.forEach( element => document.getElementById( element ).className = "form-control-plaintext" );
}
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

const gotoIndex = () => location.replace( origin + redireccionamiento() + '/index.html');
const redireccionamiento = () => origin === "http://127.0.0.1:5501" || origin.includes('http://192.168.1.') ? "" : "/invapp";   
const elementoVacio = (dato) => !!dato ? dato : '';

function urlAdaptive() {
    const urls = document.querySelectorAll('#url');

    urls.forEach( e => {
        const link = e.href.replace( origin, "" );
        e.href = redireccionamiento() + link;
    });
}

// setTimeout(() => urlRols(), 50);
// window.onload = setTimeout(() => urlAdaptive(), 500);
// window.onload = setTimeout(() => noLogin(), 0);