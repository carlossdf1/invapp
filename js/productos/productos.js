const productos = api + "product/products";
let listaProductos;

/**
 * Función que muestra cada linea de informacion
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function consultaProductos() 
{
  const respuesta 	= await consulta( productos );
  listaProductos 	  = respuesta.data;
  return listaProductos;
};

/**
 * Función que imprime los datos seleccionados, en este caso toda la lista de productos
 *
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function imprimir() { imprimirLista( await consultaProductos( ) ); }

/* let myModal = document.getElementById('myModal');
let myInput    = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', function() { myInput.focus() }); */

//Codigo a Ejecutar al Cargar la Pagina
function myOnLoad() { cargar_provincias() }
   
// funcion para Cargar Provincias al campo <select>
function cargar_provincias() {
 
  const array = ["Cantabria", "Asturias", "Galicia", "Andalucia", "Extremadura"].sort();
  addOptions( "categoriaModal", array );

}

// Rutina para agregar opciones a un <select>
function addOptions( domElement, array ) {

 const select   = document.getElementsByName( domElement )[0];

  for ( value in array ) {

    const option  = document.createElement( "option" );
    option.text   = array[ value ];
    select.add( option );

  }
}

  let select = document.getElementById('categoriaModal');
  select.addEventListener('change',
  function(){

  let selectedOption = this.options[ select.selectedIndex ];
  console.log( selectedOption.value + ': ' + selectedOption.text );

});
