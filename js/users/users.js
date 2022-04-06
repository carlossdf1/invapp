const users = api + "login/users";
const rols = api + "rol";
const modalForm = new bootstrap.Modal(document.getElementById("modalForm"));
const userEmail = localStorage.getItem("email");
/**
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */
async function consultaUsuarios() {
    const respuesta = await consulta(users);
    const listaUsuarios = respuesta.data;
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    return listaUsuarios;
}

async function consultaRoles() {
    const respuesta = await consulta(rols);
    const listaRoles = respuesta.data;
    return listaRoles;
}

function listaUsuarios(datos, roles) {
    //imprime los datos entregados en lista html

    document.getElementById("listaUsuarios").innerHTML = "";

    for (let i in datos) {
        const data = datos[i];
        let roluser = "";
        const { uid, name, email, role, active } = data;
        roles.every(function (element, index) {
            if (element.uid == data.role) {
                roluser = element;
                return false;
            } else return true;
        });

        let temp = document.importNode( document.querySelector("template").content, true );

        temp.getElementById("userNombre").innerHTML = name;
        temp.getElementById("userEmail").innerHTML = email;
        temp.getElementById("userRol").innerHTML = roluser.name;
        temp.getElementById("userEstado").innerHTML = active;
        temp.getElementById("userVer").setAttribute("onclick", "vistaModal('" + uid + "')");
        temp.getElementById("userEditar").setAttribute("onclick", "vistaEditar('" + uid + "')");
        temp.getElementById("userEliminar").setAttribute("onclick", "confirmDelete('" + uid + "')");

        const card = temp.getElementById("CardUser");
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

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const user = usuarios.filter((data) => data.uid === id);
    const { name, email, role, active } = user[0];
    
    document.getElementById("nombreModal").value = name;
    document.getElementById("emailModal").value = email;
    document.getElementById("rolModal").value = role;
    document.getElementById("estadoModal").value = active;
}

function confirmDelete(id) {
    document.getElementById("botonEliminarConfirmar").setAttribute("onclick", "deleteUser('" + id + "')");
}
    

async function addUser() {

    const data = JSON.stringify({
        "name": document.getElementById("nombreModal").value,
        "email": document.getElementById("emailModal").value,
        "pass": document.getElementById("passwordModal").value,
        "user": userEmail
    });

    const resp = await addData(data, "login/new", "POST");

    if (resp.ok){
        modalForm.toggle();
        setTimeout(() => imprimir(), 1000);
    }

}

async function editUser(id) {

    const data = JSON.stringify({
        "name": document.getElementById("nombreModal").value,
        "email": document.getElementById("emailModal").value,
        "pass": document.getElementById("passwordModal").value,
        "user": userEmail
    });

    const resp = await addData(data, "login/"+ id, "PUT");

    if (resp.ok){
        modalForm.toggle();
        setTimeout(() => imprimir(), 1000);
    }

}

async function deleteUser(id) {

    modalForm.hide();
    const data = JSON.stringify({ "user": email });
    const resp = await addData(data, "login/" + id, "POST");
    const myModal = new bootstrap.Modal(document.getElementById("modalEliminar"));
    myModal.hide();
    if (resp.ok) setTimeout(() => imprimir(), 1000);
}




