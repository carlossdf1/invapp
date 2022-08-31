const users = api + "login/users";
const rols = api + "rol";
const modalForm = new bootstrap.Modal(document.getElementById("modalForm"));
const userEmail = localStorage.getItem("email");

/**
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function consultaUsuarios(update = false ) {
    if ( !localStorage.getItem("usuarios") || update ) {
        const respuesta = await consulta(users);
        localStorage.setItem("usuarios", JSON.stringify(respuesta.data));
    }
    const dataLocal = JSON.parse(localStorage.getItem("usuarios"));
    return dataLocal;
}

async function consultaRoles() {
    if ( !localStorage.getItem("roles") ){
        const respuesta = await consulta( rols );
        localStorage.setItem("roles", JSON.stringify( respuesta.data ));
    }
    const dataLocal = JSON.parse( localStorage.getItem("roles") );
    return dataLocal;
}

function listaUsuarios(datos, roles) {
    document.getElementById("listaUsuarios").innerHTML = "";
    for ( const i in datos ) {
        const { name, email, uid, role, active } = datos[i];
        let roluser = "";
        roles.every(function (element, index) {
            if (element.uid == role) {
                roluser = element;
                return false;
            } else return true;
        });

        const temp = document.importNode( document.querySelector("template").content, true );
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
    listaUsuarios( await consultaUsuarios(), await consultaRoles());
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
    if ( resp.ok ) {
        await consultaUsuarios(true);
        modalForm.toggle();
    } else {
        console.log( 'Error al crear usuario - ' + resp.msg );
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
    if ( resp.ok ) {
        await  consultaUsuarios(true);
        modalForm.toggle();
    } else {
        console.log( 'Error al editar usuario - ' + resp.msg );
    }
}

async function deleteUser(id) {
    modalForm.hide();
    const data = JSON.stringify({ "user": email });
    const resp = await addData(data, "login/" + id, "POST");
    const myModal = new bootstrap.Modal(document.getElementById("modalEliminar"));
    myModal.hide();
    ( resp.ok ) ? await consultaUsuarios(true) : console.log( 'Error al eliminar usuario - ' + resp.msg );
}

imprimir();
