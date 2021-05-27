const productos = api + "product/products";
const ubicacion = api + "ubication";
const categoria = api + "category";

let listaProductos;
let listaUbicacion=consultaUbicacion();
let listaCategoria=consultaCategoria();

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
* Función consulta los datos de ubicacion en la api
*
* @author Carlos Correa   <carlos.sdf1[at]gmail.com>
* 
* @version 2021-05-24
*/

async function consultaUbicacion() 
{
  const respuesta 	= await consulta( ubicacion );
  listaUbicacion 	  = respuesta.data;
  return listaUbicacion;
};

/**
* Función que consulta los datos de categoria a api
*
* @author Carlos Correa   <carlos.sdf1[at]gmail.com>
* 
* @version 2021-05-24
*/

async function consultaCategoria() 
{
  const respuesta 	= await consulta( categoria );
  listaCategoria 	  = respuesta.data;
  return listaCategoria;
};

/**
 * Función que imprime los datos seleccionados, en este caso toda la lista de productos,
 * ademas de relleñar los select con datos de ubicacion, categoria y grupos
 * 
 * @author Carlos Correa   <carlos.sdf1[at]gmail.com>
 * @author Emmanuel Correa <ebcorrea[at]gmail.com>
 * @version 2021-05-06
 */

async function imprimir() { 
  imprimirLista( await consultaProductos( ) );
  selectNamesArray( await consultaUbicacion( ), "selectUbicacionModal");
  selectNamesArray( await consultaGrupos( ), "selectGrupoModal");
  selectNamesArray( await consultaCategoria( ), "selectCategoriaModal");

}

/* let myModal = document.getElementById('myModal');
let myInput    = document.getElementById('myInput');

myModal.addEventListener('shown.bs.modal', function() { myInput.focus() }); */

//Codigo a Ejecutar al Cargar la Pagina
//function myOnLoad() { cargar_provincias() }
   
// funcion para Cargar Provincias al campo <select>

/* function selectUbicacion() {
 
  const selectUbicacion=[];
  listaUbicacion.forEach(element => {
    selectUbicacion.push(element.name);
  });
  console.log(selectUbicacion);
  //selectUbicacion.sort();
  addOptions( "selectUbicacionModal", selectUbicacion );

} */

/**
* Función que separa el name de los datos, crea un array y lo envia addOptions
*
* @author Carlos Correa   <carlos.sdf1[at]gmail.com>
* 
* @version 2021-05-24
*/

function selectNamesArray(lista, selectId) {
 
  let select=[];

  for (let i in lista) {
    const fila=lista[i];
    select.push(fila.name);
  }
/*   lista.forEach(element => {
    select.push(element.name);
  }); */
  console.log(select);
  //selectUbicacion.sort();
  addOptions( selectId, select );
  return select;
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

/*   let select = document.getElementById('categoriaModal');
  select.addEventListener('change',
  function(){

    let selectedOption = this.options[ select.selectedIndex ];
    console.log( selectedOption.value + ': ' + selectedOption.text );

  }); */
