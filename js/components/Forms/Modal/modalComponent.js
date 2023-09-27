class Modal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="modal fade" id="modalEditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-fullscreen-lg-down">
            <div class="modal-content">
                <form class="form" name="formModal" id="formModal" target="_self">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detalle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            fill="currentColor"></button>
                    </div>
                    <picture>
                        <source id="imgModal" srcset="" class="card-img-top" width="100%" height="100%" alt="...">
                        <img id="svgDefault" class="card-img-top" width="240" height="240" src='data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" class="bi bi-image rounded float-end" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                        </svg>' alt="...">
                    </picture>

                    <div class="modal-body" id="vistaModal">
                        <div class="row">
                            <div class="col-12">

                                <div class="mb-3 row">
                                    <label for="nombre" class="col-sm-3 col-form-label">NOMBRE:</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control-plaintext" id="nombreModal" value=""
                                            placeholder="Ingrese el nombre" required>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="cantidad" class="col-sm-3 col-form-label">CANTIDAD:</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control-plaintext" min="1" id="cantidadModal"
                                            value="" placeholder="1" required>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="precio" class="col-sm-3 col-form-label">PRECIO:</label>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control-plaintext" min="0" id="precioModal"
                                            value="" placeholder="0" required>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="grupo" class="col-sm-3 col-form-label">GRUPO:</label>
                                    <div class="col-sm-6">
                                        <!-- <input type="text" class="form-control-plaintext" id="grupoModal" value="" placeholder=""> -->
                                        <select id="selectGrupoModal" name="selectGrupoModal"
                                            class="form-control-plaintext" aria-label=".form-select-lg" required>
                                            <option value="" disabled selected>Seleccione un grupo...</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="ubicacion" class="col-sm-3 col-form-label">UBICACION:</label>
                                    <div class="col-sm-6">
                                        <!-- <input type="text" class="form-control-plaintext" id="ubicacionModal" value=""> -->
                                        <select id="selectUbicacionModal" name="selectUbicacionModal"
                                            class="form-control-plaintext" aria-label=".form-select-lg" required>
                                            <option value="" disabled selected>Seleccione una ubicación...</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="categoria" class="col-sm-3 col-form-label">CATEGORIA:</label>
                                    <div class="col-sm-6 align-items-end">
                                        <!-- <input type="text" class="form-control-plaintext" id="categoriaModal" value=""> -->
                                        <select id="selectCategoriaModal" name="selectCategoriaModal"
                                            class="form-control-plaintext" aria-label=".form-select-lg" required>
                                            <option value="" disabled selected>Seleccione una categoria...</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="obs" class="col-sm-3 col-form-label">OBSERVACIÓN:</label>
                                    <div class="col-sm-6 align-items-end">
                                        <input type="text" class="form-control-plaintext" id="obsModal" value=""
                                            placeholder="(Opcional)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <input id="botonAgregar" type="submit" class="btn btn-success" value="Agregar" onclick="createEditProduct();">
                        <input id="botonGuardar" type="submit" class="btn btn-danger" value="Guardar" onclick="">
                        <button id="botonEliminar" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalEliminar" onclick="eliminarModal()">Eliminar</button>
                        <button id="botonEditar" type="button" class="btn btn-success" onclick="editarModal()">Editar</button>
                        <button id="botonRestaurar" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalRestaurar" onclick="eliminarModal()">Restaurar</button>
                        <button id="botonImprimir" type="button" class="btn btn-primary" onclick="imprimirElemento('vistaModal')">Imprimir</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

      `;
    }
}

customElements.define('modal-component', Modal);