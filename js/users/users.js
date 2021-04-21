const users = api + 'login/users';

let listaUsuarios;

async function consultaUsuarios() {
    let respuesta = await consulta(users);
    listaUsuarios = respuesta.data;
    return listaUsuarios;
};