const users = api + "login/users";
const rols = api + "rol";
/**
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaUsuarios() {
    let respuesta = await consulta(users);
    let listaUsuarios = respuesta.data;
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    return listaUsuarios;
}

async function consultaRoles() {
    let respuesta = await consulta(rols);
    let listaRoles = respuesta.data;
    console.log(listaRoles);
    return listaRoles;
}

function listaUsuarios(datos, roles) {
    //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    console.log(datos);
    console.log(roles);

    document.getElementById("listaUsuarios").innerHTML = "";

    for (let i in datos) {
        const data = datos[i];
        let roluser = "";

        roles.every(function (element, index) {
            if (element.uid == data.role) {
                roluser = element;
                return false;
            } else return true;
        });

        let temp = document.importNode(
            document.querySelector("template").content,
            true
        );

        temp.getElementById("userNombre").innerHTML = data.name;
        temp.getElementById("userEmail").innerHTML = data.email;
        temp.getElementById("userRol").innerHTML = roluser.name;
        temp.getElementById("userEstado").innerHTML = data.active;
        temp.getElementById("userVer").setAttribute("onclick", "vistaModal('" + data.uid + "')");
        temp.getElementById("userEditar").setAttribute("onclick", "vistaEditar('" + data.uid + "')");
        temp.getElementById("userEliminar").setAttribute("onclick", "confirmDelete('" + data.uid + "')");


        let card = temp.getElementById("CardUser");
        document.getElementById("listaUsuarios").innerHTML += card.outerHTML;
    }
}

async function imprimir() {
    listaUsuarios(await consultaUsuarios(), await consultaRoles());
    darkModeChange();
}

function vistaModal(id) {

    document.getElementById("ModalLabel").innerHTML = "Detalles";

    document.getElementById("modalPassword").classList.add("d-none");
    document.getElementById("modalRol").classList.remove("d-none");
    document.getElementById("modalEstado").classList.remove("d-none");

    document.getElementById("botonAgregar").classList.add("d-none");
    document.getElementById("botonEliminar").classList.remove("d-none");
    document.getElementById("botonEditar").classList.remove("d-none");

    document.getElementById("nombreModal").classList.remove("form-control");
    document.getElementById("emailModal").classList.remove("form-control");

    document.getElementById("nombreModal").classList.add("form-control-plaintext");
    document.getElementById("emailModal").classList.add("form-control-plaintext");

    document.getElementById("nombreModal").disabled = true;
    document.getElementById("emailModal").disabled = true;
    document.getElementById("rolModal").disabled = true;
    document.getElementById("estadoModal").disabled = true;

    document.getElementById("botonEliminarConfirmar").setAttribute("onclick", "deleteUser('" + id + "')");
    loadUserData(id);
}

function vistaAgregar() {

    document.getElementById("ModalLabel").innerHTML = "Agregar Usuario";

    document.getElementById("modalPassword").classList.remove("d-none");
    document.getElementById("modalRol").classList.add("d-none");
    document.getElementById("modalEstado").classList.add("d-none");

    document.getElementById("botonAgregar").classList.remove("d-none");
    document.getElementById("botonGuardar").classList.add("d-none");
    document.getElementById("botonEliminar").classList.add("d-none");
    document.getElementById("botonEditar").classList.add("d-none");

    enableEdit();

    document.getElementById("nombreModal").value = "";
    document.getElementById("emailModal").value = "";
    document.getElementById("passwordModal").value = "";
}

function vistaEditar(id) {

    document.getElementById("modalPassword").classList.remove("d-none");
    document.getElementById("modalRol").classList.add("d-none");
    document.getElementById("modalEstado").classList.add("d-none");

    document.getElementById("botonAgregar").classList.add("d-none");
    document.getElementById("botonGuardar").classList.remove("d-none");
    document.getElementById("botonEliminar").classList.add("d-none");
    document.getElementById("botonEditar").classList.add("d-none");

    document.getElementById("ModalLabel").innerHTML = "Editar Usuario";
    enableEdit();
    loadUserData(id);
    document.getElementById("botonGuardar").setAttribute("onclick", "editUser('" + id + "')");
}


function enableEdit() {

    document.getElementById("nombreModal").disabled = false;
    document.getElementById("emailModal").disabled = false;
    document.getElementById("passwordModal").disabled = false;

    document.getElementById("nombreModal").classList.remove("form-control-plaintext");
    document.getElementById("emailModal").classList.remove("form-control-plaintext");
    document.getElementById("passwordModal").classList.remove("form-control-plaintext");

    // document.getElementById("nombreModal").classList.add("form-control","bg-dark");
    // document.getElementById("emailModal").classList.add("form-control","bg-dark");
    // document.getElementById("passwordModal").classList.add("form-control","bg-dark");

    document.getElementById("nombreModal").classList.add("form-control");
    document.getElementById("emailModal").classList.add("form-control");
    document.getElementById("passwordModal").classList.add("form-control");  

}

function loadUserData(id) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let user = usuarios.filter((data) => data.uid === id);
    user=user[0];
    console.log(user);

    document.getElementById("nombreModal").value = user.name;
    document.getElementById("emailModal").value = user.email;
    document.getElementById("rolModal").value = user.role;
    document.getElementById("estadoModal").value = user.active;
}

function confirmDelete(id) {
    document.getElementById("botonEliminarConfirmar").setAttribute("onclick", "deleteUser('" + id + "')");
}
    

async function addUser() {
    let userDatos = new Array();

    userDatos.push(document.getElementById("nombreModal").value);
    userDatos.push(document.getElementById("emailModal").value);
    userDatos.push(document.getElementById("passwordModal").value);

    let data = JSON.stringify({
        "name": userDatos[0],
        "email": userDatos[1],
        "pass": userDatos[2]
    });

    let resp = await addData(data, "login/new", "POST");

    recargar(resp,"usuarios","modalForm");

}

async function editUser(id) {
    let userDatos = new Array();

    userDatos.push(document.getElementById("nombreModal").value);
    userDatos.push(document.getElementById("emailModal").value);
    userDatos.push(document.getElementById("passwordModal").value);

    let data = JSON.stringify({
        "name": userDatos[0],
        "email": userDatos[1],
        "pass": userDatos[2]
    });

    let resp = await addData(data, "login/"+ id, "PUT");

    recargar(resp,"usuarios","modalForm");

}

async function deleteUser(id) {

    console.log(id);
    let data = JSON.stringify({ "user": email });

    console.log(data);

    let resp = await addData(data, "login/" + id, "POST");
    let myModal = new bootstrap.Modal(document.getElementById("modalEliminar"));
    myModal.hide();
    recargar(resp,"usuarios","modalForm");

}




