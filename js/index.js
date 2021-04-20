const productos  = 'https://ivnapp-socket-server.herokuapp.com/api/product/products';
const menuGrupos = 'http://ivnapp-socket-server.herokuapp.com/api/product/menu';

consulta(productos);
//let listaGru = consulta menuGrupos);

let listaProductos;
let resultadoBusqueda = [];
//let menuGrupos;

function consulta( url ) { //rescata los datos de la api
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then( response => response.json() )
        .then( data => {
            console.log( data );
            //datos = JSON.parse(data);
            listaProductos = JSON.parse( JSON.stringify( data.data ) );
            imprimirLista( listaProductos );
        })
        .catch( err => console.log( err ) )
        // https://stackoverflow.com/questions/46522749/how-to-solve-redirect-has-been-blocked-by-cors-policy-no-access-control-allow

}

function imprimirLista(datos) { //imprime los datos entregados en lista html
    console.log( "DATOS RECIBIDOS" );
    let td = "</td><td>";

    for ( let i in datos ) {

        let data = datos[i];
        document.getElementById("lista").innerHTML +=
            '<tr scope="row"><td>' +
            i + td +
            data.name + td +
            data.price + td +
            data.quantity + td +
            data.category + td +
            data.ubication + td +
            data.img +
            '</td></tr>';
    }

}

function buscar() { //busca las concidencias de la busqueda y una lista de resultados

    console.log( "BUSCANDO" )
    let palabras = document.getElementById("search").value.toString();
    let busqueda = cortaPalabras( palabras );
    resultadoBusqueda = [];

    console.log( palabras );
    console.log( busqueda );
    console.log( busqueda.length );

    if ( busqueda.length >= 1 ) { //si hay elementos en la busqueda, la busqueda se realiza
        document.getElementById("lista").innerHTML = "";
        for ( let i in listaProductos ) { //recorre filas de la lista
            let data = listaProductos[i]; //toma la fila
            for ( let x in data ) { // recorre columnas de la fila
                let e = data[x]; //toma la columna 
                let contador = 0;
                for ( let b in busqueda ) { //recorre elementos de la busqueda
                    if ( e.toString().includes( busqueda[b] ) == true ) contador++;
                }
                if ( contador > 0 ) resultadoBusqueda.push( data );
            }
        }
    } else {
        console.log( "NO HAY DATOS" )
    }

    imprimirLista( resultadoBusqueda );
    console.log( resultadoBusqueda );

}

function cortaPalabras( palabras ) { //corta el string busqueda en un array de palabras para comparar

    let fila = [];
    let num = '';
    for (var i = 0; i < palabras.length; i++) {
        if (palabras[i] !== ' ') {
            num += palabras[i];
        } else if (num !== '') {
            fila.push(num);
            num = '';
        }

        if (i == palabras.length - 1 && num !== '') fila.push( num );
    }
    console.log(fila);
    return fila;
}

document.getElementById('search').addEventListener('change', buscar, false);
document.getElementById('buscar').addEventListener('click', buscar, false);
//imprimirLista(listaPro);
/* var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("http://192.168.1.95:3000/api/product/products", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error)); */