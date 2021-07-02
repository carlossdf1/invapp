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
    
    const result = await REST(data, 'login', 'POST')
    localStorage.setItem("login", JSON.stringify(result));
    // console.log(result);
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
            localStorage.setItem("login", JSON.stringify( resp.data ));
            localStorage.setItem("token", resp.token );
            location.href = 'https://carlossdf1.github.io/WebStore';

        }else{

            alert(resp.msg);
        
        }
    })
    .catch( error   => console.log('error', error ) );
}

/* sendInformation(); */