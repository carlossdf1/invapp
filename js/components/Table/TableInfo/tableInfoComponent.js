class TableInfo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <table id="tabla" class="table table-striped table-bordered">
            <thead>
                <tr class="primary-color">
                    <th scope="col ">Nombre</th>
                </tr>
            </thead>
            <tbody id="lista">
            </tbody>
        </table>
      `;
    }
}

customElements.define('table-info-component', TableInfo);