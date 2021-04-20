const pro = 'https://ivnapp-socket-server.herokuapp.com/api/product/products';
const gru = 'http://ivnapp-socket-server.herokuapp.com/api/product/menu';

consulta(pro);
//let listaGru = consulta(gru);

let lis;
let sel = [];
//let gru;

function consulta(url) { //rescata los datos de la api
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //datos = JSON.parse(data);
            lis = JSON.parse(JSON.stringify(data.data));
            imprimirLista(lis);
        })
        .catch(err => console.log(err))
        // https://stackoverflow.com/questions/46522749/how-to-solve-redirect-has-been-blocked-by-cors-policy-no-access-control-allow

}

function imprimirLista(datos) { //imprime los datos entregados en lista html
    console.log("DATOS RECIBIDOS");
    let td = "</td><td>";

    for (let i in datos) {

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

    console.log("BUSCANDO")
    let s = document.getElementById("search").value.toString();
    let bus = cortaPalabras(s);
    sel = [];

    console.log(s);
    console.log(bus);
    console.log(bus.length);

    if (bus.length >= 1) { //si hay elementos en la busqueda, la busqueda se realiza
        document.getElementById("lista").innerHTML = "";
        for (let i in lis) { //recorre filas de la lista
            let data = lis[i]; //toma la fila
            for (let x in data) { // recorre columnas de la fila
                let e = data[x]; //toma la columna 
                let con = 0;
                for (let b in bus) { //recorre elementos de la busqueda
                    let s = bus[b]; //toma la palabra de la busqueda
                    if (e.toString().includes(s) == true) { //compara elementos de la busqueda con los de la fila
                        con++; //si existe coincidencia se suma al contador 
                    }
                }
                if (con > 0) { //si el contador es mayor que cero, agrega esa fila a la seleccion
                    sel.push(data);
                }
            }
        }
    } else {
        console.log("NO HAY DATOS")
    }

    imprimirLista(sel);
    console.log(sel);

}

function cortaPalabras(srt) { //corta el string busqueda en un array de palabras para comparar

    let fila = [];
    let num = '';
    for (var i = 0; i < srt.length; i++) {
        if (srt[i] !== ' ') {
            num += srt[i];
        } else if (num !== '') {
            fila.push(num);
            num = '';
        }

        if (i == srt.length - 1 && num !== '') {
            fila.push(num);
        }
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