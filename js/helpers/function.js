const token = localStorage.getItem("token");
const email = localStorage.getItem('email');
const user = localStorage.getItem('name');
const role = Number(localStorage.getItem('role'));
const roleName = localStorage.getItem('roleName');
const pages = localStorage.getItem('pages');
const group = JSON.parse( localStorage.getItem('groups'));
const timer = Number(localStorage.getItem('timer')) || 500;

const updateStore = (id, data, jsonStrinfy = false) => {
  localStorage.setItem( id, jsonStrinfy ? JSON.stringify(data) : data ); 
}

function showSpinner(){
  spinner.innerHTML = `<div id="spinner" class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span> </div> </div>`;
}
function showSpinnerMenu(){
  return `<div id="spinner" class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span> </div> </div>`;
}

const toggleMenu = ( id, enabled = false) => enabled ? document.getElementById( id ).classList.remove('d-none') : document.getElementById( id ).classList.add("d-none");

const showBadgeBoolean = (enabled = 1) => `<span class="check-${ enabled == 1 ? 'success' : 'danger' }">${ `<i class="fa-regular fa-circle-${ enabled ? 'check' : 'xmark'}">` }</span>`

const showbtnCircle = (btns) => `<div class="btn-group" role="group">${ btns }</div>`

const changeStringNull = (data, replace = '') => !!data ? data : replace;
function createPagination(totalPages, currentPage) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Limpia los botones existentes

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.onclick = () => showData(i);
    if (i === currentPage) pageButton.classList.add('active');
    paginationContainer.appendChild(pageButton);
  }
}
const showOptions = async ( select, query = '' ) => {
  const selectElement = document.getElementById( select );
  selectElement.value = "";
  const localVariable = localStorage.getItem( select ) 
  let options = localVariable ? JSON.parse(localVariable) : [];
  if (!options.length || options === undefined) {
    const result = await consulta( query ? query : `${api}${query}` );
    const {ok, msg, data} = result;
    
    if (!ok) return document.getElementById('divErrorTables').textContent = `${msg}`;
    options = data;
    localStorage.setItem( select, JSON.stringify( options ));
  }
  // Iteramos sobre el array de opciones
  options.forEach(option => {
    const { id, name } = option;
    const optionElement = `<option value="${ id }">${ name }</option>`;
    selectElement.innerHTML += optionElement;
  });
};

// Guardar la opcion de una opcion al momento de seleccionarla
function assignedOption(selected) {
  selected.addEventListener('click', function(e) {
    if (e.target.tagName === 'OPTION') {
      const option = e.target;
      // const selectedOption = option.selected;
      
      const optionValue = option.value;
      // console.log(optionValue);
      
      return optionValue;
  
    }
  })
}
function showMessegeAlert ( alert, message, error = false, time = 3000 ) {
  alert.classList.add(`alert-${ error ? 'danger' : 'success' }`);
  alert.classList.remove(`alert-${ error ? 'success' : 'danger' }`);
  alert.textContent = message;
  alert.style.display = 'block';
  setTimeout(() => alert.style.display = 'none', time);
}
function showError( divInput = '', divError, messageError = '', show = true, timer = false ) {
  if(divInput) divInput.style.borderColor = show ? '#ff0000' : 'hsl(270, 3%, 87%)'
  divError.innerText = messageError;
  if(timer){
    const time = 2000;
    divError.style.display = 'block';
    if(divInput) setTimeout(() => divInput.style.borderColor = 'hsl(270, 3%, 87%)', time);
    setTimeout(() => divError.style.display = 'none', time);
  }
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
  
  let isFilled = verifyIsFilled(divInput, divError);
  
  if (isFilled) {
    let isNumber = validateNumber(divInput);
    let isLetters = validateLetters(divInput);
    
    if (fieldNumber) {
      
      const resultNumber = isNumber ? false : true;
      showError(divInput, divError, isNumber ? '': 'Solo se permiten numeros', resultNumber );
      return isNumber;
      
    } else {
      const resultLetters = isLetters ? false : true;
      showError(divInput, divError, isLetters ? '' : 'Solo se permiten letras', resultLetters);
      return isLetters;
    }
  } 

  showError(divInput, divError, 'Este campo es obligatorio', true);
  return false;

}
const showTitlesTable = () => {
  let titles = '';
  for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
  tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}
async function consulta( url) {
  try {
    const response = await fetch(url)
    .finally(() => {
      // toggleMenu('container-table', false)
      // toggleMenu('table_registros', true)
    })
    .catch((error)=>{ console.log('Hubo un error: ', error )});
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
const actionWithData = async ( data, uid = '', endpoint = '') => {  
  const query = uid == '' ? endpoint : `${endpoint}/${ uid }`
  return await fetch( api + query , {
    method: uid ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  
  .then( response => response.ok )
  .catch( err => {
    console.error(err)
    return false;
  });
}
async function urlRols() {
  let url = document.getElementById("pages");

  if ( role !== 2) {

    switch ( window.location.href ) {
      case url.children.logistic.children.url.href:
        location.replace(`${ url }/login.html`)
        break;
      case url.children.register.children.url.href: // foo es 0, por lo tanto se cumple la condición y se ejecutara el siguiente bloque
        location.replace(`${ url }/login.html`)
        // NOTA: el "break" olvidado debería estar aquí
      case url.children.config.children.url.href: // No hay sentencia "break" en el 'case 0:', por lo tanto este caso también será ejecutado
        location.replace(`${ url }/login.html`)
        break; // Al encontrar un "break", no será ejecutado el 'case 2:'
    }
    url.removeChild(url.children.logistic);
    url.removeChild(url.children.register);
    url.removeChild(url.children.config);
  }
}
const isSession = () => {
 if (!email && url !== `${url}/login.html`) {
    localStorage.clear();
    return window.location.href = `${ url }/login.html`;
  }
//  setTimeout(() => urlRols(), 50);
}
function noLogin() {
  const page = location.href.replace(url, "");
  if ( token === null && page !== `${url}/login.html`) return location.replace(`${ url }/login.html`)
}
function closeSession() {
  localStorage.clear();
  noLogin();
}

async function onLoadSite() {
  isSession();
  showTitlesTable();
  await showData();
  // const fader = document.getElementById('fader');
  // fader.classList.add("close");
  // fader.style.display = 'none';
}