const email    = localStorage.getItem('email');
const nombre   = localStorage.getItem('username');
const roleId   = localStorage.getItem('roleId');
const roleName = localStorage.getItem('roleName');
const menu     = JSON.parse( localStorage.getItem('menu') );
const group    = JSON.parse( localStorage.getItem('group'));

document.querySelector('#txt-email').innerHTML  = `Email:  ${ email }`;
document.querySelector('#txt-nombre').innerHTML = `Nombre: ${ nombre }`;
document.querySelector('#txt-rol').innerHTML    = `Rol:    ${ roleName }`;

for ( const i in menu ) {
    
    const element = menu[i];
    console.log( element.name );
    document.querySelector('#txt-menu').innerHTML += `<li class="list-group-item"> ${element.name} </li>`;
    
}

for ( const i in group ) {
    
    const element = group[i];
    console.log( element.name );
    document.querySelector('#txt-group').innerHTML += `<li class="list-group-item"> ${element.name} </li>`;
    
}