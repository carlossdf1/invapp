class boxComponents extends HTMLElement {
    constructor() {
        super();
        this.attributesComponents = [
          this.name = 'Lista de Registros', //Aqui puedes darle Definiciones por defecto
          this.classname = 'row row-cols-1 row-cols-md-3 g-4',
          this.textmore = 'VER',
          this.textbtn1 = 'DISPONIBLES',
          this.textbtn2 = 'PRESTADOS',
          this.textbtn3 = 'ELIMINADOS',
          this.cardtext = 'LISTADOS',
          this.loader = '',
        ];
    }

    static get observedAttributes(){ return ['name', 'classname', 'textmore','textbtn1', 'textbtn2', 'textbtn3', 'cardtext', 'loader']; }
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="container-info">
            <div class="${this.classname}">
                <div class="col-mb-4">
                    <div class="card text-center">
                        <div class="card-header">${this.textbtn1}</div>
                        <div class="card-body">
                            <h2 class="card-title" id="numeroProductos">${this.loader}</h2>
                            <p class="card-text">${this.cardtext}</p>
                            <a href="view/productos/productos.html" class="btn btn-index ">${this.textmore}</a>
                        </div>
                    </div>
                </div>
                <div class="col-mb-4">
                    <div class="card text-center">
                        <div class="card-header">${this.textbtn2}</div>
                        <div class="card-body">
                            <h2 class="card-title" id="numeroPrestados">${this.loader}</h2>
                            <p class="card-text">${this.cardtext}</p>
                            <a id="btn-prestado" href="view/productos/productos.html?estado=prestamo" class="btn btn-index">${this.textmore}</a>
                        </div>
                    </div>
                </div>
                <div class="col-mb-4">
                    <div class="card text-center">
                        <div class="card-header">${this.textbtn3}</div>
                        <div class="card-body">
                            <h2 class="card-title" id="numeroEliminados">${this.loader}</h2>
                            <p class="card-text">${this.cardtext}</p>
                            <a id="btn-eliminado" href="view/productos/productos.html?estado=eliminado" class="btn btn-index">${this.textmore}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `;
    }
}

customElements.define('box-component', boxComponents);