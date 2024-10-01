const roles = {
    user: ['read'],
    manager: ['read', 'write'],
    admin: ['read', 'write', 'delete']
};

const loggedInUser = {
    name: 'John',
    role: 'admin' // Este valor debería ser dinámico según el usuario autenticado
};

function checkAccess(resource) {
    const userRole = loggedInUser.role;
    const accessRights = roles[userRole];
    if (accessRights.includes(resource)) {
        console.log(`Acceso concedido para realizar la acción de '${resource}'.`);
        return true;
    } else {
        console.log(`Acceso denegado para realizar la acción de '${resource}'.`);
        return false;
    }
}

function redirigirSegunRol() {
    if (!checkAccess('read')) {
        window.location.href = '/no-access.html';
    }
}

// Llama a la función cuando se carga la página
window.addEventListener('load', redirigirSegunRol);
