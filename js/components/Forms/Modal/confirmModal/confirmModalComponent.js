class confirmModal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="modal fade" id="modalRestaurar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Eliminar</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onclick="eliminarModalCancelar()"></button>
                    </div>
                    <div class="modal-body">
                        <p>Establesca el grupo y la categoria a las que el producto sera restaurado</p>
                        <div class="mb-3 row">
                            <label for="grupo" class="col-sm-3 col-form-label">GRUPO:</label>
                            <div class="col-sm-6">
                                <!-- <input type="text" class="form-control-plaintext" id="grupoModal" value="" placeholder=""> -->
                                <select id="selectGrupoModal" name="selectGrupoModal" class="form-control-plaintext"
                                    aria-label=".form-select-lg" required>
                                    <option value="" disabled selected>Seleccione una categoria...</option>
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            onclick="eliminarModalCancelar()">Cancelar</button>
                        <button id="botonRestaurarConfirmar" type="button" class="btn btn-success"
                            data-bs-dismiss="modal" onclick="restaurarModalSalir()">Restaurar</button>
                    </div>
                </div>
            </div>
        </div>
      `;
    }
}

customElements.define('modal-confirm-component', confirmModal);