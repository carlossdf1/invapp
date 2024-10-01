
function sendInformation() {
    const data = JSON.stringify({
        "email": document.getElementById("floatingInput").value,
        "pass": document.getElementById("floatingPassword").value
    });
    return REST(data, 'login', 'POST')
}
async function REST(data, route, method) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: method,
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch(api + route, requestOptions)
        .then(res => res.json())
        .then(resp => {
            if (!resp.ok) return showAlert('Error al iniciar sesion');
            // const isChecked = document.getElementById('remember-me').checked;
            const { email, name } = resp.data;
            const { _id, menuOptions, groupOptions } = resp.data.role;
            localStorage.setItem("token", resp.token);
            localStorage.setItem("email", email);
            localStorage.setItem("username", name);
            localStorage.setItem("roleId", _id);
            localStorage.setItem("roleName", resp.data.role.name);
            localStorage.setItem("menu", JSON.stringify( menuOptions ));
            localStorage.setItem("group", JSON.stringify( groupOptions ));
            showAlert(resp.msg);
            let url = redireccionamiento();
            location.replace(origin + url + '/index.html');
        })
        .catch(error => console.log('error', error));
}
function showAlert(message) {
    let element = document.getElementById("alerts");
    element.classList.remove("d-none");
    element.innerHTML = message;
}