const users = api + 'login/users';
const rols = api + 'rol';
/**
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaUsuarios() {
    let respuesta = await consulta(users);
    let listaUsuarios = respuesta.data;
    return listaUsuarios;
};

async function consultaRoles() {
    let respuesta = await consulta(rols);
    let listaRoles = respuesta.data;
    console.log(listaRoles);
    return listaRoles;
};

function listaUsuarios(datos, roles) { //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    console.log(datos);
    console.log(roles);

    for (let i in datos) {
        const data = datos[i];
        let roluser = "";

        roles.every(function(element, index) {
            if (element.uid == data.role) {
                roluser = element;
                return false;
            } else return true;
        });

        document.getElementById("userNombre").innerHTML = data.name;
        document.getElementById("userDatos").innerHTML = data.email + "<br>" + roluser.name;
        document.getElementById("userEstado").innerHTML = data.active;

        let card = document.getElementById("CardUser");

        if (i == datos.length - 1) {
            document.getElementById("listaUsuarios").innerHTML += card.outerHTML;
            document.getElementById("CardUser").className += " d-none";
        } else {
            document.getElementById("listaUsuarios").innerHTML += card.outerHTML;

        }
    }

}

async function imprimir() {
    listaUsuarios(await consultaUsuarios(), await consultaRoles());
}