const api = "https://ivnapp-socket-server.herokuapp.com/api/";

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

        if (i == srt.length - 1 && num !== '') fila.push(num);
    }
    console.log(fila);
    return fila;
}

function consulta(url) { //rescata los datos de la api
    return new Promise((resolve, reject) => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resolve(JSON.parse(JSON.stringify(data)));
                //datos = JSON.parse(data);
            })
            .catch(err => console.log(err))
            // https://stackoverflow.com/questions/46522749/how-to-solve-redirect-has-been-blocked-by-cors-policy-no-access-control-allow
    });
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
            elementoVacio(data.observations) +
            '</td></tr>';
    }

}

function elementoVacio(dato) {
    if (dato === undefined) {
        dato = "";
    }
    return dato;
}

function buscar() { //busca las concidencias de la busqueda y una lista de resultados

    console.log("BUSCANDO")
    let palabras = document.getElementById("search").value.toString();
    let busqueda = cortaPalabras(palabras);
    let resultadoBusqueda = [];

    console.log(palabras);
    console.log(busqueda);
    console.log(busqueda.length);

    if (busqueda.length >= 1) { //si hay elementos en la busqueda, la busqueda se realiza
        document.getElementById("lista").innerHTML = "";
        for (let i in listaProductos) { //recorre filas de la lista
            let data = listaProductos[i]; //toma la fila
            let contador = 0;
            for (let b in busqueda) { //recorre elementos de la busqueda
                let coincidecia = false;
                for (let x in data) { // recorre columnas de la fila
                    let e = data[x]; //toma la columna
                    if (e != data._id && e.toString().includes(busqueda[b]) == true) coincidecia = true; //busca solo la concidencia por fila
                }
                if (coincidecia == true) contador++; //suma solo la existencia de la palabra en esa fila, no repite si conincide mas de una vez
            }
            if (contador == busqueda.length) resultadoBusqueda.push(data); //si las concidencias en al fila son iguales a la cantidad de palabras se agrega
        }
    } else {
        console.log("NO HAY DATOS")
    }

    imprimirLista(resultadoBusqueda);
    console.log(resultadoBusqueda);

    return resultadoBusqueda

}

function imprimirElemento() {
    var elemento = document.getElementById('tabla');
    var ventana = window.open('', 'PRINT', 'height=400,width=600');
    ventana.document.write('<html><head><title>' + document.title + '</title>');
    ventana.document.write("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6' crossorigin='anonymous'>");
    ventana.document.write('</head><body>');
    ventana.document.write(elemento.outerHTML);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.focus();
    //ventana.print();
    setTimeout(() => {
        ventana.print();
        ventana.close();
    }, 1000);
    // ventana.close();
    return true;
}