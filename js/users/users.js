const users = api + 'login/users';
/**
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaUsuarios() {
    let respuesta       = await consulta( users );
    let listaUsuarios   = respuesta.data;
    return  listaUsuarios;
};

function listaUsuarios( datos ) { //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    /* console.log(datos); */
 
    for (let i in datos) {
        const data = datos[i];
        console.log(data);
        document.getElementById("userNombre").innerHTML=data.name;
        document.getElementById("userDatos").innerHTML=data.email + "<br>" + data.role;
        document.getElementById("userEstado").innerHTML=data.online;

        let card = document.getElementById("CardUser");
        console.log(i);
        console.log(datos.length-1);
        if (i==datos.length-1) {
            document.getElementById("listaUsuarios").innerHTML += card.outerHTML;
            document.getElementById("CardUser").className += " d-none";
        } else {
            document.getElementById("listaUsuarios").innerHTML += card.outerHTML;

        }
    }

  }

  async function imprimir() { 
    listaUsuarios( await consultaUsuarios( ) );  
  }