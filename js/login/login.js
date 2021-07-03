/**
 * 
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * 
 * @version 2021-06-30
 */

async function sendInformation() {

    const data = JSON.stringify({
        "email": document.getElementById("floatingInput").value,
        "pass": document.getElementById("floatingPassword").value
    });
    
    REST(data, 'login', 'POST')
}

/**
 * Función que permite agregar atravez de un objeto un nuevo producto a la bd
 *
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorreac[at]gmail.com>
 * 
 * @version 2021-05-24
 */

 async function REST( data, route , method ) {

    const myHeaders = new Headers();
    myHeaders.append( "Content-Type", "application/json" );

    const requestOptions = {
    
        method  : method,
        headers : myHeaders,
        body    : data,
        redirect: 'follow'
    
    };

    fetch( api + route, requestOptions )
    .then( res => res.json())
    .then( resp =>  { 

        if ( resp.ok) {

            const isChecked = document.getElementById('remember-me').checked;
            
            if(isChecked){
              
                localStorage.setItem("login", JSON.stringify( resp.data ));
            }
            
            localStorage.setItem("token", resp.token );
            localStorage.setItem("email", resp.data.email);
            localStorage.setItem("username", resp.data.name);

            // showAlert(resp.msg);
            // location.href = '/WebStore/index.html';
            location.href = '/index.html';

        }else{
            showAlert('Error al iniciar sesion');
            // alert('Error al iniciar sesion');
        
        }
    })
    .catch( error   => console.log('error', error ) );
}

function showAlert( message ) {
    
    let element = document.getElementById("alerts");
    element.classList.remove("d-none");
    element.innerHTML= message;

}