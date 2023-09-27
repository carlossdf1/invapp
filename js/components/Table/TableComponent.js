class Table extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <table id="tabla" class="table table-hover table-striped table-bordered table-responsive">
            <thead>
                <tr class="primary-color">
                    <th colspan="5">
                        <span id="item-total"> Total: 0 </span>
                        |
                        <span class="align-text-top" id="inversion-total"> Inversion : 0</span>
                </tr>
                <tr class="primary-color">
                    <th scope="col "></th>
                    <th scope="col ">Item</th>
                    <th scope="col ">Cant.</th>
                    <th scope="col ">Ubicación</th>
                    <th scope="col "></th>
                </tr>
            </thead>
            <tbody id="lista">
            </tbody>
        </table>
      `;
    }
}

customElements.define('table-component', Table);