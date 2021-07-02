/**
 * 
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * 
 * @version 2021-06-30
 */

async function sendInformation() {

    const data = JSON.stringify({
        "email": document.getElementById("floatingInput").value,
        "pass": document.getElementById("floatingPassword").value
    });
    const route = 'login';
    const result = await addData(data, route, 'POST')
    localStorage.setItem("login",await addData(data, route, 'POST'));
    console.log(result);
}

/* sendInformation(); */