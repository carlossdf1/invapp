/**
 * 
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * 
 * @version 2021-06-30
 */

async function sendInformation() {

    const data = JSON.stringify({
        "email": "emmanuel@admin.cl",
        "pass": "123456789"
    });
    const route = 'login';
    const result = await addData(data, route, 'POST')
    console.log(result);
}

sendInformation();