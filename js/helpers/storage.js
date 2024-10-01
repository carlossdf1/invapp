const token = localStorage.getItem("token");
const email = localStorage.getItem('email');
const user = localStorage.getItem('name');
const userId = Number(localStorage.getItem('uid'));
const role = Number(localStorage.getItem('role'));
const country = Number(localStorage.getItem('country'));
const commune = Number(localStorage.getItem('commune'));
const communeId = Number(localStorage.getItem('commune-id'));
const ubication = localStorage.getItem('ubication');
const ubicationId = localStorage.getItem('ubication-id');
const pages = localStorage.getItem('pages');
const timer = Number(localStorage.getItem('timer')) || 500;


const localStorage =  function() {

  this.createStorage = (id,data, jsonStrinfy = false) => localStorage.getItem( id, jsonStrinfy ? JSON.stringify(data) : data );
  this.updateStorage = (id, data, jsonStrinfy = false) => localStorage.setItem( id, jsonStrinfy ? JSON.stringify(data) : data ); 
  this.removeStorage = (id) => localStorage.removeItem( id); 
  this.deleteAllStorage = () => localStorage.clear(); 
}

const M = new localStorage();