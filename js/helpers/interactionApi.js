async function addData(data, route, method) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    return new Promise((resolve, reject) => {
        fetch(api + route, {
            method: method,
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        })
        .then( resp => { resolve(resp) })
        .then( result => { resolve(result) })
        .catch( error => { resolve(error) });
    });
}

 function agregar(url, myHeaders, data) {
    fetch( api + url, {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

 function consulta(url) {
    return new Promise((resolve, reject) => {
        fetch(url, { method: 'GET', redirect: 'follow' })
        .then(response => response.json())
        .then(data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
        .catch(err => console.log(err))
    });
}