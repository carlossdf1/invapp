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