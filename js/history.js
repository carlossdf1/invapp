let currentPage = 1;
let limitInfo = 8;

// Show Alert
const alertMessage = document.getElementById('alerts');

// Show table 
const titlesTable  = ['NOMBRE', 'ACCION', 'DESCRIPCION'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');
const containerTable = document.getElementById('container-table')


async function showData() {
    const response = await consulta(api + 'historic').finally(() => {
        
    })
    const { ok, msg, data } = response;    
    if (!ok) return console.log('Error:', msg);
    return  printList(data);
};

const printList = ( data, page = currentPage, total = 1 ) => {
    containerTable.innerHTML = ""
    table.innerHTML = "";
    
    if( data.length === 0 || !data ) {
        showMessegeAlert( alertMessage, 'No se encontraron registros', true );
        return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
    }
  
    for (const i in data ) {
      const { userName, action, description } = data[i];
      const rowClass  = 'text-center';
      const customRow = `<td>${ [ userName, action, description ].join('</td><td>') }</td>`;
      const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
      table.innerHTML += row;
    }
    // createPagination(total, page); 
  }

window.addEventListener("load", async() => {
    containerTable.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">${showSpinnerMenu()}</td></tr>`;
    await onLoadSite();
})