document.querySelector('#txt-email').innerHTML  = `Email:  ${ email }`;
document.querySelector('#txt-nombre').innerHTML = `Nombre: ${ nombre }`;
document.querySelector('#txt-rol').innerHTML    = `Rol:    ${ roleName }`;

for ( const i in menu ) {
    
    const element = menu[i];
    document.querySelector('#txt-menu').innerHTML += `<li class="list-group-item"> ${element.name} </li>`;
    
}

for ( const i in group ) {
    
    const element = group[i];
    document.querySelector('#txt-group').innerHTML += `<li class="list-group-item"> ${element.name} </li>`;
    
}