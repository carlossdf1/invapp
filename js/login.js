"use strict";
let emailValidator = false;
let passValidator = false;

const form = document.getElementById('form-sesion');
const inputEmail = document.getElementById('input-email');
const inputPass = document.getElementById('input-pass');

const labelErrorEmail = document.getElementById('divErrorEmail');
const labelErrorPass = document.getElementById('divErrorPass');
const labelErrorResponse = document.getElementById('divErrorResponse');

const checkRememberMe = document.getElementById('remember-me');
const btnAccess = document.getElementById('btn-access');
const element = document.getElementById("alerts");

function clearForm(){
  inputEmail.value = "";
  inputPass.value = "";
  labelErrorEmail.innerHTML = "";
  labelErrorPass.innerHTML = "";
  labelErrorResponse.innerHTML = "";
}

const sendSession = async(data) => {

    return await fetch( api + 'login' , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(data => data.json())
    .then(response => {
        if (!response.ok) {
        //   labelErrorResponse.innerHTML = 'Ingrese correctamente su correo o contraseña';
          console.log(response);
          return false;
        }
        // if (response.data.reset_pass == true ){
        //   const {id, reset_pass} = response.data;
        //   localStorage.setItem("uid", id);
        //   localStorage.setItem("reset", JSON.stringify(reset_pass)); 
        //   return true
        // }
       
        const {email, name, role } = response.data;
        const { _id, menuOptions, groupOptions } = role;
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        localStorage.setItem("role", _id);
        localStorage.setItem("roleName", role.name);
        localStorage.setItem("pages", JSON.stringify( menuOptions));
        localStorage.setItem("groups", JSON.stringify( groupOptions));
        return true;
        
    })
    .catch(error => {
        console.log('error', error)
        return false;
    });
}

function showAlert(message) {

    let element = document.getElementById("alerts");
    element.classList.remove("d-none");
    element.innerHTML = message;

}

async function sendInformation() {

    emailValidator = validateAllfields(inputEmail, labelErrorEmail);
    passValidator = validateAllfields(inputPass, labelErrorPass);

    const data = {
        "email": inputEmail.value,
        "pass": inputPass.value
    };

    const result = await sendSession(data);
    if(!result) return;  
    // if(JSON.parse(localStorage.getItem("reset"))) return location.replace( url + '/recovery.html');
    // showMessegeAlert(element, 'Iniciando sesion');
    location.replace( url + '/index.html');
}

btnAccess.addEventListener('click', async (e) => {
  e.preventDefault();
  
  if(inputEmail.value === '' || inputPass.value === '') return showMessegeAlert(element, 'Ingrese sus credenciales por favor', true);
  //Validación de correo electrónico
  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  emailValidator = regexEmail.test(inputEmail.value)
  labelErrorEmail.innerHTML =  emailValidator ? '' : 'Correo inválido';

  //Validación de contraseña
  passValidator = (inputPass.value.length <= 8) ? true : false;
  // labelErrorPass.innerHTML = passValidator ? '' : 'Contraseña demasiado corta';
  return await sendInformation();
})
  


// window.addEventListener("load", async() => {

//   await fetch( api + 'auth/SVUP', { method: 'GET', headers: { 'Content-Type': 'application/json'}})
//   .then(response => {
//     if (!response.ok) {
//       console.log('Ocurrio algun problema con el servidor');
//       showMessegeAlert(element, 'Ocurrio algun problema con el servidor - Contacte con soporte', true);
      
//     }
//     console.log('Servidor corriendo');
//     // const resp = response.json();
//     // console.log('response', resp);
//   })
//   .finally(() => {
//     const fader = document.getElementById('fader');
//     fader.classList.add("close");
//     fader.style.display = 'none';   
//   })
//   .catch((e) => console.error(e));

//   const userLogged = localStorage.getItem('email');
//   if(userLogged) return window.location.href = `${url}/index.html`
//   clearForm()

// })