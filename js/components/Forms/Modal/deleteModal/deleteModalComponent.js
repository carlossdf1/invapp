class ModalDelete extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="modal fade" id="modalEliminar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Eliminar</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onclick="eliminarModalCancelar()"></button>
                    </div>
                    <div class="modal-body">
                        <p>Esta seguro que desea eliminar el item?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            onclick="eliminarModalCancelar()">Cancelar</button>
                        <button id="botonEliminarConfirmar" type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            onclick="eliminarModalSalir()">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

      `;
    }
}

customElements.define('modal-delete-component', ModalDelete);